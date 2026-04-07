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

// --- Lightbox ---
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lb-img');
const lbPrev   = document.querySelector('.lb-prev');
const lbNext   = document.querySelector('.lb-next');
const lbClose  = document.querySelector('.lb-close');

const galleryImgs = Array.from(document.querySelectorAll('.gallery-item img'));
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lbImg.src = galleryImgs[index].src;
  lbImg.alt = galleryImgs[index].alt;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryImgs.length) % galleryImgs.length;
  lbImg.src = galleryImgs[currentIndex].src;
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryImgs.length;
  lbImg.src = galleryImgs[currentIndex].src;
}

galleryImgs.forEach((img, i) => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => openLightbox(i));
});

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', showPrev);
lbNext.addEventListener('click', showNext);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (lightbox.hidden) return;
  if (e.key === 'ArrowLeft')  showPrev();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'Escape')     closeLightbox();
});

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
