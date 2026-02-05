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
            
            // Correction pour Ordinateur : On force la largeur de l'image
            // pour qu'elle ne soit pas écrasée par le conteneur After
            if (slider.offsetWidth > 0) {
                afterImage.style.width = slider.offsetWidth + 'px';
            }
        };

        // Écoute les mouvements du curseur (souris ou doigt)
        input.addEventListener('input', updateSlider);

        // Crucial pour Ordinateur : Recalculer quand l'image est totalement chargée
        // et quand on redimensionne la fenêtre
        window.addEventListener('load', updateSlider);
        window.addEventListener('resize', updateSlider);

        // Lancement initial (on force un petit délai pour être sûr que le rendu est prêt)
        setTimeout(updateSlider, 100);
    });

});
