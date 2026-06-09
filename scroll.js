document.addEventListener("DOMContentLoaded", () => {
    const scrollElements = document.querySelectorAll('.scroll-fade, .bg-large-logo, .hand-left, .hand-right, .content-box, .profile-shadow, .profile-img, .project-card');

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

    scrollElements.forEach(el => scrollObserver.observe(el));

    window.addEventListener('scroll', () => {
        scrollElements.forEach(el => {
            const box = el.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            if (box.top < viewHeight && box.bottom > 0) {
                const currentProgress = (box.top + box.height / 2) / viewHeight - 0.5;
                el.style.setProperty('--scroll-progress', currentProgress);
            }
        });
    });
});
