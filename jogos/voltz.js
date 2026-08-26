document.addEventListener(
  "DOMContentLoaded",
  () => {

    atualizarAno();

    iniciarReveal();

    iniciarScrollProgress();

    iniciarHeroParallax();

    iniciarBossTilt();

  }
);



/* =========================================
   ANO
========================================= */

function atualizarAno() {

  const yearElement =
    document.getElementById("currentYear");


  if (!yearElement) {
    return;
  }


  yearElement.textContent =
    new Date().getFullYear();

}



/* =========================================
   REVEAL AO SCROLL
========================================= */

function iniciarReveal() {

  const elements =
    document.querySelectorAll(".reveal");


  if (!("IntersectionObserver" in window)) {

    elements.forEach(
      element =>
        element.classList.add("visible")
    );

    return;
  }


  const observer =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }


          entry.target
            .classList
            .add("visible");


          observer.unobserve(
            entry.target
          );

        });

      },

      {
        threshold: 0.12
      }

    );


  elements.forEach(
    element =>
      observer.observe(element)
  );

}



/* =========================================
   PROGRESSO DA PÁGINA
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


    const totalHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;


    if (totalHeight <= 0) {

      progress.style.width =
        "0%";

      return;

    }


    const percentage =
      (scrollTop / totalHeight) * 100;


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
   PARALLAX HERO
========================================= */

function iniciarHeroParallax() {

  const hero =
    document.querySelector(
      ".voltz-hero"
    );


  const image =
    document.getElementById(
      "heroCover"
    );


  if (!hero || !image) {
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
        (event.clientX -
          rect.left) /
        rect.width;


      const y =
        (event.clientY -
          rect.top) /
        rect.height;


      const moveX =
        (x - 0.5) * 10;


      const moveY =
        (y - 0.5) * 7;


      image.style.transform =
        `
          scale(1.06)
          translate(
            ${moveX}px,
            ${moveY}px
          )
        `;

    }
  );


  hero.addEventListener(
    "mouseleave",
    () => {

      image.style.transform =
        "scale(1.04)";

    }
  );

}



/* =========================================
   BOSS CARDS
========================================= */

function iniciarBossTilt() {

  const cards =
    document.querySelectorAll(
      ".boss-card"
    );


  if (
    window.matchMedia(
      "(pointer: coarse)"
    ).matches
  ) {
    return;
  }


  cards.forEach(card => {

    card.addEventListener(
      "mousemove",
      event => {

        const rect =
          card.getBoundingClientRect();


        const x =
          event.clientX -
          rect.left;


        const y =
          event.clientY -
          rect.top;


        const centerX =
          rect.width / 2;


        const centerY =
          rect.height / 2;


        const rotateX =
          -(
            (y - centerY) /
            centerY
          ) * 2.5;


        const rotateY =
          (
            (x - centerX) /
            centerX
          ) * 2.5;


        card.style.transform =
          `
            translateY(-8px)
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
          `;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform =
          "";

      }
    );

  });

}