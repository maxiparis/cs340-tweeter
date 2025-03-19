#!/bin/bash

# Variables
API_NAME="tweeter"           # Name of the already created API
LAMBDA_FUNCTION_NAME="tweeterGetFollowers"   # ✏️ Lambda Function Name
PARENT_RESOURCE="follower"       # ✏️Parent resource
CHILD_RESOURCE="list"             # ✏️Child resource
HTTP_METHOD="POST"                 # HTTP Method to associate with the resource
STAGE_NAME="dev"                 # Deployment stage name
ALLOW_ORIGINS="*"                 # Allowed origins for CORS

# Get the API ID of the existing API Gateway API
API_ID=$(aws apigateway get-rest-apis --query "items[?name=='$API_NAME'].id" --output text)

if [ -z "$API_ID" ]; then
  echo "Error: API with name '$API_NAME' does not exist."
  exit 1
fi
echo "Using existing API: $API_NAME (ID: $API_ID)"

# Get the Root Resource ID
ROOT_RESOURCE_ID=$(aws apigateway get-resources --rest-api-id "$API_ID" --query "items[?path=='/'].id" --output text)
echo "Root Resource ID: $ROOT_RESOURCE_ID"

# Check if the Parent Resource (/followers) already exists
PARENT_RESOURCE_ID=$(aws apigateway get-resources --rest-api-id "$API_ID" --query "items[?path=='/$PARENT_RESOURCE'].id" --output text)

if [ -z "$PARENT_RESOURCE_ID" ]; then
  # Create the Parent Resource if it does not exist
  PARENT_RESOURCE_ID=$(aws apigateway create-resource --rest-api-id "$API_ID" --parent-id "$ROOT_RESOURCE_ID" --path-part "$PARENT_RESOURCE" --query 'id' --output text)
  echo "Parent resource '/$PARENT_RESOURCE' created with ID: $PARENT_RESOURCE_ID"
else
  echo "Parent resource '/$PARENT_RESOURCE' already exists with ID: $PARENT_RESOURCE_ID"
fi

# Check if the Child Resource (/followers/list) already exists
CHILD_RESOURCE_ID=$(aws apigateway get-resources --rest-api-id "$API_ID" --query "items[?path=='/$PARENT_RESOURCE/$CHILD_RESOURCE'].id" --output text)

if [ -z "$CHILD_RESOURCE_ID" ]; then
  # Create the Child Resource if it does not exist
  CHILD_RESOURCE_ID=$(aws apigateway create-resource --rest-api-id "$API_ID" --parent-id "$PARENT_RESOURCE_ID" --path-part "$CHILD_RESOURCE" --query 'id' --output text)
  echo "Child resource '/$PARENT_RESOURCE/$CHILD_RESOURCE' created with ID: $CHILD_RESOURCE_ID"
else
  echo "Child resource '/$PARENT_RESOURCE/$CHILD_RESOURCE' already exists with ID: $CHILD_RESOURCE_ID"
fi

# Add a Method to the Child Resource (POST Method) and setup permissions
aws apigateway put-method --rest-api-id "$API_ID" --resource-id "$CHILD_RESOURCE_ID" --http-method "$HTTP_METHOD" --authorization-type "NONE"
aws apigateway put-integration --rest-api-id "$API_ID" --resource-id "$CHILD_RESOURCE_ID" \
  --http-method "$HTTP_METHOD" --type "AWS" --integration-http-method "POST" \
  --uri "arn:aws:apigateway:$(aws configure get region):lambda:path/2015-03-31/functions/arn:aws:lambda:$(aws configure get region):$(aws sts get-caller-identity --query 'Account' --output text):function:${LAMBDA_FUNCTION_NAME}/invocations"
aws apigateway put-method-response --rest-api-id "$API_ID" --resource-id "$CHILD_RESOURCE_ID" --http-method "$HTTP_METHOD" --status-code 200 \
  --response-models '{"application/json":"Empty"}'
aws apigateway put-integration-response --rest-api-id "$API_ID" --resource-id "$CHILD_RESOURCE_ID" --http-method "$HTTP_METHOD" --status-code 200 \
  --response-templates '{"application/json":""}'
echo "Method ${HTTP_METHOD} linked to Lambda function '${LAMBDA_FUNCTION_NAME}' for resource '/$PARENT_RESOURCE/$CHILD_RESOURCE'"

# Update permissions for the Lambda function
aws lambda add-permission --function-name "$LAMBDA_FUNCTION_NAME" \
  --statement-id "ApiGatewayInvokePermission" \
  --action "lambda:InvokeFunction" \
  --principal "apigateway.amazonaws.com" \
  --source-arn "arn:aws:execute-api:$(aws configure get region):$(aws sts get-caller-identity --query 'Account' --output text):$API_ID/*/$HTTP_METHOD/$PARENT_RESOURCE/$CHILD_RESOURCE"

# Enable CORS for the Child Resource
aws apigateway put-method --rest-api-id "$API_ID" --resource-id "$CHILD_RESOURCE_ID" --http-method "OPTIONS" --authorization-type "NONE"
aws apigateway put-integration --rest-api-id "$API_ID" --resource-id "$CHILD_RESOURCE_ID" --http-method "OPTIONS" --type "MOCK" \
  --request-templates '{"application/json":"{\"statusCode\": 200}"}'
aws apigateway put-method-response --rest-api-id "$API_ID" --resource-id "$CHILD_RESOURCE_ID" --http-method "OPTIONS" --status-code 200 \
  --response-parameters "method.response.header.Access-Control-Allow-Methods=true,method.response.header.Access-Control-Allow-Headers=true,method.response.header.Access-Control-Allow-Origin=true"
aws apigateway put-integration-response --rest-api-id "$API_ID" --resource-id "$CHILD_RESOURCE_ID" --http-method "OPTIONS" --status-code 200 \
  --response-parameters "method.response.header.Access-Control-Allow-Methods='${HTTP_METHOD},OPTIONS',method.response.header.Access-Control-Allow-Headers='Content-Type',method.response.header.Access-Control-Allow-Origin='${ALLOW_ORIGINS}'"
echo "CORS enabled for '/$PARENT_RESOURCE/$CHILD_RESOURCE'"

# Deploy the API to the Stage
DEPLOYMENT_ID=$(aws apigateway create-deployment --rest-api-id "$API_ID" --stage-name "$STAGE_NAME" --query 'id' --output text)
echo "API deployed to stage '${STAGE_NAME}' with Deployment ID: $DEPLOYMENT_ID"

# Output the API URL
echo "API Base URL: https://$API_ID.execute-api.$(aws configure get region).amazonaws.com/$STAGE_NAME/$PARENT_RESOURCE/$CHILD_RESOURCE"