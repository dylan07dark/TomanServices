// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1000);
});

// Particles Background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        scrollTop.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        scrollTop.classList.remove('visible');
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to Top
document.getElementById('scrollTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars
            if (entry.target.classList.contains('skills-section')) {
                animateSkillBars();
            }
            
            // Animate counters
            if (entry.target.classList.contains('stats-section')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('.section, .skills-section, .stats-section').forEach(section => {
    observer.observe(section);
});

// Animate Skill Bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 300);
    });
}

// Animate Counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Tech Items Hover Effect
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
        this.style.paddingLeft = '1rem';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
        this.style.paddingLeft = '0';
    });
});

// Gallery Card Click Effect - Modal
function initImageModal() {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <span class="close-modal">&times;</span>
        <img class="modal-content" id="modal-image">
        <div class="image-caption" id="modal-caption"></div>
    `;
    document.body.appendChild(modal);

    const galleryImages = document.querySelectorAll('.gallery-image');
    const modalImg = document.getElementById('modal-image');
    const captionText = document.getElementById('modal-caption');
    const modalElement = document.querySelector('.image-modal');
    const closeModal = document.querySelector('.close-modal');

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modalElement.classList.add('active');
            modalImg.src = this.src;
            captionText.textContent = this.alt;
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', function() {
        modalElement.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    modalElement.addEventListener('click', function(e) {
        if (e.target === modalElement) {
            modalElement.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Theme Management
const themes = [
    'theme-blue',
    'theme-purple',
    'theme-green',
    'theme-red',
    'theme-pink',
    'theme-cyan'
];

let currentThemeIndex = 0;

function toggleTheme() {
    // Remove all theme classes
    document.body.classList.remove('light-theme', ...themes);
    
    // Get next theme index
    currentThemeIndex = (currentThemeIndex + 1) % (themes.length + 1);
    
    if (currentThemeIndex === 0) {
        // Default dark theme
        document.body.classList.add('light-theme');
    } else {
        // Apply color theme
        document.body.classList.add(themes[currentThemeIndex - 1]);
    }
    
    // Update particles color
    updateParticlesColor();
    
    // Save theme preference
    localStorage.setItem('theme', document.body.classList.toString());
}

function updateParticlesColor() {
    const particles = document.querySelectorAll('.particle');
    if (document.body.classList.contains('light-theme')) {
        // For light theme, use primary color of current theme
        particles.forEach(p => {
            p.style.background = getComputedStyle(document.documentElement)
                .getPropertyValue('--primary-color').trim() || '#0066ff';
        });
    } else {
        // For dark themes, use accent color
        particles.forEach(p => {
            p.style.background = getComputedStyle(document.documentElement)
                .getPropertyValue('--text-accent').trim() || '#00d4ff';
        });
    }
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.className = savedTheme;
        
        // Find current theme index
        if (savedTheme.includes('light-theme')) {
            currentThemeIndex = 0;
        } else {
            for (let i = 0; i < themes.length; i++) {
                if (savedTheme.includes(themes[i])) {
                    currentThemeIndex = i + 1;
                    break;
                }
            }
        }
    }
    updateParticlesColor();
}

// Create theme toggle button
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-palette"></i>';
    themeToggle.title = 'Cambiar tema';
    themeToggle.setAttribute('aria-label', 'Cambiar tema de color');
    
    themeToggle.addEventListener('click', toggleTheme);
    document.body.appendChild(themeToggle);
}

// Parallax Effect for Hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    initImageModal();
    loadTheme();
    createThemeToggle();
    
    // Add staggered animation to tech cards
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.style.animation = 'fadeInUp 0.8s ease forwards';
    });
    
    // Add entrance animation to gallery cards
    const galleryCards = document.querySelectorAll('.gallery-card');
    galleryCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'slideInLeft 0.8s ease forwards';
    });
});