// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            mobileMenu.classList.add('hidden');
        }
    });
});

// Navbar Active Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
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

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Skill Bars Animation
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Typing Effect
const typedText = document.getElementById('typed-text');
const texts = ['Full Stack Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Tech Innovator'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typedText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}

setTimeout(type, 1000);

// Particles
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particlesContainer.appendChild(particle);
}
// Contact Form
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const body = `Name: ${name}
Email: ${email}

Message:
${message}`;

    const gmailURL =
        `https://mail.google.com/mail/?view=cm&fs=1` +
        `&to=sanjog.godar2058@gmail.com` +
        `&su=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

    window.open(gmailURL, '_blank');

    contactForm.reset();
});

const downloadCvBtn = document.getElementById('download-cv-about');

if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', () => {
        // optional: analytics, console log, etc.
        console.log('CV download clicked');
    });
}


// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.remove('hidden');
        backToTopBtn.classList.add('flex');
    } else {
        backToTopBtn.classList.add('hidden');
        backToTopBtn.classList.remove('flex');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
});

// 404 Error Handling
function show404Error(path) {
    const error404 = document.getElementById('error-404');
    const errorUrl = document.getElementById('error-url');
    
    // Get current domain
    const domain = window.location.origin;
    errorUrl.textContent = `${domain}${path}`;
    
    // Hide all main sections
    document.querySelectorAll('section').forEach(section => {
        if (section.id !== 'error-404') {
            section.classList.add('hidden');
        }
    });
    
    // Show 404 page
    error404.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function hide404Error() {
    const error404 = document.getElementById('error-404');
    error404.classList.add('hidden');
    
    // Show all main sections
    document.querySelectorAll('section').forEach(section => {
        if (section.id !== 'error-404') {
            section.classList.remove('hidden');
        }
    });
}

// Handle invalid hash navigation
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    const validSections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
    
    if (hash === '') {
        hide404Error();
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    } else if (!validSections.includes(hash)) {
        show404Error(`#${hash}`);
    } else {
        hide404Error();
    }
});

// Check initial hash on page load
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    const validSections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
    
    if (hash && !validSections.includes(hash)) {
        show404Error(`#${hash}`);
    }
});

// Add particles to 404 page
const particles404 = document.getElementById('particles-404');
if (particles404) {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particles404.appendChild(particle);
    }
}