// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const siteNav = document.getElementById('siteNav');
if (hamburger && siteNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
  // Close menu when clicking a link (mobile)
  siteNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      siteNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const setActive = () => {
  let current = '';
  sections.forEach(sec => {
    const top = window.scrollY + 120;
    if (top >= sec.offsetTop && top < sec.offsetTop + sec.offsetHeight) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};
window.addEventListener('scroll', setActive);
setActive();

// Animate skill bars when in view
const bars = document.querySelectorAll('.bar');
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const span = entry.target.querySelector('span');
    if (entry.isIntersecting && span) {
      const level = entry.target.getAttribute('data-level') || '0';
      requestAnimationFrame(() => { span.style.width = `${level}%`; });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
bars.forEach(bar => barObserver.observe(bar));

// Reveal elements on scroll (add .reveal to any element you want to fade in)
document.querySelectorAll('.about-card, .card, .skill, .contact-form').forEach(el => {
  el.classList.add('reveal');
});
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

// Simple contact form validation + fake submit
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

function setError(input, message) {
  const field = input.closest('.field');
  const err = field ? field.querySelector('.error') : null;
  if (err) err.textContent = message || '';
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = '';
    const name = form.name;
    const email = form.email;
    const message = form.message;

    // Basic validations
    setError(name, name.value.trim() ? '' : 'Please enter your name.');
    setError(email, validateEmail(email.value) ? '' : 'Enter a valid email.');
    setError(message, message.value.trim() ? '' : 'Please enter a message.');

    const hasError = [...form.querySelectorAll('[aria-invalid="true"]')].length > 0;
    if (hasError) return;

    // Simulate async submit
    form.querySelector('button[type="submit"]').disabled = true;
    statusEl.textContent = 'Sending...';
    await new Promise(r => setTimeout(r, 1000));
    statusEl.textContent = 'Thanks! Your message has been sent.';
    form.reset();
    form.querySelector('button[type="submit"]').disabled = false;
  });
}
