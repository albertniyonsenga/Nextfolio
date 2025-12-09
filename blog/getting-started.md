---
title: Getting Started with Your Vanilla Portfolio
slug: getting-started
publishedAt: 2024-08-13
summary: Instructions to build and configure your portfolio with pure HTML, CSS, and JavaScript for maximum performance.
tags: Configuration, Web development, Performance
author: Your Name
---

# Getting Started with Your Vanilla Portfolio

Welcome to your new lightning-fast portfolio! This guide will help you get started with customizing and deploying your site.

## Why Vanilla?

By using pure HTML, CSS, and JavaScript, we achieve:

- **10x faster** load times compared to framework-based sites
- **Zero dependencies** - no npm packages or build tools required
- **Future-proof** - built on web standards that won't change
- **Easy maintenance** - simple, readable code anyone can understand

## Quick Start

Getting your portfolio running is incredibly simple:

```bash
# Start development server
python3 -m http.server 8000

# Or use the provided script
./start.sh
```

Visit `http://localhost:8000` and you're done!

## Customization

### Update Your Information

Edit the HTML files to update:
- Personal information
- Social media links
- Profile image
- Meta tags for SEO

### Add Content

All content is stored in JSON files for easy updates:

**Blog Posts**: Edit `data/blog-posts.json`
**Projects**: Edit `data/projects.json`
**Photos**: Edit `data/photos.json`

### Customize Theme

Modify the CSS variables in `css/styles.css`:

```css
:root {
  --color-accent: #47a3f3; /* Your brand color */
  --color-text: #000000;
  --color-bg: #ffffff;
}
```

## Performance Tips

This portfolio is already optimized, but here are some tips:

1. **Compress images** - Use WebP format when possible
2. **Enable caching** - Use the provided `.htaccess` or `nginx.conf`
3. **Use a CDN** - Serve static assets from edge locations
4. **Lazy load** - Already implemented for images

## Deployment

Deploy to any static hosting:

- **Netlify/Vercel** - Drag and drop
- **GitHub Pages** - Push to repository
- **Any web host** - Upload via FTP

No build step required!

## Next Steps

- Replace sample photos with your own
- Add your blog posts
- Update project information
- Customize colors and styling
- Deploy to your domain

Enjoy your blazing-fast portfolio! 🚀
