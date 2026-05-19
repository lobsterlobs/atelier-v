(function () {
  function init() {
    var logo = document.querySelector('a.nav-logo');
    if (!logo) return;
    var img = logo.querySelector('img');
    if (!img) return;

    logo.style.position = 'relative';
    logo.style.overflow  = 'hidden';

    var kf = document.createElement('style');
    kf.textContent =
      '@keyframes _av_v{' +
        // fade in at A, then travel to V at constant speed while spinning 3 full rotations
        '0%  {left:0%;  opacity:0; transform:translateY(-50%) perspective(100px) rotateY(0deg)}' +
        '5%  {left:4%;  opacity:1; transform:translateY(-50%) perspective(100px) rotateY(64deg)}' +
        '85% {left:84%; opacity:1; transform:translateY(-50%) perspective(100px) rotateY(1080deg)}' +
        // stop at V, hold briefly, then fade
        '92% {left:84%; opacity:.7;transform:translateY(-50%) perspective(100px) rotateY(1080deg)}' +
        '100%{left:84%; opacity:0; transform:translateY(-50%) perspective(100px) rotateY(1080deg)}' +
      '}';
    document.head.appendChild(kf);

    var sv = document.createElement('span');
    sv.textContent = 'V';
    sv.style.cssText =
      'position:absolute;top:50%;left:0%;' +
      'transform:translateY(-50%) perspective(100px) rotateY(0deg);' +
      'font-family:"Cormorant Garamond",serif;font-size:44px;font-weight:600;' +
      'color:#C9A84C;' +
      'text-shadow:0 0 8px #fff,0 0 20px #C9A84C,0 0 50px rgba(201,168,76,.6);' +
      'line-height:1;pointer-events:none;user-select:none;transform-style:preserve-3d;';

    logo.insertBefore(sv, img);

    function runAnim() {
      sv.style.animation = 'none';
      void sv.offsetWidth;
      sv.style.animation = '_av_v 4s linear forwards';
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
