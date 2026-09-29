// Professional Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Utility functions
    const $ = (selector, context = document) => context.querySelector(selector);
    const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Preloader
    const preloader = $('#preloader');
    const loaderTextSpans = $$('.loader-text span');
    
    loaderTextSpans.forEach((span, index) => {
        span.style.setProperty('--i', index);
    });
    
    // Hide preloader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1500);
    });
    
    // Custom cursor
    if (!prefersReducedMotion && window.innerWidth > 768) {
        const cursorDot = $('#cursor-dot');
        const cursorOutline = $('#cursor-outline');
        
        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
            cursorOutline.style.left = e.clientX + 'px';
            cursorOutline.style.top = e.clientY + 'px';
        });
        
        // Cursor interactions
        $$('a, button, .tech-badge').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.borderColor = 'rgba(99, 102, 241, 0.6)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.borderColor = 'rgba(99, 102, 241, 0.3)';
            });
        });
    } else {
        // Hide custom cursor on mobile or reduced motion
        const cursors = $$('#cursor-dot, #cursor-outline');
        cursors.forEach(cursor => cursor.style.display = 'none');
        document.body.style.cursor = 'auto';
    }
    
    // Navigation
    const nav = $('.nav');
    const menuBtn = $('#menu-btn');
    const menu = $('#menu');
    const navLinks = $$('.nav-link');
    
    // Mobile menu toggle
    menuBtn.addEventListener('click', () => {
        const isOpen = menu.classList.contains('open');
        menu.classList.toggle('open', !isOpen);
        menuBtn.classList.toggle('active', !isOpen);
        menuBtn.setAttribute('aria-expanded', !isOpen);
        document.body.style.overflow = !isOpen ? 'hidden' : '';
    });
    
    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Navigation scroll effect
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Progress bar
    const progressBar = $('#bar');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height);
        progressBar.style.transform = `scaleX(${scrolled})`;
    });
    
    // Hero title character animation
    const titleChars = $$('.hero-title .char');
    titleChars.forEach((char, index) => {
        char.style.setProperty('--i', index);
    });
    
    // Typing animation for subtitle
    const typingText = $('.typing-text');
    if (typingText && !prefersReducedMotion) {
        const text = 'Full Stack Developer';
        let index = 0;
        
        const typeWriter = () => {
            if (index < text.length) {
                typingText.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing animation after a delay
        setTimeout(() => {
            typingText.textContent = '';
            typeWriter();
        }, 2000);
    }
    
    // Magnetic effect for buttons
    if (!prefersReducedMotion) {
        $$('.magnetic').forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                el.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
            });
        });
    }
    
    // Active navigation link highlighting
    const sections = $$('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0% -50% 0%',
        threshold: 0
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Smooth scrolling for anchor links
    $$('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = $(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // GSAP Animations (if reduced motion is not preferred)
    if (!prefersReducedMotion) {
        // Hero content animation
        const tl = gsap.timeline();
        
        tl.from('.hero-badge', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.hero-greeting', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.hero-title', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-subtitle', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-description', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.3')
        .from('.hero-actions', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.2')
        .from('.hero-socials', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.1');
        
        // Profile image animation
        gsap.from('.profile-container', {
            duration: 1.2,
            scale: 0.8,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.5
        });
        
        // Floating tech badges
        $$('.tech-badge').forEach((badge, index) => {
            gsap.from(badge, {
                duration: 1,
                y: 100,
                opacity: 0,
                ease: 'power3.out',
                delay: 1 + (index * 0.2)
            });
        });
        
        // Code snippet animation
        gsap.from('.code-snippet', {
            duration: 1,
            x: 100,
            opacity: 0,
            ease: 'power3.out',
            delay: 1.5
        });
    }
    
    // Console easter egg
    console.log('%c🚀 Welcome to Sanjog\'s Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('%cInterested in the code? Check out the repository!', 'color: #06b6d4; font-size: 14px;');
    console.log('%cBuilt with: HTML5, CSS3, JavaScript, GSAP, ScrollTrigger', 'color: #8b5cf6; font-size: 12px;');
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}