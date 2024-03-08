// Import Functions
import { storeItem } from "./languages.js";

// Cart Products Arr
let cartProductsArr = [];

if (localStorage.getItem("cart_products")) {
  cartProductsArr = JSON.parse(localStorage.getItem("cart_products"));
}

/* Add Product To Cart */
const cartMenu = document.querySelector(".cart-menu");
const cartProductsWrapper = document.querySelector(".cart-menu .products-wrapper");

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    // Play Sound Effect
    playSoundEffect();
    // Get Product Info 
    let id =  e.target.parentElement.parentElement.querySelector("[data-id]") === null ? Number(e.target.parentElement.parentElement.dataset.id) : Number(e.target.parentElement.parentElement.querySelector("[data-id]").dataset.id);
    let imgSrc = e.target.parentElement.parentElement.querySelector("img").src;
    let title = e.target.parentElement.parentElement.querySelector(".text > :first-child").textContent;
    let price = Number(e.target.parentElement.parentElement.querySelector("[data-price]").textContent);
    let standardPrice = Number(e.target.parentElement.parentElement.querySelector("[data-price]").dataset.price);
    // Add Product To Products Arr
    addProductToArr(id, imgSrc, title, price, standardPrice);
  }
});

/* Update Product Quantity */
document.addEventListener("input", (e) => {
  if (e.target.classList.contains("quantity-input")) {
    // Update Cart Product Quantity
    storeItem(`product_${e.target.parentElement.parentElement.dataset.id || e.target.parentElement.parentElement.querySelector("[data-id]").dataset.id}_quantity`, e.target.value);
    // Update Cart Subtotal Price
    updateCartSubtotalPrice();
  }
});

/* Remove Product From Cart */
cartMenu.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-product-btn")) {
    removeProductFromCart(e.target.parentElement, e.target.parentElement.dataset.id);
  }
});

/* Get Cart Products */
window.addEventListener("load", getCartProducts);

// Functions
function playSoundEffect() {
  const audio = new Audio();
  audio.src = "../sound_effect.mp3";
  audio.play();
}

function showCartStatusPopup(type) {
  // Create Cart Status Popup
  const cartStatusPopup = document.createElement("div");
  cartStatusPopup.classList.add("cart-status-popup");
  type === "removed" 
    ? cartStatusPopup.style.setProperty("--status-color", "#f00") 
    : cartStatusPopup.style.setProperty("--status-color", "#0f0");
  // Append The Cart Status Popup To The Page
  document.body.append(cartStatusPopup);
  // Create Icon
  const icon = document.createElement("i");
  icon.classList.add("fas", "icon");
  switch (type) {
    case "added":
      icon.classList.add("fa-check");
      break;
    case "updated":
      icon.classList.add("fa-thumbs-up");
      break;
    case "removed":
      icon.classList.add("fa-xmark");
      break;
  }
  cartStatusPopup.append(icon);
  // Create Text Paragraph Object
  const textContent = {
    added: {
      ar: "تم إضافة المنتج للسلة بنجاح !",
      en: "The product has been added to the cart successfully !",
      fr: "Le produit a été ajouté au panier avec succès !",
    },
    updated: {
      ar: "تم تحديث السلة بنجاح !",
      en: "The cart has been updated successfully !",
      fr: "Le panier a été mis à jour avec succès !",
    },
    removed: {
      ar: "تم حذف المنتج من السلة بنجاح !",
      en: "The product has been removed from the cart successfully !",
      fr: "Le produit a été supprimé du panier avec succès !",
    }
  }
  // Create Text Paragraph
  const text = document.createElement("p");
  localStorage.getItem("language")
    ? text.textContent = textContent[type][localStorage.getItem("language")]
    : text.textContent = textContent[type].ar;
  cartStatusPopup.append(text);
  // Create Counter Span
  const counter = document.createElement("span");
  counter.classList.add("counter");
  counter.textContent = "3";
  cartStatusPopup.append(counter);
  // Cart Status Popup Counter Functionality
  cartStatusPopupCounter(cartStatusPopup, counter);
}

function cartStatusPopupCounter(popup, counter) {
  let interval = setInterval(() => {
    counter.textContent--;
    if (counter.textContent === "0") {
      // Clear The Interval
      clearInterval(interval);
      // Add "removed" Class To The Popup
      popup.classList.add("removed");
      // Wait Until The Removing Animation Ends
      setTimeout(() => {
        popup.remove();
      }, 500);
    };
  }, 1000);
}

function addProductToArr(id, imgSrc, title, price, standardPrice) {
  // Check If The Product Is Already Added To The Cart Products Arr
  let isAlreadyAdded = cartProductsArr.find(product => product.id === id && product.title === title);
  // If The Product Is Already Added
  if (isAlreadyAdded) {
    // Show Cart Status Popup
    showCartStatusPopup("updated");
    // Update Cart Subtotal Price
    updateCartSubtotalPrice();
    // Sum The Increased Value
    let increasedQuantity = Number(localStorage.getItem(`product_${id}_quantity`)) + 1;
    // Update Cart Product Quantity
    updateCartProductQuantity(id, increasedQuantity);
    // Increase Cart Product Quantity By 1
    storeItem(`product_${id}_quantity`, increasedQuantity);
  } else {
    // Show Cart Status Popup
    showCartStatusPopup("added");
    // Create Cart Product Object
    const cartObj = {
      id: id,
      imgSrc: imgSrc,
      title: title,
      price: price,
      standardPrice: standardPrice,
    }
    // Push The Cart Product Object To The Cart Products Arr
    cartProductsArr.push(cartObj)
    // Display Cart Products In The Cart Menu
    displayCartProducts(cartProductsArr);
    // Store Cart Products 
    storeItem("cart_products", JSON.stringify(cartProductsArr));
    // Update Cart Products Count
    updateCartProductsCount();
    // Update Cart Subtotal Price
    updateCartSubtotalPrice();
  }
}

function updateCartProductQuantity(productId, increasedQuantity) {
  // Update Cart Product Quantity
  [...cartProductsWrapper.children].forEach(product => {
    if (product.dataset.id == productId) {
      product.querySelector(".quantity-input").value = increasedQuantity;
    }
  });
  // Update Product View Cart Quantity
  const productViewQuantityInput = document.querySelector(`.product-${productId}-quantity`);
  if (productViewQuantityInput) {
    productViewQuantityInput.value = increasedQuantity;
  }
}

function displayCartProducts(cartProductsArr) {
  // Empty Cart Products Wrapper
  cartProductsWrapper.innerHTML = "";
  // Loop Throw The Cart Products Arr Objects
  cartProductsArr.forEach(obj => {
    // Create Cart Product Box
    createCartProductBox(obj, cartProductsWrapper);
  });
}

function createCartProductBox(obj, wrapper) {
  // Create Cart Product Box
  const cartProductBox = document.createElement("div");
  cartProductBox.classList.add("cart-product");
  cartProductBox.dataset.id = obj.id;
  // Append The Cart Product Box To The Wrapper
  wrapper.append(cartProductBox);
  // Create Product Image Container
  const imgContainer = document.createElement("figure");
  imgContainer.classList.add("image", "hover-shine");
  cartProductBox.append(imgContainer);
  // Create Product Img
  const img = document.createElement("img");
  img.src = obj.imgSrc;
  img.alt = obj.title;
  img.title = obj.title;
  imgContainer.append(img);
  // Create Product Info Box
  const infoBox = document.createElement("div");
  infoBox.classList.add("info");
  cartProductBox.append(infoBox);
  // Create Product Title h3
  const h3 = document.createElement("h3");
  h3.textContent = obj.title;
  infoBox.append(h3);
  // Create Product Price Wrapper Element
  const priceWrapper = document.createElement("div");
  priceWrapper.classList.add("price");
  infoBox.append(priceWrapper);
  // Create Product Currency Span
  const currency = document.createElement("span");
  currency.classList.add("currency");
  localStorage.getItem("currency") 
    ? currency.textContent = localStorage.getItem("currency").toUpperCase() 
    : currency.textContent = "SAR"; 
  priceWrapper.append(currency);
  // Create Product Price Span
  const price = document.createElement("span");
  price.dataset.price = obj.standardPrice;
  price.textContent = obj.price;
  priceWrapper.append(price);
  // Create Product Quantity Input
  const quantityInput = document.createElement("input");
  quantityInput.classList.add("quantity-input");
  quantityInput.type = "number";
  quantityInput.min = "1";
  if (localStorage.getItem(`product_${obj.id}_quantity`)) {
    quantityInput.value = localStorage.getItem(`product_${obj.id}_quantity`);
  } else {
    quantityInput.value = "1";
    storeItem(`product_${obj.id}_quantity`, "1");
  }
  infoBox.append(quantityInput);
  // Create Product Remove Btn
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-product-btn");
  removeBtn.title = "Remove Product";
  cartProductBox.append(removeBtn);
  // Create Product Remove Icon
  const removeIcon = document.createElement("i");
  removeIcon.classList.add("fas", "fa-xmark", "icon")
  removeBtn.append(removeIcon);
}

function updateCartProductsCount() {
  document.querySelector("[data-products-count]").setAttribute("data-products-count", cartProductsWrapper.children.length);
}

function updateCartSubtotalPrice() {
  const subtotalPriceElements = document.querySelectorAll("header .cart-btn [data-price], .cart-menu .row [data-price]");
  let subtotalPrice = 0;
  let standardSubtotal = 0;
  // Count Subtotal Price
  [...cartProductsWrapper.children].forEach(product => {
    let price = Number(product.querySelector(".price [data-price]").textContent);
    let standardPrice = Number(product.querySelector(".price [data-price]").dataset.price);
    let quantity = Number(product.querySelector(".quantity-input").value);

    subtotalPrice += price * quantity;
    standardSubtotal += standardPrice * quantity;
  });
  // Display Subtotal Price
  subtotalPriceElements.forEach(ele => {
    ele.textContent = subtotalPrice.toFixed(2);
    ele.dataset.price = standardSubtotal.toFixed(2);
  });
}

function removeProductFromCart(product, productId) {
  // Show Cart Status Popup
  showCartStatusPopup("removed");
  // Remove Product Animation
  product.classList.add("removed");
  // Wait Until The Deleting Animation Ends
  setTimeout(() => {
    // Remove Product From DOM
    product.remove();
    // Update Cart Products Count
    updateCartProductsCount();
    // Update Cart Subtotal Price
    updateCartSubtotalPrice();
  }, 500);
  // Remove Product From LS
  cartProductsArr = cartProductsArr.filter(product => product.id != productId);
  storeItem("cart_products", JSON.stringify(cartProductsArr));
  // Remove Product Quantity From LS
  localStorage.removeItem(`product_${productId}_quantity`);
}

function getCartProducts() {
  if (localStorage.getItem("cart_products")) {
    // Display Stored Products In The Cart
    displayCartProducts(JSON.parse(localStorage.getItem("cart_products")));
    // Set Cart Products Count
    updateCartProductsCount();
    // Set Cart Subtotal Price
    updateCartSubtotalPrice()
  }
}