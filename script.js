// AQUILA — preloader
window.addEventListener('load', function () {
  var pre = document.getElementById('preloader');
  if (pre) {
    setTimeout(function () { pre.classList.add('loaded'); }, 350);
  }
});

// AQUILA — count-up stats
document.addEventListener('DOMContentLoaded', function () {
  var counters = document.querySelectorAll('.count');
  if (!counters.length) return;

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    var duration = 1200;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  if (!('IntersectionObserver' in window)) {
    counters.forEach(function (c) { c.textContent = c.getAttribute('data-target'); });
    return;
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(function (c) { obs.observe(c); });
});

// AQUILA — rotating hero tagline
document.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('hero-rotator');
  if (!el) return;
  var phrases = [
    'MARKETING & MEDIA PRODUCTION',
    'CONTENT · STRATEGY · GROWTH',
    'FROM IDEA TO IMPACT'
  ];
  var i = 0;
  setInterval(function () {
    el.style.opacity = 0;
    setTimeout(function () {
      i = (i + 1) % phrases.length;
      el.textContent = phrases[i];
      el.style.opacity = 1;
    }, 400);
  }, 2800);
});


document.addEventListener('DOMContentLoaded', function () {
  var targets = document.querySelectorAll('.reveal, .reveal-stagger');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(function (el) { observer.observe(el); });
});
