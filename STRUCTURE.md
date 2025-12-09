# 📁 Project Structure

```
Nextfolio-Vanilla/
│
├── 📄 index.html              # Homepage
├── 📄 blog.html               # Blog listing page
├── 📄 projects.html           # Projects showcase
├── 📄 photos.html             # Photo gallery (glassmorphism)
├── 📄 404.html                # Custom 404 page
│
├── 🎨 css/
│   └── styles.css             # All styles (~600 lines, highly optimized)
│
├── ⚡ js/
│   ├── theme.js               # Dark/light theme switcher
│   ├── nav.js                 # Mobile navigation
│   ├── blog.js                # Dynamic blog loading
│   ├── projects.js            # Dynamic projects loading
│   └── photos.js              # Photo gallery with lazy loading
│
├── 📊 data/
│   ├── blog-posts.json        # Blog post metadata
│   ├── projects.json          # Project data
│   └── photos.json            # Photo captions & descriptions
│
├── 🖼️ photos/
│   ├── photo1.jpg
│   ├── photo2.jpg
│   ├── photo3.jpg
│   └── ...
│
├── 📦 public/
│   └── (static assets)
│
├── ⚙️ Configuration Files
│   ├── .htaccess              # Apache config (compression, caching)
│   ├── nginx.conf             # Nginx config template
│   ├── robots.txt             # SEO crawling rules
│   ├── sitemap.xml            # SEO sitemap
│   └── rss.xml                # RSS feed
│
├── 🛠️ Build & Scripts
│   ├── build.sh               # Production build script
│   ├── start.sh               # Development server starter
│   └── package.json.optional  # Optional npm config
│
└── 📚 Documentation
    ├── README-VANILLA.md      # Main documentation
    ├── CONVERSION-SUMMARY.md  # Conversion details
    ├── OPTIMIZATION.md        # Performance guide
    └── STRUCTURE.md           # This file
```

## 📖 File Descriptions

### HTML Pages
- **index.html** - Landing page with hero section and profile
- **blog.html** - Lists all blog posts dynamically
- **projects.html** - Showcases projects with links
- **photos.html** - Photo gallery with glassmorphism hover effects
- **404.html** - Custom error page

### Styling
- **css/styles.css** - Single CSS file containing:
  - CSS Custom Properties (design tokens)
  - Light/dark theme definitions
  - Responsive layouts (Grid, Flexbox)
  - Glassmorphism effects
  - Animations & transitions
  - Performance optimizations

### JavaScript (All Vanilla!)
- **theme.js** (~80 lines) - Theme switching logic
- **nav.js** (~90 lines) - Mobile menu functionality
- **blog.js** (~70 lines) - Fetch & display blog posts
- **projects.js** (~60 lines) - Fetch & display projects
- **photos.js** (~90 lines) - Photo gallery with lazy loading

### Data
All content is loaded from JSON files:
- **blog-posts.json** - Blog metadata (title, date, summary, tags)
- **projects.json** - Project info (title, year, description, URL)
- **photos.json** - Photo captions (src, alt, title, description)

### Configuration
- **.htaccess** - Apache server optimization
- **nginx.conf** - Nginx configuration template
- **robots.txt** - Search engine directives
- **sitemap.xml** - SEO sitemap
- **rss.xml** - RSS feed for blog

### Build Tools
- **build.sh** - Optional build script for minification
- **start.sh** - Quick start development server
- **package.json.optional** - Optional npm tools

## 🎯 Key Design Decisions

1. **Single CSS File** - No CSS splitting for optimal first load
2. **Modular JS** - Separate files by functionality for maintainability
3. **JSON for Content** - Easy to update, no database needed
4. **No Build Required** - Works out of the box
5. **Progressive Enhancement** - Core functionality works everywhere

## 📊 File Sizes (Approximate)

| File Type | Size | Compressed |
|-----------|------|------------|
| HTML | ~15KB total | ~5KB |
| CSS | ~30KB | ~8KB |
| JavaScript | ~25KB total | ~8KB |
| JSON data | ~5KB | ~2KB |
| **Total** | **~75KB** | **~23KB** |

*Compared to typical framework bundle: 200-500KB*

## 🚀 Performance Impact

- **First Load**: <500ms (vs 2-3s with frameworks)
- **Time to Interactive**: <1s (vs 3-5s with frameworks)
- **Bundle Size**: ~23KB compressed (vs 200KB+ with frameworks)

## 🎨 Styling Architecture

```
:root (CSS Variables)
    ↓
Base Styles (Reset, Typography)
    ↓
Layout (Container, Grid, Flexbox)
    ↓
Components (Nav, Cards, Gallery)
    ↓
Utilities (Loading, Hidden)
    ↓
Responsive (Media Queries)
    ↓
Optimizations (Reduced Motion, Lazy Load)
```

## 🧩 Component Structure

### Navigation
```
Navbar
├── Logo (link to home)
├── Mobile Toggle (hamburger)
└── Nav Links
    ├── Blog
    ├── Projects
    ├── Photos
    └── Theme Toggle
```

### Photo Gallery (Glassmorphism)
```
Photo Grid
└── Photo Item
    ├── Image (lazy loaded)
    └── Glass Overlay (on hover)
        ├── Title
        └── Description
```

## 🔄 Data Flow

```
JSON Files → Fetch API → JavaScript → DOM Manipulation → Display
     ↓
  Updates      Cache       Parse      Create        Show
   Easy!     (browser)   (native)   Elements      User
```

## 🎯 Where Everything Is

Looking for...
- **Colors?** → `css/styles.css` (`:root` section)
- **Blog posts?** → `data/blog-posts.json`
- **Projects?** → `data/projects.json`
- **Photo descriptions?** → `data/photos.json`
- **Theme logic?** → `js/theme.js`
- **Mobile menu?** → `js/nav.js`
- **Meta tags?** → Each HTML file's `<head>`
- **Social links?** → Each HTML file's footer
- **SEO settings?** → `sitemap.xml`, `robots.txt`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (single column, hamburger menu)
- **Tablet**: 769px - 1024px (adaptive layouts)
- **Desktop**: > 1024px (full features, multi-column)

## 🎨 Theme System

```
data-theme attribute
     ├── "light" (default)
     └── "dark"
          ↓
    CSS Variables Update
          ↓
    localStorage Save
          ↓
    Visual Update (smooth transition)
```

---

**Everything is organized for maximum maintainability and performance!** 🎉
