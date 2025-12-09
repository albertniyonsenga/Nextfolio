// Theme Switcher with localStorage persistence
(function() {
    'use strict';
    
    const THEME_KEY = 'portfolio-theme';
    const THEME_DARK = 'dark';
    const THEME_LIGHT = 'light';
    
    // Get system preference
    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches 
            ? THEME_DARK 
            : THEME_LIGHT;
    }
    
    // Get stored theme or fall back to system preference
    function getSavedTheme() {
        try {
            return localStorage.getItem(THEME_KEY) || getSystemTheme();
        } catch (e) {
            console.warn('localStorage not available:', e);
            return getSystemTheme();
        }
    }
    
    // Apply theme to document
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }
    
    // Save theme to localStorage
    function saveTheme(theme) {
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (e) {
            console.warn('Could not save theme:', e);
        }
    }
    
    // Toggle between themes
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
        
        applyTheme(newTheme);
        saveTheme(newTheme);
        
        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('themechange', { 
            detail: { theme: newTheme } 
        }));
    }
    
    // Initialize theme immediately (before DOM loads) to prevent flash
    const initialTheme = getSavedTheme();
    applyTheme(initialTheme);
    
    // Set up toggle button after DOM loads
    function initializeThemeToggle() {
        const toggleButton = document.querySelector('.theme-toggle');
        
        if (toggleButton) {
            toggleButton.addEventListener('click', toggleTheme);
            
            // Add keyboard support
            toggleButton.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleTheme();
                }
            });
        }
        
        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            // Only update if user hasn't manually set a preference
            if (!localStorage.getItem(THEME_KEY)) {
                applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeThemeToggle);
    } else {
        initializeThemeToggle();
    }
})();
