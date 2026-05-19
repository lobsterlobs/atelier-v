(function () {
  if (sessionStorage.getItem('av-intro-done')) return;
  sessionStorage.setItem('av-intro-done', '1');

  var logo = document.querySelector('a.nav-logo');
  if (!logo) return;

  var img = logo.querySelector('img');
  if (img) img.style.opacity = '0';

  logo.style.position = 'relative';

  // Build letter overlay
  var ov = document.createElement('span');
  ov.id = 'av-logo-anim';
  ov.style.cssText =
    'position:absolute;inset:0;display:flex;align-items:center;' +
    'font-family:"Cormorant Garamond",serif;font-size:27px;font-weight:300;font-style:italic;' +
    'letter-spacing:.1em;color:#1B2A4A;white-space:nowrap;pointer-events:none;';

  var spans = [];
  'ATELIER'.split('').forEach(function (ch) {
    var s = document.createElement('span');
    s.textContent = ch;
    s.style.cssText = 'opacity:0;display:inline-block;transition:opacity 0.3s ease;';
    ov.appendChild(s);
    spans.push(s);
  });

  var gap = document.createElement('span');
  gap.innerHTML = '&nbsp;';
  ov.appendChild(gap);

  var vEl = document.createElement('span');
  vEl.textContent = 'V';
  vEl.style.cssText =
    'opacity:0;display:inline-block;color:#C9A84C;' +
    'transition:opacity 0.3s ease;transform-style:preserve-3d;';
  ov.appendChild(vEl);
  spans.push(vEl);

  logo.appendChild(ov);

  var kf = document.createElement('style');
  kf.textContent = '@keyframes _av_spin{from{transform:rotateY(0)}to{transform:rotateY(360deg)}}';
  document.head.appendChild(kf);

  // Light up A→T→E→L→I→E→R→V over ~3 s (350 ms stagger)
  var stagger = 350, startDelay = 200;
  spans.forEach(function (el, i) {
    setTimeout(function () {
      el.style.opacity = '1';
      if (el === vEl) {
        setTimeout(function () {
          el.style.animation = '_av_spin 0.85s cubic-bezier(.4,0,.2,1) forwards';
        }, 450);
      }
    }, startDelay + i * stagger);
  });

  // V lit at 200 + 7×350 = 2 650 ms → spin starts 3 100 ms → ends ~3 950 ms
  // Fade real logo in at 3 600 ms (overlaps spin end — smooth)
  setTimeout(function () {
    if (img) {
      img.style.transition = 'opacity 0.5s ease';
      img.style.opacity = '1';
    }
    setTimeout(function () {
      ov.remove();
      kf.remove();
      logo.style.position = '';
      if (img) img.style.transition = '';
    }, 550);
  }, 3600);
})();
