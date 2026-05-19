(function () {
  var logo = document.querySelector('a.nav-logo');
  if (!logo) return;

  var img = logo.querySelector('img');

  // Inject spin keyframe once
  var kf = document.createElement('style');
  kf.textContent = '@keyframes _av_spin{from{transform:rotateY(0)}to{transform:rotateY(360deg)}}';
  document.head.appendChild(kf);

  // Build letter overlay — inherits all font styling from .nav-logo
  var ov = document.createElement('span');
  ov.style.cssText =
    'position:absolute;inset:0;display:flex;align-items:center;pointer-events:none;';

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

  logo.style.position = 'relative';
  if (img) img.style.opacity = '0';
  logo.appendChild(ov);

  function runAnim() {
    // Reset
    spans.forEach(function (el) { el.style.opacity = '0'; });
    vEl.style.animation = 'none';
    void vEl.offsetWidth; // force reflow to restart spin

    // Light up A → T → E → L → I → E → R → V (350 ms stagger, ~3 s total)
    spans.forEach(function (el, i) {
      setTimeout(function () {
        el.style.opacity = '1';
        if (el === vEl) {
          setTimeout(function () {
            el.style.animation = '_av_spin 0.85s cubic-bezier(.4,0,.2,1) forwards';
          }, 450);
        }
      }, 200 + i * 350);
    });
  }

  runAnim();
  setInterval(runAnim, 10000);
})();
