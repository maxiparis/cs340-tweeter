#!/bin/bash
# This script retrieves the latest version of an AWS Lambda layer.

# Specify the layer name
LAYER_NAME="tweeter-server"

# Get the latest version of the Lambda layer
LATEST_VERSION=$(aws lambda list-layer-versions --layer-name "$LAYER_NAME" --query 'LayerVersions[0].Version' --output text)

if [ "$LATEST_VERSION" == "None" ]; then
    echo "❌ No versions found for the Lambda layer: $LAYER_NAME"
    exit 1
else
    echo "✅ The latest version of the Lambda layer '$LAYER_NAME' is: $LATEST_VERSION"
fi