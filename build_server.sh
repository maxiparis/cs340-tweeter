#!/bin/bash

# Navigate to tweeter-server
cd tweeter-server || { echo "Directory 'tweeter-server' not found!"; exit 1; }

# Run build command
npm run build

# Go back to the parent directory
cd ..

# Navigate back to tweeter-server
cd tweeter-server || exit 1

# Clean modules
npm run clean-modules

# Reinstall dependencies
npm install

echo "Build and cleanup completed!"
