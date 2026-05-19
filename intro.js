(function () {
  function init() {
    var logo = document.querySelector('a.nav-logo');
    if (!logo) return;
    var img = logo.querySelector('img');
    if (!img) return;

    logo.style.position = 'relative';
    logo.style.overflow  = 'hidden';

    // Keyframe: shimmer V travels left → right, flares when it reaches the logo's V
    // `left` % is relative to the logo element width.
    // The golden V in "ATELIER V" sits roughly at 78–90 % of the logo width.
    var kf = document.createElement('style');
    kf.textContent =
      '@keyframes _av_v{' +
        // enter from left, invisible
        '0%  {left:-22%;opacity:0;'           + _ts(0,0,0)     + '}' +
        // fade in as it moves across ATELIER
        '6%  {opacity:.55;'                   + _ts(.4,.15,.05)+ '}' +
        // approaching V
        '62% {left:62%;'                      + _ts(.55,.2,.08)+ '}' +
        // arrive at V — glow peaks, brief pause
        '72% {left:76%;opacity:1;'            + _ts(1,.75,.4)  + '}' +
        '82% {left:84%;opacity:1;'            + _ts(1,.75,.4)  + '}' +
        // leave V, fade out to the right
        '94% {left:118%;opacity:.15;'         + _ts(.15,.05,0) + '}' +
        '100%{left:135%;opacity:0;'           + _ts(0,0,0)     + '}' +
      '}';
    document.head.appendChild(kf);

    // V-shaped glow element — inserted BEFORE the img so the img sits on top
    var sv = document.createElement('span');
    sv.textContent = 'V';
    sv.style.cssText =
      'position:absolute;top:50%;left:-22%;transform:translateY(-50%);' +
      'font-family:"Cormorant Garamond",serif;font-size:30px;font-weight:300;' +
      'color:transparent;line-height:1;pointer-events:none;user-select:none;' +
      _ts(0,0,0);
    logo.insertBefore(sv, img);   // behind the img in paint order

    function runAnim() {
      sv.style.animation = 'none';
      void sv.offsetWidth;        // force reflow so animation restarts
      sv.style.animation = '_av_v 3.6s ease-in-out forwards';
    }

    runAnim();
    setInterval(runAnim, 10000);
  }

  // Helper: builds a text-shadow string at three glow intensities
  function _ts(near, mid, far) {
    return 'text-shadow:' +
      '0 0  8px rgba(201,168,76,' + near + '),' +
      '0 0 22px rgba(201,168,76,' + mid  + '),' +
      '0 0 44px rgba(201,168,76,' + far  + ');';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
