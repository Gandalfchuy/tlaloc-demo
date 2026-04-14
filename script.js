// Manejo del scroll para cambiar el estilo del navbar
window.addEventListener('scroll', () => {
    const header = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        header.style.padding = '1rem 10%';
        header.style.background = '#F5F5DCF2'; // Con ligera transparencia
    } else {
        header.style.padding = '1.5rem 10%';
        header.style.background = '#F5F5DC';
    }
});

// Validación simple del formulario
const contactForm = document.getElementById('contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por contactar a Tlaloc Zapatería! Nos comunicaremos contigo pronto.');
        contactForm.reset();
    });
}

// Efecto de aparición suave para las secciones al hacer scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
});

// --- Lógica del Carrusel ---
const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const dots = Array.from(document.querySelectorAll('.dot'));

let currentIndex = 0;

// Función para mover el carrusel
const moveToSlide = (index) => {
    // Evitar que se salga de los límites
    if (index < 0) {
        currentIndex = slides.length - 1; // Vuelve al final
    } else if (index >= slides.length) {
        currentIndex = 0; // Vuelve al principio
    } else {
        currentIndex = index;
    }

    // Mover el track (100% por cada slide)
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Actualizar los puntitos
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
};

// Eventos de los botones
if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => moveToSlide(currentIndex + 1));
    prevBtn.addEventListener('click', () => moveToSlide(currentIndex - 1));
}

// Eventos de los puntitos
dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const targetIndex = parseInt(e.target.getAttribute('data-index'));
        moveToSlide(targetIndex);
    });
});

// Opcional: Carrusel automático cada 5 segundos
// setInterval(() => moveToSlide(currentIndex + 1), 5000);