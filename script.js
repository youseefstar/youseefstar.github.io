/**
 * MAIN DOCUMENT READY HANDLER
 * Optimized single DOMContentLoaded listener that manages all page functionality
 * Combines all scripts into one efficient execution flow
 */
document.addEventListener('DOMContentLoaded', function() {
    // =====================================================================
    // HAMBURGER MENU & HEADER SCROLL OPTIMIZATION
    // =====================================================================
    
    // Cache DOM elements for menu functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const header = document.getElementById('main-header');
    let lastScroll = 0; // Track scroll position for header effects

    /**
     * Optimized menu toggle function using requestAnimationFrame
     * Toggles mobile menu state with performance considerations
     */
    function toggleMenu() {
        requestAnimationFrame(() => {
            const isActive = hamburgerMenu.classList.toggle('active');
            mobileNav.classList.toggle('active');
            // Prevent body scroll when menu is open
            document.body.style.overflow = isActive ? 'hidden' : 'auto'; 
        });
    }

    /**
     * Global click handler using event delegation pattern
     * Manages all click interactions in one efficient handler
     * @param {Event} e - The click event object
     */
    const handleClick = (e) => {
        // Handle hamburger menu toggle
        if (e.target.closest('.hamburger-menu')) {
            toggleMenu();
            return;
        }

        // Close menu when clicking outside
        if (mobileNav.classList.contains('active') && !e.target.closest('.mobile-nav')) {
            requestAnimationFrame(() => {
                hamburgerMenu.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        // Handle navigation link active states
        const link = e.target.closest('nav ul li a, .mobile-nav ul li a');
        if (link) {
            const navContainer = link.closest('nav') || link.closest('.mobile-nav');
            const links = navContainer.querySelectorAll('ul li a');
            
            // Update active state
            links.forEach(item => item.classList.remove('active'));
            link.classList.add('active');

            // Auto-close mobile menu after selection
            if (mobileNav.classList.contains('active')) {
                toggleMenu();
            }
        }
    };

    /**
     * Optimized scroll handler with throttling
     * Manages header scroll effects efficiently
     */
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        // Only update if scrolled significantly (throttling)
        if (Math.abs(scrollPosition - lastScroll) > 50) {
            requestAnimationFrame(() => {
                // Toggle scrolled header class based on position
                header.classList.toggle('header-scrolled', scrollPosition > 100);
                lastScroll = scrollPosition;
            });
        }
    };

    // Attach event listeners
    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // =====================================================================
    // TYPING EFFECT OPTIMIZATION
    // =====================================================================
    const typingText = document.querySelector('.typing-effect');
    if (typingText) {
        const words = ["Youseef Star", "Backend Developer", "Frontend Developer", "توسدهنده وب"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150;
        let timeoutId;

        /**
         * Recursive typing animation function
         * Handles both typing and deleting phases
         */
        const type = () => {
            const currentWord = words[wordIndex];
            
            // Update text content based on current phase
            typingText.textContent = isDeleting 
                ? currentWord.substring(0, charIndex - 1)
                : currentWord.substring(0, charIndex + 1);

            // Update position
            charIndex += isDeleting ? -1 : 1;

            // State management
            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at end of word
                typingSpeed = 1000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next word
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 300;
            }

            // Schedule next frame
            timeoutId = setTimeout(type, typingSpeed);
        };

        // Start animation
        type();

        // Cleanup timeout when leaving page
        window.addEventListener('beforeunload', () => {
            clearTimeout(timeoutId);
        });
    }

    // =====================================================================
    // SKILLS FILTER OPTIMIZATION
    // =====================================================================
    const skillCategoryBtns = document.querySelectorAll('.skill-category-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    if (skillCards.length) {
        // Prepare for animations using will-change
        skillCards.forEach(card => {
            card.style.willChange = 'transform, opacity';
        });

        // Initial animation with minimal delay
        setTimeout(() => {
            skillCards.forEach(card => {
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            });
        }, 50);

        // Filter functionality
        skillCategoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                skillCategoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const category = this.dataset.category;

                // Animate cards
                skillCards.forEach(card => {
                    card.style.transform = 'scale(0.8)';
                    card.style.opacity = '0';

                    setTimeout(() => {
                        // Show/hide based on filter
                        card.style.display = (category === 'all' || card.dataset.category === category) 
                            ? 'block' 
                            : 'none';
                        // Restore appearance
                        card.style.transform = 'scale(1)';
                        card.style.opacity = '1';
                    }, 300);
                });
            });
        });
    }

    // =====================================================================
    // PORTFOLIO FILTER OPTIMIZATION
    // =====================================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (portfolioItems.length) {
        /**
         * IntersectionObserver for scroll-triggered animations
         * More efficient than scroll event listeners
         */
        const portfolioObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Staggered animation
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 50);
                }
            });
        }, { threshold: 0.1 });

        // Observe all portfolio items
        portfolioItems.forEach(item => {
            portfolioObserver.observe(item);
        });

        // Portfolio filter functionality
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active filter button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.dataset.filter;

                // Animate portfolio items
                portfolioItems.forEach(item => {
                    item.style.transform = 'scale(0.95)';
                    item.style.opacity = '0.5';
                    item.style.filter = 'blur(2px)';

                    setTimeout(() => {
                        // Apply filter
                        item.style.display = (filter === 'all' || item.dataset.category === filter)
                            ? 'block'
                            : 'none';
                        // Restore appearance
                        item.style.transform = 'scale(1)';
                        item.style.opacity = '1';
                        item.style.filter = 'none';
                    }, 300);
                });
            });
        });
    }

    // =====================================================================
    // FOOTER ANIMATION OPTIMIZATION
    // =====================================================================
    const footerCols = document.querySelectorAll('.footer-col');
    if (footerCols.length) {
        /**
         * Footer animation observer
         * Triggers when footer columns enter viewport
         */
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        // Observe all footer columns
        footerCols.forEach(col => {
            footerObserver.observe(col);
        });
    }
});