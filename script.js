/* ============================================
   GSAP SCROLL ANIMATIONS
   ============================================ */
(function() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // --- Hero: SVG paths animate from center outward ---
  document.querySelectorAll('.hero-section .animated-svg').forEach(function(svg) {
    var paths = Array.from(svg.querySelectorAll('svg path'));
    var mid = Math.floor(paths.length / 2);
    var ordered = [paths[mid]];
    for (var i = 1; i <= mid; i++) {
      if (paths[mid + i]) ordered.push(paths[mid + i]);
      if (paths[mid - i]) ordered.push(paths[mid - i]);
    }
    gsap.from(ordered, {
      y: '500%',
      duration: 1.2,
      stagger: 0.06,
      delay: 0.3
    });
  });

  // --- Hero: scale-down (slow zoom from 1.1 to 1) ---
  gsap.to('.hero-video', { scale: 1, duration: 10, ease: 'none' });

  // --- Hero: button & featured fade in ---
  gsap.to('.hero-left .btn-rounded', { opacity: 1, delay: 1.8, duration: 0.6 });
  gsap.to('.hero-right', { opacity: 1, delay: 2, duration: 0.6 });

  // --- Core Messages: scroll-scrub animations (from original site) ---
  var section = document.querySelector('.core-messages-section');
  if (section) {
    var mm = gsap.matchMedia();

    // Desktop: heading scale + image parallax scrub
    mm.add('(min-width: 1024px)', function() {
      // Heading: scale 2.11 → 1 tied to scroll
      gsap.to(section.querySelector('.anim-heading'), {
        scale: 1,
        top: 0,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: section,
          start: 'top-=20% 50%',
          end: 'top+=50% 50%',
          scrub: true,
        },
      });

      // Image: translateY(30%) → 0 tied to scroll
      var imgTimeline = gsap.timeline();
      gsap.to(section.querySelector('.messages-image'), {
        y: 0,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: section,
          start: 'top+=15% 80%',
          end: 'top+=60% 80%',
          scrub: 2,
          onEnter: function() {
            // Cover reveal + text fade in
            imgTimeline.to(section.querySelector('.image-cover'), { yPercent: 100, duration: 0.8 });
            imgTimeline.to(section.querySelector('.anim-heading'), { opacity: 1, duration: 0.5 }, '-=0.8');
            imgTimeline.to(section.querySelector('.anim-fade'), { opacity: 1, duration: 0.5 }, '-=0.8');
          },
        },
      });
    });

    // Tablet: trigger-based (no scrub)
    mm.add('(min-width: 768px) and (max-width: 1023px)', function() {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: function() {
          var tl = gsap.timeline();
          tl.to(section.querySelector('.image-cover'), { yPercent: 100, duration: 0.8 });
          tl.to(section.querySelector('.anim-heading'), { opacity: 1, duration: 0.5 }, '-=0.8');
          tl.to(section.querySelector('.anim-fade'), { opacity: 1, duration: 0.5 }, '-=0.8');
        },
      });
    });

    // Mobile: each element triggers independently
    mm.add('(max-width: 767px)', function() {
      gsap.to(section.querySelector('.anim-heading'), {
        opacity: 1, duration: 0.5,
        scrollTrigger: { trigger: section.querySelector('.anim-heading'), start: 'top 80%' },
      });
      gsap.to(section.querySelector('.anim-fade'), {
        opacity: 1, duration: 0.5,
        scrollTrigger: { trigger: section.querySelector('.anim-fade'), start: 'top 80%' },
      });
      gsap.to(section.querySelector('.image-cover'), {
        yPercent: 100, duration: 1,
        scrollTrigger: { trigger: section.querySelector('.image-cover'), start: 'top 80%' },
      });
    });
  }

  // --- Featured In: fade in ---
  gsap.to('.featured-section .featured-title', {
    opacity: 1,
    visibility: 'visible',
    duration: 0.8,
    scrollTrigger: {
      trigger: '.featured-section',
      start: 'top 85%',
    }
  });
  gsap.to('.featured-section .featured-logos', {
    opacity: 1,
    visibility: 'visible',
    duration: 0.8,
    delay: 0.2,
    scrollTrigger: {
      trigger: '.featured-section',
      start: 'top 85%',
    }
  });

  // --- Image Carousel: fade in ---
  gsap.to('.image-carousel', {
    opacity: 1,
    duration: 0.6,
    scrollTrigger: {
      trigger: '.image-carousel-section',
      start: 'top 70%',
    }
  });

  // --- Products Section: editorial staggered reveal ---
  var productsSection = document.querySelector('.products-section');
  if (productsSection) {
    // Eyebrow line draw + text fade
    gsap.from('.eyebrow-line', {
      scaleX: 0, transformOrigin: 'left center', duration: 0.8,
      scrollTrigger: { trigger: '.products-section', start: 'top 78%' }
    });
    gsap.from('.products-eyebrow', {
      opacity: 0, x: -20, duration: 0.6, delay: 0.2,
      scrollTrigger: { trigger: '.products-section', start: 'top 78%' }
    });

    // Title lines stagger
    gsap.from('.products-title', {
      opacity: 0, y: 40, duration: 0.9, delay: 0.15,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.products-section', start: 'top 78%' }
    });

    // Description + link
    gsap.from('.products-desc', {
      opacity: 0, y: 20, duration: 0.7, delay: 0.35,
      scrollTrigger: { trigger: '.products-section', start: 'top 78%' }
    });
    gsap.from('.products-explore-link', {
      opacity: 0, y: 15, duration: 0.6, delay: 0.5,
      scrollTrigger: { trigger: '.products-section', start: 'top 78%' }
    });

    // Background decorative text parallax
    gsap.to('.products-bg-text', {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: '.products-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });

    // Product cards: stagger with different delays for editorial feel
    document.querySelectorAll('.product-card').forEach(function(card, i) {
      gsap.to(card, {
        opacity: 1, y: 0,
        duration: 1,
        delay: i * 0.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.products-grid', start: 'top 80%' }
      });
    });

    // Index numbers: subtle counter animation
    document.querySelectorAll('.product-card-index').forEach(function(idx) {
      gsap.from(idx, {
        opacity: 0, y: 30, duration: 1.2,
        scrollTrigger: { trigger: idx.closest('.product-card'), start: 'top 82%' }
      });
    });
  }

  // --- CTA: stagger text in ---
  gsap.to('.cta-text h2', {
    opacity: 1, y: 0, duration: 0.7,
    scrollTrigger: { trigger: '.cta-section', start: 'top 75%' }
  });
  gsap.to('.cta-text p', {
    opacity: 1, y: 0, duration: 0.7, delay: 0.15,
    scrollTrigger: { trigger: '.cta-section', start: 'top 75%' }
  });
  gsap.to('.cta-text .btn-rounded', {
    opacity: 1, y: 0, duration: 0.7, delay: 0.3,
    scrollTrigger: { trigger: '.cta-section', start: 'top 75%' }
  });

  // --- Footer: SVG logo paths from center outward ---
  var footerLogo = document.querySelector('.footer-logo');
  if (footerLogo) {
    footerLogo.style.display = 'block';
    var fpaths = Array.from(footerLogo.querySelectorAll('svg path'));
    var fmid = Math.floor(fpaths.length / 2);
    var fordered = [fpaths[fmid]];
    for (var j = 1; j <= fmid; j++) {
      if (fpaths[fmid + j]) fordered.push(fpaths[fmid + j]);
      if (fpaths[fmid - j]) fordered.push(fpaths[fmid - j]);
    }
    gsap.from(fordered, {
      y: '105%',
      duration: 0.75,
      ease: 'power1.in',
      stagger: 0.075,
      scrollTrigger: { trigger: footerLogo, start: 'center bottom' }
    });
  }
})();

/* ============================================
   BRAND STORY ANIMATIONS
   ============================================ */
(function() {
  if (typeof gsap === 'undefined') return;
  var bs = document.querySelector('.brand-story-section');
  if (!bs) return;

  // Image parallax scrub
  gsap.to('.brand-story-img-wrap img', {
    yPercent: -8,
    ease: 'none',
    scrollTrigger: {
      trigger: '.brand-story-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    }
  });

  // Quote float in
  gsap.from('.brand-story-quote blockquote', {
    opacity: 0, y: 30, duration: 0.9,
    scrollTrigger: { trigger: '.brand-story-media', start: 'center 80%' }
  });

  // Right column stagger
  gsap.from('.brand-story-eyebrow', {
    opacity: 0, x: -20, duration: 0.6,
    scrollTrigger: { trigger: '.brand-story-content', start: 'top 78%' }
  });
  gsap.from('.brand-story-title', {
    opacity: 0, y: 30, duration: 0.8, delay: 0.1,
    scrollTrigger: { trigger: '.brand-story-content', start: 'top 78%' }
  });
  gsap.from('.brand-story-text', {
    opacity: 0, y: 20, duration: 0.7, delay: 0.25,
    scrollTrigger: { trigger: '.brand-story-content', start: 'top 78%' }
  });

  // Counter animation for stats
  document.querySelectorAll('.brand-value-num').forEach(function(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
      onUpdate: function() {
        el.textContent = Math.round(obj.val).toLocaleString();
      }
    });
  });

  // Values bar slide in
  gsap.from('.brand-story-values', {
    opacity: 0, y: 20, duration: 0.7,
    scrollTrigger: { trigger: '.brand-story-values', start: 'top 88%' }
  });

  // CTA
  gsap.from('.brand-story-cta', {
    opacity: 0, y: 15, duration: 0.6,
    scrollTrigger: { trigger: '.brand-story-cta', start: 'top 92%' }
  });
})();

/* ============================================
   UGC SECTION ANIMATIONS
   ============================================ */
(function() {
  if (typeof gsap === 'undefined') return;
  var ugc = document.querySelector('.ugc-section');
  if (!ugc) return;

  // Header reveal
  gsap.from('.ugc-eyebrow', {
    opacity: 0, y: 15, duration: 0.6,
    scrollTrigger: { trigger: '.ugc-section', start: 'top 80%' }
  });
  gsap.from('.ugc-title', {
    opacity: 0, y: 25, duration: 0.8, delay: 0.1,
    scrollTrigger: { trigger: '.ugc-section', start: 'top 80%' }
  });
  gsap.from('.ugc-header-right', {
    opacity: 0, y: 20, duration: 0.7, delay: 0.2,
    scrollTrigger: { trigger: '.ugc-section', start: 'top 80%' }
  });

  // Cards stagger in
  gsap.from('.ugc-card', {
    opacity: 0, y: 40, duration: 0.7,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.ugc-carousel', start: 'top 85%' }
  });
})();

/* ============================================
   MEGA MENU — hover with close delay
   ============================================ */
(function() {
  var megaLi = document.querySelector('.has-mega');
  if (!megaLi) return;
  var megaMenu = megaLi.querySelector('.mega-menu');
  var closeTimer = null;
  var openDelay = 80;
  var closeDelay = 300;

  function open() {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(function() {
      megaLi.classList.add('mega-open');
    }, openDelay);
  }

  function scheduleClose() {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(function() {
      megaLi.classList.remove('mega-open');
    }, closeDelay);
  }

  megaLi.addEventListener('mouseenter', open);
  megaLi.addEventListener('mouseleave', scheduleClose);
  megaMenu.addEventListener('mouseenter', function() {
    clearTimeout(closeTimer);
    megaLi.classList.add('mega-open');
  });
  megaMenu.addEventListener('mouseleave', scheduleClose);
})();

/* ============================================
   PRODUCT SWATCHES
   ============================================ */
(function() {
  document.querySelectorAll('.product-card-swatches').forEach(function(group) {
    group.addEventListener('click', function(e) {
      var btn = e.target.closest('.swatch');
      if (!btn) return;
      group.querySelectorAll('.swatch').forEach(function(s) { s.classList.remove('active'); });
      btn.classList.add('active');
    });
  });
})();

/* ============================================
   HEADER SCROLL BEHAVIOR
   ============================================ */
(function() {
  const header = document.getElementById('masthead');
  let lastScrollY = 0;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;

    // Add/remove scrolled class
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide/show header on scroll direction
    if (scrollY > lastScrollY && scrollY > 100) {
      header.classList.add('hidden-header');
    } else {
      header.classList.remove('hidden-header');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
})();

/* ============================================
   MOBILE MENU
   ============================================ */
(function() {
  const hamburgers = document.querySelectorAll('.hamburger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuOverlay = document.querySelector('.menu-overlay');

  function toggleMenu() {
    mobileMenu.classList.toggle('open');
    menuOverlay.classList.toggle('show');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  }

  hamburgers.forEach(btn => btn.addEventListener('click', toggleMenu));
  menuOverlay.addEventListener('click', toggleMenu);

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      if (mobileMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });
})();

/* ============================================
   IMAGE CAROUSEL (Swiper)
   ============================================ */
const imageCarousel = new Swiper('.image-carousel', {
  slidesPerView: 1,
  speed: 800,
  loop: true,
  effect: 'slide',
  grabCursor: true,
});

// Mobile nav buttons
document.querySelector('.carousel-prev-btn')?.addEventListener('click', () => imageCarousel.slidePrev());
document.querySelector('.carousel-next-btn')?.addEventListener('click', () => imageCarousel.slideNext());

// Desktop: click left/right half to navigate
const imageSection = document.querySelector('.image-carousel-section');
if (imageSection && window.innerWidth >= 1024) {
  imageSection.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX < rect.width / 2) {
      imageCarousel.slidePrev();
    } else {
      imageCarousel.slideNext();
    }
  });
}

/* ============================================
   TESTIMONIALS CAROUSEL (Swiper)
   ============================================ */
const testimonialCarousel = new Swiper('.testimonial-carousel', {
  slidesPerView: 1,
  speed: 800,
  loop: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  on: {
    slideChange: function() {
      const counterEl = document.querySelector('.counter-num');
      if (counterEl) {
        counterEl.textContent = this.realIndex + 1;
      }
    }
  }
});

document.querySelector('.testimonial-prev')?.addEventListener('click', () => testimonialCarousel.slidePrev());
document.querySelector('.testimonial-next')?.addEventListener('click', () => testimonialCarousel.slideNext());

/* ============================================
   HERO FEATURED LOGOS ROTATION
   ============================================ */
(function() {
  const items = document.querySelectorAll('.hero-feature-item');
  if (items.length === 0) return;

  let currentIndex = 0;

  setInterval(function() {
    items[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % items.length;
    items[currentIndex].classList.add('active');
  }, 3000);
})();

/* ============================================
   CONTACT PANEL
   ============================================ */
(function() {
  const contactPanel = document.querySelector('.contact-panel');
  const contactOverlay = document.querySelector('.contact-overlay');
  const contactCloseBtn = document.querySelector('.contact-close-btn');
  const toggleBtns = document.querySelectorAll('.toggle-contact');

  function openContact(e) {
    e.preventDefault();
    contactPanel.classList.add('open');
    contactOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeContact() {
    contactPanel.classList.remove('open');
    contactOverlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  toggleBtns.forEach(btn => btn.addEventListener('click', openContact));
  contactCloseBtn?.addEventListener('click', closeContact);
  contactOverlay?.addEventListener('click', closeContact);
})();

/* ============================================
   MOBILE ACCORDION (Products submenu)
   ============================================ */
(function() {
  const toggles = document.querySelectorAll('.mobile-accordion-toggle');
  toggles.forEach(function(toggle) {
    toggle.addEventListener('click', function() {
      this.classList.toggle('open');
      const panel = this.nextElementSibling;
      panel.classList.toggle('open');
    });
  });
})();

/* ============================================
   CONTACT FORM (basic handler)
   ============================================ */
(function() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you — we\'ll be in touch shortly.');
    form.reset();
  });
})();

/* ============================================
   NEXACE MEGA MENU — Reformers dropdown
   ============================================ */
(function() {
  const trigger = document.querySelector('.nexace-mega-trigger');
  if (!trigger) return;
  const panel = trigger.querySelector('.nexace-mega-panel');
  const triggerLink = trigger.querySelector('.nav-link');
  if (!panel || !triggerLink) return;

  const isDesktop = () => window.matchMedia('(min-width: 992px)').matches;
  let closeTimer;

  function open() {
    clearTimeout(closeTimer);
    trigger.classList.add('is-open');
  }
  function scheduleClose() {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => trigger.classList.remove('is-open'), 180);
  }
  function closeNow() {
    clearTimeout(closeTimer);
    trigger.classList.remove('is-open');
  }

  // Desktop: hover open/close with bridge delay
  trigger.addEventListener('mouseenter', () => { if (isDesktop()) open(); });
  trigger.addEventListener('mouseleave', () => { if (isDesktop()) scheduleClose(); });
  panel.addEventListener('mouseenter', () => { if (isDesktop()) open(); });
  panel.addEventListener('mouseleave', () => { if (isDesktop()) scheduleClose(); });

  // Mobile: tap the trigger link to toggle (prevent nav on mobile only)
  triggerLink.addEventListener('click', function(e) {
    if (!isDesktop()) {
      e.preventDefault();
      trigger.classList.toggle('is-open');
    }
  });

  // Close on scroll / Escape / outside click
  window.addEventListener('scroll', closeNow, { passive: true });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeNow();
  });
  document.addEventListener('click', function(e) {
    if (isDesktop() && !trigger.contains(e.target)) closeNow();
  });
})();
