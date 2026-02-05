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
// Slider avant / après
// =========================

  document.querySelectorAll('.before-after-slider').forEach(slider => {
  const input = slider.querySelector('.slider-input');
  const afterWrapper = slider.querySelector('.after-wrapper');
  const afterImage = afterWrapper.querySelector('img');

  // Fonction pour ajuster la taille de l'image de dessus
  const updateSlider = (value) => {
    afterWrapper.style.width = `${value}%`;
    // On force l'image interne à garder la taille du conteneur parent
    afterImage.style.width = `${slider.offsetWidth}px`;
  };

  input.addEventListener('input', (e) => {
    updateSlider(e.target.value);
  });

  // Ajuste la taille si on tourne le téléphone (responsive)
  window.addEventListener('resize', () => {
    updateSlider(input.value);
  });
  
  // Initialisation au chargement
  updateSlider(50);
});
document.querySelectorAll('.before-after-slider').forEach(slider => {
  const input = slider.querySelector('.slider-input');
  const afterWrapper = slider.querySelector('.after-wrapper');

  input.addEventListener('input', (e) => {
    const value = e.target.value;
    afterWrapper.style.width = `${value}%`;
  });
});

  // Position initiale (50%)
  const rect = slider.getBoundingClientRect();
  const startX = rect.width / 2;
  afterWrapper.style.width = startX + 'px';
  handle.style.left = startX + 'px';

  const getX = e =>
    (e.touches ? e.touches[0].clientX : e.clientX);

  const startDrag = () => { isDragging = true; };
  const stopDrag = () => { isDragging = false; };

  const moveSlider = e => {
    if (!isDragging) return;

    const rect = slider.getBoundingClientRect();
    let x = getX(e) - rect.left;
    x = Math.max(0, Math.min(x, rect.width));

    afterWrapper.style.width = x + 'px';
    handle.style.left = x + 'px';
  };

  handle.addEventListener('mousedown', startDrag);
  handle.addEventListener('touchstart', startDrag);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);
    window.addEventListener('mousemove', moveSlider);
    window.addEventListener('touchmove', moveSlider);
  });
});


