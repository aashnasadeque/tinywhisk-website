// =========================================
//  TINY WHISK CO. — script.js
// =========================================

// --- Nav: scroll behaviour ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// --- Nav: mobile hamburger ---
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.nav-mobile');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// --- Fade-up on scroll ---
const fadeEls = document.querySelectorAll(
  '#about .about-image-wrap, #about .about-text, ' +
  '#gallery .gallery-item, ' +
  '#process .step, ' +
  '#inquire .inquire-text, #inquire .inquire-form, ' +
  '.section-header, .section-header--light'
);
fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly
      const siblings = Array.from(entry.target.parentElement.children)
        .filter(c => c.classList.contains('fade-up'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// --- Inquiry form ---
const form = document.getElementById('inquiry-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Simple validation
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('error');
      valid = false;
    } else {
      field.classList.remove('error');
    }
  });

  if (!valid) return;

  // Clear errors
  form.querySelectorAll('.error').forEach(f => f.classList.remove('error'));

  // Simulate submission (replace with Formspree or your backend)
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  setTimeout(() => {
    form.reset();
    submitBtn.textContent = 'Send Inquiry';
    submitBtn.disabled = false;
    successMsg.hidden = false;
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 1000);
});

// Remove error state on input
form.querySelectorAll('input, select, textarea').forEach(field => {
  field.addEventListener('input', () => field.classList.remove('error'));
});
