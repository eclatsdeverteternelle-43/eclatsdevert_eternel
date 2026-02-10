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

        const updateSlider = () => {
            const value = input.value;
            afterWrapper.style.width = `${value}%`;
            
            if (slider.offsetWidth > 0) {
                afterImage.style.width = slider.offsetWidth + 'px';
            }
        };

        input.addEventListener('input', updateSlider);
        window.addEventListener('load', updateSlider);
        window.addEventListener('resize', updateSlider);
        setTimeout(updateSlider, 100);
    });
});

// ==========================================
// 3. FONCTION DES AVIS GOOGLE (Appelée par l'API)
// ==========================================
function initReviews() {
    // Votre Place ID identifié : ChIJx_L3E-Cn2yERRFN59BxqntE
    const placeId = "ChIJx_L3E-Cn2yERRFN59BxqntE";
    const container = document.getElementById('google-reviews-container');

    if (!container) return;

    // Création du service Google Places
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.getDetails({
        placeId: placeId,
        fields: ['reviews']
    }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
            container.innerHTML = ''; // On vide le texte "Chargement..."

            // Tri par date (plus récent d'abord) et limitation à 3 avis
            const topReviews = place.reviews
                .sort((a, b) => b.time - a.time)
                .slice(0, 3);

            topReviews.forEach(review => {
                const stars = "⭐".repeat(review.rating);
                const reviewHtml = `
                    <div class="avis-card" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; border-radius: 8px; background: #f9f9f9;">
                        <div class="avis-header" style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <strong class="avis-nom">${review.author_name}</strong>
                            <span class="avis-etoiles" style="color: #f1c40f;">${stars}</span>
                        </div>
                        <p class="avis-texte" style="font-style: italic; font-size: 0.9em;">"${review.text.substring(0, 160)}..."</p>
                    </div>
                `;
                container.innerHTML += reviewHtml;
            });
        } else {
            console.error("Erreur Google API:", status);
            container.innerHTML = '<p>Découvrez nos avis directement sur Google.</p>';
        }
    });
}

// ==========================================
// 4. CHARGEMENT DYNAMIQUE DE L'API GOOGLE
// ==========================================
// REMPLACEZ 'VOTRE_CLE_API_REELLE' PAR VOTRE VRAIE CLÉ CI-DESSOUS
const apiKey = 'AIzaSyAgNdfhKoBAHsgjthRfJslNh1cY3DASzfk'; 

const scriptGoogle = document.createElement('script');
scriptGoogle.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initReviews`;
scriptGoogle.async = true;
scriptGoogle.defer = true;
document.head.appendChild(scriptGoogle);
