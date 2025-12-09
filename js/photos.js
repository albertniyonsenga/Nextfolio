// Photos Gallery with Glassmorphism
(function() {
    'use strict';
    
    // Create photo item with glassmorphism overlay
    function createPhotoItem(photo, index) {
        const item = document.createElement('div');
        item.className = 'photo-item';
        
        // Create image with lazy loading
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt;
        img.loading = index < 6 ? 'eager' : 'lazy'; // Eager load first 6 images
        
        // Create glassmorphism overlay
        const overlay = document.createElement('div');
        overlay.className = 'glass-overlay';
        
        const title = document.createElement('h3');
        title.textContent = photo.title;
        
        const description = document.createElement('p');
        description.textContent = photo.description;
        
        overlay.appendChild(title);
        overlay.appendChild(description);
        
        item.appendChild(img);
        item.appendChild(overlay);
        
        // Add error handling for images
        img.addEventListener('error', function() {
            console.error(`Failed to load image: ${photo.src}`);
            item.style.display = 'none';
        });
        
        // Add intersection observer for animations
        observePhotoItem(item);
        
        return item;
    }
    
    // Observe photo items for scroll animations
    function observePhotoItem(element) {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });
            
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            observer.observe(element);
        }
    }
    
    // Load and display photos
    async function loadPhotos() {
        const gallery = document.getElementById('photo-gallery');
        
        try {
            const response = await fetch('/data/photos.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const photos = await response.json();
            
            // Clear loading indicator
            gallery.innerHTML = '';
            
            // Create and append photo items
            if (photos.length === 0) {
                gallery.innerHTML = '<p style="grid-column: 1 / -1;">No photos available yet.</p>';
            } else {
                photos.forEach((photo, index) => {
                    gallery.appendChild(createPhotoItem(photo, index));
                });
            }
            
        } catch (error) {
            console.error('Error loading photos:', error);
            gallery.innerHTML = `
                <div style="padding: 2rem; text-align: center; color: var(--color-text-muted); grid-column: 1 / -1;">
                    <p>Unable to load photos. Please try again later.</p>
                </div>
            `;
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadPhotos);
    } else {
        loadPhotos();
    }
})();
