document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById('carousel');
    const cards = document.querySelectorAll('.card');
    const numberOfCards = cards.length;
    
    // تحديد عرض الكارت بناءً على حجم الشاشة (موبايل ولا كمبيوتر)
    const cardWidth = window.innerWidth <= 768 ? 290 : 340;
    
    const theta = 360 / numberOfCards; 
    const radius = Math.round((cardWidth / 2) / Math.tan(Math.PI / numberOfCards)) + 35; 
    
    let currentAngle = 0;
    
    cards.forEach((card, index) => {
        const cardAngle = theta * index;
        card.style.transform = `rotateY(${cardAngle}deg) translateZ(${radius}px)`;
    });
    
    function rotateCarousel(direction) {
        currentAngle += direction * theta;
        carousel.style.transform = `translateZ(${-radius}px) rotateY(${currentAngle}deg)`;
    }
    
    carousel.style.transform = `translateZ(${-radius}px) rotateY(0deg)`;
    
    // السكرول بالماوس
    window.addEventListener('wheel', (e) => {
        if (e.deltaY > 0) {
            rotateCarousel(-1);
        } else {
            rotateCarousel(1);
        }
    });
    
    // التاتش والسحب على الموبايل
    let touchStartX = 0;
    let touchEndX = 0;
    
    window.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    window.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 30) rotateCarousel(-1);
        if (touchEndX > touchStartX + 30) rotateCarousel(1);
    }, {passive: true});

    // تغيير اللغة
    const langToggleBtn = document.getElementById('langToggle');
    const translatableElements = document.querySelectorAll('[data-ar]');
    let currentLang = 'ar';

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = currentLang;
        langToggleBtn.textContent = currentLang === 'ar' ? 'EN' : 'عربي';
        
        translatableElements.forEach(el => {
            el.textContent = el.getAttribute(`data-${currentLang}`);
        });
    });
});
