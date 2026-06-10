document.addEventListener("DOMContentLoaded", () => {
    const observerElements = document.querySelectorAll('.scroll-fade, .profile-shadow, .profile-img, .project-card');
    const allScrollElements = document.querySelectorAll('.scroll-fade, .profile-shadow, .profile-img, .project-card, .bg-large-logo, .hand-left, .hand-right, .content-box');

    const observerOptions = {
        root: null,
        threshold: Array.from({ length: 101 }, (_, i) => i / 100)
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const box = entry.target.getBoundingClientRect();
                const viewHeight = window.innerHeight;
                const currentProgress = (box.top + box.height / 2) / viewHeight - 0.5;

                entry.target.style.setProperty('--scroll-progress', currentProgress);
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    observerElements.forEach(el => scrollObserver.observe(el));

    const updateScrollProgress = () => {
        allScrollElements.forEach(el => {
            const box = el.getBoundingClientRect();
            const viewHeight = window.innerHeight;

            if (
                el.classList.contains('content-box') || 
                el.classList.contains('hand-left') || 
                el.classList.contains('hand-right') || 
                el.classList.contains('bg-large-logo')
            ) {
                const currentProgress = (box.top + box.height / 2) / viewHeight - 0.5;
                el.style.setProperty('--scroll-progress', currentProgress);
            } 
            else if (box.top < viewHeight && box.bottom > 0) {
                const currentProgress = (box.top + box.height / 2) / viewHeight - 0.5;
                el.style.setProperty('--scroll-progress', currentProgress);
            }
        });
    };
    
    updateScrollProgress();
    
    window.addEventListener('scroll', updateScrollProgress);
});
