console.log("✅ script.js is connected!");

// ---------------------------
// 🔹 Smooth Scroll Navigation
// ---------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ---------------------------
// 🔹 Navbar Active Highlight
// ---------------------------
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// inject style for active nav link
const style = document.createElement('style');
style.textContent = `
.nav a.active {
  color: #FF66C4;
  text-shadow: 0 0 10px rgba(255,102,196,0.8);
}
`;
document.head.appendChild(style);

// ---------------------------
// 🔹 Fade-In Scroll Animation
// ---------------------------
const fadeStyle = document.createElement("style");
fadeStyle.textContent = `
  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  section, .about, .services-row, .work-process-text, .faq-text, .portfolio-text, .contact {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s ease;
  }
`;
document.head.appendChild(fadeStyle);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll("section, .about, .services-row, .work-process-text, .faq-text, .portfolio-text, .contact")
  .forEach(el => observer.observe(el));

// ---------------------------
// 🔹 Neon Glow Cursor Effect
// ---------------------------
const glow = document.createElement("div");
glow.style.position = "fixed";
glow.style.width = "100px";
glow.style.height = "100px";
glow.style.borderRadius = "50%";
glow.style.background = "radial-gradient(circle, rgba(168,77,255,0.15), transparent 70%)";
glow.style.pointerEvents = "none";
glow.style.zIndex = "0";
glow.style.transition = "transform 0.12s ease-out";
document.body.appendChild(glow);

window.addEventListener("mousemove", e => {
  glow.style.transform = `translate(${e.clientX - 50}px, ${e.clientY - 50}px)`;
});

// ---------------------------
// 🔹 Scroll-To-Top Button
// ---------------------------
const toTop = document.createElement("button");
toTop.innerHTML = "↑";
toTop.className = "scroll-to-top";
document.body.appendChild(toTop);

const topStyle = document.createElement("style");
topStyle.textContent = `
.scroll-to-top {
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg,#A84DFF 0%,#FF66C4 100%);
  color: #EDEDED;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px rgba(168,77,255,0.5);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 50;
}
.scroll-to-top.show {
  opacity: 1;
  pointer-events: auto;
}
.scroll-to-top:hover {
  transform: scale(1.1);
  box-shadow: 0 0 25px rgba(255,102,196,0.7);
}
`;
document.head.appendChild(topStyle);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    toTop.classList.add("show");
  } else {
    toTop.classList.remove("show");
  }
});

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
