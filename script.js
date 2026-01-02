// Onglets
const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

tabLinks.forEach(btn=>{
  btn.addEventListener('click',()=>{
    const target=btn.dataset.tab;
    tabLinks.forEach(b=>b.classList.remove('active'));
    tabContents.forEach(c=>c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

// Sliders avant/après
document.querySelectorAll('.before-after-slider').forEach(slider=>{
  const afterWrapper=slider.querySelector('.after-wrapper');
  const handle=slider.querySelector('.slider-handle');
  let isDragging=false;

  const start=e=>{ isDragging=true; };
  const stop=e=>{ isDragging=false; };
  const move=e=>{
    if(!isDragging) return;
    const rect=slider.getBoundingClientRect();
    let x=(e.touches?e.touches[0].clientX:e.clientX)-rect.left;
    x=Math.max(0, Math.min(x, rect.width));
    afterWrapper.style.width=x+'px';
    handle.style.left=x+'px';
  };

  slider.addEventListener('mousedown',start);
  slider.addEventListener('touchstart',start);
  window.addEventListener('mouseup',stop);
  window.addEventListener('touchend',stop);
  window.addEventListener('mousemove',move);
  window.addEventListener('touchmove',move);
});
