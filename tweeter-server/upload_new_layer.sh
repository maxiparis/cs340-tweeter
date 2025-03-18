#!/bin/bash
# This script uploads a new version of an AWS Lambda layer for the tweeter-server.
# Requirements:
# - AWS CLI must be installed and configured with appropriate permissions.
# - A zip file named nodejs.zip must be present in the same directory.

# Set the zip file to nodejs.zip in the current folder
ZIP_FILE="nodejs.zip"

# Check if the zip file exists
if [ ! -f "$ZIP_FILE" ]; then
    echo "File $ZIP_FILE does not exist!"
    exit 1
fi

# Upload the zip file as a new version of the Lambda layer
aws lambda publish-layer-version --layer-name tweeter-server --zip-file "fileb://$ZIP_FILE" --compatible-runtimes nodejs20.x

if [ $? -eq 0 ]; then
    echo "✅ Lambda layer uploaded successfully!"
else
    echo "❌ Failed to upload Lambda layer!"
    exit 1
fi