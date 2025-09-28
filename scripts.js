// Initialize current year in footer
(function initializeYear() {
  var yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
})();

// Simple lightbox for gallery
(function initializeLightbox() {
  var lightboxElement = document.getElementById('lightbox');
  if (!lightboxElement) return;

  var imageElement = lightboxElement.querySelector('.lightbox__image');
  var captionElement = lightboxElement.querySelector('.lightbox__caption');
  var closeButton = lightboxElement.querySelector('.lightbox__close');
  var prevButton = lightboxElement.querySelector('.lightbox__prev');
  var nextButton = lightboxElement.querySelector('.lightbox__next');

  var galleryItems = Array.prototype.slice.call(document.querySelectorAll('.gallery__grid .gallery__item'));
  var currentIndex = -1;

  function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();
    lightboxElement.classList.add('is-open');
    lightboxElement.setAttribute('aria-hidden', 'false');
    document.addEventListener('keydown', handleKeydown);
  }

  function closeLightbox() {
    lightboxElement.classList.remove('is-open');
    lightboxElement.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', handleKeydown);
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeLightbox();
    } else if (event.key === 'ArrowRight') {
      showNext();
    } else if (event.key === 'ArrowLeft') {
      showPrev();
    }
  }

  function updateLightboxImage() {
    if (currentIndex < 0 || currentIndex >= galleryItems.length) return;
    var anchor = galleryItems[currentIndex];
    var fullUrl = anchor.getAttribute('href');
    var caption = anchor.getAttribute('data-caption') || '';
    imageElement.src = fullUrl;
    imageElement.alt = caption;
    captionElement.textContent = caption;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateLightboxImage();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxImage();
  }

  galleryItems.forEach(function(anchor, index) {
    anchor.addEventListener('click', function(event) {
      event.preventDefault();
      openLightbox(index);
    });
  });

  closeButton.addEventListener('click', closeLightbox);
  nextButton.addEventListener('click', showNext);
  prevButton.addEventListener('click', showPrev);

  // Close when clicking outside the image or controls
  lightboxElement.addEventListener('click', function(event) {
    var isClickOnImage = imageElement.contains(event.target);
    var isClickOnControls = event.target === closeButton || event.target === nextButton || event.target === prevButton;
    if (!isClickOnImage && !isClickOnControls) {
      closeLightbox();
    }
  });
})();