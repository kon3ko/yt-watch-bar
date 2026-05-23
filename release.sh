#!/bin/bash

# Navigate to the project root directory
cd "$(dirname "$0")/"

# Extract the version from manifest.json
VERSION=$(grep -oP '"version": "\K[^"]+' manifest.json)

# Define the output zip file name
ZIP_FILE="release/youtube-live-progress-bar-color-v${VERSION}.zip"

# Create release directory if it doesn't exist
mkdir -p release

# Remove the existing zip file if it exists
if [ -f "$ZIP_FILE" ]; then
    rm "$ZIP_FILE"
fi

# Create the zip file including all necessary extension files and the _locales directory
zip -r "$ZIP_FILE" manifest.json content.js icon64.png options.js options.html _locales

echo "Successfully created release zip: $ZIP_FILE"
