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

// EmailJS contact form submit
(() => {
  const form = document.getElementById('contact-form');
  if (!form || typeof window === 'undefined' || !window.emailjs) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const { service: serviceId, template: templateId, publicKey } = form.dataset;

  if (!serviceId || !templateId || !publicKey) {
    console.warn('[EmailJS] Missing data attributes on #contact-form: data-service, data-template, data-public-key');
    return;
  }

  emailjs.init({ publicKey });

  let statusEl = document.createElement('p');
  statusEl.className = 'form-status';
  statusEl.setAttribute('role', 'status');
  statusEl.setAttribute('aria-live', 'polite');
  statusEl.style.marginTop = '8px';
  form.appendChild(statusEl);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = '';
    if (submitButton) {
      submitButton.disabled = true;
    }
    const originalText = submitButton ? submitButton.textContent : '';
    if (submitButton) submitButton.textContent = 'Sending...';
    try {
      await emailjs.sendForm(serviceId, templateId, form);
      statusEl.textContent = 'Thanks! Your message has been sent.';
      statusEl.style.color = '#34d399';
      form.reset();
    } catch (err) {
      statusEl.textContent = 'Sorry, something went wrong. Please try again later.';
      statusEl.style.color = '#f87171';
      console.error('[EmailJS] send error:', err);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    }
  });
})();