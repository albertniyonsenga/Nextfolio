#!/bin/bash

# Photo Optimization and JSON Generation Script
# This script optimizes images in the photos folder and generates photos.json

set -e

echo "🖼️  Photo Management Script"
echo "=========================="
echo ""

PHOTOS_DIR="photos"
DATA_DIR="data"
JSON_FILE="$DATA_DIR/photos.json"

# Check if photos directory exists
if [ ! -d "$PHOTOS_DIR" ]; then
    echo "❌ Photos directory not found!"
    echo "Creating $PHOTOS_DIR directory..."
    mkdir -p "$PHOTOS_DIR"
    echo "✅ Created $PHOTOS_DIR directory"
    echo ""
    echo "Add your photos to the $PHOTOS_DIR folder and run this script again."
    exit 0
fi

# Count photos
PHOTO_COUNT=$(find "$PHOTOS_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) | wc -l)

if [ "$PHOTO_COUNT" -eq 0 ]; then
    echo "❌ No photos found in $PHOTOS_DIR"
    echo ""
    echo "Add your photos (jpg, jpeg, png, webp) to the $PHOTOS_DIR folder"
    exit 0
fi

echo "📊 Found $PHOTO_COUNT photos"
echo ""

# Create data directory if it doesn't exist
mkdir -p "$DATA_DIR"

# Start JSON array
echo "[" > "$JSON_FILE"

# Counter
counter=0

# Process each photo
for photo in "$PHOTOS_DIR"/*.{jpg,jpeg,png,webp} 2>/dev/null; do
    # Skip if no files match
    [ -e "$photo" ] || continue
    
    # Get filename without path
    filename=$(basename "$photo")
    name="${filename%.*}"
    
    # Increment counter
    counter=$((counter + 1))
    
    # Add comma if not first item
    if [ $counter -gt 1 ]; then
        echo "," >> "$JSON_FILE"
    fi
    
    # Generate JSON entry
    cat >> "$JSON_FILE" << EOF
    {
        "src": "/$photo",
        "alt": "$name",
        "title": "$name",
        "description": "Add a description for $name"
    }EOF
    
    echo "  ✓ Added $filename"
done

# Close JSON array
echo "" >> "$JSON_FILE"
echo "]" >> "$JSON_FILE"

echo ""
echo "✅ Generated $JSON_FILE with $counter photos"
echo ""

# Optional: Optimize images if imagemin is available
if command -v imagemin &> /dev/null; then
    echo "🔧 Optimizing images..."
    
    # Create optimized directory
    mkdir -p "${PHOTOS_DIR}-optimized"
    
    # Optimize images
    imagemin "$PHOTOS_DIR/*.{jpg,jpeg,png}" --out-dir="${PHOTOS_DIR}-optimized" 2>/dev/null || echo "⚠️  Some images could not be optimized"
    
    echo "✅ Optimized images saved to ${PHOTOS_DIR}-optimized/"
    echo ""
    echo "To use optimized images, replace the photos folder:"
    echo "  rm -rf $PHOTOS_DIR"
    echo "  mv ${PHOTOS_DIR}-optimized $PHOTOS_DIR"
else
    echo "💡 Install imagemin-cli for automatic image optimization:"
    echo "   npm install -g imagemin-cli"
fi

echo ""
echo "📝 Next steps:"
echo "1. Edit $JSON_FILE to add descriptions for each photo"
echo "2. Descriptions will appear on hover with glassmorphism effect"
echo "3. Refresh your photos page to see the changes"
echo ""
echo "Photo format tips:"
echo "- Use WebP for best performance (smaller file size)"
echo "- Recommended dimensions: 1200x900px (4:3 ratio)"
echo "- Keep file sizes under 500KB for optimal loading"
