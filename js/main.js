// Selectors
const preloader = document.querySelector('.preloader');
const header = document.querySelector('header');
const mainMenu = document.querySelector('.main-menu');
const searchBar = document.querySelector('.search-bar');
const loginPopup = document.querySelector('.login-popup');
const cartMenu = document.querySelector('.cart-menu');

/* When Clicking The Overlay (Overlay Events) */
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('overlay')) {
    // Remove overlay Class From The Body
    removeClass(document.body, 'overlay');
    // Remove open Class From The Main Menu
    removeClass(mainMenu, 'open');
    // Remove open Class From The Search Bar
    removeClass(searchBar, 'open');
    // Remove open Class From The Login Popup
    removeClass(loginPopup, 'open');
    // Remove open Class From The Cart Menu
    removeClass(cartMenu, 'open');
  }
});

/* Preloader */
window.addEventListener('load', () => {
  // Add loaded Class To The Preloader
  addClass(preloader, 'loaded');
  // Add loaded Class To The Body
  addClass(document.body, 'loaded');
});

preloader.addEventListener('transitionend', () => {
  // Remove The Preloader From The DOM
  removeEleFromDOM(preloader);
});

/* Header */
window.addEventListener('scroll', () => {
  if (scrollY >= header.offsetTop) {
    addClass(header, 'active');
  } else {
    removeClass(header, 'active');
  }
});

/* Main Menu */
const mainMenuBtn = document.getElementById('main-menu-btn');

mainMenuBtn.addEventListener('click', () => {
  // Add open Class To The Main Menu
  addClass(mainMenu, 'open');
  // Add overlay Class To The Body
  addClass(document.body, 'overlay');
});

mainMenu.addEventListener('click', (e) => {
  if (e.target.classList.contains('close-icon')) {
    // Remove open Class From The Main Menu
    removeClass(mainMenu, 'open');
    // Remove overlay Class From The Body
    removeClass(document.body, 'overlay');
  }
});

/* Search Bar */
const searchOpenBtn = document.getElementById('search-btn');
const searchSubmitBtn = searchBar.querySelector('button');
const searchEmptyResultsSection = document.querySelector('.search-empty-results');

searchOpenBtn.addEventListener('click', () => {
  // Add open Class To The Search Bar
  addClass(searchBar, 'open');
  // Add overlay Class To The Body
  addClass(document.body, 'overlay');
  // Auto Focus On The Search Input
  focusOn(searchBar.querySelector('input'));
});

searchSubmitBtn.addEventListener('click', () => {
  // Get The Search Query From The Search Input
  let searchQuery = searchBar.querySelector('input').value;
  
  // Direct To search-results.html Page With The Search Query As A Parameter
  location.href = `search-results.html?q=${searchQuery}`
});

document.addEventListener('DOMContentLoaded', () => {
  if (searchEmptyResultsSection) {
    displaySearchQueryInPage();
    filterProducts();
  }
});

/* Login Popup */
const loginPopupBtn = document.getElementById('login-popup-btn');

loginPopupBtn.addEventListener('click', () => {
  // Add open Class To The Login Popup
  addClass(loginPopup, 'open');
  // Add overlay Class To The Body
  addClass(document.body, 'overlay');
  // Auto Focus On The Login Email Input
  focusOn(loginPopup.querySelector('input'));
});

loginPopup.addEventListener('click', (e) => {
  if (e.target.classList.contains('close-icon')) {
    // Remove overlay Class From The Body
    removeClass(document.body, 'overlay');
    // Remove open Class From The Login Popup
    removeClass(loginPopup, 'open');
  }
});

/* Cart Menu */
const cartBtn = document.getElementById('cart-btn');

cartBtn.addEventListener('click', () => {
  // Add open Class To The Cart Menu
  addClass(cartMenu, 'open');
  // Add overlay Class To The Body
  addClass(document.body, 'overlay');
});

cartMenu.addEventListener('click', (e) => {
  if (e.target.classList.contains('close-icon')) {
    // Remove open Class From The Cart Menu
    removeClass(cartMenu, 'open');
    // Remove overlay Class From The Body
    removeClass(document.body, 'overlay');
  }
});

/* Hero Slider */
let mainInterval = 5000;

const heroSlide = new Swiper(".hero .swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  slidesPerGroup: 1,
  loop: true,
  lazyLoading: true,
  // Make It Autoplay
  autoplay: {
    delay: mainInterval,
    disableOnInteraction: false,
  },
  // Navigation arrows
  navigation: {
    nextEl: ".hero-btn-next",
    prevEl: ".hero-btn-prev",
  },
});

/* Products Slider */
const productsSlider = new Swiper(".products .swiper", {
  spaceBetween: 20,
  lazyLoading: true,
  // Pagination
  pagination: {
    el: ".products-pagination",
    clickable: true,
  },
  // Responsive
  breakpoints: {
    0: {
      slidesPerView: 1.5,
    },
    400: {
      slidesPerView: 2,
    },
    700: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5
    }
  },
  // Navigation arrows
  navigation: {
    nextEl: ".products-btn-next",
    prevEl: ".products-btn-prev",
  },
  // Make It Autoplay
  autoplay: {
    delay: mainInterval,
    disableOnInteraction: false,
  },
});

/* Testimonials Slider */
const testimonialsSlider = new Swiper(".testimonials .swiper", {
  slidesPerGroup: 1,
  spaceBetween: 20,
  loop: true,
  lazyLoading: true,
  // Responsive
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    550: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    }
  },
  // Navigation arrows
  navigation: {
    nextEl: ".ts-btn-next",
    prevEl: ".ts-btn-prev",
  },
  // Make It Autoplay
  autoplay: {
    delay: mainInterval,
    disableOnInteraction: false,
  },
});

/* Sections Animations */
window.addEventListener('scroll', animateSections);

// Functionality
function addClass(element, theClass) {
  element.classList.add(theClass);
}

function removeClass(element, theClass) {
  element.classList.remove(theClass);
}

function removeEleFromDOM(element) {
  element.remove();
}

function focusOn(input) {
  input.focus();
}

function displaySearchQueryInPage() {
  const searchQuery = new URLSearchParams(location.search).get('q');
  
  // Display The Search Query In The Search Keyword Wrapper
  const searchKeywordWrapper = document.querySelector('.path .search-keyword-wrapper');

  if (searchKeywordWrapper) {
    searchKeywordWrapper.textContent = searchQuery;
    searchBar.querySelector('input').value = searchQuery;
  }
}

function filterProducts() {
  const searchQuery = new URLSearchParams(location.search).get('q');
  const allProducts = document.querySelectorAll('.product-box');

  if (searchQuery === '') {
    for (let i = 0; i < allProducts.length; i++) {
      addClass(allProducts[i], 'hide');
    }
    // Check If The Search Results Are Zero
    checkSearchResults(allProducts);
  }

  for (let i = 0; i < allProducts.length; i++) {
    let productName = allProducts[i].querySelector('.text a').textContent.trim().toLowerCase();

    if (productName.includes(searchQuery.toLowerCase())) {
      removeClass(allProducts[i], 'hide');
    } else {
      addClass(allProducts[i], 'hide');
      // Check If The Search Results Are Zero
      checkSearchResults(allProducts);
    }
  }
}

function checkSearchResults(allProducts) {
  let num = 0;

  allProducts.forEach(product => {
    if (product.classList.contains('hide')) {
      num++;
    }
  });

  // If All Products Are Hidden
  if (num === allProducts.length) {
    if (searchEmptyResultsSection) {
      addClass(searchEmptyResultsSection, 'show');
    }
  }
}

function animateSections() {
  const animatedSections = document.querySelectorAll('.image-banner-section, .products, .testimonials, footer');

  animatedSections.forEach(sect => {
    if (scrollY >= sect.offsetTop - 300) {
      addClass(sect, 'show');
    }
  });
}