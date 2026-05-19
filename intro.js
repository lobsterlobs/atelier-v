(function () {
  function init() {
    var logo = document.querySelector('a.nav-logo');
    if (!logo) return;
    var img = logo.querySelector('img');
    if (!img) return;

    // Clip the sweeping beam to the logo bounds
    logo.style.position = 'relative';
    logo.style.overflow  = 'hidden';

    // Inject the sweep keyframe once
    var kf = document.createElement('style');
    kf.textContent =
      '@keyframes _av_beam{' +
        '0%{transform:translateX(-120%)}' +
        '100%{transform:translateX(320%)}' +
      '}';
    document.head.appendChild(kf);

    // Golden shimmer beam – sits on top of the real image
    var beam = document.createElement('span');
    beam.style.cssText =
      'position:absolute;top:0;left:0;height:100%;width:25%;' +
      'background:linear-gradient(90deg,' +
        'transparent 0%,' +
        'rgba(201,168,76,.28) 35%,' +
        'rgba(255,248,190,.60) 50%,' +
        'rgba(201,168,76,.28) 65%,' +
        'transparent 100%' +
      ');pointer-events:none;transform:translateX(-120%);';
    logo.appendChild(beam);

    function runAnim() {
      // Hard-reset beam to start position
      beam.style.animation = 'none';
      void beam.offsetWidth;

      // Sweep across logo in 3.2 s (ease-in-out lingers on V at the right)
      beam.style.animation = '_av_beam 3.2s ease-in-out forwards';

      // After beam passes: golden drop-shadow glow on the whole logo
      setTimeout(function () {
        img.style.transition = 'filter .35s ease';
        img.style.filter = 'drop-shadow(0 0 6px rgba(201,168,76,.75)) brightness(1.08)';

        // Fade glow out
        setTimeout(function () {
          img.style.filter = '';
          setTimeout(function () { img.style.transition = ''; }, 400);
        }, 800);
      }, 2900);
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
