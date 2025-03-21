#!/bin/bash

set -e

# Navigate to tweeter-shared
cd ../tweeter-shared || { echo "Directory 'tweeter-shared' not found!"; exit 1; }

# Run build command
npm run build || { echo "Failed to build tweeter-shared"; exit 1; }
echo "✅ tweeter-shared built"

# Navigate back to tweeter-server
cd ../tweeter-server || { echo "Directory 'tweeter-server' not found!"; exit 1; }

# Clean modules
npm run clean-modules || { echo "Failed to clean tweeter-server node_modules"; exit 1; }
echo "✅ cleaned tweeter-server node_modules"

# Reinstall dependencies
npm install || { echo "Failed to install tweeter-server node_modules"; exit 1; }
echo "✅ re-installed tweeter-server node_modules"

# Create dist
npm run clean || { echo "Failed to clean 'dist' folder"; exit 1; }
echo "✅ Existing 'dist' folder removed"

npm run build || { echo "Failed to build tweeter-server"; exit 1; }
echo "✅ tweeter-server built. dist created"

######################### CREATE: DIST FOLDER and ZIP #########################

# Zip contents of dist folder
cd dist || { echo "Directory 'dist' not found!"; exit 1; }
zip -r ../dist.zip ./* || { echo "Failed to zip dist contents"; exit 1; }
echo "✅ zipped dist contents"


######################### CREATE: NODEJS FOLDER and ZIP #########################

# Create a nodejs folder, if it exists, clean its contents
if [ -d "../nodejs" ]; then
    rm -rf ../nodejs/* || { echo "Failed to clean existing 'nodejs' folder"; exit 1; }
else
    mkdir -p ../nodejs || { echo "Failed to create 'nodejs' folder"; exit 1; }
fi

# Copy the node_modules folder into nodejs
cp -r ../node_modules ../nodejs/ || { echo "Failed to copy node_modules to 'nodejs'"; exit 1; }

# Zip nodejs (from the root)
cd .. || { echo "Failed to navigate to root directory"; exit 1; }
zip -r nodejs.zip nodejs || { echo "Failed to zip nodejs contents"; exit 1; }
echo "✅ updated and zipped nodejs contents"

echo "⭐️Build, cleanup, and zipping completed! (dist and nodejs)"