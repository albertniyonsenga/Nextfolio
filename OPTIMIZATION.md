# Vanilla Portfolio - Deployment Files

## Performance Optimizations

### 1. Lazy Loading for Images
Already implemented in:
- `photos.js` - Lazy loads images after the first 6
- HTML uses native `loading="lazy"` attribute

### 2. CSS Optimization
For production, minify the CSS file:
```bash
# Using cssnano or similar
npx cssnano css/styles.css css/styles.min.css
```

### 3. JavaScript Optimization
Minify JavaScript files:
```bash
# Using terser
npx terser js/theme.js -c -m -o js/theme.min.js
npx terser js/nav.js -c -m -o js/nav.min.js
npx terser js/blog.js -c -m -o js/blog.min.js
npx terser js/projects.js -c -m -o js/projects.min.js
npx terser js/photos.js -c -m -o js/photos.min.js
```

### 4. Image Optimization
Optimize images before deployment:
```bash
# Using imagemin or similar
npx imagemin photos/*.jpg --out-dir=photos-optimized
```

### 5. Gzip Compression
Enable gzip/brotli compression on your server (see .htaccess or nginx config below)

### 6. Critical CSS
Extract critical above-the-fold CSS and inline it in `<head>` for faster first paint.

## Build Script

Create a simple build script (`build.sh`):

```bash
#!/bin/bash

# Create dist directory
mkdir -p dist

# Copy HTML files
cp *.html dist/

# Minify and copy CSS
mkdir -p dist/css
npx cssnano css/styles.css dist/css/styles.min.css

# Minify and copy JS
mkdir -p dist/js
npx terser js/theme.js -c -m -o dist/js/theme.min.js
npx terser js/nav.js -c -m -o dist/js/nav.min.js
npx terser js/blog.js -c -m -o dist/js/blog.min.js
npx terser js/projects.js -c -m -o dist/js/projects.min.js
npx terser js/photos.js -c -m -o dist/js/photos.min.js

# Copy data
cp -r data dist/

# Optimize and copy images
mkdir -p dist/photos dist/public
npx imagemin 'photos/*.jpg' --out-dir=dist/photos
cp -r public/* dist/ 2>/dev/null || :

# Copy other files
cp robots.txt sitemap.xml dist/ 2>/dev/null || :

echo "Build complete! Files are in the dist/ directory"
```

Make it executable:
```bash
chmod +x build.sh
```

Run the build:
```bash
./build.sh
```

## Update HTML References

After building, update HTML files in dist/ to use minified files:
- Change `/css/styles.css` to `/css/styles.min.css`
- Change `/js/*.js` to `/js/*.min.js`
