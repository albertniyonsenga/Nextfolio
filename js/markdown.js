// Lightweight Markdown Parser with Front Matter Support
(function() {
    'use strict';
    
    // Parse front matter (YAML-style)
    function parseFrontMatter(content) {
        const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const match = content.match(frontMatterRegex);
        
        if (!match) {
            return { metadata: {}, content: content };
        }
        
        const frontMatter = match[1];
        const markdown = match[2];
        const metadata = {};
        
        frontMatter.split('\n').forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > -1) {
                const key = line.slice(0, colonIndex).trim();
                const value = line.slice(colonIndex + 1).trim();
                metadata[key] = value;
            }
        });
        
        return { metadata, content: markdown };
    }
    
    // Escape HTML
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
    
    // Parse Markdown to HTML
    function parseMarkdown(markdown) {
        let html = markdown;
        
        // Code blocks with syntax highlighting
        html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
            const language = lang || 'plaintext';
            return `<pre><code class="language-${escapeHtml(language)}">${escapeHtml(code.trim())}</code></pre>`;
        });
        
        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Headers
        html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
        
        // Blockquotes
        html = html.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');
        
        // Horizontal rules
        html = html.replace(/^---$/gm, '<hr>');
        
        // Bold and italic
        html = html.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
        html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        html = html.replace(/___([^_]+)___/g, '<strong><em>$1</em></strong>');
        html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
        html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
        
        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
        
        // Images
        html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy">');
        
        // Lists
        html = html.replace(/^\* (.*$)/gm, '<li>$1</li>');
        html = html.replace(/^- (.*$)/gm, '<li>$1</li>');
        html = html.replace(/^\d+\. (.*$)/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        
        // Paragraphs
        const lines = html.split('\n');
        const processed = [];
        let inList = false;
        let inBlockquote = false;
        let inCodeBlock = false;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.startsWith('<pre>')) inCodeBlock = true;
            if (line.includes('</pre>')) inCodeBlock = false;
            
            if (line.startsWith('<ul>') || line.startsWith('<ol>')) inList = true;
            if (line.includes('</ul>') || line.includes('</ol>')) inList = false;
            
            if (line.startsWith('<blockquote>')) inBlockquote = true;
            if (line.includes('</blockquote>')) inBlockquote = false;
            
            if (line && 
                !line.startsWith('<h') && 
                !line.startsWith('<pre>') && 
                !line.startsWith('<hr>') && 
                !line.startsWith('<ul>') && 
                !line.startsWith('<ol>') && 
                !line.startsWith('<li>') && 
                !line.startsWith('<blockquote>') &&
                !line.includes('</ul>') &&
                !line.includes('</ol>') &&
                !line.includes('</blockquote>') &&
                !inList && 
                !inBlockquote &&
                !inCodeBlock) {
                processed.push(`<p>${line}</p>`);
            } else {
                processed.push(line);
            }
        }
        
        return processed.join('\n');
    }
    
    // Syntax highlighting (simple version)
    function highlightCode() {
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            const language = block.className.replace('language-', '');
            // Basic syntax highlighting - you can enhance this or use a library
            if (language === 'javascript' || language === 'js') {
                block.innerHTML = block.innerHTML
                    .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|async|await)\b/g, '<span style="color: var(--sh-keyword);">$1</span>')
                    .replace(/\b(true|false|null|undefined)\b/g, '<span style="color: var(--sh-keyword);">$1</span>')
                    .replace(/(['"`])(.*?)\1/g, '<span style="color: var(--sh-string);">$1$2$1</span>')
                    .replace(/\/\/(.*?)$/gm, '<span style="color: var(--sh-comment);">//$1</span>');
            }
        });
    }
    
    // Load and render markdown file
    async function loadMarkdown(filename) {
        const loadingEl = document.getElementById('blog-content-loading');
        const contentEl = document.getElementById('blog-content');
        const metaEl = document.getElementById('blog-meta');
        
        try {
            const response = await fetch(`/blog/${filename}.md`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const markdownText = await response.text();
            const { metadata, content } = parseFrontMatter(markdownText);
            const html = parseMarkdown(content);
            
            // Hide loading
            if (loadingEl) loadingEl.style.display = 'none';
            
            // Display content
            if (contentEl) {
                contentEl.innerHTML = html;
                contentEl.style.display = 'block';
            }
            
            // Display metadata
            if (metaEl && metadata.title) {
                const date = metadata.publishedAt ? formatDate(metadata.publishedAt) : '';
                const tags = metadata.tags ? metadata.tags.split(',').map(t => t.trim()) : [];
                
                metaEl.innerHTML = `
                    <h1>${metadata.title}</h1>
                    <div style="color: var(--color-text-muted); margin-bottom: var(--space-xl); display: flex; gap: var(--space-lg); flex-wrap: wrap; align-items: center;">
                        ${date ? `<time datetime="${metadata.publishedAt}">${date}</time>` : ''}
                        ${metadata.author ? `<span>• ${metadata.author}</span>` : ''}
                        ${tags.length ? `<div style="display: flex; gap: var(--space-sm);">
                            ${tags.map(tag => `<span style="padding: 0.25rem 0.5rem; background: var(--color-border); border-radius: 0.25rem; font-size: 0.875rem;">${tag}</span>`).join('')}
                        </div>` : ''}
                    </div>
                `;
                
                // Update page title
                document.title = `${metadata.title} - Nextfolio`;
            }
            
            // Apply syntax highlighting
            highlightCode();
            
            // Make external links open in new tab
            contentEl.querySelectorAll('a[href^="http"]').forEach(link => {
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            });
            
        } catch (error) {
            console.error('Error loading markdown:', error);
            if (loadingEl) loadingEl.style.display = 'none';
            if (contentEl) {
                contentEl.innerHTML = `
                    <div style="padding: 2rem; text-align: center; color: var(--color-text-muted);">
                        <p>Unable to load blog post. Please try again later.</p>
                        <a href="/blog.html" style="display: inline-block; margin-top: 1rem;">← Back to Blog</a>
                    </div>
                `;
                contentEl.style.display = 'block';
            }
        }
    }
    
    // Format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    // Get blog post slug from URL
    function getBlogSlug() {
        const params = new URLSearchParams(window.location.search);
        return params.get('post');
    }
    
    // Scan blog directory for markdown files
    async function scanBlogPosts() {
        // List of blog post files (you need to maintain this list)
        // Or use a build script to auto-generate data/blog-posts.json
        const blogFiles = [
            'getting-started',
            'custom-mdx-examples'
        ];
        
        const posts = [];
        
        for (const filename of blogFiles) {
            try {
                const response = await fetch(`/blog/${filename}.md`);
                if (response.ok) {
                    const text = await response.text();
                    const { metadata } = parseFrontMatter(text);
                    posts.push({
                        slug: metadata.slug || filename,
                        title: metadata.title || 'Untitled',
                        publishedAt: metadata.publishedAt || new Date().toISOString().split('T')[0],
                        summary: metadata.summary || '',
                        tags: metadata.tags ? metadata.tags.split(',').map(t => t.trim()) : []
                    });
                }
            } catch (error) {
                console.error(`Error loading ${filename}:`, error);
            }
        }
        
        return posts;
    }
    
    // Initialize
    function init() {
        const slug = getBlogSlug();
        if (slug && document.getElementById('blog-content')) {
            // Single blog post page
            loadMarkdown(slug);
        }
    }
    
    // Export functions
    window.MarkdownParser = {
        loadMarkdown,
        scanBlogPosts,
        parseMarkdown,
        parseFrontMatter
    };
    
    // Auto-initialize if on blog post page
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
