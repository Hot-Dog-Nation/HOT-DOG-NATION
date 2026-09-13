/**
 * RAVEMARK - Scroll-Triggered Animated Number Counters
 * Uses IntersectionObserver to smoothly ease numbers up to their target values
 */

document.addEventListener('DOMContentLoaded', () => {
  const statElements = document.querySelectorAll('.stat-number');
  if (!statElements.length) return;

  let hasAnimated = false;

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2200; // ms
    const startTime = performance.now();

    function updateNumber(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);
      const currentVal = Math.floor(easedProgress * target);

      const numSpan = el.querySelector('.counter-value');
      if (numSpan) {
        numSpan.textContent = currentVal.toLocaleString();
      }

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        if (numSpan) {
          numSpan.textContent = target.toLocaleString();
        }
      }
    }

    requestAnimationFrame(updateNumber);
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statElements.forEach(el => animateCounter(el));
        obs.disconnect(); // Only animate once
      }
    });
  }, { threshold: 0.35 });

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    observer.observe(statsSection);
  } else {
    statElements.forEach(el => observer.observe(el));
  }
});
