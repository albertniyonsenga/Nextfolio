# 📝 Blog & Photo Management Guide

This guide explains how to manage your blog posts and photos efficiently.

## 📚 Blog System

### Writing Blog Posts in Markdown

Your blog posts live in the `/blog` folder as Markdown files with front matter.

### Front Matter Format

Every blog post starts with front matter (metadata):

```markdown
---
title: Your Post Title
slug: url-friendly-slug
publishedAt: 2024-12-09
summary: Brief description of the post
tags: Tag1, Tag2, Tag3
author: Your Name
---

# Your Post Title

Your content goes here...
```

### Supported Markdown Features

#### Text Formatting
- **Bold**: `**text**` or `__text__`
- *Italic*: `*text*` or `_text_`
- ***Bold & Italic***: `***text***`
- Inline code: `` `code` ``

#### Headings
```markdown
# Heading 1
## Heading 2
### Heading 3
```

#### Links & Images
```markdown
[Link text](https://example.com)
![Alt text](/photos/image.jpg)
```

#### Lists
```markdown
- Bullet item
- Another item

1. Numbered item
2. Another item
```

#### Code Blocks
````markdown
```javascript
const example = "Hello World";
console.log(example);
```
````

#### Blockquotes
```markdown
> This is a quote
```

#### Horizontal Rules
```markdown
---
```

### Creating a New Blog Post

#### Option 1: Use the Script (Easiest)

```bash
chmod +x manage-blog.sh
./manage-blog.sh create
```

Follow the prompts to create a new post.

#### Option 2: Manual Creation

1. Create a new file in `/blog` folder: `my-post.md`
2. Add front matter at the top
3. Write your content in Markdown
4. Update `js/markdown.js` to include your post slug

### Updating the Blog Post List

After adding a new post, update the `blogFiles` array in `js/markdown.js`:

```javascript
// Around line 168
const blogFiles = [
    'getting-started',
    'custom-mdx-examples',
    'your-new-post-slug'  // Add your new post here
];
```

### Managing Blog Posts

```bash
# List all blog posts
./manage-blog.sh list

# Create new post
./manage-blog.sh create

# Show update command
./manage-blog.sh update
```

### Blog Post Best Practices

1. **Keep slugs URL-friendly**: Use lowercase, hyphens, no spaces
2. **Write descriptive summaries**: They appear on the blog listing page
3. **Use tags wisely**: 3-5 relevant tags per post
4. **Optimize images**: Compress before adding to `/photos`
5. **Add alt text**: For accessibility and SEO
6. **Proofread**: Check spelling and formatting

### Example Blog Post

```markdown
---
title: Building Fast Websites with Vanilla JS
slug: fast-vanilla-js
publishedAt: 2024-12-09
summary: Learn how to build lightning-fast websites using pure JavaScript without frameworks.
tags: JavaScript, Performance, Web Development
author: John Doe
---

# Building Fast Websites with Vanilla JS

Modern web development doesn't always need heavy frameworks. Let's explore how vanilla JavaScript can deliver amazing performance.

## Why Vanilla JavaScript?

The web platform has evolved significantly:

- **Native modules** - ES6 imports/exports
- **Modern APIs** - Fetch, IntersectionObserver, etc.
- **CSS features** - Grid, Flexbox, Custom Properties
- **Great browser support** - Standards are stable

## Performance Benefits

Using vanilla JavaScript means:

1. **Smaller bundle size** - No framework overhead
2. **Faster startup** - No parsing/hydration needed
3. **Direct DOM access** - No virtual DOM layer

```javascript
// Simple, fast, direct
const button = document.querySelector('.btn');
button.addEventListener('click', () => {
    console.log('Clicked!');
});
```

## Real-World Example

Here's a dynamic list that loads data:

```javascript
async function loadData() {
    const response = await fetch('/api/data.json');
    const data = await response.json();
    
    const list = document.getElementById('list');
    data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        list.appendChild(li);
    });
}

loadData();
```

## Conclusion

Vanilla JavaScript is powerful, fast, and sufficient for most projects. Give it a try!
```

---

## 🖼️ Photo Management

### Photo Folder Structure

```
photos/
├── photo1.jpg
├── photo2.jpg
├── vacation-beach.jpg
└── ...
```

### Auto-Generate Photos JSON

```bash
chmod +x generate-photos.sh
./generate-photos.sh
```

This script will:
1. ✅ Scan the `/photos` folder
2. ✅ Generate `data/photos.json` automatically
3. ✅ Optimize images (if imagemin is installed)

### Manual Photo Management

Edit `data/photos.json`:

```json
[
    {
        "src": "/photos/photo1.jpg",
        "alt": "Beach sunset",
        "title": "Sunset at the Beach",
        "description": "A beautiful orange and pink sunset over the calm ocean waters, with silhouettes of palm trees in the foreground."
    }
]
```

### Photo Fields

- **src**: Path to the image file
- **alt**: Alt text for accessibility (brief)
- **title**: Title shown on hover (glassmorphism overlay)
- **description**: Detailed description shown on hover

### Photo Best Practices

#### File Format
- **WebP**: Best compression (recommended)
- **JPEG**: Good for photos, use 80-85% quality
- **PNG**: Only for images requiring transparency

#### Dimensions
- **Recommended**: 1200x900px (4:3 ratio)
- **Max width**: 2000px
- **File size**: Keep under 500KB per image

#### Optimization

**Using imagemin (recommended):**
```bash
npm install -g imagemin-cli imagemin-webp

# Convert to WebP
imagemin photos/*.jpg --plugin=webp > photos-webp/

# Or optimize JPEGs
imagemin photos/*.jpg --plugin=mozjpeg > photos-optimized/
```

**Using online tools:**
- [TinyPNG](https://tinypng.com/) - JPEG/PNG compression
- [Squoosh](https://squoosh.app/) - Online image optimizer
- [WebP Converter](https://convertio.co/jpg-webp/) - Format conversion

#### Naming Convention

Use descriptive, URL-friendly names:
- ✅ `sunset-beach-2024.jpg`
- ✅ `mountain-hike-spring.jpg`
- ❌ `IMG_1234.jpg`
- ❌ `DSC0045.jpg`

### Adding Photos Workflow

1. **Take/Select photos** - Choose your best shots
2. **Edit if needed** - Crop, adjust brightness
3. **Optimize** - Compress to reduce file size
4. **Rename** - Use descriptive names
5. **Add to `/photos`** - Copy to the photos folder
6. **Run script** - `./generate-photos.sh`
7. **Edit descriptions** - Update `data/photos.json`
8. **Test** - Check on the photos page

### Photo Gallery Features

Your photo gallery includes:
- ✨ **Glassmorphism effect** on hover
- 📱 **Responsive grid** layout
- ⚡ **Lazy loading** for performance
- 🎨 **Smooth animations**
- ♿ **Accessible** with proper alt text

### Glassmorphism Descriptions

Descriptions appear with a beautiful frosted glass overlay:

```json
{
    "description": "The ancient Roman Colosseum stands majestically in the heart of Rome. This iconic amphitheater, built nearly 2000 years ago, represents the grandeur of Imperial Rome and remains one of the most recognizable structures from antiquity."
}
```

**Tips for descriptions:**
- Write 1-3 sentences
- Include context and story
- Mention location, time, or significance
- Keep it engaging and informative

---

## 🚀 Performance Tips

### Blog Posts
- ✅ Keep posts focused and concise
- ✅ Use code blocks sparingly
- ✅ Compress images before adding
- ✅ Use lazy loading for images
- ✅ Avoid embedding large media

### Photos
- ✅ Use WebP format (50% smaller than JPEG)
- ✅ Optimize images before upload
- ✅ Use appropriate dimensions
- ✅ Enable lazy loading (built-in)
- ✅ Serve from CDN if possible

### General
- ✅ Minify CSS/JS for production (`./build.sh`)
- ✅ Enable gzip/brotli compression
- ✅ Use browser caching (`.htaccess`)
- ✅ Monitor with Lighthouse

---

## 🔧 Automation Scripts

### generate-photos.sh
Automatically creates `photos.json` from files in `/photos`

```bash
./generate-photos.sh
```

### manage-blog.sh
Helps create and manage blog posts

```bash
./manage-blog.sh create   # New post
./manage-blog.sh list     # List posts
./manage-blog.sh update   # Update list
```

### build.sh
Build optimized production files

```bash
./build.sh
```

---

## 📖 Quick Reference

### Add New Blog Post
```bash
1. ./manage-blog.sh create
2. Edit blog/your-slug.md
3. Update js/markdown.js (add slug to blogFiles array)
4. Refresh blog page
```

### Add New Photos
```bash
1. Add photos to photos/ folder
2. ./generate-photos.sh
3. Edit data/photos.json (add descriptions)
4. Refresh photos page
```

### Deploy Changes
```bash
1. ./build.sh
2. Upload dist/ folder to server
```

---

## 🆘 Troubleshooting

### Blog post not showing up?
- Check front matter format
- Verify slug in `js/markdown.js`
- Check browser console for errors
- Ensure `.md` file extension

### Photos not loading?
- Verify file paths in `photos.json`
- Check file names (case-sensitive)
- Ensure files exist in `/photos`
- Check browser console

### Performance issues?
- Run `./build.sh` for minification
- Compress images
- Enable gzip on server
- Check image file sizes

---

**Happy blogging and photo sharing! 📝📸**
