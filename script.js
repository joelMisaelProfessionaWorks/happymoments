// Desplazamiento suave para todos los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');

        // Evitamos errores si el enlace es solo "#"
        if (targetId !== "#") {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Asegura que empiece desde arriba de la sección
                });
            }
        }
    });
});
// Product hover animations
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
    })
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    })
});