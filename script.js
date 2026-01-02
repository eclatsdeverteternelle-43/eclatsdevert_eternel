// =========================
// Onglets
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  tabLinks.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-tab');

      // Désactive tous les onglets et contenus
      tabLinks.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Active l'onglet et le contenu correspondant
      button.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  // =========================
  // Slider avant/après
  // =========================
  document.querySelectorAll('.before-after-slider').forEach(slider => {
    const afterWrapper = slider.querySelector('.after-wrapper');
    const handle = slider.querySelector('.slider-handle');

    let isDragging = false;

    const startDrag = e => { isDragging = true; };
    const stopDrag = e => { isDragging = false; };
    const moveSlider = e => {
      if (!isDragging) return;
      const rect = slider.getBoundingClientRect();
      let x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      afterWrapper.style.width = x + 'px';
      handle.style.left = x + 'px';
    };

    slider.addEventListener('mousedown', startDrag);
    slider.addEventListener('touchstart', startDrag);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);
    window.addEventListener('mousemove', moveSlider);
    window.addEventListener('touchmove', moveSlider);
  });
});

