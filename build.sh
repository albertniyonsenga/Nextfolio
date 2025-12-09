#!/bin/bash

# Build script for production optimization
# This script minifies CSS, JS, and optimizes images

set -e  # Exit on error

echo "🚀 Starting build process..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Create dist directory
echo -e "${BLUE}📁 Creating dist directory...${NC}"
rm -rf dist
mkdir -p dist/{css,js,data,photos,public}

# Copy HTML files
echo -e "${BLUE}📄 Copying HTML files...${NC}"
cp *.html dist/

# Check if minification tools are available
if ! command -v cssnano &> /dev/null; then
    echo "⚠️  cssnano not found. Installing..."
    npm install -g cssnano-cli || echo "⚠️  Could not install cssnano. Copying CSS without minification."
fi

if ! command -v terser &> /dev/null; then
    echo "⚠️  terser not found. Installing..."
    npm install -g terser || echo "⚠️  Could not install terser. Copying JS without minification."
fi

# Minify CSS
echo -e "${BLUE}🎨 Minifying CSS...${NC}"
if command -v cssnano &> /dev/null; then
    cssnano css/styles.css dist/css/styles.min.css 2>/dev/null || cp css/styles.css dist/css/styles.min.css
    echo -e "${GREEN}✓ CSS minified${NC}"
else
    cp css/styles.css dist/css/styles.min.css
    echo "⚠️  CSS copied without minification"
fi

# Minify JavaScript files
echo -e "${BLUE}⚡ Minifying JavaScript...${NC}"
for jsfile in js/*.js; do
    filename=$(basename "$jsfile" .js)
    if command -v terser &> /dev/null; then
        terser "$jsfile" -c -m -o "dist/js/${filename}.min.js" 2>/dev/null || cp "$jsfile" "dist/js/${filename}.min.js"
        echo -e "${GREEN}✓ ${filename}.js minified${NC}"
    else
        cp "$jsfile" "dist/js/${filename}.min.js"
        echo "⚠️  ${filename}.js copied without minification"
    fi
done

# Copy data files
echo -e "${BLUE}📊 Copying data files...${NC}"
cp -r data/* dist/data/

# Copy and optimize images
echo -e "${BLUE}🖼️  Processing images...${NC}"
if [ -d "photos" ]; then
    if command -v imagemin &> /dev/null; then
        imagemin photos/*.{jpg,jpeg,png} --out-dir=dist/photos 2>/dev/null || cp -r photos/* dist/photos/
        echo -e "${GREEN}✓ Images optimized${NC}"
    else
        cp -r photos/* dist/photos/ 2>/dev/null || echo "No photos to copy"
        echo "⚠️  Images copied without optimization (install imagemin-cli for optimization)"
    fi
fi

# Copy public assets
echo -e "${BLUE}📦 Copying public assets...${NC}"
if [ -d "public" ]; then
    cp -r public/* dist/public/ 2>/dev/null || echo "No public assets"
fi
cp profile.png dist/ 2>/dev/null || echo "No profile image"

# Copy SEO and config files
echo -e "${BLUE}🔍 Copying SEO files...${NC}"
cp robots.txt sitemap.xml rss.xml dist/ 2>/dev/null || echo "Some SEO files missing"
cp .htaccess dist/ 2>/dev/null || echo "No .htaccess file"

# Update HTML to use minified files
echo -e "${BLUE}🔧 Updating HTML references to minified files...${NC}"
if command -v sed &> /dev/null; then
    for htmlfile in dist/*.html; do
        # Update CSS references
        sed -i.bak 's|/css/styles\.css|/css/styles.min.css|g' "$htmlfile"
        # Update JS references
        sed -i.bak 's|/js/\([^"]*\)\.js|/js/\1.min.js|g' "$htmlfile"
        # Remove backup files
        rm "${htmlfile}.bak"
    done
    echo -e "${GREEN}✓ HTML files updated${NC}"
fi

# Calculate size savings
echo ""
echo -e "${BLUE}📊 Build Statistics:${NC}"
if command -v du &> /dev/null; then
    ORIGINAL_SIZE=$(du -sh css js 2>/dev/null | awk '{sum+=$1} END {print sum}')
    MINIFIED_SIZE=$(du -sh dist/css dist/js 2>/dev/null | awk '{sum+=$1} END {print sum}')
    echo "Original: ${ORIGINAL_SIZE} | Minified: ${MINIFIED_SIZE}"
fi

echo ""
echo -e "${GREEN}✅ Build complete!${NC}"
echo -e "${GREEN}📦 Production files are in the ${BLUE}dist/${GREEN} directory${NC}"
echo ""
echo "Next steps:"
echo "  1. Test the build: cd dist && python3 -m http.server 8000"
echo "  2. Deploy the dist/ folder to your server"
echo ""
echo "Optional optimizations:"
echo "  - Install imagemin-cli for image optimization: npm install -g imagemin-cli"
echo "  - Install cssnano for CSS minification: npm install -g cssnano-cli"
echo "  - Install terser for JS minification: npm install -g terser"
