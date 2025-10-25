/**
 * Cloud Cost Optimization Landing Page
 * Interactive Features and Form Validation
 */

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initNavbar();
    initFAQ();
    initContactForm();
    initBackToTop();
    initSmoothScroll();
    initMobileMenu();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

/**
 * FAQ Accordion functionality
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/**
 * Contact Form Validation and Submission
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous errors
        clearErrors();

        // Validate form
        const isValid = validateForm();

        if (isValid) {
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const btnText = submitButton.querySelector('.btn-text');
            const btnLoading = submitButton.querySelector('.btn-loading');

            submitButton.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';

            // Simulate form submission (replace with actual API call)
            try {
                await submitForm(new FormData(form));

                // Show success message
                form.style.display = 'none';
                formSuccess.style.display = 'flex';

                // Reset form after 5 seconds
                setTimeout(() => {
                    form.reset();
                    form.style.display = 'grid';
                    formSuccess.style.display = 'none';
                    submitButton.disabled = false;
                    btnText.style.display = 'block';
                    btnLoading.style.display = 'none';
                }, 5000);

            } catch (error) {
                console.error('Form submission error:', error);
                alert('Si è verificato un errore. Per favore riprova o contattami direttamente.');

                submitButton.disabled = false;
                btnText.style.display = 'block';
                btnLoading.style.display = 'none';
            }
        }
    });
}

/**
 * Form validation
 */
function validateForm() {
    let isValid = true;

    // Name validation
    const name = document.getElementById('name');
    if (name.value.trim() === '') {
        showError(name, 'Il nome è obbligatorio');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError(name, 'Il nome deve contenere almeno 2 caratteri');
        isValid = false;
    }

    // Email validation
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        showError(email, 'L\'email è obbligatoria');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(email, 'Inserisci un\'email valida');
        isValid = false;
    }

    // Cloud provider validation
    const cloudProvider = document.getElementById('cloudProvider');
    if (cloudProvider.value === '') {
        showError(cloudProvider, 'Seleziona un provider cloud');
        isValid = false;
    }

    // Monthly spend validation
    const monthlySpend = document.getElementById('monthlySpend');
    if (monthlySpend.value === '') {
        showError(monthlySpend, 'Seleziona la spesa mensile stimata');
        isValid = false;
    }

    // Message validation
    const message = document.getElementById('message');
    if (message.value.trim() === '') {
        showError(message, 'Il messaggio è obbligatorio');
        isValid = false;
    } else if (message.value.trim().length < 20) {
        showError(message, 'Il messaggio deve contenere almeno 20 caratteri');
        isValid = false;
    }

    // Privacy checkbox validation
    const privacy = document.getElementById('privacy');
    if (!privacy.checked) {
        showError(privacy, 'Devi accettare l\'informativa sulla privacy');
        isValid = false;
    }

    return isValid;
}

/**
 * Show error message for a field
 */
function showError(field, message) {
    field.classList.add('error');
    const errorMessage = field.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }

    // Remove error on input
    field.addEventListener('input', () => {
        field.classList.remove('error');
        if (errorMessage) {
            errorMessage.classList.remove('show');
        }
    }, { once: true });
}

/**
 * Clear all error messages
 */
function clearErrors() {
    const errorFields = document.querySelectorAll('.error');
    const errorMessages = document.querySelectorAll('.error-message.show');

    errorFields.forEach(field => field.classList.remove('error'));
    errorMessages.forEach(msg => msg.classList.remove('show'));
}

/**
 * Submit form data to Web3Forms
 */
async function submitForm(formData) {
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            console.log('Form submitted successfully');
            return data;
        } else {
            throw new Error(data.message || 'Form submission failed');
        }
    } catch (error) {
        console.error('Submission error:', error);
        throw error;
    }
}

/**
 * Back to top button
 */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);

            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const mobileMenu = document.querySelector('.nav-links');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!mobileMenuToggle) return;

    mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';

        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');

        // Toggle icon between menu and X
        const icon = mobileMenuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }

        // Reinitialize icons
        lucide.createIcons();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');

            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        }
    });
}

/**
 * Intersection Observer for fade-in animations
 * Optional: Add data-animate attribute to elements you want to animate
 */
function initAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Add phone number formatting
 */
document.getElementById('phone')?.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.startsWith('39')) {
        value = value.substring(2);
    }

    if (value.length > 10) {
        value = value.substring(0, 10);
    }

    if (value.length > 0) {
        if (value.length <= 3) {
            e.target.value = '+39 ' + value;
        } else if (value.length <= 6) {
            e.target.value = '+39 ' + value.substring(0, 3) + ' ' + value.substring(3);
        } else {
            e.target.value = '+39 ' + value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
        }
    }
});

/**
 * Console welcome message
 */
console.log('%c👋 Ciao! ', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cStai cercando di ottimizzare i tuoi costi cloud? Parliamone!', 'font-size: 14px; color: #6b7280;');
console.log('%cContattami: +39 392 075 2599 | contact@tommasopatriti.me', 'font-size: 12px; color: #2563eb;');
