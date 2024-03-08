// Main Delay Variable
const mainDelay = 5000;

/* Create Page Sliders */
window.addEventListener("load", () => {
  // Wait Until The Page Content Is Added
  setTimeout(() => {
    // Hero Slider
    createHeroslider();
    // Ifluencers Slider
    createInfluencersSlider();
    // Products Slider
    createProductsSlider();
    // Testimonials Slider
    createTestimonialsSlider();
    // Product Small Images Slider
    createProductSmallImagesSlider();
  }, 10);
});

// Functions
function createHeroslider() {
  const heroSlider = new Swiper('.hero .swiper', {
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: mainDelay,
    },
    pagination: {
      el: '.hero .hero-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.hero .next-btn',
      prevEl: '.hero .prev-btn',
    },
  });
}

function createInfluencersSlider() {
  const influencersSlider = new Swiper('.influencers .swiper', {
    spaceBetween: 15,
    autoplay: {
      delay: mainDelay,
    },
    scrollbar: {
      el: ".swiper-scrollbar.influencers-scrollbar",
      draggable: true,
    },
    breakpoints: {
      450: {
        slidesPerView: 2,
      },
      650: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      }
    },
  });
}

function createProductsSlider() {
  const productsSlider = new Swiper('.products .swiper', {
    spaceBetween: 15,
    autoplay: {
      delay: mainDelay,
    },
    scrollbar: {
      el: ".swiper-scrollbar.products-scrollbar",
      draggable: true,
    },
    breakpoints: {
      450: {
        slidesPerView: 2,
      },
      650: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      }
    },
  });
}

function createTestimonialsSlider() {
  const testimonialsSlider = new Swiper('.testimonials .swiper', {
    spaceBetween: 15,
    autoplay: {
      delay: mainDelay,
    },
    navigation: {
      nextEl: '.testimonials .next-btn',
      prevEl: '.testimonials .prev-btn',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 4,
      }
    },
  });
}

function createProductSmallImagesSlider() {
  const testimonialsSlider = new Swiper('.product-view .swiper', {
    spaceBetween: 5,
    slidesPerView: 4,
  });
}