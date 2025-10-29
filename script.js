// Modern minimal interactions (script.js)
console.log('script loaded');

// ========== THEME (dark / light) ==========
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const stored = localStorage.getItem('wylie_theme');
if (stored) root.setAttribute('data-theme', stored);

themeToggle.addEventListener('click', () => {
  const cur = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', cur);
  localStorage.setItem('wylie_theme', cur);
});

// ========== MOBILE MENU ==========
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  nav.style.display = nav.style.display === 'flex' ? '' : 'flex';
});

// ========== SMOOTH SCROLL + ACTIVE NAV ==========
const navLinks = document.querySelectorAll('.nav a');
const sections = document.querySelectorAll('section');

function setActiveOnScroll() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (pageYOffset >= top) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', setActiveOnScroll);
setActiveOnScroll();

// smooth scroll (anchor)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80; // header
      const top = target.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      // close mobile nav
      if (window.innerWidth < 900) nav.style.display = '';
    }
  });
});

// ========== INTERSECTION OBSERVER FADE IN ==========
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('section, .card, .portfolio-item, .mock-window').forEach(el => {
  el.classList.remove('visible');
  io.observe(el);
});

// ========== TO TOP BUTTON ==========
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 360) toTop.classList.add('show');
  else toTop.classList.remove('show');
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ========== CONTACT FORM HANDLING (Netlify) ==========
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    // Netlify handles submission when deployed. Here we show a friendly message quickly.
    // Prevent double-submission while showing success message (Netlify will still record).
    setTimeout(() => {
      contactForm.reset();
      contactForm.style.display = 'none';
      formSuccess.hidden = false;
    }, 350);
  });
}

// ========== PAYONEER INFO BUTTON ==========
const payBtn = document.getElementById('payoneer-info');
if (payBtn) payBtn.addEventListener('click', () => {
  alert('Payoneer: Send to your-payoneer-email@example.com\nPayment terms: 50% upfront, 50% on delivery.');
});
