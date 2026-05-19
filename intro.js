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
        '0%  {left:-5%;  opacity:0;   transform:translateY(-50%) rotate(-15deg) scale(.6); filter:blur(6px)}' +
        '7%  {left:4%;   opacity:1;   transform:translateY(-50%) rotate(0deg)   scale(1.3); filter:blur(1px)}' +
        '20% {left:18%;              transform:translateY(-50%) rotate(-8deg)  scale(1);   filter:blur(3px)}' +
        '38% {left:35%;              transform:translateY(-50%) rotate(6deg)   scale(1.1); filter:blur(2px)}' +
        '55% {left:52%;              transform:translateY(-50%) rotate(-4deg)  scale(1);   filter:blur(3px)}' +
        '68% {left:66%;              transform:translateY(-50%) rotate(0deg)   scale(1.15);filter:blur(1px)}' +
        '76% {left:76%;  opacity:1;   transform:translateY(-50%) rotate(0deg)   scale(1.5); filter:blur(0px)}' +
        '84% {left:84%;  opacity:1;   transform:translateY(-50%) rotate(0deg)   scale(1.5); filter:blur(0px)}' +
        '93% {left:96%;  opacity:.3;  transform:translateY(-50%) rotate(12deg)  scale(.8);  filter:blur(4px)}' +
        '100%{left:108%; opacity:0;   transform:translateY(-50%) rotate(20deg)  scale(.4);  filter:blur(8px)}' +
      '}';
    document.head.appendChild(kf);

    var sv = document.createElement('span');
    sv.textContent = 'V';
    sv.style.cssText =
      'position:absolute;top:50%;left:-5%;' +
      'transform:translateY(-50%);' +
      'font-family:"Cormorant Garamond",serif;font-size:64px;font-weight:600;' +
      'color:rgba(201,168,76,1);' +
      'text-shadow:' +
        '0 0  6px #fff,' +
        '0 0 14px rgba(201,168,76,1),' +
        '0 0 30px rgba(201,168,76,.9),' +
        '0 0 60px rgba(201,168,76,.6),' +
        '0 0 100px rgba(201,168,76,.3);' +
      'line-height:1;pointer-events:none;user-select:none;';

    logo.insertBefore(sv, img);

    function runAnim() {
      sv.style.animation = 'none';
      void sv.offsetWidth;
      sv.style.animation = '_av_v 3.8s ease-in-out forwards';
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
