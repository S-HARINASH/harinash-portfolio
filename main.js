/* ============================================================
   HARINASH S · PORTFOLIO – JAVASCRIPT
   Scroll Reveal · Counter Animation · Navbar · Mobile Menu
   ============================================================ */
'use strict';
/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
/* ── Active nav link on scroll ── */
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-link');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(sec => navObserver.observe(sec));
/* ── Mobile hamburger menu ── */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  const isOpen = navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});
/* Close menu when a link is clicked */
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});
/* Close menu when clicking outside */
document.addEventListener('click', (e) => {
  if (!navLinksEl.contains(e.target) && !hamburger.contains(e.target)) {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  }
});
/* ── Scroll Reveal ── */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      /* Stagger siblings */
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal-up, .reveal-left, .reveal-right'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));
/* ── Counter Animation ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}
const statNums = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => counterObserver.observe(el));
/* ── Smooth hero entrance ── */
document.addEventListener('DOMContentLoaded', () => {
  const heroEls = document.querySelectorAll('#hero .reveal-up');
  heroEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + i * 150);
  });
});