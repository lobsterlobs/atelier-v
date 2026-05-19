(function () {
  function init() {
    var logo = document.querySelector('a.nav-logo');
    if (!logo) return;
    var img = logo.querySelector('img');
    if (!img) return;

    // Keyframe for V spin
    var kf = document.createElement('style');
    kf.textContent =
      '@keyframes _av_spin{0%{transform:rotateY(0deg)}100%{transform:rotateY(360deg)}}';
    document.head.appendChild(kf);

    // Hide the PNG logo
    img.style.opacity = '0';
    logo.style.position = 'relative';

    // Overlay fills the same space as the logo image
    var ov = document.createElement('span');
    ov.style.cssText =
      'position:absolute;top:0;left:0;width:100%;height:100%;' +
      'display:flex;align-items:center;' +
      'font-family:"Cormorant Garamond",serif;font-size:26px;font-weight:300;' +
      'letter-spacing:.08em;color:#1B2A4A;white-space:nowrap;pointer-events:none;';

    var spans = [];
    'ATELIER'.split('').forEach(function (ch) {
      var s = document.createElement('span');
      s.textContent = ch;
      s.style.display = 'inline-block';
      s.style.opacity = '0';
      ov.appendChild(s);
      spans.push(s);
    });

    // Space between ATELIER and V
    var sp = document.createElement('span');
    sp.innerHTML = '&nbsp;';
    ov.appendChild(sp);

    // Golden V
    var vEl = document.createElement('span');
    vEl.textContent = 'V';
    vEl.style.cssText =
      'display:inline-block;opacity:0;color:#C9A84C;transform-style:preserve-3d;';
    ov.appendChild(vEl);
    spans.push(vEl); // index 7

    logo.appendChild(ov);

    function runAnim() {
      // Instant reset (no transition while resetting)
      spans.forEach(function (el) {
        el.style.transition = 'none';
        el.style.opacity = '0';
      });
      vEl.style.animation = 'none';
      void vEl.offsetWidth; // force reflow so spin restarts cleanly

      // Re-enable fade transitions after a frame, then stagger in
      setTimeout(function () {
        spans.forEach(function (el) {
          el.style.transition = 'opacity 0.35s ease';
        });
        spans.forEach(function (el, i) {
          setTimeout(function () {
            el.style.opacity = '1';
            if (el === vEl) {
              // Spin V after it has fully faded in
              setTimeout(function () {
                vEl.style.animation =
                  '_av_spin 0.9s cubic-bezier(.4,0,.2,1) forwards';
              }, 450);
            }
          }, i * 350); // A=0ms T=350 E=700 L=1050 I=1400 E=1750 R=2100 V=2450
        });
      }, 60);
    }

    runAnim();
    setInterval(runAnim, 10000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
