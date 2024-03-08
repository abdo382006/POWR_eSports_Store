// Import Functions
import { updateSelectedOption, storeItem } from "./languages.js";

/* Update Website Currency */
const currencySelectBoxes = document.querySelectorAll(".currency-select-box");

currencySelectBoxes.forEach(selectBox => {
  selectBox.addEventListener("change", (e) => {
    // Store Selected Currency
    storeItem("currency", e.target.value);
    // Reload The Page
    location.reload();
  });
});

window.addEventListener("load", getCurrency);

// Functions
function getCurrency() {
  if (localStorage.getItem("currency")) {
    // Update Selected Currency Option
    updateSelectedOption(currencySelectBoxes, localStorage.getItem("currency"));
    // Wait Until The Page Content Is Added
    setTimeout(() => {
      // Update Website Currency
      updateWebsiteCurrency(localStorage.getItem("currency"));
      // Fetch Currency Data
      fetchCurrencyData(localStorage.getItem("currency")); 
    }, 250);
  } else {
    // Wait Until The Page Content Is Added
    setTimeout(() => {
      // Update Website Currency
      updateWebsiteCurrency("sar");
    }, 250);
  }
}

function updateWebsiteCurrency(currency) {
  const allCurrencyElements = document.querySelectorAll("[data-currency]");
  allCurrencyElements.forEach(ele => {
    // Update Element Content To The New Currency 
    ele.textContent = currency.toUpperCase();
  });
}

function fetchCurrencyData(selectedCurrency) {
  fetch(`https://api.fastforex.io/fetch-all?api_key=8ed1ff3502-60c6e32337-s9rjag&from=SAR`)
    .then(response => response.json())
    .then(data => {
      updateWebsitePrices(data.results, selectedCurrency);
    });
}

function updateWebsitePrices(dataArr, selectedCurrency) {
  const currencyDiff = dataArr[selectedCurrency.toUpperCase()];
  const allPriceElements = document.querySelectorAll("[data-price]");

  allPriceElements.forEach(ele => {
    ele.textContent = (Number(ele.dataset.price) * currencyDiff).toFixed(2);
  });
}