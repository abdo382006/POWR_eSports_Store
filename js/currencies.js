// Import updateSelectedOption Function
import { updateSelectedOption } from "./translations.js";

// Currency Select Box
const currencySelectBox = document.getElementById('currency-select-box');

currencySelectBox.addEventListener('change', (e) => {
  // Auto Reload The Page
  location.reload();
  // Store The Selected Currency In The Local Storage
  storeCurrency(e.target.value);
});

window.addEventListener('load', fetchCurrenciesAPI);

// Functionality
function fetchCurrenciesAPI() {
  fetch('https://api.fastforex.io/fetch-all?api_key=f936822778-019fde4691-s7pc0s&from=SAR')
    .then(res => res.json()).then(res => updatePrices(res));
}

function updatePrices(data) {
  const allPriceElements = document.querySelectorAll('[data-price]');

  if (localStorage.getItem('currency')) {
    allPriceElements.forEach(ele => {
      let price = Number(ele.textContent);

      ele.textContent = Number((price * data.results[localStorage.getItem('currency')]).toFixed(2));
    });
  }
}

function storeCurrency(currency) {
  localStorage.setItem('currency', currency);
}

function updateWebsiteCurrency(currency) {
  const allCurrenciesLabels = document.querySelectorAll('[data-currency]');

  allCurrenciesLabels.forEach(label => label.textContent = currency.toUpperCase());
}

function getCurrency() {
  if (localStorage.getItem('currency')) {
    updateSelectedOption(currencySelectBox, localStorage.getItem('currency'));
    updateWebsiteCurrency(localStorage.getItem('currency'));
  } else {
    updateWebsiteCurrency('SAR');
  }
}

// Apply Local Storage Data
window.addEventListener('load', getCurrency);