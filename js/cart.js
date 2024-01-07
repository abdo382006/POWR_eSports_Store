// Selectors
const cartToggle = document.getElementById("cart-toggle");
const cartTogglePrice = cartToggle.querySelector(".price");
const cartProductsWrapper = document.querySelector(".cart-menu .cart-products");
const cartEmptyContent = document.querySelector(".cart-menu .empty");
const subtotalPrice = document.querySelector(
  ".cart-menu .subtotal-price .price"
);
const addToCartBtns = document.querySelectorAll(".cart-btn");

let productsArr = [];

// Update Products Arr
if (localStorage.getItem("cart_products")) {
  productsArr = JSON.parse(localStorage.getItem("cart_products"));
}

// OOP Classes
class CartProduct {
  constructor(id, imgURL, productTitle, price) {
    this.id = id;
    this.imgURL = imgURL;
    this.title = productTitle;
    this.price = price;
  }
}

// Events
addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Add Product To Arr
    addProductToArr(
      btn.parentElement.parentElement.previousElementSibling.firstElementChild
        .src,
      btn.parentElement.parentElement.parentElement.nextElementSibling
        .firstElementChild.textContent,
      btn.parentElement.parentElement.parentElement.nextElementSibling
        .lastElementChild.textContent
    );
  });
});

cartToggle.addEventListener("click", () => {
  toggleCheckoutDisabledClass();
  if (cartProductsWrapper.children.length === 0) {
    cartEmptyContent.classList.remove("hidden");
  }
});

cartProductsWrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-icon")) {
    // Delete Product From Cart
    deleteProductFromCart(e.target.parentElement.getAttribute("data-id"));
    // Show Removed From Cart Popup
    showRemovedFromCartPopup();
  }
});

// Functionality
function playSuccessSoundEffect() {
  let audio = new Audio();
  audio.src = "../sounds/completed.mp3";
  audio.play();
}

function addProductToArr(imgURL, title, price) {
  // Check if the product with the same id already exists in the array
  const existingProduct = productsArr.find(
    (product) =>
      product.imgURL === imgURL &&
      product.title === title &&
      product.price === price
  );

  if (!existingProduct) {
    // If the product doesn't exist, add it to the array
    let id = new Date().getTime();
    // Create Product Obj
    const productObj = new CartProduct(id, imgURL, title, price);
    // Push Product Obj To The Products Arr
    productsArr.push(productObj);
    // Play Successful Added Sound Effect
    playSuccessSoundEffect();
    // Show added to cart popup
    showAddedToCartPopup();
    // Display Cart Products In The Cart Menu
    displayCartProducts();
    // Store Products In The Local Storage
    storeProducts();
    // Update Products Count
    updateCartProductsCount(cartProductsWrapper.children.length);
    // Update Subtotal Price
    updateSubtotalPrice();
  }
}

function displayCartProducts() {
  // Hide Empty Cart Content
  cartEmptyContent.classList.add("hidden");
  // Empty Cart Products
  cartProductsWrapper.innerHTML = "";
  // Loop On Products Arr
  productsArr.forEach((productObj) => {
    // Create Product Box
    const productBox = document.createElement("div");
    productBox.classList.add("product");
    productBox.setAttribute("data-id", productObj.id);
    // Append Product Box To The Cart Products Wrapper
    cartProductsWrapper.append(productBox);
    // Create Product Box Content
    productBox.innerHTML = `
      <a href="#" class="image">
        <img src="${productObj.imgURL}" alt="${productObj.title}" />
      </a>
      <div class="text">
        <a href="#" class="product-title">${productObj.title}</a>
        <span class="price">${productObj.price}</span>
        <input id="product_${productObj.id}_quantity" type="number" min="1" oninput="updateSubtotalPrice(), storeProductQuantity(this)" />
      </div>
      <i class="fas fa-xmark close-icon"></i>
    `;

    if (!localStorage.getItem(`product_${productObj.id}_quantity`)) {
      productBox.querySelector("input").value = 1;
    } else {
      productBox.querySelector("input").value = localStorage.getItem(
        `product_${productObj.id}_quantity`
      );
    }
  });
}

function updateCartProductsCount(count) {
  // Update Products Count
  cartToggle.setAttribute("data-products-count", count);
  // Store Products Count
  storeCartProductsCount();
}

function updateSubtotalPrice() {
  let total = 0;

  for (let i = 0; i < cartProductsWrapper.children.length; i++) {
    let price =
      +cartProductsWrapper.children[
        i
      ].children[1].children[1].textContent.match(/[\d]+.[\d]+/);

    let quantity =
      +cartProductsWrapper.children[i].querySelector("input").value;

    total += price * quantity;
  }

  total = +total.toFixed(2);

  // Update Subtotal Price Content
  subtotalPrice.textContent = total;
  // Update Cart Toggle Price Content
  cartTogglePrice.textContent = total;

  // Store Subtotal Price
  storeSubtotalPrice(total);
}

function toggleCheckoutDisabledClass() {
  const chechoutBtn = document.querySelector(".cart-menu .main-btn");

  if (cartProductsWrapper.children.length !== 0) {
    chechoutBtn.classList.remove("disabled");
  } else {
    chechoutBtn.classList.add("disabled");
  }
}

function showAddedToCartPopup() {
  const addedToCartPopup = document.querySelector(".added-to-cart-popup");

  // Update .counter Text Content To Be 3
  addedToCartPopup.querySelector(".counter").textContent = "3";

  // Show The Popup
  addedToCartPopup.classList.add("show");

  // Interval The Text Content To Be 0
  let countDown = setInterval(() => {
    +addedToCartPopup.querySelector(".counter").textContent--;

    // Clear Interval
    if (addedToCartPopup.querySelector(".counter").textContent == 0) {
      clearInterval(countDown);
      addedToCartPopup.classList.remove("show");
    }
  }, 1000);
}

function showRemovedFromCartPopup() {
  const removedFromCartPopup = document.querySelector(
    ".removed-from-cart-popup"
  );

  // Update .counter Text Content To Be 3
  removedFromCartPopup.querySelector(".counter").textContent = "3";

  // Show The Popup
  removedFromCartPopup.classList.add("show");

  // Interval The Text Content To Be 0
  let countDown = setInterval(() => {
    +removedFromCartPopup.querySelector(".counter").textContent--;

    // Clear Interval
    if (removedFromCartPopup.querySelector(".counter").textContent == 0) {
      clearInterval(countDown);
      removedFromCartPopup.classList.remove("show");
    }
  }, 1000);
}

function deleteProductFromCart(productId) {
  [...cartProductsWrapper.children].forEach((product) => {
    if (product.getAttribute("data-id") === productId) {
      // Add The deleted Class To The Deleted Product
      product.classList.add("deleted");
      // Remove The Deleted Product From The DOM
      setTimeout(() => {
        product.remove();
        // Update Cart Products Count
        updateCartProductsCount(cartProductsWrapper.children.length);
        // Update Subtotal Price
        updateSubtotalPrice();
        // Toggle Checkout Btn disabled Class
        toggleCheckoutDisabledClass();
        if (cartProductsWrapper.children.length === 0) {
          cartEmptyContent.classList.remove("hidden");
        }
      }, 500);
    }
  });
  // Update Stored Products
  productsArr = productsArr.filter((productObj) => productObj.id != productId);
  storeProducts();
  // Remove The Product Quantity From LS
  removeProductQuantity(productId);
}

function removeProductQuantity(productId) {
  if (localStorage.getItem(`product_${productId}_quantity`)) {
    localStorage.removeItem(`product_${productId}_quantity`);
  }
}

// Store Data In The Local Storage
function storeProducts() {
  localStorage.setItem("cart_products", JSON.stringify(productsArr));
}

function storeCartProductsCount() {
  localStorage.setItem(
    "cart_products_count",
    cartToggle.getAttribute("data-products-count")
  );
}

function storeSubtotalPrice(total) {
  localStorage.setItem("subtotal_price", total);
}

function storeProductQuantity(productQuantityInput) {
  localStorage.setItem(productQuantityInput.id, productQuantityInput.value);
}

// Get Data From The Local Storage
function getProducts() {
  if (localStorage.getItem("cart_products")) {
    displayCartProducts();
  }
}

function getCartProductsCount() {
  if (localStorage.getItem("cart_products_count")) {
    updateCartProductsCount(localStorage.getItem("cart_products_count"));
  }
}

function getSubtotalPrice() {
  if (localStorage.getItem("subtotal_price")) {
    // Update Subtotal Price Content
    subtotalPrice.textContent = localStorage.getItem("subtotal_price");
    // Update Cart Toggle Price Content
    cartTogglePrice.textContent = localStorage.getItem("subtotal_price");
  }
}

// Apply Local Storag Data To The Page
getProducts();
getCartProductsCount();
getSubtotalPrice();
