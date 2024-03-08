// Import Functions
import { storeItem } from "./languages.js";
import { createProductBox } from "./search.js";

// Export Functions
export { fetchData, updateClass, displayHomeProducts };

/* Page Loader */
const pageLoader = document.querySelector(".page-loader");

window.addEventListener("load", () => {
  // Add "loaded" Class To The Page Loader & The Body
  addClass("loaded", pageLoader);
  addClass("loaded", document.body);
});

pageLoader.addEventListener("transitionend", () => {
  // Remove The Page Loader From The DOM
  removeEleFromDOM(pageLoader);
});

/* Close Infinite Top Bar Btn */
const infiniteTextBar = document.querySelector(".infinite-text-bar");

if (infiniteTextBar) {
  infiniteTextBar.addEventListener("click", (e) => {
    if (e.target.classList.contains("close-btn")) {
      removeEleFromDOM(infiniteTextBar);
    }
  });
}

/* Header Activate */
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (scrollY >= 200) {
    addClass("active", header);
  } else {
    removeClass("active", header);
  }
});

/* Toggle Mega Menu */
const megaMenuToggle = document.getElementById("megaMenuToggle");
const megaMenu = document.querySelector("header .mega-menu");

megaMenuToggle.addEventListener("click", (e) => {
  e.preventDefault();
  // Toggle Mega Menu
  toggleClass("open", megaMenu);
});

/* Open / Close Mobile Menu */
const openMobileMenuBtn = document.getElementById("openMobileMenuBtn");
const mobileMenu = document.querySelector(".mobile-menu");

openMobileMenuBtn.addEventListener("click", () => {
  // Add "open" Class To The Mobile Menu
  addClass("open", mobileMenu);
  // Add "overlay" Class To The Body
  addClass("overlay", document.body);
});

mobileMenu.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-btn")) {
    // Remove "open" Class From The Mobile Menu
    removeClass("open", mobileMenu);
    // Remove "overlay" Class From The Body
    removeClass("overlay", document.body);
  }
});

/* Toggle Mobile Menu Categories List */
const mobileMenuCategoriesListToggle = mobileMenu.querySelector(".links .categories-list-toggle");
const mobileMenuCategoriesList = mobileMenu.querySelector(".links .categories-list");

mobileMenuCategoriesListToggle.addEventListener("click", (e) => {
  e.preventDefault();
  toggleClass("open", mobileMenuCategoriesList);
});

/* Open The Search Bar */
const searchBtn = document.getElementById("searchBtn");
const searchBar = document.querySelector(".search-bar");

searchBtn.addEventListener("click", () => {
  // Add "open" Class To The Search Bar
  addClass("open", searchBar);
  // Add "overlay" Class To The Body
  addClass("overlay", document.body);
});

/* Open / Close The Login Popup */
const loginBtn = document.getElementById("loginBtn");
const loginPopup = document.querySelector(".login-popup");

loginBtn.addEventListener("click", () => {
  // Add "open" Class To The Login Popup
  addClass("open", loginPopup);
  // Add "overlay" Class To The Body 
  addClass("overlay", document.body);
});

loginPopup.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-btn")) {
    // Remove "open" Class From The Login Popup
    removeClass("open", loginPopup);
    // Remove "overlay" Class From The Body 
    removeClass("overlay", document.body);
  }
});

/* Create Countries Select Items */
const countriesCodesLists = document.querySelectorAll(".countries-list");

window.addEventListener("load", createCountriesSelectItems);

/* Toggle Countries Codes List */
const countriesCodesListToggles = document.querySelectorAll(".country-select");

countriesCodesListToggles.forEach(toggle => {
  toggle.addEventListener("click", () => {
    // Toggle "open" Class To The Countries Codes List
    toggleClass("open", toggle.nextElementSibling);
  });
})

/* Update Selected Country */
countriesCodesLists.forEach(countriesCodesList => {
  countriesCodesList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      // Update "active" Class To The Clicked Item
      updateClass(e.target, countriesCodesList.children, "active");
      // Close The Countries List
      removeClass("open", countriesCodesList);
      // Update Selected Country Wrapper Content
      const selectedCountryWrapper = e.target.parentElement.previousElementSibling.firstElementChild;
      selectedCountryWrapper.textContent = 
        e.target.textContent.split(" ")[e.target.textContent.split(" ").length - 1].slice(1, -1);
    }
  });
})

/* Open / Close Cart Menu */
const openCartBtn = document.getElementById("cartMenuBtn");
const cartMeun = document.querySelector(".cart-menu");

openCartBtn.addEventListener("click", () => {
  // Add "open" Class To The Cart Menu
  addClass("open", cartMeun);
  // Add "overlay" Class To The Body
  addClass("overlay", document.body);
});

cartMeun.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-btn")) {
    // Remove Class "open" From The Cart Menu
    removeClass("open", cartMeun);
    // Remove Class "overlay" From The Body
    removeClass("overlay", document.body);
  }
});

/* Close Popups When Clicking The Overlay */
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("overlay") && e.target.tagName === "BODY")  {
    // Remove "open" Class From All Popups & Menus
    const websitePopups = [mobileMenu, searchBar, loginPopup, cartMeun];
    websitePopups.forEach(ele => removeClass("open", ele));
    // Remove "overlay" Class From Itself
    removeClass("overlay", document.body);
  }
});

/* Display Home Products */
const perfumesProductsWrapper = document.getElementById("perfumesProductsWrapper");
const hoodiesProductsWrapper = document.getElementById("hoodiesProductsWrapper");
const tShirtsProductsWrapper = document.getElementById("tShirtsProductsWrapper");
const accessoriesProductsWrapper = document.getElementById("accessoriesProductsWrapper");
const broochesProductsWrapper = document.getElementById("broochesProductsWrapper");
const giftVouchersProductsWrapper = document.getElementById("giftVouchersProductsWrapper");

window.addEventListener("load", () => {
  if (perfumesProductsWrapper) {
    // Fetch Perfumes Data
    fetchData("../json/all-products.json", "category", "perfume", displayHomeProducts, perfumesProductsWrapper);
    // Fetch Hoodies Data
    fetchData("../json/all-products.json", "category", "hoodie", displayHomeProducts, hoodiesProductsWrapper);
    // Fetch T-Shirts Data
    fetchData("../json/all-products.json", "category", "t-shirt", displayHomeProducts, tShirtsProductsWrapper);
    // Fetch Accessories Data
    fetchData("../json/all-products.json", "category", "accessories", displayHomeProducts, accessoriesProductsWrapper);
    // Fetch Brooches Data
    fetchData("../json/all-products.json", "category", "brooch", displayHomeProducts, broochesProductsWrapper);
    // Fetch Gift Voucher Data
    fetchData("../json/all-products.json", "category", "gift voucher", displayHomeProducts, giftVouchersProductsWrapper);
  }
});

/* Display Testimonial Boxes */
const testimonialsWrapper = document.getElementById("testimonialsWrapper");

window.addEventListener("load", () => {
  if (testimonialsWrapper) {
    fetchData("../json/reviews.json", null, null, displayTestimonialsBoxes, testimonialsWrapper);
  }
});

/* Set Copyright Year */
window.addEventListener("load", setCopyrightYear);

/* Toggle Website Theme */
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", (e) => {
  if (e.target.classList.contains("light")) {
    // Update Active Icon
    updateClass(e.target, themeToggle.children, "active");
    // Toggle Theme
    toggleWebsiteTheme("light"); 
  } else if (e.target.classList.contains("dark")) {
    // Update Active Icon
    updateClass(e.target, themeToggle.children, "active");
    // Toggle Theme
    toggleWebsiteTheme("dark"); 
  } else if (e.target.tagName === "SPAN") {
    // Toggle Theme
    if (themeToggle.children[0].classList.contains("active")) {
      toggleWebsiteTheme("dark");
      updateClass(themeToggle.children[2], themeToggle.children, "active");
    } else {
      toggleWebsiteTheme("light");
      updateClass(themeToggle.children[0], themeToggle.children, "active");
    }
  }
});

window.addEventListener("load", () => {
  // Set Website Theme
  if (localStorage.getItem("website_theme")) {
    toggleWebsiteTheme(localStorage.getItem("website_theme"));
    localStorage.getItem("website_theme") === "light"
      ? updateClass(themeToggle.children[0], themeToggle.children, "active")
      : updateClass(themeToggle.children[2], themeToggle.children, "active");
  } else {
    toggleWebsiteTheme("light");
  }
});

/* Scroll To Top Btn */
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (scrollY >= 300) {
    addClass("show", scrollToTopBtn);
  } else {
    removeClass("show", scrollToTopBtn);
  }
});

scrollToTopBtn.addEventListener("click", () => {
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* Display FAQs */
const faqsWrapper = document.getElementById("faqsWrapper");

window.addEventListener("load", () => {
  if (faqsWrapper) {
    // Fetch FAQs Data
    fetchData("../json/faqs.json", null, null, displayFAQsBoxes, faqsWrapper); 
  }
});

// Functions
function addClass(theClass, ele) {
  ele.classList.add(theClass);
}

function removeClass(theClass, ele) {
  ele.classList.remove(theClass);
}

function toggleClass(theClass, ele) {
  ele.classList.toggle(theClass);
}

function updateClass(choosenEle, elementArr, theClass) {
  // Loop Throw All Of The Elements
  [...elementArr].forEach(ele => {
    // Remove The Class From All Of The Elements
    removeClass(theClass, ele);
  });
  // Add The Class To The Choosen Element
  addClass(theClass, choosenEle);
}

function removeEleFromDOM(ele) {
  ele.remove();
}

function createCountriesSelectItems() {
  const countries = [
    { name: "Afghanistan", code: "+93", flag: "af" },
    { name: "Albania", code: "+355", flag: "al" },
    { name: "Algeria", code: "+213", flag: "dz" },
    { name: "Andorra", code: "+376", flag: "ad" },
    { name: "Angola", code: "+244", flag: "ao" },
    { name: "Antigua and Barbuda", code: "+1-268", flag: "ag" },
    { name: "Argentina", code: "+54", flag: "ar" },
    { name: "Armenia", code: "+374", flag: "am" },
    { name: "Australia", code: "+61", flag: "au" },
    { name: "Austria", code: "+43", flag: "at" },
    { name: "Azerbaijan", code: "+994", flag: "az" },
    { name: "Bahamas", code: "+1-242", flag: "bs" },
    { name: "Bahrain", code: "+973", flag: "bh" },
    { name: "Bangladesh", code: "+880", flag: "bd" },
    { name: "Barbados", code: "+1-246", flag: "bb" },
    { name: "Belarus", code: "+375", flag: "by" },
    { name: "Belgium", code: "+32", flag: "be" },
    { name: "Belize", code: "+501", flag: "bz" },
    { name: "Benin", code: "+229", flag: "bj" },
    { name: "Bhutan", code: "+975", flag: "bt" },
    { name: "Bolivia", code: "+591", flag: "bo" },
    { name: "Bosnia and Herzegovina", code: "+387", flag: "ba" },
    { name: "Botswana", code: "+267", flag: "bw" },
    { name: "Brazil", code: "+55", flag: "br" },
    { name: "Brunei", code: "+673", flag: "bn" },
    { name: "Bulgaria", code: "+359", flag: "bg" },
    { name: "Burkina Faso", code: "+226", flag: "bf" },
    { name: "Burundi", code: "+257", flag: "bi" },
    { name: "Cabo Verde", code: "+238", flag: "cv" },
    { name: "Cambodia", code: "+855", flag: "kh" },
    { name: "Cameroon", code: "+237", flag: "cm" },
    { name: "Canada", code: "+1", flag: "ca" },
    { name: "Central African Republic", code: "+236", flag: "cf" },
    { name: "Chad", code: "+235", flag: "td" },
    { name: "Chile", code: "+56", flag: "cl" },
    { name: "China", code: "+86", flag: "cn" },
    { name: "Colombia", code: "+57", flag: "co" },
    { name: "Comoros", code: "+269", flag: "km" },
    { name: "Congo", code: "+242", flag: "cg" },
    { name: "Costa Rica", code: "+506", flag: "cr" },
    { name: "Croatia", code: "+385", flag: "hr" },
    { name: "Cuba", code: "+53", flag: "cu" },
    { name: "Cyprus", code: "+357", flag: "cy" },
    { name: "Czech Republic", code: "+420", flag: "cz" },
    { name: "Denmark", code: "+45", flag: "dk" },
    { name: "Djibouti", code: "+253", flag: "dj" },
    { name: "Dominica", code: "+1-767", flag: "dm" },
    { name: "Dominican Republic", code: "+1-809", flag: "do" },
    { name: "Ecuador", code: "+593", flag: "ec" },
    { name: "Egypt", code: "+20", flag: "eg" },
    { name: "El Salvador", code: "+503", flag: "sv" },
    { name: "Equatorial Guinea", code: "+240", flag: "gq" },
    { name: "Eritrea", code: "+291", flag: "er" },
    { name: "Estonia", code: "+372", flag: "ee" },
    { name: "Eswatini", code: "+268", flag: "sz" },
    { name: "Ethiopia", code: "+251", flag: "et" },
    { name: "Fiji", code: "+679", flag: "fj" },
    { name: "Finland", code: "+358", flag: "fi" },
    { name: "France", code: "+33", flag: "fr" },
    { name: "Gabon", code: "+241", flag: "ga" },
    { name: "Gambia", code: "+220", flag: "gm" },
    { name: "Georgia", code: "+995", flag: "ge" },
    { name: "Germany", code: "+49", flag: "de" },
    { name: "Ghana", code: "+233", flag: "gh" },
    { name: "Greece", code: "+30", flag: "gr" },
    { name: "Grenada", code: "+1-473", flag: "gd" },
    { name: "Guatemala", code: "+502", flag: "gt" },
    { name: "Guinea", code: "+224", flag: "gn" },
    { name: "Guinea-Bissau", code: "+245", flag: "gw" },
    { name: "Guyana", code: "+592", flag: "gy" },
    { name: "Haiti", code: "+509", flag: "ht" },
    { name: "Honduras", code: "+504", flag: "hn" },
    { name: "Hungary", code: "+36", flag: "hu" },
    { name: "Iceland", code: "+354", flag: "is" },
    { name: "India", code: "+91", flag: "in" },
    { name: "Indonesia", code: "+62", flag: "id" },
    { name: "Iran", code: "+98", flag: "ir" },
    { name: "Iraq", code: "+964", flag: "iq" },
    { name: "Ireland", code: "+353", flag: "ie" },
    { name: "Italy", code: "+39", flag: "it" },
    { name: "Jamaica", code: "+1-876", flag: "jm" },
    { name: "Japan", code: "+81", flag: "jp" },
    { name: "Jordan", code: "+962", flag: "jo" },
    { name: "Kazakhstan", code: "+7", flag: "kz" },
    { name: "Kenya", code: "+254", flag: "ke" },
    { name: "Kiribati", code: "+686", flag: "ki" },
    { name: "Korea, North", code: "+850", flag: "kp" },
    { name: "Korea, South", code: "+82", flag: "kr" },
    { name: "Kosovo", code: "+383", flag: "xk" },
    { name: "Kuwait", code: "+965", flag: "kw" },
    { name: "Kyrgyzstan", code: "+996", flag: "kg" },
    { name: "Laos", code: "+856", flag: "la" },
    { name: "Latvia", code: "+371", flag: "lv" },
    { name: "Lebanon", code: "+961", flag: "lb" },
    { name: "Lesotho", code: "+266", flag: "ls" },
    { name: "Liberia", code: "+231", flag: "lr" },
    { name: "Libya", code: "+218", flag: "ly" },
    { name: "Liechtenstein", code: "+423", flag: "li" },
    { name: "Lithuania", code: "+370", flag: "lt" },
    { name: "Luxembourg", code: "+352", flag: "lu" },
    { name: "Madagascar", code: "+261", flag: "mg" },
    { name: "Malawi", code: "+265", flag: "mw" },
    { name: "Malaysia", code: "+60", flag: "my" },
    { name: "Maldives", code: "+960", flag: "mv" },
    { name: "Mali", code: "+223", flag: "ml" },
    { name: "Malta", code: "+356", flag: "mt" },
    { name: "Marshall Islands", code: "+692", flag: "mh" },
    { name: "Mauritania", code: "+222", flag: "mr" },
    { name: "Mauritius", code: "+230", flag: "mu" },
    { name: "Mexico", code: "+52", flag: "mx" },
    { name: "Micronesia", code: "+691", flag: "fm" },
    { name: "Moldova", code: "+373", flag: "md" },
    { name: "Monaco", code: "+377", flag: "mc" },
    { name: "Mongolia", code: "+976", flag: "mn" },
    { name: "Montenegro", code: "+382", flag: "me" },
    { name: "Morocco", code: "+212", flag: "ma" },
    { name: "Mozambique", code: "+258", flag: "mz" },
    { name: "Myanmar", code: "+95", flag: "mm" },
    { name: "Namibia", code: "+264", flag: "na" },
    { name: "Nauru", code: "+674", flag: "nr" },
    { name: "Nepal", code: "+977", flag: "np" },
    { name: "Netherlands", code: "+31", flag: "nl" },
    { name: "New Zealand", code: "+64", flag: "nz" },
    { name: "Nicaragua", code: "+505", flag: "ni" },
    { name: "Niger", code: "+227", flag: "ne" },
    { name: "Nigeria", code: "+234", flag: "ng" },
    { name: "North Macedonia", code: "+389", flag: "mk" },
    { name: "Norway", code: "+47", flag: "no" },
    { name: "Oman", code: "+968", flag: "om" },
    { name: "Pakistan", code: "+92", flag: "pk" },
    { name: "Palau", code: "+680", flag: "pw" },
    { name: "Palestine", code: "+970", flag: "ps" },
    { name: "Panama", code: "+507", flag: "pa" },
    { name: "Papua New Guinea", code: "+675", flag: "pg" },
    { name: "Paraguay", code: "+595", flag: "py" },
    { name: "Peru", code: "+51", flag: "pe" },
    { name: "Philippines", code: "+63", flag: "ph" },
    { name: "Poland", code: "+48", flag: "pl" },
    { name: "Portugal", code: "+351", flag: "pt" },
    { name: "Qatar", code: "+974", flag: "qa" },
    { name: "Romania", code: "+40", flag: "ro" },
    { name: "Russia", code: "+7", flag: "ru" },
    { name: "Rwanda", code: "+250", flag: "rw" },
    { name: "Saint Kitts and Nevis", code: "+1-869", flag: "kn" },
    { name: "Saint Lucia", code: "+1-758", flag: "lc" },
    { name: "Saint Vincent and the Grenadines", code: "+1-784", flag: "vc" },
    { name: "Samoa", code: "+685", flag: "ws" },
    { name: "San Marino", code: "+378", flag: "sm" },
    { name: "Sao Tome and Principe", code: "+239", flag: "st" },
    { name: "Saudi Arabia", code: "+966", flag: "sa" },
    { name: "Senegal", code: "+221", flag: "sn" },
    { name: "Serbia", code: "+381", flag: "rs" },
    { name: "Seychelles", code: "+248", flag: "sc" },
    { name: "Sierra Leone", code: "+232", flag: "sl" },
    { name: "Singapore", code: "+65", flag: "sg" },
    { name: "Slovakia", code: "+421", flag: "sk" },
    { name: "Slovenia", code: "+386", flag: "si" },
    { name: "Solomon Islands", code: "+677", flag: "sb" },
    { name: "Somalia", code: "+252", flag: "so" },
    { name: "South Africa", code: "+27", flag: "za" },
    { name: "South Sudan", code: "+211", flag: "ss" },
    { name: "Spain", code: "+34", flag: "es" },
    { name: "Sri Lanka", code: "+94", flag: "lk" },
    { name: "Sudan", code: "+249", flag: "sd" },
    { name: "Suriname", code: "+597", flag: "sr" },
    { name: "Sweden", code: "+46", flag: "se" },
    { name: "Switzerland", code: "+41", flag: "ch" },
    { name: "Syria", code: "+963", flag: "sy" },
    { name: "Taiwan", code: "+886", flag: "tw" },
    { name: "Tajikistan", code: "+992", flag: "tj" },
    { name: "Tanzania", code: "+255", flag: "tz" },
    { name: "Thailand", code: "+66", flag: "th" },
    { name: "Timor-Leste", code: "+670", flag: "tl" },
    { name: "Togo", code: "+228", flag: "tg" },
    { name: "Tonga", code: "+676", flag: "to" },
    { name: "Trinidad and Tobago", code: "+1-868", flag: "tt" },
    { name: "Tunisia", code: "+216", flag: "tn" },
    { name: "Turkey", code: "+90", flag: "tr" },
    { name: "Turkmenistan", code: "+993", flag: "tm" },
    { name: "Tuvalu", code: "+688", flag: "tv" },
    { name: "Uganda", code: "+256", flag: "ug" },
    { name: "Ukraine", code: "+380", flag: "ua" },
    { name: "United Arab Emirates", code: "+971", flag: "ae" },
    { name: "United Kingdom", code: "+44", flag: "gb" },
    { name: "United States", code: "+1", flag: "us" },
    { name: "Uruguay", code: "+598", flag: "uy" },
    { name: "Uzbekistan", code: "+998", flag: "uz" },
    { name: "Vanuatu", code: "+678", flag: "vu" },
    { name: "Vatican City", code: "+379", flag: "va" },
    { name: "Venezuela", code: "+58", flag: "ve" },
    { name: "Vietnam", code: "+84", flag: "vn" },
    { name: "Yemen", code: "+967", flag: "ye" },
    { name: "Zambia", code: "+260", flag: "zm" },
    { name: "Zimbabwe", code: "+263", flag: "zw" }
  ];

  countries.forEach(country => {
    // Create Li
    const li = document.createElement("li");
    country.flag === "af" && addClass("active", li);
    // Append Li To The Codes List
    countriesCodesLists[0].append(li);
    // Create Icon Span
    const icon = document.createElement("span");
    icon.classList.add("fi", `fi-${country.flag}`);
    li.append(icon);
    // Create Country Name Flag
    const name = document.createElement("span");
    name.textContent = `${country.name} (${country.code})`;
    li.append(name);
    // Get Cloned Node
    const clonedLI = li.cloneNode(true);
    if (countriesCodesLists[1]) {
      countriesCodesLists[1].append(clonedLI)
    }
  });
}

function fetchData(url, special, specialValue, callBackFunction, wrapper) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      let dataArr = special !== null ? data.filter(obj => obj[special] === specialValue) : data;
      callBackFunction(dataArr, wrapper);
    });
}

function displayHomeProducts(productsArr, wrapper) {
  const productsCount = productsArr.length > 8 ? 8 : productsArr.length;
  for (let i = 0; i < productsCount; i++) {
    createProductBox(productsArr[i], wrapper);
  }
}

function displayTestimonialsBoxes(testimonialsArr, wrapper) {
  testimonialsArr.forEach(testimonial => {
    createTestimonialBox(testimonial, wrapper);
  });
}

function createTestimonialBox(obj, wrapper) {
  // Create Testimonial Box
  const testimonialBox = document.createElement("div");
  testimonialBox.classList.add("testimonial-box");
  if (wrapper.classList.contains("swiper-wrapper")) {
    testimonialBox.classList.add("swiper-slide");
  }
  // Append Testimonial Box To The Wrapper
  wrapper.append(testimonialBox);
  // Create Img
  const img = document.createElement("img");
  if (obj.profileImg !== null) {
    img.src = obj.profileImg;
  } else {
    obj.gender === "male" 
      ? img.src = "../images/avatar-male.jpg" : 
      img.src = "../images/avatar-female.jpg";
  }
  img.alt = "User Avatar";
  testimonialBox.append(img);
  // Create Review Text
  const reviewText = document.createElement("q");
  reviewText.textContent = obj.text;
  testimonialBox.append(reviewText);
  // Create Name h4
  const name = document.createElement("h4");
  name.textContent = obj.name;
  testimonialBox.append(name);
  // Create Stars
  createStars(obj.rate, testimonialBox);
}

function createStars(rate, wrapper) {
  // Create Stars List 
  const starsList = document.createElement("ul");
  starsList.classList.add("stars");
  // Appen The Stars List To The Wrapper
  wrapper.append(starsList);
  // Create 5 Stars
  for (let i = 0; i < 5; i++) {
    // Create The Stars List Li
    const li = document.createElement("li");
    starsList.append(li);
    // Create The Star Icon
    const starIcon = document.createElement("i");
    li.append(starIcon);
  }
  // Add The Classes For The Icons Based On The Rate
  switch (Number(rate)) {
    case 0:
      [...starsList.children].forEach(li => {
        li.firstElementChild.classList.add("far", "fa-star");
      });
      break;
    case 0.5:
      [...starsList.children].forEach((li, i) => {
        i === 0
          ? li.firstElementChild.classList.add("fas", "fa-star-half-stroke")
          : li.firstElementChild.classList.add("far", "fa-star");
      });
      break;
    case 1:
      [...starsList.children].forEach((li, i) => {
        i === 0
          ? li.firstElementChild.classList.add("fas", "fa-star")
          : li.firstElementChild.classList.add("far", "fa-star");
      });
      break;
    case 1.5:
      [...starsList.children].forEach((li, i) => {
        i === 0
          ? li.firstElementChild.classList.add("fas", "fa-star")
          : i === 1
          ? li.firstElementChild.classList.add("far", "fa-star-half-stroke")
          : li.firstElementChild.classList.add("far", "fa-star");
      });
      break;
    case 2:
      [...starsList.children].forEach((li, i) => {
        i === 0 || i === 1
          ? li.firstElementChild.classList.add("fas", "fa-star")
          : li.firstElementChild.classList.add("far", "fa-star");
      });
      break;
    case 2.5:
      [...starsList.children].forEach((li, i) => {
        i === 0 || i === 1
          ? li.firstElementChild.classList.add("fas", "fa-star")
          : i === 2
          ? li.firstElementChild.classList.add("far", "fa-star-half-stroke")
          : li.firstElementChild.classList.add("far", "fa-star");
      });
      break;
    case 3:
      [...starsList.children].forEach((li, i) => {
        i === 0 || i === 1 || i === 2
          ? li.firstElementChild.classList.add("fas", "fa-star")
          : li.firstElementChild.classList.add("far", "fa-star");
      });
      break;
    case 3.5:
      [...starsList.children].forEach((li, i) => {
        i === 0 || i === 1 || i === 2
          ? li.firstElementChild.classList.add("fas", "fa-star")
          : i === 3
          ? li.firstElementChild.classList.add("far", "fa-star-half-stroke")
          : li.firstElementChild.classList.add("far", "fa-star");
      });
      break;
    case 4:
      [...starsList.children].forEach((li, i) => {
        i === 0 || i === 1 || i === 2 || i === 3
          ? li.firstElementChild.classList.add("fas", "fa-star")
          : li.firstElementChild.classList.add("far", "fa-star");
      });
      break;
    case 4.5:
      [...starsList.children].forEach((li, i) => {
        i === 0 || i === 1 || i === 2 || i === 3
          ? li.firstElementChild.classList.add("fas", "fa-star")
          : i === 4
          ? li.firstElementChild.classList.add("far", "fa-star-half-stroke")
          : li.firstElementChild.classList.add("far", "fa-star");
      });
      break;
    case 5:
      [...starsList.children].forEach(li => {
        li.firstElementChild.classList.add("fas", "fa-star");
      });
      break;
  }
}

function setCopyrightYear() {
  const copyrightYearWrapper = document.getElementById("copyrightYearWrapper");
  copyrightYearWrapper.textContent = new Date().getFullYear();
}

function toggleWebsiteTheme(theme) {
  theme === "dark" 
    ? addClass("dark-theme", document.documentElement)
    : removeClass("dark-theme", document.documentElement); 
  // Store Website Theme In The LS
  storeItem("website_theme", theme);
}

function displayFAQsBoxes(faqsArr, wrapper) {
  faqsArr.forEach((faq, i) => {
    createFAQBox(faq, wrapper);
  });
}

function createFAQBox(faqObj, wrapper) {
  // Create The FAQ Box
  const faqBox = document.createElement("div");
  faqBox.classList.add("faq-box");
  // Appen The FAQ Box To The Wrapper
  wrapper.append(faqBox);
  // Create The FAQ Box Header
  const header = document.createElement("div");
  header.classList.add("header");
  faqBox.append(header);
  // Create The FAQ Box Question h3
  const h3 = document.createElement("h3");
  h3.textContent = localStorage.getItem("language") ? faqObj.question[localStorage.getItem("language")] : faqObj.question.ar;
  header.append(h3);
  // Create The Answer Toggle
  const answerToggle = document.createElement("button");
  answerToggle.classList.add("answer-toggle", "material-symbols-outlined");
  answerToggle.title = "Toggle Answer";
  answerToggle.textContent = "add";
  header.append(answerToggle);
  // Create The Answer Paragraph
  const answer = document.createElement("p");
  answer.textContent = localStorage.getItem("language") ? faqObj.answer[localStorage.getItem("language")] : faqObj.answer.ar
  faqBox.append(answer);
  // Toggle The Answer
  toggleAnswer(header, answer);
}

function toggleAnswer(question, answer) {
  question.addEventListener("click", () => {
    toggleClass("open", answer);
  });
}