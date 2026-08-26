document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  const progress = document.getElementById("scrollProgress");
  const updateProgress = () => {
    if (!progress) return;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : "0%";
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("visible"));
  }

  const particles = document.getElementById("ambientParticles");
  if (particles) {
    for (let i = 0; i < 34; i += 1) {
      const particle = document.createElement("i");
      const size = Math.random() * 3 + 2;
      particle.style.width = size + "px";
      particle.style.height = size + "px";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.animationDuration = (Math.random() * 8 + 7) + "s";
      particle.style.animationDelay = (Math.random() * -15) + "s";
      particles.appendChild(particle);
    }
  }

  const scene = document.getElementById("menuScene");
  if (scene && !window.matchMedia("(pointer: coarse)").matches) {
    const layers = scene.querySelectorAll(".scene-layer");
    window.addEventListener("mousemove", event => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      layers.forEach((layer, index) => {
        const amount = (index + 1) * 3;
        layer.style.transform = `scale(1.025) translate(${x * amount}px, ${y * amount}px)`;
      });
    });
  }
});