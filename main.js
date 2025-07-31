document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // Close menu on window resize if it becomes desktop view
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Enhanced Calendly Integration
    function loadCalendly() {
        return new Promise((resolve, reject) => {
            if (typeof Calendly !== 'undefined') {
                return resolve();
            }

            const script = document.createElement('script');
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async function handleCalendlyClick(e) {
        e.preventDefault();
        
        try {
            await loadCalendly();
            
            Calendly.initPopupWidget({
                url: 'https://calendly.com/derulokell/30min',
                prefill: {
                    name: '',
                    email: '',
                    phone: ''
                },
                utm: {}
            });
        } catch (error) {
            console.error('Calendly failed to load:', error);
            // Fallback - open in new tab
            window.open('https://calendly.com/derulokell/30min', '_blank');
        }
    }

    // Setup all Calendly buttons
    document.querySelectorAll('[data-calendly]').forEach(button => {
        button.addEventListener('click', handleCalendlyClick);
    });

    // Rest of your existing JavaScript...
    // (Testimonial slider, FAQ accordion, etc.)
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    
    function showSlide(n) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;
        
        testimonialSlides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-rotate testimonials
    let slideInterval = setInterval(nextSlide, 5000);
    
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    nextBtn.addEventListener('click', resetInterval);
    prevBtn.addEventListener('click', resetInterval);
    dots.forEach(dot => {
        dot.addEventListener('click', resetInterval);
    });
    
// Enhanced Package Tabs with Animation - Put this inside DOMContentLoaded
function initPackageTabs() {
    const packageTabs = document.querySelectorAll('.package-tab');
    const packageContents = document.querySelectorAll('.package-content');

    packageTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const currentActiveTab = document.querySelector('.package-tab.active');
            const currentActiveContent = document.querySelector('.package-content.active');
            
            // Only proceed if clicking a different tab
            if (this !== currentActiveTab) {
                // Remove active classes
                currentActiveTab.classList.remove('active');
                currentActiveContent.classList.remove('active');
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Get the content to show
                const contentToShow = document.getElementById(tabId);
                
                // Determine animation direction
                const currentIndex = Array.from(packageTabs).indexOf(currentActiveTab);
                const newIndex = Array.from(packageTabs).indexOf(this);
                
                // Reset animation classes
                contentToShow.classList.remove('slide-left');
                
                // Add appropriate animation class
                if (newIndex > currentIndex) {
                    contentToShow.classList.add('active');
                } else {
                    contentToShow.classList.add('active', 'slide-left');
                }
            }
        });
    });
}

// Call this in your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // ... other code ...
    initPackageTabs();
    // ... other code ...
});
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = question.classList.contains('active');
            
            // Close all other FAQs
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = null;
                }
            });
            
            // Toggle current FAQ
            question.classList.toggle('active');
            
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Navbar Scroll Effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Scroll Animation
    const animateElements = document.querySelectorAll('[data-animate]');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});