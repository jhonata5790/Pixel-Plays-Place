const jogos = [
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
      "Jhonata"
    ],

    descricao:
      "Um RPG educacional onde aprendizado, exploração e progressão se encontram em uma experiência criada para transformar o estudo em aventura.",

    link:
      "https://jhonata5790.github.io/Voltz-pages/",

    pagina:
      "jogos/voltz.html",

    /*
      Quando você tiver uma capa:

      capa: "assets/capas/voltz.png"

      Enquanto estiver vazio, o site cria
      automaticamente um banner estilizado.
    */
    capa: "assets/capas/voltz.png"
  }
];



const gamesGrid =
  document.getElementById("gamesGrid");

const emptyState =
  document.getElementById("emptyState");

const filters =
  document.querySelectorAll(".filter");



function criarCard(jogo) {

  const card =
    document.createElement("article");

  card.classList.add("game-card");


  let coverHTML = "";

  if (jogo.capa) {

    coverHTML = `
      <img
        src="${jogo.capa}"
        alt="Capa do jogo ${jogo.nome}"
      >
    `;

  } else {

    const initials =
      jogo.nome
        .split(" ")
        .map(palavra => palavra[0])
        .slice(0, 2)
        .join("");

    coverHTML = `
      <div class="game-placeholder">
        <span>${initials}</span>
      </div>
    `;
  }


  const tagsHTML =
    jogo.genero
      .map(tag => `<span>${tag}</span>`)
      .join("");


  const equipeHTML =
    jogo.equipe.join(", ");


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


      <div class="game-actions">

        <a
          href="${jogo.pagina}"
          class="game-button details-button"
        >
          Ver detalhes
        </a>


        <a
          href="${jogo.link}"
          target="_blank"
          rel="noopener noreferrer"
          class="game-button play-button"
        >
          ${obterTextoBotao(jogo.tipo)}
        </a>

      </div>

    </div>
  `;


  return card;
}



function obterTipo(tipo) {

  const tipos = {
    site: "🌐 Jogo Web",
    scratch: "🐱 Scratch",
    download: "⬇ Download",
    webgl: "🎮 WebGL"
  };

  return tipos[tipo] || "🎮 Jogo";
}



function obterTextoBotao(tipo) {

  const botoes = {
    site: "Jogar agora",
    scratch: "Abrir Scratch",
    download: "Baixar",
    webgl: "Jogar agora"
  };

  return botoes[tipo] || "Abrir";
}



function renderizarJogos(filtro = "todos") {

  gamesGrid.innerHTML = "";


  const jogosFiltrados =
    filtro === "todos"
      ? jogos
      : jogos.filter(
          jogo => jogo.categoria === filtro
        );


  if (jogosFiltrados.length === 0) {

    emptyState.style.display = "block";

    return;

  }


  emptyState.style.display = "none";


  jogosFiltrados.forEach(jogo => {

    const card =
      criarCard(jogo);

    gamesGrid.appendChild(card);

  });
}



filters.forEach(botao => {

  botao.addEventListener("click", () => {

    filters.forEach(item =>
      item.classList.remove("active")
    );


    botao.classList.add("active");


    const filtro =
      botao.dataset.filter;


    renderizarJogos(filtro);

  });

});



function atualizarEstatisticas() {

  const totalJogos =
    jogos.length;


  const totalParcerias =
    jogos.filter(
      jogo =>
        jogo.categoria === "marketing"
    ).length;


  const plataformas =
    new Set(
      jogos.map(
        jogo => jogo.plataforma
      )
    );


  document.getElementById(
    "totalJogos"
  ).textContent =
    totalJogos;


  document.getElementById(
    "totalParcerias"
  ).textContent =
    totalParcerias;


  document.getElementById(
    "totalPlataformas"
  ).textContent =
    plataformas.size;
}



function atualizarAno() {

  const ano =
    new Date().getFullYear();

  document.getElementById(
    "currentYear"
  ).textContent =
    ano;
}



function iniciarSite() {

  renderizarJogos();

  atualizarEstatisticas();

  atualizarAno();

}



document.addEventListener(
  "DOMContentLoaded",
  iniciarSite
);