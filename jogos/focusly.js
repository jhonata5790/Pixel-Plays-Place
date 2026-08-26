document.addEventListener(
  "DOMContentLoaded",
  () => {

    atualizarAno();

    iniciarReveal();

    iniciarScrollProgress();

    iniciarLightbox();

    iniciarHeroParallax();

  }
);



/* =========================================
   ANO
========================================= */

function atualizarAno() {

  const year =
    document.getElementById(
      "currentYear"
    );


  if (!year) {
    return;
  }


  year.textContent =
    new Date().getFullYear();

}



/* =========================================
   REVEAL
========================================= */

function iniciarReveal() {

  const elements =
    document.querySelectorAll(
      ".reveal"
    );


  if (
    !("IntersectionObserver" in window)
  ) {

    elements.forEach(
      element =>
        element.classList.add(
          "visible"
        )
    );

    return;

  }


  const observer =
    new IntersectionObserver(

      entries => {

        entries.forEach(
          entry => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }


            entry.target
              .classList
              .add(
                "visible"
              );


            observer.unobserve(
              entry.target
            );

          }
        );

      },

      {
        threshold: 0.12
      }

    );


  elements.forEach(
    element =>
      observer.observe(
        element
      )
  );

}



/* =========================================
   PROGRESSO DO SCROLL
========================================= */

function iniciarScrollProgress() {

  const progress =
    document.getElementById(
      "scrollProgress"
    );


  if (!progress) {
    return;
  }


  function atualizar() {

    const scrollTop =
      window.scrollY;


    const total =
      document.documentElement
        .scrollHeight -
      window.innerHeight;


    if (total <= 0) {

      progress.style.width =
        "0%";

      return;

    }


    const percentage =
      (
        scrollTop /
        total
      ) * 100;


    progress.style.width =
      `${percentage}%`;

  }


  window.addEventListener(
    "scroll",
    atualizar,
    {
      passive: true
    }
  );


  atualizar();

}



/* =========================================
   LIGHTBOX
========================================= */

function iniciarLightbox() {

  const lightbox =
    document.getElementById(
      "lightbox"
    );


  const lightboxImage =
    document.getElementById(
      "lightboxImage"
    );


  const close =
    document.getElementById(
      "lightboxClose"
    );


  const screenshots =
    document.querySelectorAll(
      ".screenshot[data-image]"
    );


  if (
    !lightbox ||
    !lightboxImage
  ) {
    return;
  }



  screenshots.forEach(
    screenshot => {

      screenshot.addEventListener(
        "click",
        () => {

          const src =
            screenshot.dataset.image;


          lightboxImage.src =
            src;


          lightbox.classList.add(
            "active"
          );


          document.body.style.overflow =
            "hidden";

        }
      );

    }
  );



  function fecharLightbox() {

    lightbox.classList.remove(
      "active"
    );


    document.body.style.overflow =
      "";


    lightboxImage.src =
      "";

  }



  if (close) {

    close.addEventListener(
      "click",
      fecharLightbox
    );

  }



  lightbox.addEventListener(
    "click",
    event => {

      if (
        event.target === lightbox
      ) {

        fecharLightbox();

      }

    }
  );



  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        fecharLightbox();

      }

    }
  );

}



/* =========================================
   PARALLAX DA CAPA
========================================= */

function iniciarHeroParallax() {

  const hero =
    document.querySelector(
      ".hero-visual"
    );


  const cover =
    document.querySelector(
      ".hero-cover"
    );


  if (
    !hero ||
    !cover
  ) {
    return;
  }


  if (
    window.matchMedia(
      "(pointer: coarse)"
    ).matches
  ) {
    return;
  }



  hero.addEventListener(
    "mousemove",
    event => {

      const rect =
        hero.getBoundingClientRect();


      const x =
        (
          event.clientX -
          rect.left
        ) /
        rect.width;


      const y =
        (
          event.clientY -
          rect.top
        ) /
        rect.height;


      const rotateY =
        (
          x -
          0.5
        ) * 4;


      const rotateX =
        -(
          y -
          0.5
        ) * 4;


      cover.style.transform =
        `
          perspective(900px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
        `;

    }
  );



  hero.addEventListener(
    "mouseleave",
    () => {

      cover.style.transform =
        "rotate(-2deg)";

    }
  );

}