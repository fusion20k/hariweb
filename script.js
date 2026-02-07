document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const isActive = navLinks.classList.contains('active');
            if (isActive) {
                menuToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
            } else {
                menuToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
            }
        });
    }

    links.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (menuToggle) {
                    menuToggle.textContent = '☰';
                }
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .step, .section-title');
    animatedElements.forEach(el => observer.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const immersionSlider = document.getElementById('immersionSlider');
    const sliderPercentage = document.getElementById('sliderPercentage');

    if (immersionSlider && sliderPercentage) {
        immersionSlider.addEventListener('input', function() {
            const value = this.value;
            sliderPercentage.textContent = value + '%';
            
            const percentage = (value - this.min) / (this.max - this.min);
            const gradientColor = `linear-gradient(to right, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.6) ${percentage * 100}%, rgba(255, 255, 255, 0.3) ${percentage * 100}%, rgba(255, 255, 255, 0.3) 100%)`;
            this.style.background = gradientColor;
        });

        const initialValue = immersionSlider.value;
        const initialPercentage = (initialValue - immersionSlider.min) / (immersionSlider.max - immersionSlider.min);
        const initialGradient = `linear-gradient(to right, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.6) ${initialPercentage * 100}%, rgba(255, 255, 255, 0.3) ${initialPercentage * 100}%, rgba(255, 255, 255, 0.3) 100%)`;
        immersionSlider.style.background = initialGradient;
    }
});
