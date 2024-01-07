/*
  [10] clicking the play btn
    [A] add open class to the video popup  (true)
*/

// Selectors
const menuToggle = document.getElementById("menu-toggle");
const searchBtn = document.getElementById("search-btn");
const signinBtn = document.getElementById("signin-btn");
const signinForm = document.querySelector(".signin-popup form");
const cartMenuToggle = document.getElementById("cart-toggle");
const videoPlayBtn = document.getElementById("play-btn");
const scrollToTopBtn = document.getElementById("scroll-to-top");

// Events
window.addEventListener("scroll", () => {
  // Add sticky Class To The Header
  activateStickyHeader();
  // Activate Products Sectioins
  activateProductsSections();
  // Activate Testimonials Section
  activateTestimonialsSection();
  // Show Scroll To Top Btn
  showScrollToTopBtn();
});

menuToggle.addEventListener("click", () => {
  const mainMenu = document.querySelector(".main-menu");

  // Show The Overlay
  showOverlay();
  // Add The open Class To The Main Menu
  addOpenClass(mainMenu);
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("show-overlay")) {
    // Remove open Class From Add Popups
    document
      .querySelectorAll(".popup")
      .forEach((popup) => removeOpenClass(popup));
    // Remove Overlay
    removeOverlay();
  }
});

searchBtn.addEventListener("click", () => {
  const searchBar = document.querySelector(".search-bar.popup");

  // Show Overlay
  showOverlay();
  // Add The open Class To The Search Bar
  addOpenClass(searchBar);
  // Auto Focus On The Search Input
  autoFocus(searchBar.querySelector("input"));
});

signinBtn.addEventListener("click", () => {
  const signinPopup = document.querySelector(".signin-popup");

  // Show Overlay
  showOverlay();
  // Add The open Class To The Sinin Popup
  addOpenClass(signinPopup);
  // Auto Focus On The Email Input
  autoFocus(signinPopup.querySelector("input"));
});

signinForm.addEventListener("submit", (e) => {
  // Select Form Input
  const emailInput = document.getElementById("signin-email-input");

  // Validate Fields
  emailValidation(emailInput);
  // Check If There Are Any Error Fields
  checkErrorFields(signinForm, e);
});

cartMenuToggle.addEventListener("click", () => {
  const cartMenu = document.querySelector(".cart-menu.popup");

  // Show Overlay
  showOverlay();
  // Add open Class To The Cart Menu
  addOpenClass(cartMenu);
});

window.addEventListener("load", () => {
  const heroSection = document.querySelector(".hero");

  // Add active Class To The Hero Section
  addActiveClass(heroSection);
});

videoPlayBtn.addEventListener("click", () => {
  const videoPopup = document.querySelector(".video-popup");

  // Add open Class To The Video Popup
  addOpenClass(videoPopup);
  // Show The Overlay
  showOverlay();
});

scrollToTopBtn.addEventListener("click", scrollToTop);

// Functionality
function activateStickyHeader() {
  const header = document.querySelector("header");

  if (window.scrollY >= header.offsetTop) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

function showOverlay() {
  document.body.classList.add("show-overlay");
}

function removeOverlay() {
  document.body.classList.remove("show-overlay");
}

function addOpenClass(ele) {
  ele.classList.add("open");
}

function removeOpenClass(ele) {
  ele.classList.remove("open");
}

function autoFocus(input) {
  input.focus();
}

function makeHeroSlider() {
  const swiper = new Swiper(".hero .swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    slidesPerGroup: 1,
    loop: true,
    lazyLoading: true,
    effect: "fade",
    // Make It Autoplay
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    // Pagination Seting
    pagination: {
      el: ".hero .hero-pagination",
      clickable: true,
    },
    // Navigation arrows
    navigation: {
      nextEl: ".hero-button-next",
      prevEl: ".hero-button-prev",
    },
  });
}
makeHeroSlider();

function addActiveClass(ele) {
  ele.classList.add("active");
}

function removeActiveClass(ele) {
  ele.classList.remove("active");
}

function makeProductsSlide() {
  const swiper = new Swiper(".products .swiper", {
    spaceBetween: 20,
    slidesPerGroup: 1,
    // Responsive Breakpoints
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      520: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 6,
      },
    },
  });
}
makeProductsSlide();

function activateProductsSections() {
  document.querySelectorAll(".products").forEach((sect) => {
    if (scrollY >= sect.offsetTop - 200) {
      addActiveClass(sect);
    }
  });
}

function makeTestimonialsSlide() {
  const swiper = new Swiper(".testimonials .swiper", {
    spaceBetween: 30,
    slidesPerGroup: 1,
    loop: true,
    // Make It Autoplay
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    // Pagination Seting
    pagination: {
      el: ".testimonials-pagination",
      clickable: true,
    },
    // Navigation arrows
    navigation: {
      nextEl: ".ts-button-next",
      prevEl: ".ts-button-prev",
    },
    // Responsive Breakpoints
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      700: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });
}
makeTestimonialsSlide();

function activateTestimonialsSection() {
  const testimonilas = document.querySelector(".testimonials");

  if (window.scrollY >= testimonilas.offsetTop - 200) {
    addActiveClass(testimonilas);
  }
}

function showScrollToTopBtn() {
  window.scrollY > 1000
    ? scrollToTopBtn.classList.add("show")
    : scrollToTopBtn.classList.remove("show");
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Form Validation
function emailValidation(input) {
  let re = /^[\w-\.]+@[a-zA-Z0-9]+\.[a-z]{2,}(?:\.[a-z]{2,})?$/;
  let value = input.value.trim();

  if (re.test(value)) {
    setSuccess(input);
  } else {
    if (value === "") {
      if (document.body.classList.contains("ltr")) {
        setError(input, "You mustn't leave this field empty !");
      } else {
        setError(input, "يجب عدم ترك هذا الحقل فارغا !");
      }
    } else if (!value.includes("@")) {
      if (document.body.classList.contains("ltr")) {
        setError(
          input,
          `The email address must include an '@' ! ${value} is missing an '@'`
        );
      } else {
        setError(
          input,
          `يجب ان يحتوي البريد الألكتروني علي '@' ! يجب وضع '@' مع '${value}'`
        );
      }
    } else {
      if (document.body.classList.contains("ltr")) {
        setError(input, "Please type a valid input !");
      } else {
        setError(input, "الرجاء ادخال بريد الكتروني صالح .");
      }
    }
  }
}

function setSuccess(input) {
  input.parentElement.classList.add("success");
  input.parentElement.classList.remove("error");

  input.nextElementSibling.textContent = "محتوي الحقل سليم";
}

function setError(input, msg) {
  input.parentElement.classList.add("error");
  input.parentElement.classList.remove("success");

  input.nextElementSibling.textContent = msg;
}

function checkErrorFields(form, event) {
  let errorFields = 0;

  form.querySelectorAll(".field").forEach((field) => {
    if (field.classList.contains("error")) {
      errorFields++;
    }
  });

  if (errorFields > 0) {
    event.preventDefault();
  }
}

// Store Data In The Local Storage

// Get Data From The Local Storage
