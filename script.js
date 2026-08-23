const root = document.documentElement;
const progress = document.querySelector('.progress');
const glow = document.querySelector('.cursor-glow');
const themeBtn = document.querySelector('.theme-btn');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

document.getElementById('year').textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) root.dataset.theme = savedTheme;

themeBtn.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('portfolio-theme', next);
});

menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max ? (scrollY / max) * 100 : 0}%`;
}, {passive:true});

window.addEventListener('pointermove', e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
}, {passive:true});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const card = document.querySelector('.hero-card');
if (card && matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-.5;
    const y = (e.clientY-r.top)/r.height-.5;
    card.style.transform = `perspective(900px) rotateY(${x*7}deg) rotateX(${-y*7}deg) translateY(-4px)`;
  });
  card.addEventListener('pointerleave', () => card.style.transform = '');
}
