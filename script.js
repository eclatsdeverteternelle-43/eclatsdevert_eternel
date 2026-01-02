/* =========================
   JS POUR LES TABS
========================= */
const tabButtons = document.querySelectorAll('.tabs button');
const tabContents = document.querySelectorAll('.tab-content');
const navLinks = document.querySelectorAll('nav a');

function activateTab(tabName) {
  tabContents.forEach(tc => tc.classList.remove('active'));
  tabButtons.forEach(tb => tb.classList.remove('active'));
  tabContents.forEach(tc => { if(tc.id === tabName) tc.classList.add('active'); });
  tabButtons.forEach(tb => { if(tb.dataset.tab === tabName) tb.classList.add('active'); });
  navLinks.forEach(nl => { if(nl.dataset.tab === tabName) nl.classList.add('active'); else nl.classList.remove('active'); });
}

tabButtons.forEach(btn => btn.addEventListener('click', () => activateTab(btn.dataset.tab)));
navLinks.forEach(link => link.addEventListener('click', e => { e.preventDefault(); activateTab(link.dataset.tab); }));

/* =========================
   JS POUR LE SLIDER AVANT/APRES
========================= */
function initBeforeAfterSlider(slider) {
  const afterImg = slider.querySelector('.after');
  const handle = slider.querySelector('.slider-handle');
  let isDragging = false;

  const move = (x) => {
    const rect = slider.getBoundingClientRect();
    let offset = x - rect.left;
    if(offset < 0) offset = 0;
    if(offset > rect.width) offset = rect.width;
    afterImg.style.width = offset + 'px';
    handle.style.left = offset + 'px';
  }

  handle.addEventListener('mousedown', () => isDragging = true);
  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('mousemove', e => { if(isDragging) move(e.clientX); });

  handle.addEventListener('touchstart', () => isDragging = true);
  window.addEventListener('touchend', () => isDragging = false);
  window.addEventListener('touchmove', e => { if(isDragging) move(e.touches[0].clientX); });

  move(slider.offsetWidth / 2);
}

document.querySelectorAll('.before-after-slider').forEach(initBeforeAfterSlider);
