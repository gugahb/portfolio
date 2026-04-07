// Gustavo Borges — main.js v2.0
// Vanilla JS only — no jQuery

document.addEventListener('DOMContentLoaded', function () {

  // ---- AOS Init ----
  AOS.init({
    duration: 650,
    easing: 'ease-out-cubic',
    once: true,
    offset: 40,
  });

  // ---- Navbar scroll behavior (transparent → dark) ----
  var nav = document.getElementById('mainNav');
  if (nav) {
    function onNavScroll() {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onNavScroll, { passive: true });
    onNavScroll();
  }

  // ---- Smooth scroll for all same-page anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      var navHeight = nav ? nav.offsetHeight : 0;
      var targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });

      // Collapse Bootstrap 5 mobile menu if open
      var navMenu = document.getElementById('navMenu');
      if (navMenu && navMenu.classList.contains('show')) {
        var bsCollapse = bootstrap.Collapse.getInstance(navMenu);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

});
