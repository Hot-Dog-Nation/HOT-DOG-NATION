/**
 * RAVEMARK - Master Application Logic
 * Light/Dark Theme Switcher, Sticky Navbar, Scroll Reveal, Slider, Modal, Forms
 */

// 1. Initialize Theme before DOM fully paints to avoid flash
(function() {
  const savedTheme = localStorage.getItem('ravemark-theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  // 2. Theme Toggle Button Logic
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeToggleIcon = document.getElementById('themeToggleIcon');

  function updateToggleIcon(theme) {
    if (!themeToggleIcon) return;
    if (theme === 'dark') {
      themeToggleIcon.className = 'fas fa-sun';
      if (themeToggleBtn) themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
    } else {
      themeToggleIcon.className = 'fas fa-moon';
      if (themeToggleBtn) themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
    }
  }

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  updateToggleIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('ravemark-theme', newTheme);
      updateToggleIcon(newTheme);
    });
  }

  // 3. Sticky Navigation Header
  const header = document.querySelector('.site-header');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (header) {
      if (scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Subtle Scroll Reveal
  const revealTargets = document.querySelectorAll('.service-card, .portfolio-item, .team-card, .stat-box, .quote-card, .synergy-card');
  revealTargets.forEach(el => el.classList.add('reveal-on-scroll'));

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealTargets.forEach(el => revealObserver.observe(el));

  // 5. Mobile Drawer Navigation
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu() {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    mobileDrawer.classList.add('open');
    mobileBackdrop.classList.add('open');
    menuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    mobileBackdrop.classList.remove('open');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', toggleMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // 6. Active Navigation State on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // 7. Extended Team Roster Toggle
  const toggleTeamBtn = document.getElementById('toggleTeamBtn');
  const extendedTeamGrid = document.getElementById('extendedTeamGrid');

  if (toggleTeamBtn && extendedTeamGrid) {
    toggleTeamBtn.addEventListener('click', () => {
      const isExpanded = extendedTeamGrid.classList.contains('expanded');
      if (isExpanded) {
        extendedTeamGrid.classList.remove('expanded');
        toggleTeamBtn.innerHTML = '<span>Explore Extended Team (30+ Creators)</span> <i class="fas fa-chevron-down" style="font-size: 0.75rem;"></i>';
      } else {
        extendedTeamGrid.classList.add('expanded');
        toggleTeamBtn.innerHTML = '<span>Collapse Extended Team</span> <i class="fas fa-chevron-up" style="font-size: 0.75rem;"></i>';
      }
    });
  }

  // 8. Testimonials Carousel
  const track = document.getElementById('testimonialTrack');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('sliderPrevBtn');
  const nextBtn = document.getElementById('sliderNextBtn');
  const dotsContainer = document.getElementById('sliderDots');

  if (track && slides.length) {
    let currentIndex = 0;
    let autoplayInterval;

    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      updateSlider();
      resetAutoplay();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    }

    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 6500);
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

    let startX = 0;
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      clearInterval(autoplayInterval);
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      if (diffX > 40) {
        nextSlide();
      } else if (diffX < -40) {
        prevSlide();
      }
      resetAutoplay();
    }, { passive: true });

    startAutoplay();
  }

  // 9. Contact Form Handling
  const servicePills = document.querySelectorAll('.service-choice-pill');
  const serviceInput = document.getElementById('selectedServiceInput');
  const contactForm = document.getElementById('ravemarkContactForm');
  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  servicePills.forEach(pill => {
    pill.addEventListener('click', () => {
      servicePills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      if (serviceInput) {
        serviceInput.value = pill.getAttribute('data-value');
      }
    });
  });

  function showToast(message) {
    if (!toastNotice) return;
    if (toastMessage) toastMessage.textContent = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 4000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Transmitting...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        servicePills.forEach(p => p.classList.remove('selected'));
        if (servicePills[0]) servicePills[0].classList.add('selected');

        showToast('Thank you. The Ravemark leadership team has received your inquiry.');
      }, 900);
    });
  }

  // 10. Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input && input.value) {
        showToast('Subscribed. Welcome to the Ravemark dispatch.');
        input.value = '';
      }
    });
  }
});
