// ========================================
// BACKSTREET BOYS FAN WEBSITE - JAVASCRIPT
// Professional Interactions & Animations
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // LOADER
    // ========================================
    const loader = document.querySelector('.loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 500);
        });
    }
    
    // ========================================
    // NAVIGATION - SCROLL EFFECT & ACTIVE STATE
    // ========================================
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.navigators a');
    
    // Scroll effect for header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Set initial active state
    setActiveNavLink();
    
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.navigators .nav-links');
    
    mobileMenuToggle?.addEventListener('click', () => {
        navLinksContainer?.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navLinksContainer?.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.navigators .nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer?.classList.remove('active');
            const spans = mobileMenuToggle?.querySelectorAll('span');
            if (spans) {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    });
    
    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================
    const revealElements = document.querySelectorAll(
        '.timeline-item, .band_card, .album_card, .preview-card, .music_link-card, .group_card'
    );
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // ========================================
    // TIMELINE ANIMATION (History Page)
    // ========================================
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const animateTimeline = () => {
        const triggerBottom = window.innerHeight * 0.75;
        
        timelineItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < triggerBottom) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 100);
            }
        });
    };
    
    animateTimeline();
    window.addEventListener('scroll', animateTimeline);
    
    // ========================================
    // PARALLAX EFFECT FOR HERO SECTIONS
    // ========================================
    const heroBanners = document.querySelectorAll('.hero_banner, .about_hero, .history_hero, .songs_hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        heroBanners.forEach(hero => {
            const speed = 0.3;
            const img = hero.querySelector('img');
            if (img && scrolled < hero.offsetHeight) {
                img.style.transform = `translateY(${scrolled * speed}px) scale(1.1)`;
            }
        });
    });
    
    // ========================================
    // INTERACTIVE TRACKLIST (Top Songs Page)
    // ========================================
    const tracklistItems = document.querySelectorAll('.tracklist li');
    
    tracklistItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all tracks
            tracklistItems.forEach(t => t.style.color = '');
            
            // Add active style to clicked track
            this.style.color = 'var(--neon-blue)';
            
            // You can add more functionality here like playing audio
            console.log('Track selected:', this.textContent);
        });
    });
    
    // ========================================
    // ALBUM CARD HOVER EFFECTS
    // ========================================
    const albumCards = document.querySelectorAll('.album_card');
    
    albumCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // ========================================
    // BAND MEMBER CARDS - TILT EFFECT
    // ========================================
    const bandCards = document.querySelectorAll('.band_card');
    
    bandCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // ========================================
    // DYNAMIC YEAR DISPLAY IN FOOTER
    // ========================================
    const copyrightYear = document.querySelector('.footer p');
    if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2026', currentYear + 1);
    }
    
    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ========================================
    // MUSIC VISUALIZER INSPIRED ANIMATION
    // ========================================
    const musicLinks = document.querySelectorAll('.music_link-card');
    
    musicLinks.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s ease-in-out';
        });
        
        card.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // ========================================
    // STATISTICS COUNTER ANIMATION
    // ========================================
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };
    
    // ========================================
    // IMAGE LAZY LOADING
    // ========================================
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ========================================
    // CONSOLE EASTER EGG
    // ========================================
    console.log('%c🎵 Welcome to the Backstreet Boys Fan Website! 🎵', 
        'font-size: 20px; color: #00d4ff; font-weight: bold;');
    console.log('%c"Tell me why!" - Ain\'t nothin\' but a redesigned website!', 
        'font-size: 14px; color: #ffd700;');
    
});

// ========================================
// ADDITIONAL UTILITY FUNCTIONS
// ========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add custom animation for elements entering viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply to elements that need animation
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animationObserver.observe(el);
});

// ========================================
// ENHANCED MODERN JAVASCRIPT FEATURES
// ========================================

// Particle System for Background
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(0, 212, 255, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}

// Initialize particles on load
createParticles();

// Enhanced Scroll Reveal with Intersection Observer
const revealElements = document.querySelectorAll('.timeline-item, .band_card, .album_card, .preview-card, .music_link-card, .group_card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// Music Visualizer Effect on Album Cards
const albumCards = document.querySelectorAll('.album_card');

albumCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const rect = this.getBoundingClientRect();
        const visualizerBars = 5;
        
        for (let i = 0; i < visualizerBars; i++) {
            const bar = document.createElement('div');
            bar.style.cssText = `
                position: absolute;
                bottom: 20px;
                left: ${20 + i * 20}%;
                width: 8px;
                height: ${Math.random() * 30 + 10}px;
                background: linear-gradient(to top, var(--neon-blue), var(--electric-purple));
                border-radius: 4px;
                animation: equalizer 0.5s ease-in-out infinite alternate;
                animation-delay: ${i * 0.1}s;
                z-index: 5;
            `;
            this.appendChild(bar);
            
            setTimeout(() => bar.remove(), 1000);
        }
    });
});

// Add equalizer animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes equalizer {
        from { height: 10px; }
        to { height: 40px; }
    }
`;
document.head.appendChild(style);

// Typewriter Effect for Hero Text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typewriter effect to hero titles on load
const heroTitles = document.querySelectorAll('.hero_title, .about_hero_content h1, .history_hero h1, .songs_hero h1');
heroTitles.forEach(title => {
    const originalText = title.textContent;
    title.setAttribute('data-text', originalText);
});

// Magnetic Button Effect
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .preview-link');

buttons.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// Image Gallery Lightbox
const galleryImages = document.querySelectorAll('.band_card img, .album_card img, .image-grid img');

galleryImages.forEach(img => {
    img.style.cursor = 'pointer';
    
    img.addEventListener('click', function() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 0 50px rgba(0, 212, 255, 0.3);
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 30px;
            font-size: 3em;
            color: white;
            background: transparent;
            border: none;
            cursor: pointer;
            transition: transform 0.3s ease;
        `;
        
        closeBtn.addEventListener('mouseover', () => {
            closeBtn.style.transform = 'scale(1.2)';
            closeBtn.style.color = 'var(--neon-blue)';
        });
        
        closeBtn.addEventListener('mouseout', () => {
            closeBtn.style.transform = 'scale(1)';
            closeBtn.style.color = 'white';
        });
        
        closeBtn.addEventListener('click', () => {
            lightbox.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => lightbox.remove(), 300);
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => lightbox.remove(), 300);
            }
        });
        
        lightbox.appendChild(closeBtn);
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
    });
});

// Add fade animations to head
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeStyle);

// Progress Bar Animation for Skills/Achievements
const progressBars = document.querySelectorAll('.progress-bar-fill');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width + '%';
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// Counter Animation for Statistics
function animateCounter(element, target, duration = 2000, suffix = '') {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString() + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + suffix;
        }
    };
    
    updateCounter();
}

// Find and animate stat numbers
const statNumbers = document.querySelectorAll('.stat-number');

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target') || '0');
            const suffix = entry.target.getAttribute('data-suffix') || '';
            animateCounter(entry.target, target, 2000, suffix);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statObserver.observe(stat);
});

// Smooth Page Transitions
document.querySelectorAll('a[href^="http"], a[href^="/"]').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.hostname === window.location.hostname && !this.hash) {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                window.location.href = this.href;
            }, 300);
        }
    });
});

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // ESC to close lightbox or mobile menu
    if (e.key === 'Escape') {
        const lightbox = document.querySelector('.lightbox');
        if (lightbox) {
            lightbox.remove();
        }
        
        const mobileMenu = document.querySelector('.nav-links.active');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
    }
});

// Add loading class removal
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate elements with delay classes
    const delayedElements = document.querySelectorAll('.delay-1, .delay-2, .delay-3, .delay-4, .delay-5');
    delayedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.animationFillMode = 'forwards';
    });
});

// Performance Optimization - Debounced Scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Parallax for hero images
    const heroImages = document.querySelectorAll('.hero_banner img, .about_hero img');
    const scrolled = window.scrollY;
    
    heroImages.forEach(img => {
        if (scrolled < 1000) {
            img.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
        }
    });
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Console Easter Egg
console.log('%c🎵 Welcome Backstreet Boys Fan! 🎵', 
    'font-size: 24px; color: #00d4ff; font-weight: bold; text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);');
console.log('%c"Tell me why!" - You\'re experiencing the ultimate fan website!', 
    'font-size: 16px; color: #ffd700;');
console.log('%cDesigned with ❤️ for BSB fans worldwide', 
    'font-size: 14px; color: #9d4edd;');

// Add hidden Konami code easter egg
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    console.log('%c🎉 EASTER EGG ACTIVATED! 🎉', 'font-size: 30px; color: #ff00ff;');
    alert('🎵 You found the secret! Backstreet\'s back, alright! 🎵');
    
    // Add fun visual effect
    document.body.style.animation = 'rainbow 2s ease infinite';
    
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0%, 100% { filter: hue-rotate(0deg); }
            50% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

console.log('%c💡 Pro Tip: Try the Konami Code! ↑↑↓↓←→←→BA', 
    'font-size: 12px; color: #c0c0c0;');
