document.addEventListener('DOMContentLoaded', function() {
    // متغیرهای اصلی
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const header = document.getElementById('main-header');

    // تابع ساده‌سازی toggle منو
    function toggleMenu() {
        const isActive = hamburgerMenu.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
    }

    // مدیریت رویدادها با event delegation
    document.addEventListener('click', function(e) {
        // مدیریت منوی همبرگری
        if (e.target.closest('.hamburger-menu')) {
            toggleMenu();
            return;
        }

        // بستن منو با کلیک خارج
        if (mobileNav.classList.contains('active') &&
            !e.target.closest('.mobile-nav')) {
            hamburgerMenu.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // علامت‌گذاری لینک فعال (هم برای موبایل و هم دسکتاپ)
        if (e.target.closest('nav ul li a, .mobile-nav ul li a')) {
            const links = e.target.closest('nav') ?
                document.querySelectorAll('nav ul li a') :
                document.querySelectorAll('.mobile-nav ul li a');

            links.forEach(item => item.classList.remove('active'));
            e.target.closest('a').classList.add('active');

            // بستن منوی موبایل پس از کلیک
            if (mobileNav.classList.contains('active')) {
                toggleMenu();
            }
        }
    });

    // بهینه‌سازی اسکرول هدر
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;

        // کاهش فراخوانی کلاس‌های CSS
        if (Math.abs(scrollPosition - lastScroll) > 50) {
            header.classList.toggle('header-scrolled', scrollPosition > 100);
            lastScroll = scrollPosition;
        }
    }, { passive: true }); // اضافه کردن passive برای بهینه‌سازی

    // انیمیشن اولیه ساده‌تر برای لینک‌ها
    requestAnimationFrame(function() {
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach((link, index) => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        });
    });
});

// اسکریپت بهینه‌شده برای تایپینگ افکت
document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.querySelector('.typing-effect');
    const words = ["Youseef Star", "Backend Developer", "Frontend Developer", "توسعه‌دهنده وب"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 1000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 300;
        }

        setTimeout(type, typingSpeed);
    }

    type();
});

// اسکریپت پیشرفته برای فیلتر مهارت‌ها
document.addEventListener('DOMContentLoaded', function() {
    const categoryBtns = document.querySelectorAll('.skill-category-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    // انیمیشن اولیه برای کارت‌ها
    skillCards.forEach((card, index) => {
        card.style.transform = 'translateY(50px)';
        card.style.opacity = '0';
        card.style.transition = `transform 0.6s cubic-bezier(0.2, 0.9, 0.3, 1.3) ${index * 0.1}s, opacity 0.6s ease ${index * 0.1}s`;
    });

    // فعال کردن انیمیشن پس از لود صفحه
    setTimeout(() => {
        skillCards.forEach(card => {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
        });
    }, 500);

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // حذف کلاس active از همه دکمه‌ها
            categoryBtns.forEach(b => b.classList.remove('active'));

            // اضافه کردن کلاس active به دکمه کلیک شده
            this.classList.add('active');

            const category = this.dataset.category;

            // انیمیشن فیلتر
            skillCards.forEach(card => {
                card.style.transform = 'scale(0.8)';
                card.style.opacity = '0';

                setTimeout(() => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }

                    card.style.transform = 'scale(1)';
                    card.style.opacity = '1';
                }, 300);
            });
        });
    });

});

// اسکریپت برای فیلتر نمونه کارها
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-out-quad',
        once: true,
        offset: 50
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // فیلتر نمونه کارها
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // حذف کلاس active از همه دکمه‌ها
            filterBtns.forEach(b => b.classList.remove('active'));

            // اضافه کردن کلاس active به دکمه کلیک شده
            this.classList.add('active');

            const filter = this.dataset.filter;

            // انیمیشن فیلتر
            portfolioItems.forEach(item => {
                item.style.transform = 'scale(0.95)';
                item.style.opacity = '0.5';
                item.style.filter = 'blur(2px)';

                setTimeout(() => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }

                    item.style.transform = 'scale(1)';
                    item.style.opacity = '1';
                    item.style.filter = 'none';
                }, 300);
            });
        });
    });

    // انیمیشن هنگام اسکرول
    const animateOnScroll = () => {
        const portfolioSection = document.querySelector('#portfolio');
        const sectionPosition = portfolioSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (sectionPosition < screenPosition) {
            portfolioItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 150);
            });

            // حذف ایونت لیستنر پس از اجرا
            window.removeEventListener('scroll', animateOnScroll);
        }
    };

    window.addEventListener('scroll', animateOnScroll);

    // اجرای اولیه برای بررسی موقعیت
    animateOnScroll();
});

// اسکریپت پیشرفته برای فوتر
document.addEventListener('DOMContentLoaded', function() {
    // انیمیشن اسکرول برای بخش‌های فوتر
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.footer-col').forEach(col => {
        observer.observe(col);
    });
});