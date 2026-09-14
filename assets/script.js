// ---- active nav highlighting ----
(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlinks a[data-page]').forEach(a=>{
    if(a.dataset.page === path){ a.classList.add('active'); }
  });
})();

// ---- mobile menu ----
(function(){
  const btn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.navlinks');
  if(!btn || !nav) return;
  btn.addEventListener('click', ()=> nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> nav.classList.remove('open')));
})();

// ---- header hide on scroll down ----
(function(){
  let lastY = window.scrollY;
  const topHeader = document.querySelector('header.top');
  if(!topHeader) return;
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY;
    if(y > lastY && y > 120){ topHeader.style.transform='translateY(-100%)'; }
    else{ topHeader.style.transform='translateY(0)'; }
    lastY = y;
  });
})();

// ---- scroll reveal ----
(function(){
  const revealEls = document.querySelectorAll('.reveal, .navcard, .dir-card, .stack-row, .tl-item, .phase-card');
  if(!revealEls.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); } });
  }, {threshold:0.16});
  revealEls.forEach(el=>io.observe(el));
})();

// ---- navcard / dircard staggered entrance (uses inline opacity/transform) ----
(function(){
  const cards = document.querySelectorAll('.navcard');
  if(!cards.length) return;
  cards.forEach((el,i)=>{ el.style.transitionDelay = (i*0.08)+'s'; });
})();

// ---- stack diagram stagger ----
(function(){
  document.querySelectorAll('.stack-row').forEach((el,i)=>{ el.style.transitionDelay = (i*0.12)+'s'; });
})();

// ---- timeline items + track fill ----
(function(){
  const tlItems = document.querySelectorAll('.tl-item');
  const trackFill = document.getElementById('trackFill');
  if(!tlItems.length || !trackFill) return;
  const timelineEl = tlItems[0].closest('.timeline');
  const tlObs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        tlItems.forEach((el,i)=> setTimeout(()=> el.classList.add('in'), i*130));
        trackFill.style.width = '100%';
        tlObs.disconnect();
      }
    });
  }, {threshold:0.3});
  tlObs.observe(timelineEl);
})();

// ---- phase grid stagger ----
(function(){
  document.querySelectorAll('#phaseGrid6 .phase-card').forEach((el,i)=>{ el.style.transitionDelay = (i*0.08)+'s'; });
})();

// ---- hero load sequence (home page only) ----
window.addEventListener('DOMContentLoaded', ()=>{
  const logo = document.querySelector('.hero-logo svg');
  if(logo){
    logo.style.opacity=0; logo.style.transform='scale(.6)';
    logo.style.transition='opacity .6s ease, transform .6s cubic-bezier(.2,.8,.2,1)';
    requestAnimationFrame(()=>{ setTimeout(()=>{ logo.style.opacity=1; logo.style.transform='scale(1)'; }, 120); });
  }
  const navcards = document.querySelectorAll('.navcard');
  if(navcards.length){
    setTimeout(()=>{
      navcards.forEach((el,i)=>{ setTimeout(()=>{ el.style.opacity=1; el.style.transform='translateY(0)'; }, i*90); });
    }, 700);
  }
});

// ---- commercial model tabs ----
(function(){
  const tabBtns = document.querySelectorAll('.tab-btn');
  if(!tabBtns.length) return;
  tabBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.model-pane').forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });
})();
