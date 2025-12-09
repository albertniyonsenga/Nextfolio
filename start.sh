#!/bin/bash

# Quick start development server
# No build required!

echo "🚀 Starting development server..."
echo ""

# Check for available server options
if command -v python3 &> /dev/null; then
    echo "✅ Starting Python server on http://localhost:8000"
    echo "   Press Ctrl+C to stop"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Starting Python server on http://localhost:8000"
    echo "   Press Ctrl+C to stop"
    echo ""
    python -m SimpleHTTPServer 8000
elif command -v php &> /dev/null; then
    echo "✅ Starting PHP server on http://localhost:8000"
    echo "   Press Ctrl+C to stop"
    echo ""
    php -S localhost:8000
else
    echo "❌ No suitable server found."
    echo ""
    echo "Please install one of:"
    echo "  - Python 3: python3 -m http.server 8000"
    echo "  - PHP: php -S localhost:8000"
    echo "  - Node.js: npx http-server -p 8000"
    echo ""
    echo "Or simply open index.html in your browser!"
fi
