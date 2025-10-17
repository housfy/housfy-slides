// Templates embebidos (contenido de head.html y navigation.html)
const HEAD_TEMPLATE = `
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Housfy Slides</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap"
  rel="stylesheet"
/>
`;

const NAVIGATION_TEMPLATE = `
<!-- Navegación -->
<div class="navigation">
  <button class="nav-button" id="prev-btn" title="Anterior">←</button>
  <button class="nav-button" id="next-btn" title="Siguiente">→</button>
</div>

<!-- Contador -->
<div class="slide-counter">
  <span id="current-slide">1</span> / <span id="total-slides">4</span>
</div>
`;

// Función para inyectar los templates en el DOM
function loadPartials() {
  // Inyectar head
  document.head.innerHTML = HEAD_TEMPLATE + document.head.innerHTML;

  // Inyectar navigation
  document.body.insertAdjacentHTML("beforeend", NAVIGATION_TEMPLATE);
}

class SlideShow {
  constructor() {
    this.slides = document.querySelectorAll(".slide");
    this.currentSlideIndex = 0;
    this.currentStepIndex = 0;
    this.totalSlides = this.slides.length;

    this.init();
  }

  init() {
    // Asignar automáticamente data-slide a cada section
    this.slides.forEach((slide, index) => {
      slide.setAttribute("data-slide", index + 1);
    });

    // Actualizar contador
    document.getElementById("total-slides").textContent = this.totalSlides;

    // Event listeners para navegación
    document
      .getElementById("next-btn")
      .addEventListener("click", () => this.next());
    document
      .getElementById("prev-btn")
      .addEventListener("click", () => this.previous());

    // Event listeners para teclado
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        this.next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        this.previous();
      }
    });

    // Event listener para clicks en la pantalla
    document
      .getElementById("slides-container")
      .addEventListener("click", (e) => {
        // No navegar si se hizo click en los botones
        if (!e.target.closest(".nav-button")) {
          this.next();
        }
      });

    // Mostrar primera slide y sus steps iniciales
    this.showSlide(0);
  }

  getCurrentSlide() {
    return this.slides[this.currentSlideIndex];
  }

  getSteps(slide) {
    return slide.querySelectorAll(".step");
  }

  next() {
    const currentSlide = this.getCurrentSlide();
    const steps = this.getSteps(currentSlide);

    // Si hay más steps en la slide actual
    if (this.currentStepIndex < steps.length - 1) {
      this.currentStepIndex++;
      steps[this.currentStepIndex].classList.add("visible");
    }
    // Si no hay más steps, ir a la siguiente slide
    else if (this.currentSlideIndex < this.totalSlides - 1) {
      this.goToSlide(this.currentSlideIndex + 1);
    }
  }

  previous() {
    const currentSlide = this.getCurrentSlide();
    const steps = this.getSteps(currentSlide);

    // Si hay steps visibles para ocultar
    if (this.currentStepIndex > 0) {
      steps[this.currentStepIndex].classList.remove("visible");
      this.currentStepIndex--;
    }
    // Si no, ir a la slide anterior
    else if (this.currentSlideIndex > 0) {
      this.goToSlide(this.currentSlideIndex - 1, true);
    }
  }

  goToSlide(index, showAllSteps = false) {
    if (index < 0 || index >= this.totalSlides) return;

    // Ocultar slide actual
    const currentSlide = this.getCurrentSlide();
    currentSlide.classList.remove("active");
    currentSlide.classList.add("previous");

    // Ocultar todos los steps de la slide actual
    const currentSteps = this.getSteps(currentSlide);
    currentSteps.forEach((step) => step.classList.remove("visible"));

    // Actualizar índice
    this.currentSlideIndex = index;

    // Mostrar nueva slide
    const newSlide = this.getCurrentSlide();
    newSlide.classList.remove("previous");
    newSlide.classList.add("active");

    // Resetear steps
    const newSteps = this.getSteps(newSlide);

    if (showAllSteps) {
      // Al retroceder, mostrar todos los steps
      this.currentStepIndex = newSteps.length - 1;
      newSteps.forEach((step) => step.classList.add("visible"));
    } else {
      // Al avanzar, mostrar solo el primer step
      this.currentStepIndex = 0;
      if (newSteps.length > 0) {
        newSteps[0].classList.add("visible");
      }
    }

    // Actualizar contador
    this.updateCounter();
  }

  showSlide(index) {
    this.goToSlide(index);
  }

  updateCounter() {
    document.getElementById("current-slide").textContent =
      this.currentSlideIndex + 1;
  }
}

// Inicializar slideshow cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // Primero cargar los partials (head y navigation)
  loadPartials();

  // Luego inicializar el slideshow
  new SlideShow();
});
