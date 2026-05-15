// =========================================================================
// 1. DESPLAZAMIENTO SUAVE PARA LOS ENLACES DEL MENÚ
// =========================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');

        if (targetId !== "#") {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// =========================================================================
// 2. ANIMACIONES HOVER PARA LAS TARJETAS DE PRODUCTOS
// =========================================================================
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// =========================================================================
// 3. SISTEMA DE CARRITO FLOTANTE (ESTILO SHEIN) Y MODAL WHATSAPP
// =========================================================================
let productosSeleccionados = [];

function toggleSelect(button) {
    const name = button.getAttribute('data-name');
    const img = button.getAttribute('data-img');
    const floatingBtn = document.getElementById('cart-floating-btn');
    const badge = document.getElementById('cart-badge');

    const index = productosSeleccionados.findIndex(item => item.name === name);

    if (index === -1) {
        // Seleccionar producto
        productosSeleccionados.push({ name: name, img: img });
        button.classList.add('selected');
        button.innerHTML = '<i class="fa-solid fa-square-check"></i> Seleccionado';
    } else {
        // Deseleccionar producto
        productosSeleccionados.splice(index, 1);
        button.classList.remove('selected');
        button.innerHTML = '<i class="fa-regular fa-square"></i> Seleccionar';
    }

    const total = productosSeleccionados.length;
    badge.innerText = total;

    // Controlamos el despliegue del carrito flotante en pantalla
    if (total > 0) {
        floatingBtn.style.display = 'flex';
    } else {
        floatingBtn.style.display = 'none';
    }
}

// Abre la ventana de confirmación y genera la vista previa
function abrirModalConfirmacion() {
    const modal = document.getElementById('confirm-modal');
    const previewContainer = document.getElementById('modal-items-preview');

    // Limpiamos contenido previo
    previewContainer.innerHTML = "";

    // Generamos la lista de lo que van a mandar
    productosSeleccionados.forEach((prod, i) => {
        const itemParaModal = document.createElement('div');
        itemParaModal.style.marginBottom = '8px';
        itemParaModal.innerHTML = `<strong>${i + 1}.</strong> ${prod.name}`;
        previewContainer.appendChild(itemParaModal);
    });

    modal.style.display = 'flex';
}

// Cierra la ventana si el cliente decide seguir editando
function cerrarModalConfirmacion() {
    document.getElementById('confirm-modal').style.display = 'none';
}

// Ejecuta el flujo hacia la API oficial de WhatsApp
function confirmarYEnviar() {
    cerrarModalConfirmacion();

    const numeroTel = "528448804726";
    let mensaje = "¡Hola! Me gustaría armar un paquete personalizado con los siguientes servicios:\n\n";

    productosSeleccionados.forEach((prod, i) => {
        mensaje += `${i + 1}. *${prod.name}*\n`;
    });

    mensaje += "\n¿Me podrían proporcionar una cotización para estos servicios?";

    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${numeroTel}?text=${mensajeCodificado}`;

    window.open(urlWhatsApp, '_blank');
}
