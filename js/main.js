document.addEventListener('DOMContentLoaded', () => {
    
    /* === MENU MOBILE FUNCIONAL === */
    const openBtn = document.getElementById('open-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const overlay = document.getElementById('mobile-menu-overlay');
    const backdrop = document.getElementById('mobile-backdrop');
    const links = document.querySelectorAll('.mobile-link');

    function openMenu() {
        if(overlay) {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMenu() {
        if(overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if(openBtn) openBtn.addEventListener('click', openMenu);
    if(closeBtn) closeBtn.addEventListener('click', closeMenu);
    if(backdrop) backdrop.addEventListener('click', closeMenu);

    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    /* === SLIDER (SEM BOLINHAS) === */
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    let index = 0;

    function updateSlide(n) {
        if (!slides.length) return;
        
        slides.forEach(s => {
            s.classList.remove('is-active');
            const v = s.querySelector('video');
            if(v) v.pause();
        });

        slides[n].classList.add('is-active');
        const v = slides[n].querySelector('video');
        if(v) {
            v.currentTime = 0;
            v.play().catch(()=>{});
        }
    }

    if(nextBtn) nextBtn.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        updateSlide(index);
    });

    if(prevBtn) prevBtn.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        updateSlide(index);
    });

    /* === SOM === */
    const soundBtns = document.querySelectorAll('.video-sound-toggle');
    soundBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const vid = this.parentElement.querySelector('video');
            const icon = this.querySelector('i');
            if (vid) {
                vid.muted = !vid.muted;
                icon.className = vid.muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
            }
        });
    });
});