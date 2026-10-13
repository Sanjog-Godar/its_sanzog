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
    
    // Custom cursor removed per user request

    // ── Theme Management (Dark & Light Mode) ────────────────
    const themeToggleBtn = $('#theme-toggle');
    const mobileThemeToggleBtn = $('#mobile-theme-toggle');
    const themeColorMeta = $('meta[name="theme-color"]');

    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
            if (themeColorMeta) themeColorMeta.setAttribute('content', '#f8fafc');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
            if (themeColorMeta) themeColorMeta.setAttribute('content', '#07080a');
        }
        try {
            localStorage.setItem('theme', theme);
        } catch (e) { }
    }

    const initialTheme = document.documentElement.getAttribute('data-theme') || 
                         (localStorage.getItem('theme')) || 
                         (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    applyTheme(initialTheme);

    function handleThemeToggle() {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        applyTheme(isLight ? 'dark' : 'light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', handleThemeToggle);
    }
    if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener('click', handleThemeToggle);
    }

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        try {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'light' : 'dark');
            }
        } catch (err) { }
    });
    
    // Navigation
    const nav = $('.nav');
    const menuBtn = $('#menu-btn');
    const menu = $('#menu');
    const navLinks = $$('.nav-link');
    
    // Mobile menu toggle
    function openMenu() {
        menu.classList.add('open');
        menuBtn.classList.add('active');
        menuBtn.setAttribute('aria-expanded', 'true');
        document.body.classList.add('nav-open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menu.classList.remove('open');
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
        document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', () => {
        menu.classList.contains('open') ? closeMenu() : openMenu();
    });

    // Close on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on overlay click (the ::before pseudo-element on body.nav-open)
    document.addEventListener('click', (e) => {
        if (document.body.classList.contains('nav-open') && !menu.contains(e.target) && e.target !== menuBtn) {
            closeMenu();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
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
    
    // Rotating typewriter animation for subtitle (type -> pause -> delete -> next)
    const typingText = $('.typing-text');
    if (typingText && !prefersReducedMotion) {
        const phrases = [
            'Full Stack Developer',
            'Mobile App Developer',
            'Flutter & Next.js Dev',
            'Web & App Developer'
        ];
        let phraseIndex = 0;
        let charIndex = phrases[0].length;
        let isDeleting = false;

        const typeLoop = () => {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                charIndex--;
                typingText.textContent = currentPhrase.substring(0, charIndex);
            } else {
                charIndex++;
                typingText.textContent = currentPhrase.substring(0, charIndex);
            }

            let delta = isDeleting ? 45 : 85;

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Fully typed, pause to read
                isDeleting = true;
                delta = 2200;
            } else if (isDeleting && charIndex === 0) {
                // Fully erased, switch to next phrase
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delta = 350;
            }

            setTimeout(typeLoop, delta);
        };

        // Start backspacing first phrase after initial pause
        setTimeout(() => {
            isDeleting = true;
            typeLoop();
        }, 2200);
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
    
    // ── Horizontal Projects Showcase Controller ─────────────
    const projSlider = $('#projects-slider');
    const projSliderWrapper = $('.projects-slider-wrapper');
    const projCards = $$('.project-card');
    const projTabs = $$('.project-tab');
    const projDots = $$('.slider-dot');
    const projPrevBtn = $('#proj-prev');
    const projNextBtn = $('#proj-next');
    const projIndexLabel = $('#project-current-index');
    let currentProjIndex = 0;
    const totalProjCount = projCards.length || 4;
    let autoPlayTimer = null;
    const AUTO_PLAY_INTERVAL = 4500; // 4.5 seconds

    function updateProjectUI(index) {
        currentProjIndex = Math.max(0, Math.min(index, totalProjCount - 1));
        
        if (projIndexLabel) {
            projIndexLabel.textContent = String(currentProjIndex + 1).padStart(2, '0');
        }

        projTabs.forEach((tab, i) => {
            const isActive = i === currentProjIndex;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        projDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentProjIndex);
        });
    }

    function scrollToProject(index) {
        if (!projSlider || !projCards[index]) return;
        const targetCard = projCards[index];
        projSlider.scrollTo({
            left: targetCard.offsetLeft - projSlider.offsetLeft,
            behavior: 'smooth'
        });
        updateProjectUI(index);
    }

    function nextProject() {
        const newIndex = (currentProjIndex + 1) % totalProjCount;
        scrollToProject(newIndex);
    }

    function prevProject() {
        const newIndex = (currentProjIndex - 1 + totalProjCount) % totalProjCount;
        scrollToProject(newIndex);
    }

    // Auto-switch functionality
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayTimer = setInterval(() => {
            nextProject();
        }, AUTO_PLAY_INTERVAL);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    if (projPrevBtn) {
        projPrevBtn.addEventListener('click', () => {
            prevProject();
            resetAutoPlay();
        });
    }

    if (projNextBtn) {
        projNextBtn.addEventListener('click', () => {
            nextProject();
            resetAutoPlay();
        });
    }

    projTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            scrollToProject(index);
            resetAutoPlay();
        });
    });

    projDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToProject(index);
            resetAutoPlay();
        });
    });

    // Pause auto-switch on hover or touch
    if (projSliderWrapper) {
        projSliderWrapper.addEventListener('mouseenter', stopAutoPlay);
        projSliderWrapper.addEventListener('mouseleave', startAutoPlay);
        projSliderWrapper.addEventListener('touchstart', stopAutoPlay, { passive: true });
        projSliderWrapper.addEventListener('touchend', startAutoPlay, { passive: true });
    }

    // Start auto-play
    startAutoPlay();

    if (projSlider) {
        let scrollTimeout;
        projSlider.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollLeft = projSlider.scrollLeft;
                let closestIndex = 0;
                let minDistance = Infinity;

                projCards.forEach((card, index) => {
                    const cardOffset = card.offsetLeft - projSlider.offsetLeft;
                    const distance = Math.abs(scrollLeft - cardOffset);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestIndex = index;
                    }
                });

                if (closestIndex !== currentProjIndex) {
                    updateProjectUI(closestIndex);
                }
            }, 60);
        }, { passive: true });
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

// Custom Scroll Fade Animations
document.addEventListener('DOMContentLoaded', () => {
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    });

    document.querySelectorAll('[data-scroll-class="in-view"]').forEach(el => {
        fadeObserver.observe(el);
    });
});