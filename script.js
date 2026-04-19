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
                tabLinks.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                button.classList.add('active');
                const targetElement = document.getElementById(target);
                if (targetElement) targetElement.classList.add('active');
            });
        });
    }

    // ==========================================
    // 2. SLIDER AVANT / APRÈS (Unifié Horizontal & Vertical)
    // ==========================================
    const sliders = document.querySelectorAll('.before-after-slider');

    sliders.forEach(slider => {
        const input = slider.querySelector('.slider-input');
        const afterWrapper = slider.querySelector('.after-wrapper');
        const afterImage = afterWrapper.querySelector('img');
        const line = slider.querySelector('.slider-line');

        const updateSlider = () => {
            const value = input.value + "%";
            
            if (slider.classList.contains('slider-vertical')) {
                // MODE VERTICAL
                afterWrapper.style.width = "100%"; // Force la largeur pleine
                afterWrapper.style.height = value;  // Change la hauteur
                if (line) line.style.top = value;
            } else {
                // MODE HORIZONTAL
                afterWrapper.style.height = "100%"; // Force la hauteur pleine
                afterWrapper.style.width = value;   // Change la largeur
                if (line) line.style.left = value;

                // Correction pour éviter que l'image ne se rétrécisse
                if (slider.offsetWidth > 0) {
                    afterImage.style.width = slider.offsetWidth + 'px';
                }
            }
        };

        input.addEventListener('input', updateSlider);
        window.addEventListener('resize', updateSlider);
        // On attend un peu que les images chargent pour calculer les tailles
        setTimeout(updateSlider, 500);
    });
});

// ==========================================
// 3. FONCTION DES AVIS GOOGLE
// ==========================================
function initReviews() {
    const placeId = "ChIJx_L3E-Cn2yERRFN59BxqntE";
    const container = document.getElementById('google-reviews-container');
    if (!container) return;

    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.getDetails({
        placeId: placeId,
        fields: ['reviews']
    }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
            container.innerHTML = '';
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
        }
    });
}

// ==========================================
// 4. CHARGEMENT DYNAMIQUE DE L'API GOOGLE
// ==========================================
const apiKey = 'AIzaSyAgNdfhKoBAHsgjthRfJslNh1cY3DASzfk'; 
const scriptGoogle = document.createElement('script');
scriptGoogle.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initReviews`;
scriptGoogle.async = true;
scriptGoogle.defer = true;
document.head.appendChild(scriptGoogle);






