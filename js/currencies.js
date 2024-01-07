// Import Functions
import { updateSelectedAttr } from "./translations.js";

// Selectors
const currencySelectBox = document.getElementById("currency-select");

// Events
currencySelectBox.addEventListener("change", (e) => {
  location.reload();
  // Update Option Selected Attr
  updateSelectedAttr(currencySelectBox, e.target.value);
  // Update Website Currency
  updateWebsiteCurrency(e.target.value);
  // Store Currency In The Local Storage
  storeCurrency(e.target.value);
});

window.addEventListener("load", fetchCurrencyAPI);

// Functionality
function fetchCurrencyAPI() {
  fetch(
    `https://api.fastforex.io/fetch-all?api_key=65c896d471-7079c8a3d9-s6sr2n&from=SAR`
  )
    .then((response) => response.json())
    .then((curenciesData) => updateProductsPrices(curenciesData));
}

function updateProductsPrices(data) {
  const allProductsPrices = document.querySelectorAll(".product-box .price");

  if (localStorage.getItem("currency")) {
    // Loop On All Products Prices
    allProductsPrices.forEach((priceEle) => {
      let priceNum = +priceEle.textContent.match(/[0-9]+.[0-9]+/);

      priceNum = +(
        priceNum * data.results[localStorage.getItem("currency")]
      ).toFixed(2);

      priceEle.textContent = priceEle.textContent.replace(
        /[0-9]+.[0-9]+/,
        priceNum
      );
    });
  }
}

function updateWebsiteCurrency(currency) {
  const allProductsCurrencies = document.querySelectorAll(
    ".product-box .price .currency"
  );

  allProductsCurrencies.forEach(
    (ele) => (ele.textContent = currency.toUpperCase())
  );

  document.querySelector("header .cart-currency-label").textContent =
    currency.toUpperCase();

  document.querySelector(".cart-menu .subtotal-price .currency").textContent =
    currency.toUpperCase();
}

function storeCurrency(currency) {
  localStorage.setItem("currency", currency.toUpperCase());
}

function getCurrency() {
  if (localStorage.getItem("currency")) {
    updateSelectedAttr(currencySelectBox, localStorage.getItem("currency"));
    updateWebsiteCurrency(localStorage.getItem("currency"));
  }
}

// Apply Local Storage Currency To The Page
getCurrency();
