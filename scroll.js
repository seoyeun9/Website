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
    const originalItems = document.querySelectorAll('.roulette-item');
    
    if (rouletteList && originalItems.length > 0) {
        const itemHeight = originalItems[0].offsetHeight;
        const totalOriginal = originalItems.length;

        
        const firstClone = originalItems[0].cloneNode(true);
        const lastClone = originalItems[totalOriginal - 1].cloneNode(true);
        
        rouletteList.appendChild(firstClone);
        rouletteList.insertBefore(lastClone, originalItems[0]);

        
        let currentRealIndex = 0; 
        rouletteList.style.transition = 'none';
        rouletteList.style.transform = `translateY(${-itemHeight}px)`;


        let isSpinning = false;

        const startInfiniteSpin = () => {
            if (isSpinning) return;
            isSpinning = true;


            currentRealIndex = (currentRealIndex + 1) % totalOriginal;

            rouletteList.style.transition = 'transform 2.5s cubic-bezier(0.15, 0.85, 0.35, 1)';
            
            const targetVirtualIndex = currentRealIndex + totalOriginal;
            rouletteList.style.transform = `translateY(${-(targetVirtualIndex + 1) * itemHeight}px)`;


            setTimeout(() => {
                rouletteList.style.transition = 'none';
                rouletteList.style.transform = `translateY(${-(currentRealIndex + 1) * itemHeight}px)`;
                
                isSpinning = false;
                
                setTimeout(startInfiniteSpin, 2500);
            }, 2500); // transition 시간과 일치시킴
        };

        // 페이지 켜지고 1.5초 뒤 첫 가동
        setTimeout(startInfiniteSpin, 1500);
    }
});
