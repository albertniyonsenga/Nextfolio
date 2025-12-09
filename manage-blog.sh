#!/bin/bash

# Blog Management Script
# This script helps manage blog posts in markdown format

set -e

echo "📝 Blog Management Script"
echo "========================"
echo ""

BLOG_DIR="blog"

# Check if blog directory exists
if [ ! -d "$BLOG_DIR" ]; then
    echo "Creating blog directory..."
    mkdir -p "$BLOG_DIR"
fi

# Function to create a new blog post
create_post() {
    echo "Creating new blog post..."
    echo ""
    
    read -p "Post title: " title
    read -p "Post slug (URL-friendly name): " slug
    read -p "Summary: " summary
    read -p "Tags (comma-separated): " tags
    read -p "Author name: " author
    
    # Get current date
    date=$(date +%Y-%m-%d)
    
    # Create file
    filename="$BLOG_DIR/${slug}.md"
    
    if [ -f "$filename" ]; then
        echo ""
        echo "❌ File already exists: $filename"
        exit 1
    fi
    
    # Write front matter and initial content
    cat > "$filename" << EOF
---
title: $title
slug: $slug
publishedAt: $date
summary: $summary
tags: $tags
author: $author
---

# $title

Write your blog post content here using Markdown.

## Getting Started

Use standard Markdown syntax:

- **Bold text**
- *Italic text*
- [Links](https://example.com)
- \`inline code\`

\`\`\`javascript
// Code blocks with syntax highlighting
const example = "Hello World";
console.log(example);
\`\`\`

## Images

![Image description](/photos/image.jpg)

## Lists

1. Numbered item
2. Another item
3. One more

## Quotes

> Important quote goes here

Happy writing!
EOF
    
    echo ""
    echo "✅ Created blog post: $filename"
    echo ""
    echo "Edit the file to add your content, then update markdown.js"
    echo "to include '$slug' in the blogFiles array."
}

# Function to list blog posts
list_posts() {
    echo "📚 Blog Posts:"
    echo ""
    
    count=0
    for file in "$BLOG_DIR"/*.md; do
        [ -e "$file" ] || continue
        
        filename=$(basename "$file")
        
        # Extract title from front matter
        title=$(grep "^title:" "$file" | head -1 | sed 's/^title: *//')
        date=$(grep "^publishedAt:" "$file" | head -1 | sed 's/^publishedAt: *//')
        
        count=$((count + 1))
        echo "  $count. $title ($date)"
        echo "     File: $filename"
        echo ""
    done
    
    if [ $count -eq 0 ]; then
        echo "  No blog posts found."
        echo ""
        echo "  Run: ./manage-blog.sh create"
        echo ""
    else
        echo "Total: $count posts"
    fi
}

# Function to update the markdown.js file with blog post list
update_list() {
    echo "🔄 Updating blog post list in markdown.js..."
    echo ""
    
    # Get list of blog post slugs
    slugs=""
    for file in "$BLOG_DIR"/*.md; do
        [ -e "$file" ] || continue
        
        slug=$(grep "^slug:" "$file" | head -1 | sed 's/^slug: *//')
        if [ -n "$slug" ]; then
            if [ -n "$slugs" ]; then
                slugs="$slugs, '$slug'"
            else
                slugs="'$slug'"
            fi
        fi
    done
    
    echo "Found slugs: $slugs"
    echo ""
    echo "To update markdown.js, edit the blogFiles array:"
    echo ""
    echo "  const blogFiles = [$slugs];"
    echo ""
    echo "Location: js/markdown.js (around line 168)"
}

# Main menu
case "$1" in
    create|new)
        create_post
        ;;
    list|ls)
        list_posts
        ;;
    update)
        update_list
        ;;
    *)
        echo "Usage: $0 {create|list|update}"
        echo ""
        echo "Commands:"
        echo "  create  - Create a new blog post"
        echo "  list    - List all blog posts"
        echo "  update  - Show command to update blog post list"
        echo ""
        echo "Examples:"
        echo "  ./manage-blog.sh create"
        echo "  ./manage-blog.sh list"
        exit 1
        ;;
esac
