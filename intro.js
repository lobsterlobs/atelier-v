(function () {
  if (sessionStorage.getItem('av-intro-done')) return;
  sessionStorage.setItem('av-intro-done', '1');

  var s = document.createElement('style');
  s.textContent =
    '#av-intro{position:fixed;inset:0;z-index:9999;background:#1B2A4A;' +
    'display:flex;align-items:center;justify-content:center;' +
    'opacity:1;transition:opacity 1.2s ease;}' +
    '#av-intro.av-out{opacity:0;pointer-events:none;}' +
    '.av-letters{font-family:"Cormorant Garamond",serif;' +
    'font-size:clamp(3.5rem,8vw,7rem);font-weight:300;letter-spacing:0.18em;' +
    'display:flex;align-items:baseline;perspective:800px;}' +
    '.av-lt{display:inline-block;color:#F9F8F6;opacity:0;' +
    'transition:opacity 0.45s ease;}' +
    '.av-lt-v{display:inline-block;color:#C9A84C;opacity:0;' +
    'transition:opacity 0.45s ease;transform-style:preserve-3d;}' +
    '.av-lt.av-on,.av-lt-v.av-on{opacity:1;}' +
    '.av-lt-v.av-spin{animation:av-vspin 1.6s cubic-bezier(.4,0,.2,1) forwards;}' +
    '@keyframes av-vspin{0%{transform:rotateY(0)}100%{transform:rotateY(360deg)}}';
  document.head.appendChild(s);

  var wrap = document.createElement('div');
  wrap.id = 'av-intro';
  wrap.innerHTML =
    '<div class="av-letters">' +
    '<span class="av-lt">A</span>' +
    '<span class="av-lt">T</span>' +
    '<span class="av-lt">E</span>' +
    '<span class="av-lt">L</span>' +
    '<span class="av-lt">I</span>' +
    '<span class="av-lt">E</span>' +
    '<span class="av-lt">R</span>' +
    '<span class="av-lt-v">V</span>' +
    '</div>';
  document.body.appendChild(wrap);

  var els = wrap.querySelectorAll('.av-lt, .av-lt-v');
  // Stagger: A=400ms, T=1150ms, E=1900ms, L=2650ms, I=3400ms, E=4150ms, R=4900ms, V=5650ms
  var stagger = 750, start = 400;
  for (var i = 0; i < els.length; i++) {
    (function (el, delay) {
      setTimeout(function () {
        el.classList.add('av-on');
        if (el.classList.contains('av-lt-v')) {
          // V is visible — start spin after 1.5s
          setTimeout(function () { el.classList.add('av-spin'); }, 1500);
        }
      }, delay);
    })(els[i], start + i * stagger);
  }

  // V visible at 5650ms, spin at 7150ms, ends ~8750ms
  // Fade-out overlay at 8500ms
  setTimeout(function () {
    wrap.classList.add('av-out');
    setTimeout(function () {
      if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
      if (s.parentNode) s.parentNode.removeChild(s);
    }, 1300);
  }, 8500);
})();
