const scrollButtons = document.querySelectorAll(".scroll-btn");

const handleScroll = (event) => {
  const targetSelector = event.currentTarget.getAttribute("data-target");
  const target = document.querySelector(targetSelector);

  if (!target) return;

  // Smooth scroll with custom easing
  const headerOffset = 80;
  const elementPosition = target.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  // Custom smooth scroll with easing
  const startPosition = window.pageYOffset;
  const distance = offsetPosition - startPosition;
  const duration = 1000; // 1 second scroll
  let start = null;

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutQuad(progress);

    window.scrollTo(0, startPosition + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
};

scrollButtons.forEach((button, index) => {
  button.addEventListener("click", handleScroll);
  button.style.animationDelay = `${index * 0.1 + 0.8}s`;
});

const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Avatar carousel functionality
const avatarImages = document.querySelectorAll(".avatar-img");
if (avatarImages.length > 0) {
  let currentAvatarIndex = 0;

  function cycleAvatars() {
    // Remove active class from current image
    avatarImages[currentAvatarIndex].classList.remove("active");
    avatarImages[currentAvatarIndex].classList.add("prev");

    // Move to next image
    currentAvatarIndex = (currentAvatarIndex + 1) % avatarImages.length;

    // Add active class to new image
    avatarImages[currentAvatarIndex].classList.add("active");
    avatarImages[currentAvatarIndex].classList.remove("prev");
  }

  // Change avatar every 2 seconds
  setInterval(cycleAvatars, 4000);
}

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const siteHeader = document.querySelector(".site-header");

// Smooth scroll for navigation links
const navLinkElements = document.querySelectorAll(".nav-link");
navLinkElements.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      // Close mobile menu if open
      if (navToggle) {
        navToggle.setAttribute("aria-expanded", "false");
      }
      if (navLinks) {
        navLinks.classList.remove("is-open");
      }

      // Smooth scroll to section with custom easing
      const headerOffset = 80; // Height of sticky header
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      // Custom smooth scroll with easing
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 1000; // 1 second scroll
      let start = null;

      function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      }

      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      }

      requestAnimationFrame(animation);
    }
  });
});

// Navbar scroll effect
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 50) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }

  lastScrollTop = scrollTop;
});

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navLinks.classList.toggle("is-open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("is-open");
    });
  });
  // Footer Script Placeholder
  console.log("Footer Loaded");
}

// English Day Gallery Functionality
const galleryImages = document.querySelectorAll(".gallery-img");
const galleryScrollContainer = document.querySelector(".gallery-scroll-container");
const prevBtn = document.querySelector(".gallery-nav-btn--prev");
const nextBtn = document.querySelector(".gallery-nav-btn--next");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.querySelector(".image-modal-close");
const modalPrev = document.querySelector(".image-modal-prev");
const modalNext = document.querySelector(".image-modal-next");
const currentImageSpan = document.getElementById("currentImage");
const totalImagesSpan = document.getElementById("totalImages");

let currentImageIndex = 0;
const totalImages = galleryImages.length;

if (totalImagesSpan) {
  totalImagesSpan.textContent = totalImages;
}

// Gallery scroll navigation
if (prevBtn && nextBtn && galleryScrollContainer) {
  prevBtn.addEventListener("click", () => {
    galleryScrollContainer.scrollBy({
      left: -320,
      behavior: "smooth"
    });
  });

  nextBtn.addEventListener("click", () => {
    galleryScrollContainer.scrollBy({
      left: 320,
      behavior: "smooth"
    });
  });
}

// Open modal on image click
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentImageIndex = index;
    openModal();
  });
});

function openModal() {
  if (imageModal && modalImage && galleryImages[currentImageIndex]) {
    imageModal.classList.add("show");
    imageModal.style.display = "flex";
    modalImage.src = galleryImages[currentImageIndex].src;
    modalImage.alt = galleryImages[currentImageIndex].alt;
    updateModalCounter();
    document.body.style.overflow = "hidden";
  }
}

function closeModal() {
  if (imageModal) {
    imageModal.classList.remove("show");
    imageModal.style.display = "none";
    document.body.style.overflow = "";
  }
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % totalImages;
  if (modalImage && galleryImages[currentImageIndex]) {
    modalImage.src = galleryImages[currentImageIndex].src;
    modalImage.alt = galleryImages[currentImageIndex].alt;
    updateModalCounter();
  }
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
  if (modalImage && galleryImages[currentImageIndex]) {
    modalImage.src = galleryImages[currentImageIndex].src;
    modalImage.alt = galleryImages[currentImageIndex].alt;
    updateModalCounter();
  }
}

function updateModalCounter() {
  if (currentImageSpan) {
    currentImageSpan.textContent = currentImageIndex + 1;
  }
}

// Modal event listeners
if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (modalNext) {
  modalNext.addEventListener("click", showNextImage);
}

if (modalPrev) {
  modalPrev.addEventListener("click", showPrevImage);
}

// Close modal on background click
if (imageModal) {
  imageModal.addEventListener("click", (e) => {
    if (e.target === imageModal) {
      closeModal();
    }
  });
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (imageModal && imageModal.classList.contains("show")) {
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowRight") {
      showNextImage();
    } else if (e.key === "ArrowLeft") {
      showPrevImage();
    }
  }
});
