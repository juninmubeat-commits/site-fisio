document.addEventListener('DOMContentLoaded', () => {
    
  /* ============================================================
     1. CONTROLE DO MENU MOBILE (MODAL)
     ============================================================ */
  try {
      const navToggle = document.getElementById('open-menu-btn');
      const closeBtn = document.getElementById('close-menu-btn');
      const mobileOverlay = document.getElementById('mobile-menu-overlay');
      const mobileBackdrop = document.getElementById('mobile-backdrop');
      const mobileLinks = document.querySelectorAll('.mobile-link');

      function openMenu() {
          if (mobileOverlay) {
              mobileOverlay.classList.add('active');
              document.body.style.overflow = 'hidden'; // Trava rolagem
          }
      }

      function closeMenu() {
          if (mobileOverlay) {
              mobileOverlay.classList.remove('active');
              document.body.style.overflow = ''; // Destrava rolagem
          }
      }

      // Adiciona eventos apenas se os elementos existirem (Evita erros)
      if (navToggle) navToggle.addEventListener('click', openMenu);
      if (closeBtn) closeBtn.addEventListener('click', closeMenu);
      if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMenu);

      // Fecha ao clicar nos links
      mobileLinks.forEach(link => {
          link.addEventListener('click', closeMenu);
      });
  } catch (error) {
      console.error("Erro no Menu Mobile:", error);
  }

  /* ============================================================
     2. CONTROLE DO CARROSSEL E VÍDEOS (FORÇAR PLAY)
     ============================================================ */
  try {
      const slides = document.querySelectorAll('.hero-slide');
      const dots = document.querySelectorAll('.hero-dot');
      const prevBtn = document.querySelector('.hero-prev');
      const nextBtn = document.querySelector('.hero-next');
      let currentSlide = 0;

      // Função para mostrar o slide e tocar o vídeo
      function showSlide(index) {
          if (!slides.length) return;

          // 1. Esconde todos os slides e pausa vídeos antigos
          slides.forEach(s => {
              s.classList.remove('is-active');
              const vid = s.querySelector('video');
              if (vid) {
                  vid.pause();
                  vid.currentTime = 0; // Reinicia o vídeo
              }
          });
          
          // 2. Reseta as bolinhas
          dots.forEach(d => d.classList.remove('is-active'));

          // 3. Ativa o slide atual
          if (slides[index]) {
              slides[index].classList.add('is-active');
              
              // 4. FORÇA O PLAY DO VÍDEO ATUAL
              const currentVid = slides[index].querySelector('video');
              if (currentVid) {
                  // Pequeno delay para garantir que o slide está visível antes de dar play
                  setTimeout(() => {
                      const playPromise = currentVid.play();
                      if (playPromise !== undefined) {
                          playPromise.then(_ => {
                              // Vídeo começou a tocar com sucesso
                          }).catch(error => {
                              console.log("Autoplay bloqueado pelo navegador (normal se não houve interação):", error);
                              // Se bloqueado, garantimos que está mudo para tentar de novo
                              currentVid.muted = true;
                              currentVid.play();
                          });
                      }
                  }, 100);
              }
          }

          // 4. Ativa a bolinha atual
          if (dots[index]) dots[index].classList.add('is-active');
      }

      // Botão Próximo
      if (nextBtn) {
          nextBtn.addEventListener('click', () => {
              currentSlide = (currentSlide + 1) % slides.length;
              showSlide(currentSlide);
          });
      }

      // Botão Anterior
      if (prevBtn) {
          prevBtn.addEventListener('click', () => {
              currentSlide = (currentSlide - 1 + slides.length) % slides.length;
              showSlide(currentSlide);
          });
      }

      // Clique nas bolinhas
      dots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
              currentSlide = index;
              showSlide(currentSlide);
          });
      });

      // Garante que o primeiro vídeo rode ao carregar a página
      // showSlide(0); // O HTML já tem a classe 'is-active', mas isso força o play

  } catch (error) {
      console.error("Erro no Slider:", error);
  }

  /* ============================================================
     3. CONTROLE DO BOTÃO DE SOM (MUDO / COM SOM)
     ============================================================ */
  try {
      const soundButtons = document.querySelectorAll('.video-sound-toggle');
      
      soundButtons.forEach(btn => {
          btn.addEventListener('click', function(e) {
              // Impede que o clique passe para outros elementos
              e.stopPropagation();
              e.preventDefault();

              // Procura o vídeo dentro do mesmo container (pai)
              const container = this.closest('.hero-main-image');
              const video = container ? container.querySelector('video') : null;
              const icon = this.querySelector('i');
              
              if (video) {
                  // Inverte o estado do mudo
                  video.muted = !video.muted;
                  
                  // Atualiza o ícone
                  if (video.muted) {
                      icon.className = 'fa-solid fa-volume-xmark';
                  } else {
                      icon.className = 'fa-solid fa-volume-high';
                      // Garante que está tocando se alguém ativar o som
                      video.play(); 
                  }
              }
          });
      });
  } catch (error) {
      console.error("Erro no Botão de Som:", error);
  }
});