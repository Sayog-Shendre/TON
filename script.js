// JavaScript for TON Trading Platform Website
// Enhanced version with proper structure and comprehensive functionality

class TONWebsite {
    constructor() {
        this.charts = {};
        this.animations = {};
        this.isLoaded = false;

        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
    }

    onDOMReady() {
        this.initializeComponents();
        this.setupEventListeners();
        this.initializeAnimations();

        // Wait for all resources to load
        window.addEventListener('load', () => this.onWindowLoad());
    }

    initializeComponents() {
        this.initCharts();
        this.initNavigation();
        this.initScrollAnimations();
        this.initTrainingCards();
        this.initCounterAnimations();
    }

    // Chart Initialization
    initCharts() {
        this.initHeroChart();
        this.initInsightsChart();
    }

    initHeroChart() {
        const ctx = document.getElementById('heroChart');
        if (!ctx) return;

        const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(0, 212, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 212, 255, 0.05)');

        this.charts.hero = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
                datasets: [{
                    label: 'TON Wave',
                    data: [38, 42, 35, 48, 52, 45, 58],
                    borderColor: '#00D4FF',
                    backgroundColor: gradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#00D4FF',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 3,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: '#00D4FF',
                    pointHoverBorderColor: '#ffffff',
                    pointHoverBorderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#00D4FF',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            title: function(context) {
                                return `Time: ${context[0].label}`;
                            },
                            label: function(context) {
                                return `Value: ${context.parsed.y}%`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            color: '#888',
                            font: {
                                size: 11,
                                weight: '500'
                            },
                            padding: 10
                        }
                    },
                    y: {
                        display: false,
                        min: 30,
                        max: 65
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    initInsightsChart() {
        const ctx = document.getElementById('insightsChart');
        if (!ctx) return;

        const ctx2d = ctx.getContext('2d');

        // Create gradients
        const gradient1 = ctx2d.createLinearGradient(0, 0, 0, 150);
        gradient1.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
        gradient1.addColorStop(1, 'rgba(16, 185, 129, 0.05)');

        const gradient2 = ctx2d.createLinearGradient(0, 0, 0, 150);
        gradient2.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
        gradient2.addColorStop(1, 'rgba(59, 130, 246, 0.05)');

        this.charts.insights = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                        label: 'Growth',
                        data: [20, 35, 25, 45, 35, 55],
                        borderColor: '#10b981',
                        backgroundColor: gradient1,
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: '#10b981',
                        pointHoverBorderColor: '#ffffff',
                        pointHoverBorderWidth: 2
                    },
                    {
                        label: 'Performance',
                        data: [15, 25, 35, 30, 45, 40],
                        borderColor: '#3b82f6',
                        backgroundColor: gradient2,
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: '#3b82f6',
                        pointHoverBorderColor: '#ffffff',
                        pointHoverBorderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 2500,
                    easing: 'easeInOutQuart',
                    delay: 500
                }
            }
        });
    }

    // Navigation Setup
    initNavigation() {
        this.setupSmoothScrolling();
        this.setupNavbarScroll();
        this.setupMobileMenu();
    }

    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight - 20;

                    this.smoothScrollTo(targetPosition, 800);

                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            });
        });
    }

    smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeInOutCubic = progress < 0.5 ?
                4 * progress * progress * progress :
                (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;

            window.scrollTo(0, startPosition + distance * easeInOutCubic);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    }

    setupNavbarScroll() {
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Add/remove scrolled class
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll (optional)
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollTop = scrollTop;
        }, {
            passive: true
        });
    }

    setupMobileMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarToggler && navbarCollapse) {
            navbarToggler.addEventListener('click', () => {
                navbarToggler.classList.toggle('active');
            });
        }
    }

    // Animation Systems
    initScrollAnimations() {
        this.setupIntersectionObserver();
        this.setupParallaxEffects();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.animations.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.training-card, .section-title, .hero-title, .hero-subtitle, .insights-visual').forEach(el => {
            this.animations.observer.observe(el);
        });
    }

    animateElement(element) {
        element.classList.add('animate-in');

        // Special animations for specific elements
        if (element.classList.contains('training-card')) {
            const delay = Array.from(element.parentNode.children).indexOf(element) * 150;
            element.style.animationDelay = `${delay}ms`;
        }

        this.animations.observer.unobserve(element);
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.tablet-mockup, .insights-visual');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach((element, index) => {
                const rate = scrolled * -0.5;
                const rate2 = scrolled * 0.3;

                if (index === 0) {
                    element.style.transform = `perspective(1000px) rotateY(-15deg) rotateX(5deg) translateY(${rate * 0.1}px)`;
                } else {
                    element.style.transform = `translateY(${rate2 * 0.1}px)`;
                }
            });
        }, {
            passive: true
        });
    }

    // Training Cards
    initTrainingCards() {
        const trainingCards = document.querySelectorAll('.training-card');

        trainingCards.forEach(card => {
            card.addEventListener('mouseenter', () => this.onCardHover(card, true));
            card.addEventListener('mouseleave', () => this.onCardHover(card, false));

            const button = card.querySelector('.btn');
            if (button) {
                button.addEventListener('click', (e) => this.onCardButtonClick(e, card));
            }
        });
    }

    onCardHover(card, isHovering) {
        if (isHovering) {
            card.style.transform = 'translateY(-15px) scale(1.02)';
            card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        }
    }

    onCardButtonClick(e, card) {
        e.preventDefault();

        const cardTitle = card.querySelector('.card-title').textContent;
        const cardType = this.getCardType(card);

        // Animation feedback
        card.style.transform = 'translateY(-15px) scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        }, 150);

        // Handle different card types
        this.handleTrainingAction(cardType, cardTitle);
    }

    getCardType(card) {
        if (card.classList.contains('pro-level')) return 'pro-level';
        if (card.classList.contains('trade-numbers')) return 'trade-numbers';
        if (card.classList.contains('beginner')) return 'beginner';
        if (card.classList.contains('giveaway')) return 'giveaway';
        return 'unknown';
    }

    handleTrainingAction(type, title) {
        switch (type) {
            case 'giveaway':
                this.showGiveawayModal();
                break;
            default:
                this.startTrainingSession(title);
                break;
        }
    }

    startTrainingSession(title) {
        // Simulate starting a training session
        this.showNotification(`Starting ${title}...`, 'success');

        // Here you would typically:
        // - Redirect to training page
        // - Open training modal
        // - Send analytics event
        console.log(`Training session started: ${title}`);
    }

    showGiveawayModal() {
        this.showNotification('Giveaway registration opened!', 'info');
        // Here you would open a giveaway registration modal
    }

    // Counter Animations
    initCounterAnimations() {
        const counters = document.querySelectorAll('.accuracy-number, .report-amount');

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    animateCounter(element) {
        const text = element.textContent;
        const isPercentage = text.includes('%');
        const isCurrency = text.includes('$');
        const isMultiplier = text.includes('x');

        let finalValue = parseFloat(text.replace(/[^\d.]/g, ''));
        let prefix = '';
        let suffix = '';

        if (isCurrency) prefix = '$';
        if (isPercentage) suffix = '%';
        if (isMultiplier) suffix = 'x';

        this.animateValue(element, 0, finalValue, 2000, prefix, suffix);
    }

    animateValue(element, start, end, duration, prefix = '', suffix = '') {
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            const current = Math.floor(easeOutQuart * (end - start) + start);
            element.textContent = `${prefix}${current}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Window resize handler
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModals();
            }
        });

        // Form handling (if any forms are added)
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        });
    }

    handleResize() {
        // Refresh charts if they exist
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.resize === 'function') {
                chart.resize();
            }
        });
    }

    closeModals() {
        // Close any open modals
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) bsModal.hide();
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        // Process form data
        this.processFormData(formData);
    }

    processFormData(formData) {
        const data = Object.fromEntries(formData);
        console.log('Form data:', data);

        // Here you would typically send data to your backend
        this.showNotification('Form submitted successfully!', 'success');
    }

    // Utility Functions
    debounce(func, wait) {
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

    showNotification(message, type = 'info') {
        // Create and show notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'
        });

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Animation Initialization
    initializeAnimations() {
        // Add CSS for animations if not already present
        if (!document.getElementById('ton-animations')) {
            const style = document.createElement('style');
            style.id = 'ton-animations';
            style.textContent = this.getAnimationCSS();
            document.head.appendChild(style);
        }
    }

    getAnimationCSS() {
        return `
            .animate-in {
                animation: fadeInUp 0.8s ease-out forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .navbar {
                transition: all 0.3s ease;
            }
            
            .navbar.scrolled {
                background-color: rgba(255, 255, 255, 0.95) !important;
                backdrop-filter: blur(10px);
                box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
            }
            
            .training-card {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.3s ease;
            }
            
            .training-card.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .training-card:hover {
                transform: translateY(-10px) scale(1.02) !important;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15) !important;
            }
            
            .hero-title, .hero-subtitle {
                opacity: 0;
                transform: translateY(20px);
            }
            
            .hero-title.animate-in, .hero-subtitle.animate-in {
                opacity: 1;
                transform: translateY(0);
                animation: fadeInUp 0.8s ease-out forwards;
            }
            
            .section-title {
                opacity: 0;
                transform: translateY(20px);
            }
            
            .section-title.animate-in {
                opacity: 1;
                transform: translateY(0);
                animation: fadeInUp 0.6s ease-out forwards;
            }
            
            @media (prefers-reduced-motion: reduce) {
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
        `;
    }

    onWindowLoad() {
        this.isLoaded = true;
        document.body.classList.add('loaded');

        // Trigger initial animations
        setTimeout(() => {
            this.triggerInitialAnimations();
        }, 100);
    }

    triggerInitialAnimations() {
        // Animate hero section elements
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate-in');
            }, index * 200);
        });
    }

    // Public API methods
    refresh() {
        this.handleResize();
    }

    destroy() {
        // Cleanup event listeners and observers
        if (this.animations.observer) {
            this.animations.observer.disconnect();
        }

        // Destroy charts
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
    }
}

// Initialize the website when DOM is ready
const tonWebsite = new TONWebsite();

// Expose to global scope for debugging
window.TONWebsite = tonWebsite;