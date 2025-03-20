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
npm run clean
echo "✅ Existing 'dist' folder removed"

npm run build
echo "✅ tweeter-server built. dist created"

######################### CREATE: DIST FOLDER and ZIP #########################

# Zip contents of dist folder
cd dist || { echo "Directory 'dist' not found!"; exit 1; }
zip -r ../dist.zip ./*
echo "✅ zipped dist contents"


######################### CREATE: NODEJS FOLDER and ZIP #########################

# Create a nodejs folder, if it exists, clean its contents
if [ -d "../nodejs" ]; then
    rm -rf ../nodejs/*
else
    mkdir -p ../nodejs
fi

# Copy the node_modules folder into nodejs
cp -r ../node_modules ../nodejs/

# Zip nodejs (from the root)
cd ..
zip -r nodejs.zip nodejs
echo "✅ updated and zipped nodejs contents"

echo "⭐️Build, cleanup, and zipping completed! (dist and nodejs)"
