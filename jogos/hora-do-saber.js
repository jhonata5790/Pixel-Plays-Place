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

  const sky = document.getElementById("pixelSky");
  if (sky) {
    for (let i = 0; i < 34; i += 1) {
      const pixel = document.createElement("i");
      const size = Math.random() * 4 + 2;
      pixel.style.width = size + "px";
      pixel.style.height = size + "px";
      pixel.style.left = Math.random() * 100 + "%";
      pixel.style.top = Math.random() * 100 + "%";
      pixel.style.animationDuration = (Math.random() * 9 + 8) + "s";
      pixel.style.animationDelay = (Math.random() * -16) + "s";
      sky.appendChild(pixel);
    }
  }
});