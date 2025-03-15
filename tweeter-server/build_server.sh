#!/bin/bash

# Navigate to tweeter-shared
cd ../tweeter-shared || { echo "Directory 'tweeter-shared' not found!"; exit 1; }

# Run build command
npm run build
echo "✅ tweeter-shared built"

# Navigate back to tweeter-server
cd ../tweeter-server || exit 1

# Clean modules
npm run clean-modules
echo "✅ cleaned tweeter-server node_modules"

# Reinstall dependencies
npm install
echo "✅ re-installed tweeter-server node_modules"

# Create dist
npm run build
echo "✅ tweeter-server built"

echo "⭐️Build and cleanup completed!"
