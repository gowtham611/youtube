// YouTube Clone Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    const filterChips = document.querySelectorAll('.filter-chip');
    const videoContainers = document.querySelectorAll('.container');

    // Sidebar toggle functionality
    let sidebarHidden = false;
    
    hamburgerBtn.addEventListener('click', function() {
        sidebarHidden = !sidebarHidden;
        
        if (sidebarHidden) {
            sidebar.classList.add('hidden');
            mainContent.classList.add('expanded');
        } else {
            sidebar.classList.remove('hidden');
            mainContent.classList.remove('expanded');
        }
    });

    // Responsive sidebar - auto-hide on small screens
    function checkScreenSize() {
        if (window.innerWidth <= 1024) {
            sidebar.classList.add('hidden');
            mainContent.classList.add('expanded');
            sidebarHidden = true;
        } else if (!sidebarHidden) {
            sidebar.classList.remove('hidden');
            mainContent.classList.remove('expanded');
        }
    }

    // Check screen size on load and resize
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    // Search functionality
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        videoContainers.forEach(container => {
            const title = container.querySelector('.title').textContent.toLowerCase();
            const author = container.querySelector('.author').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || author.includes(searchTerm) || searchTerm === '') {
                container.style.display = 'flex';
            } else {
                container.style.display = 'none';
            }
        });
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Real-time search
    searchInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            performSearch();
        } else {
            // Show all videos when search is cleared
            videoContainers.forEach(container => {
                container.style.display = 'flex';
            });
        }
    });

    // Filter functionality
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // Remove active class from all chips
            filterChips.forEach(c => c.classList.remove('active'));
            // Add active class to clicked chip
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            videoContainers.forEach(container => {
                const category = container.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    container.style.display = 'flex';
                } else {
                    container.style.display = 'none';
                }
            });

            // Clear search when filter is applied
            searchInput.value = '';
        });
    });

    // Video hover effects
    videoContainers.forEach(container => {
        const thumbnail = container.querySelector('.thumbnail');
        
        container.addEventListener('mouseenter', function() {
            // Add subtle scale effect
            this.style.transform = 'translateY(-4px)';
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Simulate view count animation (optional feature)
    function animateViewCounts() {
        const viewElements = document.querySelectorAll('.views');
        
        viewElements.forEach(element => {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Extract number from view count
                const text = this.textContent;
                const match = text.match(/(\d+)M/);
                
                if (match) {
                    let currentViews = parseInt(match[1]);
                    currentViews += Math.floor(Math.random() * 5) + 1; // Add 1-5 million views
                    this.textContent = text.replace(/\d+M/, currentViews + 'M');
                    
                    // Add a brief animation
                    this.style.color = '#ff6b35';
                    setTimeout(() => {
                        this.style.color = '#aaaaaa';
                    }, 300);
                }
            });
        });
    }

    animateViewCounts();

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Focus search with '/' key
        if (e.key === '/' && !searchInput.matches(':focus')) {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Toggle sidebar with 'Escape' when search is focused
        if (e.key === 'Escape') {
            if (searchInput.matches(':focus')) {
                searchInput.blur();
                searchInput.value = '';
                performSearch(); // Clear search results
            }
        }
    });

    // Add loading animation for thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for fade-in effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in-out';
    });

    // Smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add notification dot animation to bell icon
    const bellIcon = document.querySelector('.fa-bell');
    if (bellIcon) {
        setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance every interval
                bellIcon.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    bellIcon.style.animation = '';
                }, 500);
            }
        }, 10000); // Check every 10 seconds
    }

    console.log('YouTube Clone initialized successfully!');
});

// Add CSS animation for bell shake
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-10deg); }
        75% { transform: rotate(10deg); }
    }
    
    .container {
        transition: transform 0.2s ease;
    }
    
    .thumbnail {
        transition: opacity 0.3s ease-in-out, border-radius 0.2s ease;
    }
`;
document.head.appendChild(style);
