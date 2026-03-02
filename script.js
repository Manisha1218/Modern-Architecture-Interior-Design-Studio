/**
 * FORMA Studio - Main JavaScript
 * Handles cursor effects, mobile menu, parallax, and scroll reveal.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // Initialize DOM Elements
  const cursor = document.querySelector('.cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const menuOverlay = document.getElementById('menu-overlay');
  const menuLinks = menuOverlay.querySelectorAll('.menu-link');
  const heroImg = document.getElementById('hero-img');
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  // Check for touch device or reduced motion preference
  const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Custom Cursor
   * Only runs on non-touch devices.
   */
  if (!isTouchDevice() && cursor && cursorDot) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
    });

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .project-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  /**
   * Mobile Menu
   */
  if (menuToggle && menuOverlay && menuClose) {
    const openMenu = () => {
      menuOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      menuOverlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    
    // Close menu when a link is clicked
    menuLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  /**
   * Parallax on Hero Image
   * Subtle movement based on mouse position.
   */
  if (heroImg && !prefersReducedMotion) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroImg.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
    });
  }

  /**
   * Scroll Reveal Animation
   * Uses Intersection Observer to trigger animations when elements enter viewport.
   */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  /**
   * Smooth Scroll for Anchor Links
   */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      // Ensure we don't intercept empty hashes or simple #
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

});
