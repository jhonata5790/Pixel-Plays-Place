document.addEventListener("DOMContentLoaded", () => {
  atualizarAno();
  iniciarReveal();
  iniciarScrollProgress();
  iniciarParallaxPixelado();
});

function atualizarAno() {
  const year = document.getElementById("currentYear");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

function iniciarReveal() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12
  });

  elements.forEach(element => observer.observe(element));
}

function iniciarScrollProgress() {
  const progress = document.getElementById("scrollProgress");
  if (!progress) return;

  function atualizar() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = total > 0 ? (window.scrollY / total) * 100 : 0;
    progress.style.width = `${percentage}%`;
  }

  window.addEventListener("scroll", atualizar, { passive: true });
  atualizar();
}

function iniciarParallaxPixelado() {
  const hero = document.querySelector(".hero");
  const layers = document.querySelectorAll(".hero-pixels[data-depth]");

  if (!hero || layers.length === 0) return;

  if (window.matchMedia("(pointer: coarse)").matches) return;

  hero.addEventListener("mousemove", event => {
    const rect = hero.getBoundingClientRect();
    const normalizedX = ((event.clientX - rect.left) / rect.width) - 0.5;
    const normalizedY = ((event.clientY - rect.top) / rect.height) - 0.5;

    layers.forEach(layer => {
      const depth = Number(layer.dataset.depth || 10);
      const moveX = normalizedX * depth;
      const moveY = normalizedY * depth;
      layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  hero.addEventListener("mouseleave", () => {
    layers.forEach(layer => {
      layer.style.transform = "translate(0, 0)";
    });
  });
}
