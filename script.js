const jogos = [

  // =========================================
  // FOCUSLY
  // =========================================
  {
    id: "focusly",

    nome: "Focusly",

    categoria: "marketing",

    categoriaNome: "Parceria com Marketing",

    tipo: "download",

    plataforma: "Windows",

    engine: "Unity",

    genero: [
      "Quiz",
      "Educacional",
      "2D"
    ],

    equipe: [
      "Anny",
      "Arthur"
    ],

    descricao:
      "Um quiz educacional com desafios de Matemática, Geografia, História e Português, sistema de pontuação, tempo, dicas, loja e power-ups.",

    pagina:
      "jogos/focusly.html",

    capa:
      "assets/capas/focusly.png",

    // Focusly NÃO baixa direto pela home.
    // O usuário entra primeiro na página própria.
    acaoDireta: false
  },


  // =========================================
  // VOLTZ EDUCATION
  // =========================================
  {
    id: "voltz-education",

    nome: "Voltz Education",

    categoria: "marketing",

    categoriaNome: "Parceria com Marketing",

    tipo: "site",

    plataforma: "Web",

    engine: "Web",

    genero: [
      "RPG",
      "Educacional",
      "2D"
    ],

    equipe: [
      "Jhonata",
      "Pedro Gabriel",
      "Pedro Vidal"
    ],

    descricao:
      "Um RPG educacional em mundo aberto onde aprendizado, exploração e progressão fazem parte da mesma aventura.",

    link:
      "https://jhonata5790.github.io/Voltz-pages/",

    pagina:
      "jogos/voltz.html",

    capa:
      "assets/capas/voltz.png",

    // Voltz pode ser aberto direto pela home.
    acaoDireta: true
  },


  // =========================================
  // LUZES NA PELE
  // =========================================
  {
    id: "luzes-na-pele",

    nome: "Luzes na Pele",

    categoria: "individual",

    categoriaNome: "Projeto individual",

    tipo: "scratch",

    plataforma: "Scratch",

    engine: "Scratch",

    genero: [
      "Pixel Art",
      "2D",
      "Scratch"
    ],

    equipe: [
      "Nathalie"
    ],

    descricao:
      "Um projeto em pixel art criado no Scratch, com identidade visual marcada por tons terrosos, luzes recortadas e formas pixeladas.",

    link:
      "https://scratch.mit.edu/projects/1204124581",

    pagina:
      "jogos/luzes-na-pele.html",

    capa:
      "assets/capas/luzes-na-pele.svg",

    // Pode abrir o Scratch direto pela home.
    acaoDireta: true
  }

];



/* =========================================
   ELEMENTOS DO HTML
========================================= */

const gamesGrid =
  document.getElementById("gamesGrid");

const emptyState =
  document.getElementById("emptyState");

const filters =
  document.querySelectorAll(".filter");



/* =========================================
   CRIAR CARD
========================================= */

function criarCard(jogo) {

  const card =
    document.createElement("article");


  card.classList.add("game-card");

  card.dataset.category =
    jogo.categoria;

  card.dataset.id =
    jogo.id;



  /* =====================================
     CAPA
  ===================================== */

  let coverHTML = "";


  if (jogo.capa) {

    coverHTML = `
      <img
        src="${jogo.capa}"
        alt="Capa do jogo ${jogo.nome}"
        loading="lazy"
        onerror="this.parentElement.innerHTML = criarPlaceholderHTML('${jogo.nome}')"
      >
    `;

  } else {

    coverHTML =
      criarPlaceholderHTML(jogo.nome);

  }



  /* =====================================
     TAGS
  ===================================== */

  const tagsHTML =
    jogo.genero
      .map(
        genero =>
          `<span>${genero}</span>`
      )
      .join("");



  /* =====================================
     EQUIPE
  ===================================== */

  const equipeHTML =
    jogo.equipe.join(", ");



  /* =====================================
     BOTÃO DIRETO
  ===================================== */

  let botaoDiretoHTML = "";


  if (
    jogo.acaoDireta &&
    jogo.link
  ) {

    botaoDiretoHTML = `
      <a
        href="${jogo.link}"
        target="_blank"
        rel="noopener noreferrer"
        class="game-button play-button"
      >
        ${obterTextoBotao(jogo.tipo)}
      </a>
    `;

  }



  /* =====================================
     HTML DO CARD
  ===================================== */

  card.innerHTML = `

    <div class="game-cover">

      ${coverHTML}

      <span class="game-type">
        ${obterTipo(jogo.tipo)}
      </span>

    </div>


    <div class="game-content">

      <span class="game-category">
        ${jogo.categoriaNome}
      </span>


      <h3>
        ${jogo.nome}
      </h3>


      <p class="game-description">
        ${jogo.descricao}
      </p>


      <div class="game-tags">
        ${tagsHTML}
      </div>


      <div class="game-meta">

        <span>
          ${jogo.plataforma}
        </span>

        <span>
          ${equipeHTML}
        </span>

      </div>


      <div
        class="game-actions
        ${jogo.acaoDireta ? "" : "single-action"}"
      >

        <a
          href="${jogo.pagina}"
          class="game-button details-button"
        >
          Ver detalhes
        </a>


        ${botaoDiretoHTML}

      </div>

    </div>
  `;


  return card;

}



/* =========================================
   PLACEHOLDER
========================================= */

function criarPlaceholderHTML(nome) {

  const iniciais =
    nome
      .split(" ")
      .filter(Boolean)
      .map(
        palavra =>
          palavra.charAt(0)
      )
      .slice(0, 2)
      .join("")
      .toUpperCase();


  return `
    <div class="game-placeholder">

      <span>
        ${iniciais}
      </span>

    </div>
  `;

}



/* =========================================
   TIPO DO JOGO
========================================= */

function obterTipo(tipo) {

  const tipos = {

    site:
      "🌐 Jogo Web",

    scratch:
      "🐱 Scratch",

    download:
      "🎮 Unity",

    webgl:
      "🎮 WebGL"

  };


  return tipos[tipo] ||
    "🎮 Jogo";

}



/* =========================================
   TEXTO DO BOTÃO DIRETO
========================================= */

function obterTextoBotao(tipo) {

  const textos = {

    site:
      "Jogar agora",

    scratch:
      "Abrir Scratch",

    download:
      "Baixar",

    webgl:
      "Jogar agora"

  };


  return textos[tipo] ||
    "Abrir";

}



/* =========================================
   FILTRAR JOGOS
========================================= */

function obterJogosFiltrados(
  filtro
) {

  if (
    filtro === "todos"
  ) {

    return jogos;

  }


  return jogos.filter(
    jogo =>
      jogo.categoria === filtro
  );

}



/* =========================================
   RENDERIZAR
========================================= */

function renderizarJogos(
  filtro = "todos"
) {

  if (!gamesGrid) {
    return;
  }


  gamesGrid.innerHTML = "";


  const jogosFiltrados =
    obterJogosFiltrados(
      filtro
    );



  if (
    jogosFiltrados.length === 0
  ) {

    if (emptyState) {

      emptyState.style.display =
        "block";

    }

    return;

  }



  if (emptyState) {

    emptyState.style.display =
      "none";

  }



  jogosFiltrados.forEach(
    jogo => {

      const card =
        criarCard(jogo);


      gamesGrid.appendChild(
        card
      );

    }
  );

}



/* =========================================
   BOTÕES DOS FILTROS
========================================= */

function iniciarFiltros() {

  filters.forEach(
    botao => {

      botao.addEventListener(
        "click",
        () => {

          filters.forEach(
            item => {

              item.classList.remove(
                "active"
              );

            }
          );


          botao.classList.add(
            "active"
          );


          const filtro =
            botao.dataset.filter;


          renderizarJogos(
            filtro
          );

        }
      );

    }
  );

}



/* =========================================
   ESTATÍSTICAS
========================================= */

function atualizarEstatisticas() {

  const totalJogos =
    jogos.length;


  const totalParcerias =
    jogos.filter(
      jogo =>
        jogo.categoria ===
        "marketing"
    ).length;


  const plataformas =
    new Set(
      jogos.map(
        jogo =>
          jogo.plataforma
      )
    );



  const totalJogosElement =
    document.getElementById(
      "totalJogos"
    );


  const totalParceriasElement =
    document.getElementById(
      "totalParcerias"
    );


  const totalPlataformasElement =
    document.getElementById(
      "totalPlataformas"
    );



  if (totalJogosElement) {

    totalJogosElement.textContent =
      totalJogos;

  }


  if (totalParceriasElement) {

    totalParceriasElement.textContent =
      totalParcerias;

  }


  if (totalPlataformasElement) {

    totalPlataformasElement.textContent =
      plataformas.size;

  }

}



/* =========================================
   ANO AUTOMÁTICO
========================================= */

function atualizarAno() {

  const currentYear =
    document.getElementById(
      "currentYear"
    );


  if (!currentYear) {
    return;
  }


  currentYear.textContent =
    new Date().getFullYear();

}



/* =========================================
   SCROLL SUAVE DOS LINKS INTERNOS
========================================= */

function iniciarScrollInterno() {

  const linksInternos =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  linksInternos.forEach(
    link => {

      link.addEventListener(
        "click",
        event => {

          const href =
            link.getAttribute(
              "href"
            );


          if (
            !href ||
            href === "#"
          ) {
            return;
          }


          const destino =
            document.querySelector(
              href
            );


          if (!destino) {
            return;
          }


          event.preventDefault();


          destino.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    }
  );

}



/* =========================================
   HEADER AO ROLAR
========================================= */

function iniciarHeaderScroll() {

  const header =
    document.querySelector(
      ".header"
    );


  if (!header) {
    return;
  }


  function atualizarHeader() {

    if (
      window.scrollY > 30
    ) {

      header.classList.add(
        "scrolled"
      );

    } else {

      header.classList.remove(
        "scrolled"
      );

    }

  }


  window.addEventListener(
    "scroll",
    atualizarHeader,
    {
      passive: true
    }
  );


  atualizarHeader();

}



/* =========================================
   ANIMAÇÃO SIMPLES DOS CARDS
========================================= */

function iniciarAnimacaoCards() {

  if (
    !("IntersectionObserver" in window)
  ) {
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


            entry.target.classList.add(
              "card-visible"
            );


            observer.unobserve(
              entry.target
            );

          }
        );

      },

      {
        threshold: 0.1
      }

    );



  const cards =
    document.querySelectorAll(
      ".game-card"
    );


  cards.forEach(
    card =>
      observer.observe(card)
  );

}



/* =========================================
   OBSERVAR NOVOS CARDS APÓS FILTROS
========================================= */

function observarCardsAtuais() {

  if (
    !("IntersectionObserver" in window)
  ) {
    return;
  }


  const cards =
    document.querySelectorAll(
      ".game-card"
    );


  cards.forEach(
    card => {

      requestAnimationFrame(
        () => {

          card.classList.add(
            "card-visible"
          );

        }
      );

    }
  );

}



/* =========================================
   RENDER COM ANIMAÇÃO
========================================= */

function renderizarJogosComAnimacao(
  filtro = "todos"
) {

  renderizarJogos(
    filtro
  );


  observarCardsAtuais();

}



/* =========================================
   FILTROS COM ANIMAÇÃO
========================================= */

function iniciarFiltrosComAnimacao() {

  filters.forEach(
    botao => {

      botao.addEventListener(
        "click",
        () => {

          filters.forEach(
            item =>
              item.classList.remove(
                "active"
              )
          );


          botao.classList.add(
            "active"
          );


          renderizarJogosComAnimacao(
            botao.dataset.filter
          );

        }
      );

    }
  );

}



/* =========================================
   INICIAR SITE
========================================= */

function iniciarSite() {

  renderizarJogos();

  atualizarEstatisticas();

  atualizarAno();

  iniciarScrollInterno();

  iniciarHeaderScroll();

  iniciarFiltrosComAnimacao();

  iniciarAnimacaoCards();

}



/* =========================================
   DOM READY
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  iniciarSite
);