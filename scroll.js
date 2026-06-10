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
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
        updateScrollProgress();
    });

    
    const rouletteList = document.querySelector('.roulette-list');
    const rouletteItems = document.querySelectorAll('.roulette-item');
    
    if (rouletteList && rouletteItems.length > 0) {
        const totalItems = rouletteItems.length;
        
        rouletteList.style.transition = 'none';

        let currentIndex = 0;

        const spinJackpot = () => {
            const targetIndex = (currentIndex + 1) % totalItems;
            currentIndex = targetIndex;

            const itemHeight = rouletteItems[0].offsetHeight;
            
            const startY = parseFloat(rouletteList.style.transform.replace(/[^0-9.-]/g, '')) || 0;

            const targetY = -(targetIndex * itemHeight) - (totalItems * itemHeight * 4);

            let currentY = startY;
            let speed = 30; // 회전 속도
            const friction = 0.95; // 브레이크 감속 비율 (0.95~0.98 사이. 1에 가까울수록 천천히 멈춤)
            const minSpeed = 0.5; // 최소 속도 제한

            const animate = () => {
                speed *= friction;

                currentY -= speed;

                if (currentY <= targetY || speed < minSpeed) {
                    const finalY = -(targetIndex * itemHeight);
                    rouletteList.style.transform = `translateY(${finalY}px)`;
                    
                    setTimeout(spinJackpot, 2500);
                    return;
                }

                rouletteList.style.transform = `translateY(${currentY}px)`;
                
                requestAnimationFrame(animate);
            };

            requestAnimationFrame(animate);
        };

        setTimeout(spinJackpot, 1500);
    }
});
