// Blog Posts Dynamic Loading
(function() {
    'use strict';
    
    // Format date for display
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    // Create blog post card element
    function createPostCard(post) {
        const card = document.createElement('a');
        card.href = `/blog-post.html?post=${post.slug}`;
        card.className = 'card';
        
        const cardMeta = document.createElement('div');
        cardMeta.className = 'card-meta';
        
        const title = document.createElement('h2');
        title.textContent = post.title;
        
        const date = document.createElement('p');
        date.textContent = formatDate(post.publishedAt);
        date.style.color = 'var(--color-text-muted)';
        date.style.fontSize = 'var(--font-size-sm)';
        
        cardMeta.appendChild(title);
        cardMeta.appendChild(date);
        
        if (post.summary) {
            const summary = document.createElement('p');
            summary.textContent = post.summary;
            summary.style.color = 'var(--color-text-muted)';
            card.appendChild(cardMeta);
            card.appendChild(summary);
        } else {
            card.appendChild(cardMeta);
        }
        
        // Add tags if available
        if (post.tags && post.tags.length > 0) {
            const tagsDiv = document.createElement('div');
            tagsDiv.style.display = 'flex';
            tagsDiv.style.gap = 'var(--space-sm)';
            tagsDiv.style.flexWrap = 'wrap';
            tagsDiv.style.marginTop = 'var(--space-sm)';
            
            post.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.textContent = tag;
                tagSpan.style.padding = '0.25rem 0.5rem';
                tagSpan.style.background = 'var(--color-border)';
                tagSpan.style.borderRadius = '0.25rem';
                tagSpan.style.fontSize = '0.75rem';
                tagsDiv.appendChild(tagSpan);
            });
            
            card.appendChild(tagsDiv);
        }
        
        return card;
    }
    
    // Load blog posts from markdown files
    async function loadBlogPostsFromMarkdown() {
        if (!window.MarkdownParser) {
            console.error('Markdown parser not loaded');
            return [];
        }
        
        try {
            return await window.MarkdownParser.scanBlogPosts();
        } catch (error) {
            console.error('Error scanning blog posts:', error);
            return [];
        }
    }
    
    // Load and display blog posts
    async function loadBlogPosts() {
        const container = document.getElementById('blog-posts');
        
        try {
            // Try loading from markdown files first
            let posts = await loadBlogPostsFromMarkdown();
            
            // Fallback to JSON if markdown fails
            if (posts.length === 0) {
                try {
                    const response = await fetch('/data/blog-posts.json');
                    if (response.ok) {
                        posts = await response.json();
                    }
                } catch (jsonError) {
                    console.warn('JSON fallback also failed:', jsonError);
                }
            }
            
            // Sort posts by date (newest first)
            posts.sort((a, b) => {
                return new Date(b.publishedAt) - new Date(a.publishedAt);
            });
            
            // Clear loading indicator
            container.innerHTML = '';
            
            // Create and append post cards
            if (posts.length === 0) {
                container.innerHTML = '<p>No blog posts available yet. Add markdown files to the <code>/blog</code> folder!</p>';
            } else {
                posts.forEach(post => {
                    container.appendChild(createPostCard(post));
                });
            }
            
        } catch (error) {
            console.error('Error loading blog posts:', error);
            container.innerHTML = `
                <div style="padding: 2rem; text-align: center; color: var(--color-text-muted);">
                    <p>Unable to load blog posts. Please try again later.</p>
                </div>
            `;
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadBlogPosts);
    } else {
        loadBlogPosts();
    }
})();
