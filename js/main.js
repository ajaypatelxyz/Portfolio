// year
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

// mobile nav toggle
const nav = document.querySelector('[data-nav]');
const btn = document.querySelector('.nav-toggle');
if (btn && nav) {
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // close on link click (mobile)
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); btn.setAttribute('aria-expanded','false');
  }));
}

// scroll-reveal (IntersectionObserver)
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, {threshold: 0.15});

document.querySelectorAll('.reveal').forEach(el => io.observe(el));
