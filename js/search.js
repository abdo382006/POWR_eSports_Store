// Export Functions
export {displayProducts, createProductBox};

// Selectors
const searchSubmitButton = document.querySelector(".search-bar .main-btn");
const searchInput = document.getElementById("searchInput");
const searchQueryWrapper = document.getElementById("searchQueryWrapper");

/* Locate To Search Results Page */
searchSubmitButton.addEventListener("click", () => {
  if (searchInput.value !== "") {
    const searchQuery = searchInput.value.trim();
    // Locate To The Search Results Page
    location.href = `search-results.html?q=${searchQuery}`;
  }
});

/* Display Searched Data */
window.addEventListener("load", () => {
  if (searchQueryWrapper) {
    const searchQuery = new URLSearchParams(location.search).get("q");
    // Display Search Query In The Page
    displaySearchQuery(searchQuery);
    getSearchedProductsData(searchQuery);
  }
});

// Functions
function displaySearchQuery(searchQuery) {
  // Display Search Query In The Title
  document.title += ` ${searchQuery}`;
  // Display Search Query In The Page
  searchQueryWrapper.textContent = searchQuery;
}

function getSearchedProductsData(searchQuery) {
  fetch("../json/all-products.json")
    .then(response => response.json())
    .then(data => {
      const searchedProductsArr = data.filter(obj => obj.title.toLowerCase().includes(searchQuery.toLowerCase()));
      const productsGrid = document.querySelector(".products-grid");
      if (searchedProductsArr.length > 0) {
        displayProducts(searchedProductsArr, productsGrid)
      }
    });
}

function displayProducts(arr, wrapper) {
  arr.forEach(obj => {
    createProductBox(obj, wrapper);
  });
}

function createProductBox(obj, wrapper) {
  // Create Product Box
  const productBox = document.createElement("div");
  productBox.classList.add("product-box");
  if (!obj.isAvailable) productBox.classList.add("unavailable");
  if (wrapper.classList.contains("swiper-wrapper")) productBox.classList.add("swiper-slide");
  productBox.dataset.id = obj.id;
  // Append Product Box To The Wrapper
  wrapper.append(productBox);
  // Create Product Image Container
  const imgContainer = document.createElement("figure");
  imgContainer.classList.add("image", "hover-shine");
  productBox.append(imgContainer);
  // Create Product Image
  const img = document.createElement("img");
  img.src = obj.imgSrc;
  img.alt = obj.title;
  img.title = obj.title;
  imgContainer.append(img);
  // Create Text Div
  const textDiv = document.createElement("div");
  textDiv.classList.add("text");
  productBox.append(textDiv);
  // Create Product Name
  const productName = document.createElement("h3");
  productName.textContent = obj.title;
  textDiv.append(productName);
  // Create Product Price 
  const price = document.createElement("div");
  price.classList.add("price");
  textDiv.append(price);
  // Create Currency Span
  const currency = document.createElement("span");
  currency.dataset.currency = true;
  price.append(currency);
  // Create The Price Span
  const priceSpan = document.createElement("span");
  priceSpan.dataset.price = obj.price;
  priceSpan.textContent = obj.price;
  price.append(priceSpan);
  // Create Add To Cart Btn
  const addToCartBtn = document.createElement("button");
  addToCartBtn.classList.add("main-btn", "add-to-cart-btn");
  addToCartBtn.title = "Add To Cart";
  textDiv.append(addToCartBtn);
  // Create Add Cart Btn Paragraphs
  for (let i = 0; i < 2; i++) {
    const p = document.createElement("p");
    addToCartBtn.append(p);
    const icon = document.createElement("i");
    icon.classList.add("far", "fa-shopping-bag", "fa-fw", "icon");
    p.append(icon);
    const span = document.createElement("span");
    span.dataset.content = "addToCart";
    p.append(span);
  }
}