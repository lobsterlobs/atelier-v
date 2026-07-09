const content={
  bg:{name:'Даниела Караконов',title:'Консултант кредитиране',address:'гр. София, бул. Ал. Стамболийски 84, ет. 1',call:'Обади се',email:'Имейл',save:'Запази контакт',map:'Адрес',meeting:'Запази среща',website:'Уебсайт',share:'Сподели',solutionsTitle:'Финансови решения',s1:'Ипотечни кредити',s2:'Бизнес кредити',appleWallet:'Apple Wallet',googleWallet:'Google Wallet',s3:'Рефинансиране',s4:'Финансова консултация',installTitle:'Запази като приложение',installText:'Отвори менюто на браузъра и избери Add to Home Screen или Install app.',walletAdd:'Добави в',qrTitle:'QR код',qrText:'Сканирай ме'},
  en:{name:'Daniela Karakonov',title:'Mortgage Consultant',address:'Sofia, 84 Aleksandar Stamboliyski Blvd., fl. 1',call:'Call',email:'Email',save:'Save contact',map:'Address',meeting:'Book meeting',website:'Website',share:'Share',solutionsTitle:'Financial solutions',s1:'Mortgage loans',s2:'Business loans',appleWallet:'Apple Wallet',googleWallet:'Google Wallet',s3:'Refinancing',s4:'Financial consulting',installTitle:'Save as app',installText:'Open the browser menu and choose Add to Home Screen or Install app.',walletAdd:'Add to',qrTitle:'QR code',qrText:'Scan me'}
};
function setLang(lang){
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=content[lang][el.dataset.i18n]||el.textContent});
  document.querySelectorAll('.lang button').forEach(btn=>btn.classList.toggle('active',btn.dataset.lang===lang));
  localStorage.setItem('lang',lang);
}
document.querySelectorAll('.lang button').forEach(btn=>btn.addEventListener('click',()=>setLang(btn.dataset.lang)));
setLang(localStorage.getItem('lang')||'bg');

const shareBtn=document.getElementById('shareBtn');
if(shareBtn){
  shareBtn.addEventListener('click',async()=>{
    const data={title:'Daniela Karakonov | Winners Group',text:'Digital business card',url:window.location.href};
    if(navigator.share){await navigator.share(data).catch(()=>{});} else {await navigator.clipboard.writeText(window.location.href).catch(()=>{}); shareBtn.querySelector('span:last-child').textContent='Копирано';}
  });
}

document.querySelectorAll('.wallet-action').forEach(btn=>{
  btn.addEventListener('click',()=>{
    btn.classList.add('notice');
    const lang=localStorage.getItem('lang')||'bg';
    const msg=lang==='bg' ? 'Wallet файлът се добавя на следващ етап.' : 'Wallet pass will be added in the next stage.';
    alert(msg);
    setTimeout(()=>btn.classList.remove('notice'),900);
  });
});

if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}
