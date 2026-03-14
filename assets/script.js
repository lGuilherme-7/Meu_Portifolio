/*===== MENU MOBILE =====*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
if (navClose) navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));

document.querySelectorAll('.nav__link').forEach(n => n.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
}));

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]');
function scrollActive() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*===== SCROLL UP BUTTON =====*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*===== TYPING ANIMATION =====*/
const typingText = document.getElementById('typing-text');
const textsPt = [
    'Desenvolvedor Full Stack',
    'Web Developer',
    'Frontend Developer',
    'Backend Developer'
];
const textsEn = [
    'Full Stack Developer',
    'Web Developer',
    'Frontend Developer',
    'Backend Developer'
];
let currentLang = 'pt';
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const texts = currentLang === 'pt' ? textsPt : textsEn;
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
}

if (typingText) setTimeout(type, 1000);

/*===== FAQ ACCORDION =====*/
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(faq => faq.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

/*===== SCROLL REVEAL =====*/
const observerOptions = {threshold: 0.1, rootMargin: '0px 0px -100px 0px'};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .service-card, .project-card, .stat-card, .about__info-item, .contact-info-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

/*===== CONTACT FORM =====*/
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        const whatsappMessage = `*Nova mensagem do site!*\n\n*Nome:* ${name}\n*Email:* ${email}\n${phone ? `*Telefone:* ${phone}\n` : ''}\n*Mensagem:*\n${message}`.trim();
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappNumber = '5581987028550';
        
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
        contactForm.reset();
        showNotification(currentLang === 'pt' ? 'Mensagem enviada!' : 'Message sent!');
    });
}

/*===== NOTIFICATION =====*/
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white; padding: 1rem 1.5rem; border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000; animation: slideIn 0.3s ease-out; font-weight: 600;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {from {transform: translateX(400px); opacity: 0;} to {transform: translateX(0); opacity: 1;}}
        @keyframes slideOut {from {transform: translateX(0); opacity: 1;} to {transform: translateX(400px); opacity: 0;}}
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/*===== DARK MODE =====*/
const themeToggle = document.getElementById('theme-toggle');

function getThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

const currentTheme = getThemePreference();
applyTheme(currentTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        applyTheme(isDark ? 'light' : 'dark');
        themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {themeToggle.style.transform = 'rotate(0) scale(1)';}, 300);
    });
}

if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light');
    });
}

/*===== LANGUAGE TOGGLE =====*/
const langToggle = document.getElementById('lang-toggle');
const langText = langToggle.querySelector('.lang-text');

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    langText.textContent = lang === 'pt' ? 'EN' : 'PT';
    
    document.querySelectorAll('[data-pt]').forEach(el => {
        const text = lang === 'pt' ? el.getAttribute('data-pt') : el.getAttribute('data-en');
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = text;
        } else {
            el.textContent = text;
        }
    });
    
    // Reset typing animation
    textIndex = 0;
    charIndex = 0;
    isDeleting = false;
    if (typingText) typingText.textContent = '';
}

const savedLang = localStorage.getItem('language') || 'pt';
applyLanguage(savedLang);

if (langToggle) {
    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'pt' ? 'en' : 'pt';
        applyLanguage(newLang);
        langToggle.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {langToggle.style.transform = 'rotate(0) scale(1)';}, 300);
    });
}

/*===== SMOOTH SCROLL =====*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({top: targetPosition, behavior: 'smooth'});
        }
    });
});

/*===== COUNTER ANIMATION =====*/
function animateCounter(element, target, duration = 2000) {
    const increment = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

const statCards = document.querySelectorAll('.stat-card__value');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const value = entry.target.textContent.replace('+', '');
            const numValue = parseInt(value);
            if (!isNaN(numValue)) animateCounter(entry.target, numValue);
            statsObserver.unobserve(entry.target);
        }
    });
}, {threshold: 0.5});

statCards.forEach(card => {
    if (card.textContent.includes('+')) statsObserver.observe(card);
});

/*===== PARALLAX EFFECT =====*/
const homeBlob = document.querySelector('.home__blob');
window.addEventListener('scroll', () => {
    if (homeBlob) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.3;
        homeBlob.style.transform = `translateY(${parallax}px)`;
    }
});

console.log('%c🚀 Portfólio - Guilherme Silva', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%c💼 Full Stack Developer', 'color: #8b5cf6; font-size: 14px;');
console.log('%c🌐 https://github.com/lGuilherme-7', 'color: #64748b; font-size: 12px;');