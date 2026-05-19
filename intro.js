(function () {
  function init() {
    var logo = document.querySelector('a.nav-logo');
    if (!logo) return;
    var img = logo.querySelector('img');
    if (!img) return;

    logo.style.position = 'relative';
    logo.style.overflow  = 'hidden';

    // V spins on its own axis (rotateY coin-flip) while travelling left→right,
    // slows and stops at the golden V in the logo, then flashes and fades.
    var kf = document.createElement('style');
    kf.textContent =
      '@keyframes _av_v{' +
        // enter — spinning fast, small
        '0%  {left:0%;  opacity:0; transform:translateY(-50%) perspective(100px) rotateY(0deg)    scale(.5); filter:blur(3px)}' +
        '6%  {left:4%;  opacity:1; transform:translateY(-50%) perspective(100px) rotateY(270deg)  scale(1);  filter:blur(0px)}' +
        // travel — continuous spin
        '20% {left:16%; transform:translateY(-50%) perspective(100px) rotateY(630deg)  scale(1)}' +
        '36% {left:30%; transform:translateY(-50%) perspective(100px) rotateY(990deg)  scale(1)}' +
        '52% {left:46%; transform:translateY(-50%) perspective(100px) rotateY(1260deg) scale(1)}' +
        '66% {left:62%; transform:translateY(-50%) perspective(100px) rotateY(1530deg) scale(1.05)}' +
        // decelerate into V position
        '76% {left:74%; transform:translateY(-50%) perspective(100px) rotateY(1620deg) scale(1.15)}' +
        '83% {left:81%; transform:translateY(-50%) perspective(100px) rotateY(1660deg) scale(1.3); opacity:1; filter:brightness(1.4)}' +
        // STOP & FLASH at V
        '88% {left:84%; transform:translateY(-50%) perspective(100px) rotateY(1680deg) scale(1.5); opacity:1; filter:brightness(2)}' +
        // settle
        '93% {left:84%; transform:translateY(-50%) perspective(100px) rotateY(1680deg) scale(1.35); opacity:.85; filter:brightness(1.2)}' +
        // fade out
        '100%{left:84%; transform:translateY(-50%) perspective(100px) rotateY(1680deg) scale(1);    opacity:0;  filter:brightness(1)}' +
      '}';
    document.head.appendChild(kf);

    var sv = document.createElement('span');
    sv.textContent = 'V';
    sv.style.cssText =
      'position:absolute;top:50%;left:0%;' +
      'transform:translateY(-50%) perspective(100px) rotateY(0deg) scale(.5);' +
      'font-family:"Cormorant Garamond",serif;font-size:44px;font-weight:600;' +
      'color:#C9A84C;' +
      'text-shadow:' +
        '0 0  6px #fff,' +
        '0 0 16px #C9A84C,' +
        '0 0 36px rgba(201,168,76,.8),' +
        '0 0 70px rgba(201,168,76,.4);' +
      'line-height:1;pointer-events:none;user-select:none;transform-style:preserve-3d;';

    logo.insertBefore(sv, img);

    function runAnim() {
      sv.style.animation = 'none';
      void sv.offsetWidth;
      sv.style.animation = '_av_v 4s cubic-bezier(.2,.6,.4,1) forwards';
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
