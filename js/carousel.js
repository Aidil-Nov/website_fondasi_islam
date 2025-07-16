document.addEventListener("DOMContentLoaded", function () {
  // Initialize Feather Icons
  feather.replace();

  const carousel = document.querySelector(".carousel");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".arrow-btn.left");
  const nextBtn = document.querySelector(".arrow-btn.right");

  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let currentIndex = 0;

  const slideWidth =
    slides[0].offsetWidth + parseInt(getComputedStyle(carousel).gap);

  // Set carousel position
  function setSliderPosition() {
    carousel.style.transform = `translateX(${currentTranslate}px)`;
  }

  // Update current index
  function updateCurrentIndex(newIndex) {
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= slides.length - 1) newIndex = slides.length - 1;

    currentIndex = newIndex;
    currentTranslate = -(currentIndex * slideWidth);
    setSliderPosition();
  }

  // Mouse events for dragging
  carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    startPos = e.clientX;
    carousel.classList.add("dragging");
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const currentPos = e.clientX;
    const diff = currentPos - startPos;
    currentTranslate = prevTranslate + diff;
    setSliderPosition();
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;

    isDragging = false;
    carousel.classList.remove("dragging");

    const movedBy = currentTranslate - prevTranslate;

    // Check if moved enough to change slide
    if (Math.abs(movedBy) > slideWidth / 4) {
      currentIndex = movedBy > 0 ? currentIndex - 1 : currentIndex + 1;
    }

    updateCurrentIndex(currentIndex);
    prevTranslate = currentTranslate;
  });

  // Touch events for mobile
  carousel.addEventListener("touchstart", (e) => {
    isDragging = true;
    startPos = e.touches[0].clientX;
    carousel.classList.add("dragging");
  });

  document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    const currentPos = e.touches[0].clientX;
    const diff = currentPos - startPos;
    currentTranslate = prevTranslate + diff;
    setSliderPosition();
  });

  document.addEventListener("touchend", () => {
    if (!isDragging) return;

    isDragging = false;
    carousel.classList.remove("dragging");

    const movedBy = currentTranslate - prevTranslate;

    if (Math.abs(movedBy) > slideWidth / 4) {
      currentIndex = movedBy > 0 ? currentIndex - 1 : currentIndex + 1;
    }

    updateCurrentIndex(currentIndex);
    prevTranslate = currentTranslate;
  });

  // Arrow button navigation
  prevBtn.addEventListener("click", () => {
    updateCurrentIndex(currentIndex - 1);
    prevTranslate = currentTranslate;
  });

  nextBtn.addEventListener("click", () => {
    updateCurrentIndex(currentIndex + 1);
    prevTranslate = currentTranslate;
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      updateCurrentIndex(currentIndex - 1);
      prevTranslate = currentTranslate;
    } else if (e.key === "ArrowRight") {
      updateCurrentIndex(currentIndex + 1);
      prevTranslate = currentTranslate;
    }
  });
});
