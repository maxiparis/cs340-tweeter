#!/bin/bash
# Use this file to update the lambda layers for each lambda.
# Define the layer name here
LAYER_NAME="tweeter-server"

# Verify that .server exists and essential variables are set.
if [ ! -f .server ]; then
    echo "Error: .server file not found. Aborting."
    exit 1
fi
source .server
if [ -z "$EDIT_LAMBDALIST" ]; then
    echo "Error: EDIT_LAMBDALIST is not set in .server. Aborting."
    exit 1
fi

i=1
pids=()
IFS=$'\n'  # Set IFS to newline to handle function name and handler pairs properly
MAX_CONCURRENT=5
active_processes=0

# Fetch the latest ARN for the layer
LAMBDALAYER_RESPONSE=$(aws lambda list-layer-versions --layer-name "$LAYER_NAME" --query 'LayerVersions[0]' --output json)
LAMBDALAYER_ARN=$(echo "$LAMBDALAYER_RESPONSE" | jq -r '.LayerVersionArn')
LAMBDALAYER_VERSION=$(echo "$LAMBDALAYER_RESPONSE" | jq -r '.Version')

if [ -z "$LAMBDALAYER_ARN" ] || [ -z "$LAMBDALAYER_VERSION" ]; then
    echo "Error: Could not fetch latest ARN or version for layer $LAYER_NAME. Aborting."
    exit 1
else
    echo "Successfully fetched ARN and version. Latest Layer Version: $LAMBDALAYER_VERSION"
fi

for lambda_info in $EDIT_LAMBDALIST; do
    # Extract function name and trim whitespace
    function_name=$(echo "$lambda_info" | cut -d '|' -f 1 | tr -d '[:space:]')
    if [ -z "$function_name" ]; then
        echo "Warning: Skipping empty or invalid function name."
        continue
    fi

    # Update lambda configuration
    echo "Lambda $i, $function_name: updating lambda layer..."
    if aws lambda update-function-configuration --function-name "$function_name" --layers "$LAMBDALAYER_ARN" 1>/dev/null 2>&1; then
      echo "✅ Success: Updated lambda layer for $function_name."
    else
        echo "❌ Error: Failed to update lambda layer for $function_name."
    fi &
    pids[$((i-1))]=$!
    ((i++))
    ((active_processes++))

    # Concurrency limit
    if [ "$active_processes" -ge "$MAX_CONCURRENT" ]; then

        wait -n
        ((active_processes--))
    fi
done

# Wait for all background processes to finish
success_count=0
failure_count=0
for pid in "${pids[@]}"; do
    if wait "$pid"; then
        ((success_count++))
    else
        ((failure_count++))
    fi
done
echo "Lambda layers update completed. Success: $success_count, Failures: $failure_count"