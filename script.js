// On attend que la page soit totalement chargée
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. GESTION DES ONGLETS (Tabs)
    // ==========================================
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabLinks.length > 0) {
        tabLinks.forEach(button => {
            button.addEventListener('click', () => {
                const target = button.getAttribute('data-tab');

                // Désactive tout
                tabLinks.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Active l'onglet et le contenu cliqué
                button.classList.add('active');
                const targetElement = document.getElementById(target);
                if (targetElement) targetElement.classList.add('active');
            });
        });
    }

    // ==========================================
    // 2. SLIDER AVANT / APRÈS (Interactif)
    // ==========================================
    const sliders = document.querySelectorAll('.before-after-slider');

    sliders.forEach(slider => {
        const input = slider.querySelector('.slider-input');
        const afterWrapper = slider.querySelector('.after-wrapper');
        const afterImage = afterWrapper.querySelector('img');

        // Fonction pour synchroniser la barre et l'image
        const updateSlider = () => {
            const value = input.value;
            // Déplace la ligne de séparation
            afterWrapper.style.width = `${value}%`;
            // Empêche l'image de "s'écraser" en lui redonnant la largeur du slider
            afterImage.style.width = `${slider.offsetWidth}px`;
        };

        // Écoute les mouvements du curseur (souris ou doigt)
        input.addEventListener('input', updateSlider);

        // Recalcule si on redimensionne la fenêtre (ex: passage paysage/portrait)
        window.addEventListener('resize', updateSlider);

        // Lancement initial au milieu (50%)
        updateSlider();
    });

});
