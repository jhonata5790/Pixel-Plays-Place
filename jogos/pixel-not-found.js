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

  const words = document.querySelectorAll(".glitch-bg span");
  if (!window.matchMedia("(pointer: coarse)").matches) {
    window.addEventListener("mousemove", event => {
      const x = (event.clientX / window.innerWidth - 0.5) * 10;
      const y = (event.clientY / window.innerHeight - 0.5) * 10;
      words.forEach((word, index) => {
        const factor = (index + 1) * 0.18;
        word.style.marginLeft = `${x * factor}px`;
        word.style.marginTop = `${y * factor}px`;
      });
    });
  }
});