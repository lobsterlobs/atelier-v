(function () {
  function init() {
    var logo = document.querySelector('a.nav-logo');
    if (!logo) return;
    var img = logo.querySelector('img');
    if (!img) return;

    logo.style.position = 'relative';
    logo.style.overflow  = 'hidden';

    // Shimmer starts visible at A (left:0%) and fades out at V (left:~88%)
    // left % is relative to the logo element width
    var kf = document.createElement('style');
    kf.textContent =
      '@keyframes _av_v{' +
        '0%  {left:0%;opacity:0;'          + _ts(0,0,0)       + '}' +
        '5%  {left:3%;opacity:.9;'         + _ts(.9,.5,.2)   + '}' +
        '65% {left:65%;opacity:.9;'        + _ts(.9,.5,.2)   + '}' +
        '74% {left:76%;opacity:1;'         + _ts(1,1,.7)     + '}' +
        '83% {left:84%;opacity:1;'         + _ts(1,1,.7)     + '}' +
        '93% {left:94%;opacity:.35;'       + _ts(.35,.1,0)   + '}' +
        '100%{left:100%;opacity:0;'        + _ts(0,0,0)      + '}' +
      '}';
    document.head.appendChild(kf);

    // Transparent V with golden text-shadow glow — behind the logo img
    var sv = document.createElement('span');
    sv.textContent = 'V';
    sv.style.cssText =
      'position:absolute;top:50%;left:0%;transform:translateY(-50%);' +
      'font-family:"Cormorant Garamond",serif;font-size:30px;font-weight:300;' +
      'color:transparent;line-height:1;pointer-events:none;user-select:none;' +
      _ts(0,0,0);
    logo.insertBefore(sv, img);   // behind the img in paint order

    function runAnim() {
      sv.style.animation = 'none';
      void sv.offsetWidth;
      sv.style.animation = '_av_v 3.6s ease-in-out forwards';
    }

    runAnim();
    setInterval(runAnim, 10000);
  }

  function _ts(near, mid, far) {
    return 'text-shadow:' +
      '0 0 10px rgba(201,168,76,' + near + '),' +
      '0 0 28px rgba(201,168,76,' + mid  + '),' +
      '0 0 56px rgba(201,168,76,' + far  + ');';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
