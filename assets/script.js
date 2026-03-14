/*===== SHOW MENU =====*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Menu show
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Menu hidden
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== CHANGE BACKGROUND HEADER =====*/
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

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

/*===== SHOW SCROLL UP =====*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (this.scrollY >= 560) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollUp);

/*===== TYPING ANIMATION =====*/
const typingText = document.querySelector('.typing-text');
const texts = [
    'Desenvolvedor Full Stack',
    'Web Developer',
    'Frontend Developer',
    'Backend Developer'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
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
        typingSpeed = 2000; // Pausa no final
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pausa antes de começar novo texto
    }

    setTimeout(type, typingSpeed);
}

// Iniciar animação de digitação
if (typingText) {
    setTimeout(type, 1000);
}

/*===== FAQ ACCORDION =====*/
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Fechar todos os itens
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Abrir o item clicado se não estava ativo
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

/*===== SCROLL REVEAL ANIMATION =====*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elementos para animar
const animateElements = document.querySelectorAll(`
    .skill-card,
    .service-card,
    .project-card,
    .stat-card,
    .about__info-item,
    .contact-info-card,
    .faq-item
`);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

/*===== SKILL PROGRESS ANIMATION =====*/
const skillLevels = document.querySelectorAll('.skill-level__bar');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'skill-grow 2s ease-out forwards';
        }
    });
}, { threshold: 0.5 });

skillLevels.forEach(skill => {
    skillObserver.observe(skill);
});

/*===== CONTACT FORM =====*/
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Pegar valores do formulário
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Criar mensagem para WhatsApp
        const whatsappMessage = `
*Nova mensagem do site!*

*Nome:* ${name}
*Email:* ${email}
${phone ? `*Telefone:* ${phone}` : ''}

*Mensagem:*
${message}
        `.trim();
        
        // Codificar mensagem para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Número do WhatsApp (substitua pelo seu)
        const whatsappNumber = '5581987028550';
        
        // Abrir WhatsApp
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
        
        // Limpar formulário
        contactForm.reset();
        
        // Mostrar mensagem de sucesso (opcional)
        showNotification('Mensagem enviada! Redirecionando para o WhatsApp...');
    });
}

/*===== NOTIFICATION =====*/
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
    `;
    
    // Adicionar animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/*===== SMOOTH SCROLL FOR ALL LINKS =====*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
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

/*===== COUNTER ANIMATION =====*/
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
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

// Observar cards de estatísticas
const statCards = document.querySelectorAll('.stat-card__value');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const value = entry.target.textContent.replace('+', '');
            const numValue = parseInt(value);
            
            if (!isNaN(numValue)) {
                animateCounter(entry.target, numValue);
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statCards.forEach(card => {
    if (card.textContent.includes('+')) {
        statsObserver.observe(card);
    }
});

/*===== CURSOR EFFECT (OPTIONAL - DESKTOP ONLY) =====*/
if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #6366f1;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Aumentar cursor em elementos clicáveis
    document.querySelectorAll('a, button, .nav__link').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#8b5cf6';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#6366f1';
        });
    });
}

/*===== LAZY LOADING FOR IMAGES =====*/
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

/*===== ADD LOADING ANIMATION =====*/
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Adicionar classe para animações iniciais
    const homeContent = document.querySelector('.home__content');
    const homeImage = document.querySelector('.home__image');
    
    if (homeContent) {
        homeContent.style.animation = 'fadeInUp 1s ease-out';
    }
    if (homeImage) {
        homeImage.style.animation = 'fadeInUp 1s ease-out 0.2s both';
    }
});

/*===== DARK MODE TOGGLE =====*/
const themeToggle = document.getElementById('theme-toggle');

// Verificar preferência salva ou preferência do sistema
function getThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        return savedTheme;
    }
    
    // Verificar preferência do sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    
    return 'light';
}

// Aplicar tema
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

// Inicializar tema
const currentTheme = getThemePreference();
applyTheme(currentTheme);

// Toggle theme
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        applyTheme(isDark ? 'light' : 'dark');
        
        // Adicionar pequena animação ao botão
        themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg) scale(1)';
        }, 300);
    });
}

// Detectar mudanças na preferência do sistema
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Só aplicar automaticamente se o usuário não tiver preferência salva
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

/*===== PERFORMANCE: DEBOUNCE SCROLL EVENTS =====*/
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Aplicar debounce aos eventos de scroll
window.addEventListener('scroll', debounce(scrollActive));
window.addEventListener('scroll', debounce(scrollHeader));
window.addEventListener('scroll', debounce(scrollUp));

/*===== PRELOAD CRITICAL RESOURCES =====*/
function preloadResources() {
    const criticalImages = document.querySelectorAll('img[data-preload]');
    criticalImages.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.src;
        document.head.appendChild(link);
    });
}

preloadResources();

/*===== INTERSECTION OBSERVER FOR SECTIONS =====*/
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});

/*===== FORM VALIDATION =====*/
function validateForm() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    let isValid = true;
    
    // Validar nome
    if (nameInput && nameInput.value.trim().length < 3) {
        showError(nameInput, 'Nome deve ter pelo menos 3 caracteres');
        isValid = false;
    } else {
        removeError(nameInput);
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput && !emailRegex.test(emailInput.value)) {
        showError(emailInput, 'Email inválido');
        isValid = false;
    } else {
        removeError(emailInput);
    }
    
    // Validar mensagem
    if (messageInput && messageInput.value.trim().length < 10) {
        showError(messageInput, 'Mensagem deve ter pelo menos 10 caracteres');
        isValid = false;
    } else {
        removeError(messageInput);
    }
    
    return isValid;
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('span');
    
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    `;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
    }
    
    input.style.borderColor = '#ef4444';
}

function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    input.style.borderColor = '#e2e8f0';
}

// Adicionar validação em tempo real
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateForm);
    });
}

/*===== PROJECT FILTER (SE QUISER ADICIONAR FILTROS NO FUTURO) =====*/
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

/*===== CONSOLE MESSAGE =====*/
console.log('%c🚀 Portfólio Desenvolvido por Guilherme Silva', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%c💼 Desenvolvedor Full Stack', 'color: #8b5cf6; font-size: 14px;');
console.log('%c📧 ronaldguilherme044@gmail.com', 'color: #64748b; font-size: 12px;');
console.log('%c🔗 https://github.com/lGuilherme-7', 'color: #64748b; font-size: 12px;');

/*===== EASTER EGG =====*/
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        showNotification('🎮 Konami Code ativado! Você encontrou o easter egg!');
        document.body.style.animation = 'rainbow 2s linear infinite';
    }
});

/*===== ANALYTICS (OPCIONAL) =====*/
function trackEvent(category, action, label) {
    // Integrar com Google Analytics ou outra ferramenta
    console.log('Event tracked:', { category, action, label });
}

// Rastrear cliques em botões importantes
document.querySelectorAll('.button--primary').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('Button', 'Click', button.textContent);
    });
});

/*===== ACCESSIBILITY IMPROVEMENTS =====*/
// Adicionar skip to content
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link';
skipLink.textContent = 'Pular para o conteúdo';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #6366f1;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 10000;
`;
skipLink.addEventListener('focus', function() {
    this.style.top = '0';
});
skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// Melhorar navegação por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Fechar menu mobile
        navMenu.classList.remove('show-menu');
        
        // Fechar FAQ aberta
        faqItems.forEach(item => item.classList.remove('active'));
    }
});

console.log('%c✨ Site carregado com sucesso!', 'color: #10b981; font-size: 14px; font-weight: bold;');