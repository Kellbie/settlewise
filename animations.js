document.addEventListener('DOMContentLoaded', function() {
    // Background elements animation
    const bgElements = document.querySelectorAll('.circle, .square');
    
    bgElements.forEach(element => {
        // Randomize initial position and animation duration
        const randomX = Math.random() * 20 - 10;
        const randomY = Math.random() * 20 - 10;
        const duration = 15 + Math.random() * 20;
        
        element.style.transform = `translate(${randomX}px, ${randomY}px)`;
        element.style.animationDuration = `${duration}s`;
    });
    
    // Floating cards animation in hero
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach(card => {
        // Random slight rotation for more natural look
        const randomRotate = Math.random() * 10 - 5;
        card.style.transform = `rotate(${randomRotate}deg)`;
    });
    
    // Hover effects for cards and buttons
    const interactiveElements = document.querySelectorAll('.addon-card, .package-card, .contact-card, .btn, .cta-primary, .cta-secondary');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Animated gradient for highlighted elements
    const highlightedElements = document.querySelectorAll('.package-card.highlighted, .contact-card.highlighted');
    
    highlightedElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const x = e.pageX - this.offsetLeft;
            const y = e.pageY - this.offsetTop;
            
            this.style.setProperty('--mouse-x', x);
            this.style.setProperty('--mouse-y', y);
        });
    });
    
    // Typewriter effect for hero subtitle (optional)
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 30);
    }
    
    // Parallax effect for hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        });
    }
    
    // Animated checkmarks in package features
    const checkmarks = document.querySelectorAll('.package-features i.fa-check');
    
    checkmarks.forEach(check => {
        check.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.2)';
        });
        
        check.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Ripple effect for buttons
    const buttons = document.querySelectorAll('.btn, .cta-primary, .cta-secondary, .form-submit');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
});