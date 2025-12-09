// Projects Dynamic Loading
(function() {
    'use strict';
    
    // Create project card element
    function createProjectCard(project) {
        const card = document.createElement('a');
        card.href = project.url;
        card.className = 'card';
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        
        const cardMeta = document.createElement('div');
        cardMeta.className = 'card-meta';
        
        const title = document.createElement('h2');
        title.textContent = project.title;
        
        const description = document.createElement('p');
        description.textContent = project.description;
        description.style.color = 'var(--color-text-muted)';
        
        cardMeta.appendChild(title);
        cardMeta.appendChild(description);
        
        card.appendChild(cardMeta);
        
        return card;
    }
    
    // Load and display projects
    async function loadProjects() {
        const container = document.getElementById('projects-list');
        
        try {
            const response = await fetch('/data/projects.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const projects = await response.json();
            
            // Clear loading indicator
            container.innerHTML = '';
            
            // Create and append project cards
            if (projects.length === 0) {
                container.innerHTML = '<p>No projects available yet.</p>';
            } else {
                projects.forEach(project => {
                    container.appendChild(createProjectCard(project));
                });
            }
            
        } catch (error) {
            console.error('Error loading projects:', error);
            container.innerHTML = `
                <div style="padding: 2rem; text-align: center; color: var(--color-text-muted);">
                    <p>Unable to load projects. Please try again later.</p>
                </div>
            `;
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadProjects);
    } else {
        loadProjects();
    }
})();
