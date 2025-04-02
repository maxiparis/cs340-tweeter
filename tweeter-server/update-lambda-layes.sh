#!/bin/bash
# This script is helpful for when I am updating the backend and need to update the layers and lambdas.

set -e

./build_server.sh
./uploadLambdas.sh
./upload_new_layer.sh
./updateLayers.sh

echo "✅ Server built, lambdas updated, new layer updated, and all lambdas updated with new layer"