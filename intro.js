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
        '0%  {left:0%;   opacity:0}' +
        '6%  {left:3%;   opacity:1}' +
        '70% {left:70%;  opacity:1}' +
        '80% {left:80%;  opacity:1}' +
        '90% {left:90%;  opacity:.4}' +
        '100%{left:100%; opacity:0}' +
      '}';
    document.head.appendChild(kf);

    var sv = document.createElement('span');
    sv.textContent = 'V';
    sv.style.cssText =
      'position:absolute;top:50%;left:0%;transform:translateY(-50%);' +
      'font-family:"Cormorant Garamond",serif;font-size:38px;font-weight:300;' +
      'color:rgba(201,168,76,.9);' +
      'text-shadow:0 0 12px rgba(201,168,76,1),0 0 28px rgba(201,168,76,.7);' +
      'line-height:1;pointer-events:none;user-select:none;';

    logo.insertBefore(sv, img);   // behind the img

    function runAnim() {
      sv.style.animation = 'none';
      void sv.offsetWidth;
      sv.style.animation = '_av_v 3.6s ease-in-out forwards';
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
