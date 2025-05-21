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
        const words = ["Youseef Star", "Backend Developer", "Frontend Developer", "توسعه دهنده وب"];
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

document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('luxuryBtn');
    const particlesContainer = document.getElementById('particles');
    
    // ایجاد ذرات نورانی با بهینه‌سازی
    function createParticles() {
        // تعداد ذرات را کاهش داده‌ام برای عملکرد بهتر
        const particleCount = window.innerWidth < 480 ? 8 : 12;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // موقعیت و اندازه تصادفی
            const size = Math.random() * 3 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.bottom = '0';
            
            // تنظیمات انیمیشن
            const delay = Math.random() * 5;
            const duration = Math.random() * 3 + 3;
            
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            // رنگ‌های متنوع برای ذرات
            const hue = 170 + Math.random() * 30; // محدوده فیروزه‌ای
            particle.style.background = `hsl(${hue}, 100%, 70%)`;
            particle.style.boxShadow = `0 0 ${Math.random() * 3 + 2}px hsl(${hue}, 100%, 70%)`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // افکت کلیک بهبود یافته
    btn.addEventListener('click', function(e) {
        // فقط اگر روی خود دکمه کلیک شده باشد (نه روی لینک)
        if (e.target === this) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // رنگ ریپل متناسب با تم
            ripple.style.background = `radial-gradient(circle, rgba(0,245,212,0.6) 0%, rgba(123,44,191,0.3) 100%)`;
            
            this.appendChild(ripple);
            
            // حذف ریپل بعد از انیمیشن
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
    
    // ایجاد ذرات با تاخیر برای بهبود عملکرد بارگذاری
    setTimeout(createParticles, 300);
    
    // بهینه‌سازی برای دستگاه‌های لمسی
    btn.addEventListener('touchstart', function() {
        this.classList.add('active');
    });
    
    btn.addEventListener('touchend', function() {
        this.classList.remove('active');
    });
    
    // تغییر تدریجی زاویه گرادیانت برای افکت پویا
    let angle = 135;
    setInterval(() => {
        angle = (angle + 0.5) % 360;
        document.documentElement.style.setProperty('--gradient-angle-pdf', `${angle}deg`);
    }, 100);

    // بخش‌های مختلف صفحه
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a, .mobile-nav a');
    const mobileNav = document.getElementById('mobile-nav');
    const hamburger = document.querySelector('.hamburger-menu');
    
    // فعال کردن اسکرول نرم برای تمام لینک‌ها
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // بستن منوی موبایل در صورت باز بودن
          if (mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
          }
          
          // اسکرول به بخش مورد نظر
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // به‌روزرسانی URL بدون رفرش صفحه
          if (history.pushState) {
            history.pushState(null, null, targetId);
          } else {
            window.location.hash = targetId;
          }
        }
      });
    });
    
    // فعال‌سازی لینک‌ها هنگام اسکرول
    window.addEventListener('scroll', function() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 150)) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });

    // مقداردهی اولیه برای لینک فعال
    const initialSection = window.location.hash || '#home';
    document.querySelector(`nav a[href="${initialSection}"]`)?.classList.add('active');
    document.querySelector(`.mobile-nav a[href="${initialSection}"]`)?.classList.add('active');
});

(function() {
    'use strict';
    
    const elements = {
        circle: document.getElementById('progressCircle'),
        text: document.getElementById('progressText'),
        percent: document.getElementById('progressPercent'),
        container: document.querySelector('.reading-progress')
    };
    
    let lastPercent = -1;
    let isUpdating = false;
    let supportsConicGradient = false;
    
    // بررسی پشتیبانی از قابلیت‌ها
    function checkFeatures() {
        supportsConicGradient = CSS.supports('background', 'conic-gradient(from 0deg, red, blue)');
        if (!supportsConicGradient) {
            elements.circle.style.display = 'none';
            elements.percent.style.boxShadow = `inset 0 0 0 3px ${getComputedStyle(document.documentElement).getPropertyValue('--primary-light-prog')}`;
            elements.percent.style.border = `3px solid var(--primary-prog)`;
        }
    }
    
    function getDocHeight() {
        return Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight
        );
    }
    
    function calculateProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return Math.min(100, Math.max(0, Math.round(
            (scrollTop / (getDocHeight() - window.innerHeight)) * 100
        )));
    }
    
    function updateUI(percent) {
        if (percent === lastPercent) return;
        
        elements.text.textContent = `${percent}%`;
        
        if (supportsConicGradient) {
            elements.circle.style.background = `
                conic-gradient(
                    var(--primary-prog) 0%,
                    var(--secondary-prog) ${percent}%,
                    transparent ${percent}% 100%
                )
            `;
        }

        if (percent == 0 || percent == 1 || percent == 99 || percent == 100){
            elements.percent.style.display = 'none';
            elements.circle.style.background = 'none'
        } else {
            elements.percent.style.display = 'flex';
            elements.circle.style.background = `
                conic-gradient(
                    var(--primary-prog) 0%,
                    var(--secondary-prog) ${percent}%,
                    transparent ${percent}% 100%
                )
            `;
        }
        
        if (percent >= 95) {
            elements.percent.style.color = 'var(--success-prog)';
        } else if (percent >= 70) {
            elements.percent.style.color = 'var(--accent-prog)';
        } else {
            elements.percent.style.color = 'var(--primary-prog)';
        }
        
        elements.container.style.opacity = (percent <= 2 || percent >= 98) ? '0.6' : '1';
        lastPercent = percent;
    }
    
    function handleScroll() {
        if (!isUpdating) {
            isUpdating = true;
            requestAnimationFrame(() => {
                updateUI(calculateProgress());
                isUpdating = false;
            });
        }
    }
    
    let resizeTimer;
    function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            checkFeatures();
            updateUI(calculateProgress());
        }, 100);
    }
    
    // راه‌اندازی اولیه
    checkFeatures();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    updateUI(0);
})();

document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('mainContent').classList.remove('active');
        });

        function playMusic() {
            const audio = new Audio('music.mp3');
            audio.play()
                .then(() => {
                    // اگر موزیک پخش شد، پاپ‌آپ را مخفی و محتوا را نمایش دهید
                    document.getElementById('popup').style.display = 'none';
                    document.getElementById('mainContent').classList.add('active');
                })
                .catch(e => {
                    alert("برای پخش، لطفاً صفحه را کلیک کنید.");
                    document.getElementById('popup').style.display = 'none';
                    document.getElementById('mainContent').classList.add('active');
                });
        }
       document.getElementById('popup').addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.getElementById('mainContent').classList.add('active');
            }
        });
