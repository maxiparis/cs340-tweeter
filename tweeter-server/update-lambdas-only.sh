#!/bin/bash
# Builds and Update lambdas, when I dont modify the shared folder
set -e

./build_server.sh
./uploadLambdas.sh

echo "✅ Server built, lambdas updated"