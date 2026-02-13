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

    /* === SLIDER HERO (VÍDEO) === */
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    let index = 0;

    function updateSlide(n) {
        if (!slides.length) return;
        
        slides.forEach(s => {
            s.classList.remove('is-active');
            const v = s.querySelector('video');
            if(v) {
                v.pause();
                // Silencia o vídeo ao sair do slide
                v.muted = true;
                const icon = s.querySelector('.video-sound-toggle i');
                if(icon) icon.className = 'fa-solid fa-volume-xmark';
            }
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

    /* === GALERIA RESULTADOS (ROLAGEM HORIZONTAL) === */
    const track = document.querySelector('.scrolling-track');
    const testPrev = document.querySelector('.testimonials-prev');
    const testNext = document.querySelector('.testimonials-next');

    if (track && testNext && testPrev) {
        testNext.addEventListener('click', () => {
            const cardWidth = track.querySelector('.testimonial-card').offsetWidth;
            const gap = 20; 
            track.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
        });

        testPrev.addEventListener('click', () => {
            const cardWidth = track.querySelector('.testimonial-card').offsetWidth;
            const gap = 20;
            track.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
        });
    }

    /* === SOM DO VIDEO (UM POR VEZ) === */
    const soundBtns = document.querySelectorAll('.video-sound-toggle');
    const allVideos = document.querySelectorAll('video');

    soundBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const vid = this.parentElement.querySelector('video');
            const icon = this.querySelector('i');
            
            if (vid) {
                if (vid.muted) {
                    // Silencia todos os outros vídeos
                    allVideos.forEach(otherVid => {
                        if (otherVid !== vid) {
                            otherVid.muted = true;
                            const otherIcon = otherVid.parentElement.querySelector('.video-sound-toggle i');
                            if (otherIcon) {
                                otherIcon.className = 'fa-solid fa-volume-xmark';
                            }
                        }
                    });

                    // Ativa o som do vídeo clicado
                    vid.muted = false;
                    icon.className = 'fa-solid fa-volume-high';
                } else {
                    // Muta o vídeo atual
                    vid.muted = true;
                    icon.className = 'fa-solid fa-volume-xmark';
                }
            }
        });
    });

    /* === ENVIO PARA WHATSAPP === */
    const contactForm = document.getElementById('form-agendamento');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Pega os valores
            const nome = document.getElementById('input-nome').value;
            const telefone = document.getElementById('input-telefone').value;
            const interesse = document.getElementById('input-interesse').value;
            
            // Número com código do país (Brasil = 55)
            const numeroWhatsApp = "558594465035";

            // Monta a mensagem
            const mensagem = `Olá, Dra. Paloma! Gostaria de agendar uma consulta.\n\n` +
                             `*Nome:* ${nome}\n` +
                             `*Telefone:* ${telefone}\n` +
                             `*Interesse:* ${interesse}`;

            // Cria o link
            const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

            // Abre
            window.open(url, '_blank');
        });
    }
});