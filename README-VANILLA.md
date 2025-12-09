# Vanilla Portfolio

A **blazing-fast, lightweight portfolio** built with pure HTML, CSS, and JavaScript. No frameworks, no dependencies—just modern web standards delivering optimal performance.

> Inspired by the philosophy that [Vanilla CSS is all you need](https://www.zolkos.com/2025/12/03/vanilla-css-is-all-you-need)

## ✨ Features

- 🚀 **Lightning Fast** - No framework overhead, instant page loads
- 📱 **Fully Responsive** - Works beautifully on all devices
- 🎨 **Dark/Light Theme** - Automatic theme switching with localStorage persistence
- 🖼️ **Glassmorphism Gallery** - Modern photo gallery with backdrop-filter effects
- 📝 **Dynamic Content** - Blog posts and projects loaded from JSON
- ♿ **Accessible** - Semantic HTML with ARIA labels
- 🔍 **SEO Optimized** - Meta tags, sitemap, robots.txt, RSS feed
- ⚡ **Performance First** - Lazy loading, optimized images, minimal CSS
- 🎯 **Modern CSS** - Custom properties, Grid, Flexbox, container queries
- 📦 **Zero Dependencies** - No npm packages, no build tools required (optional build script provided)

## 🎯 Performance Scores

This portfolio is optimized for:
- Fast First Contentful Paint (FCP)
- Quick Time to Interactive (TTI)
- Minimal Cumulative Layout Shift (CLS)
- Excellent Lighthouse scores across all metrics

## 📁 Project Structure

```
.
├── index.html              # Homepage
├── blog.html               # Blog listing page
├── projects.html           # Projects page
├── photos.html             # Photo gallery with glassmorphism
├── css/
│   └── styles.css          # All styles in one performant file
├── js/
│   ├── theme.js            # Dark/light theme switcher
│   ├── nav.js              # Mobile navigation
│   ├── blog.js             # Dynamic blog loading
│   ├── projects.js         # Dynamic projects loading
│   └── photos.js           # Photo gallery with lazy loading
├── data/
│   ├── blog-posts.json     # Blog post metadata
│   ├── projects.json       # Project data
│   └── photos.json         # Photo data with descriptions
├── photos/                 # Photo assets
├── public/                 # Static assets (favicon, etc.)
├── .htaccess              # Apache server configuration
├── nginx.conf             # Nginx server configuration
├── robots.txt             # SEO crawling rules
├── sitemap.xml            # SEO sitemap
├── rss.xml                # RSS feed
└── OPTIMIZATION.md        # Performance optimization guide
```

## 🚀 Quick Start

### Option 1: Direct Deployment (No Build Required)

Simply upload all files to your web server. That's it!

```bash
# Using FTP, rsync, or your hosting provider's method
rsync -avz --exclude 'node_modules' ./ user@server:/var/www/html/
```

### Option 2: Local Development

No build tools needed! Just open the files:

```bash
# Simple HTTP server (Python)
python3 -m http.server 8000

# Or using PHP
php -S localhost:8000

# Or using Node.js (if installed)
npx http-server -p 8000
```

Then open http://localhost:8000 in your browser.

### Option 3: With Build Optimization (Optional)

For production, you can minify assets for even better performance:

```bash
# Install build tools (one-time setup)
npm install -g cssnano-cli terser imagemin-cli

# Run the build script
chmod +x build.sh
./build.sh

# Deploy the dist/ folder
```

## ⚙️ Configuration

### 1. Update Site Metadata

Edit the HTML files to update:
- Site title, description, and meta tags
- Social media links in footer
- Open Graph images
- Canonical URLs

### 2. Add Your Content

#### **Blog Posts (Markdown)**

Write blog posts in Markdown format in the `/blog` folder:

```bash
# Quick start - create a new blog post
./manage-blog.sh create

# Or manually create: blog/my-post.md
```

Each post needs front matter:
```markdown
---
title: My Post Title
slug: my-post
publishedAt: 2024-12-09
summary: Brief description
tags: Tag1, Tag2
author: Your Name
---

# Your content here...
```

Then update `js/markdown.js` to include the slug in the `blogFiles` array.

**See [BLOG-PHOTO-GUIDE.md](BLOG-PHOTO-GUIDE.md) for detailed instructions.**

#### **Projects**

Edit `data/projects.json`:
```json
{
  "title": "Project Name",
  "year": 2024,
  "description": "Project description",
  "url": "https://example.com"
}
```

#### **Photos (Auto-Generated)**

Add photos to the `/photos` folder and run:

```bash
./generate-photos.sh
```

This automatically generates `data/photos.json`. Then edit it to add descriptions:
```json
{
  "src": "/photos/photo1.jpg",
  "alt": "Photo description",
  "title": "Photo Title",
  "description": "Detailed caption shown on hover with glassmorphism"
}
```

### 3. Customize Theme Colors

Edit CSS custom properties in `css/styles.css`:

```css
:root {
  --color-bg: #ffffff;
  --color-text: #000000;
  --color-accent: #47a3f3;
  /* ... more variables */
}
```

## 🎨 Photo Gallery with Glassmorphism

The photo gallery features a modern glassmorphism effect:
- **Hover to reveal** - Descriptions appear with frosted glass overlay
- **Responsive grid** - Auto-fits to screen size
- **Lazy loading** - Images load as you scroll
- **No modal needed** - All information visible on hover

Perfect for showcasing photography with context!

## 🌐 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

Modern CSS features used:
- CSS Custom Properties
- CSS Grid & Flexbox
- CSS `backdrop-filter` (for glassmorphism)
- Native lazy loading

## 📊 SEO & Analytics

Built-in SEO features:
- ✅ Semantic HTML5 markup
- ✅ Meta tags (Open Graph, Twitter Cards)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ RSS feed
- ✅ Structured data ready
- ✅ Mobile-friendly
- ✅ Fast loading times

To add analytics, insert your tracking code in the HTML files.

## 🛠️ Management Scripts

### Blog Management
```bash
./manage-blog.sh create    # Create new blog post
./manage-blog.sh list      # List all posts
./manage-blog.sh update    # Show update command
```

### Photo Management
```bash
./generate-photos.sh       # Auto-generate photos.json
```

### Build & Deploy
```bash
./start.sh                 # Start dev server
./build.sh                 # Build for production
```

## 🔧 Server Configuration

### Apache

Use the included `.htaccess` file for:
- Gzip compression
- Browser caching
- Security headers
- Clean URLs (remove .html extension)

### Nginx

Use the included `nginx.conf` template for:
- Gzip/Brotli compression
- Browser caching
- Security headers
- Clean URLs

## ⚡ Performance Tips

1. **Optimize Images** - Use WebP format when possible, compress JPEGs
2. **Enable Caching** - Configure server-side caching (see .htaccess/nginx.conf)
3. **Use CDN** - Serve static assets from a CDN
4. **Minify Assets** - Use the build script for production
5. **Lazy Load** - Already implemented for images
6. **Critical CSS** - Inline above-the-fold CSS (see OPTIMIZATION.md)

## 🎯 Why Vanilla?

- **No framework lock-in** - Pure web standards that will work forever
- **Instant startup** - No JavaScript framework parsing or hydration
- **Smaller bundle** - Typically 10-50x smaller than framework equivalents
- **Better performance** - Direct DOM manipulation when needed
- **Easier debugging** - Readable source code in browser DevTools
- **Future-proof** - Built on stable web standards

## 📚 Learning Resources

- [MDN Web Docs](https://developer.mozilla.org/) - Comprehensive web documentation
- [CSS-Tricks](https://css-tricks.com/) - Modern CSS techniques
- [Web.dev](https://web.dev/) - Performance best practices
- [Vanilla CSS Article](https://www.zolkos.com/2025/12/03/vanilla-css-is-all-you-need) - Philosophy behind this approach

## 🤝 Contributing

This is a template project. Feel free to:
- Fork and customize for your own use
- Submit improvements via pull requests
- Share feedback and suggestions

## 📄 License

MIT License - feel free to use this template for any purpose.

## 🙏 Credits

- Original Next.js template: [Nextfolio](https://github.com/1msirius/Nextfolio)
- Converted to vanilla HTML/CSS/JS with performance optimizations
- Photos from Unsplash (replace with your own)

## 🚀 Deployment

### Static Hosts (Recommended)

- **Netlify**: Drag & drop the folder
- **Vercel**: Connect Git repo or drag & drop
- **Cloudflare Pages**: Connect Git repo
- **GitHub Pages**: Push to `gh-pages` branch
- **Surge.sh**: `surge .` in terminal

### Traditional Hosting

Upload via FTP to any web host:
- Shared hosting (cPanel, Plesk)
- VPS with Apache/Nginx
- Cloud storage with static hosting

---

**Built with ❤️ using pure HTML, CSS, and JavaScript**

*No frameworks harmed in the making of this portfolio.*
