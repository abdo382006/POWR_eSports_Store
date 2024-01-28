// Import Functions
import { updateWebsiteContent } from "./translations.js";

// Selectors
const addToCartBtns = document.querySelectorAll('.cart-btn');
const cartProductsWrapper = document.querySelector('.cart-menu .cart-products');
const cartPriceElements = document.querySelectorAll('#cart-btn [data-price], .cart-menu .row .price [data-price]'); 

let cartProductsArr = [];

if (localStorage.getItem('cart_products')) {
  cartProductsArr = JSON.parse(localStorage.getItem('cart_products'));
}

// Cart Events
addToCartBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const productImgURL = btn.parentElement.parentElement.querySelector('img').src;
    const prodcutTitle = btn.parentElement.parentElement.querySelector('.text > a').textContent;
    const productPrice = btn.parentElement.parentElement.querySelector('.price').innerHTML;

    playSoundEffect();
    addProductToArr(productImgURL, prodcutTitle, productPrice);
    toggleCartEmptyContent();
    toggleDisabledCheckoutBtn();
  });
});

cartProductsWrapper.addEventListener('input', (e) => {
  if (e.target.classList.contains('cart-quantity')) {
    updateCartPrice();
    storeProductQuantity(e.target.parentElement.parentElement.getAttribute('data-id'), e.target.value);
  }
});

cartProductsWrapper.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-icon')) {
    deleteProduct(e.target.parentElement);
    showCartPopup('negative', 'removedFromCartPopupTxt', 'fa-xmark');

    setTimeout(() => {
      toggleCartEmptyContent();
      toggleDisabledCheckoutBtn();
      updateCartProductsCount();
      updateCartPrice();
    }, 500);
  }
});

// Product Constructor
class CartProdcut {
  constructor(id, imgURL, title, price) {
    this.id = id;
    this.imgURL = imgURL;
    this.title = title; 
    this.price = price;
  }
} 

// Functionality
function playSoundEffect() {
  const audio = new Audio();

  audio.src = "sounds/added.mp3";
  audio.play();
}

function addProductToArr(imgURL, title, price) {
  // Check If The Product Already Exists In The Arr
  if (cartProductsArr.find(product => product.imgURL === imgURL && product.title === title)) {
    showCartPopup('positive', 'addedAlreadyToCartPopupTxt', 'fa-smile');
  } else {
    // Show Cart Positive Popup
    showCartPopup('positive', 'addedToCartPopupTxt', 'fa-check');
    // Generate Unique Id 
    const id = new Date().getTime();
    // Create Cart Product Object
    const productObj = new CartProdcut(id, imgURL, title, price);
    // Push The Product Obj To The Arr
    cartProductsArr.push(productObj);
    // Display Products In The Cart
    displayCartProducts();
    // Store Products In The LS
    storeCartProducts();
    // Update Cart Products Count
    updateCartProductsCount();
    // Update Cart Price
    updateCartPrice();
  }
}

function showCartPopup(cartClass, content, iconClass) {
  // Create The Cart Popup
  const cartPopup = document.createElement('div');
  cartPopup.classList.add('cart-popup', cartClass);
  // Append The Cart Popup To The Page
  document.body.append(cartPopup);
  // Create The Cart Popup Icon
  const icon = document.createElement('i');
  icon.classList.add('fas', 'icon', iconClass);
  cartPopup.append(icon);
  // Create The Cart Popup H3
  const h3 = document.createElement('h3');
  h3.setAttribute('data-translation', content);
  cartPopup.append(h3);
  // Crteate The Cart Popup Counter Span
  const counter = document.createElement('span');
  counter.classList.add('counter');
  counter.textContent = 3;
  cartPopup.append(counter);

  // Update Website Content
  if (localStorage.getItem('language')) {
    updateWebsiteContent(localStorage.getItem('language'));
  } else {
    updateWebsiteContent('ar');
  }

  // Auto Hide The Cart Popup
  autoHideCartPopup(cartPopup);
}

function autoHideCartPopup(cartPopup) {
  const counter = setInterval(() => {
    +cartPopup.querySelector('.counter').textContent--;

    if (cartPopup.querySelector('.counter').textContent == '0') {
      clearInterval(counter);
      cartPopup.classList.add('hide');
      setTimeout(() => cartPopup.remove(), 500);
    }
  }, 1000);
}

function displayCartProducts() {
  // Empty Cart Products Wrapper 
  cartProductsWrapper.innerHTML = '';
  // Loop On The cartProductsArr
  cartProductsArr.forEach(productObj => {
    // Create Cart Product Div
    const productDiv = document.createElement('div');
    productDiv.setAttribute('data-id', productObj.id);
    productDiv.classList.add('product');
    // Append The Product Div To The Cart Products Wrapper
    cartProductsWrapper.append(productDiv);
    // Create .image Container
    const imgContainer = document.createElement('a');
    imgContainer.href = 'product-view.html';
    imgContainer.classList.add('image');
    productDiv.append(imgContainer);
    // Create The img 
    const productImage = document.createElement('img');
    productImage.src = productObj.imgURL;
    productImage.alt = productObj.title;
    imgContainer.append(productImage);
    // Create The Details Div
    const productDetailsDiv = document.createElement('div');
    productDetailsDiv.classList.add('details');
    productDiv.append(productDetailsDiv);
    // Create The Product Title Link
    const productTitle = document.createElement('a');
    productTitle.href = 'product-view.html';
    productTitle.textContent = productObj.title;
    productDetailsDiv.append(productTitle);
    // Create The Product Price Div
    const productPrice = document.createElement('div');
    productPrice.classList.add('price');
    productPrice.innerHTML = productObj.price;
    productDetailsDiv.append(productPrice);
    // Create The Product Quantity Input
    const productQuantity = document.createElement('input');
    productQuantity.classList.add('cart-quantity');
    productQuantity.type = 'number';
    localStorage.getItem(`product_${productObj.id}_quantity`) 
      ? productQuantity.value = localStorage.getItem(`product_${productObj.id}_quantity`) 
      : productQuantity.value = 1;
    productQuantity.setAttribute('min', '1');
    productDetailsDiv.append(productQuantity);
    // Create The Product Delete Btn
    const productDeleteBtn = document.createElement('i');
    productDeleteBtn.classList.add('fas', 'fa-xmark', 'delete-icon');
    productDiv.append(productDeleteBtn);
  });
}

function toggleCartEmptyContent() {
  const cartEmptyContentDiv = document.querySelector('.cart-menu .empty-cart-content');

  if (cartProductsWrapper.children.length > 0) {
    cartEmptyContentDiv.classList.add('hide');
  } else {
    cartEmptyContentDiv.classList.remove('hide');
  }
}

function toggleDisabledCheckoutBtn() {
  const checkoutBtn = document.querySelector('.cart-menu .checkout-btn');

  if (cartProductsWrapper.children.length > 0) {
    checkoutBtn.classList.remove('disabled');
  } else {
    checkoutBtn.classList.add('disabled');
  }
}

function updateCartProductsCount() {
  const cartBtn = document.getElementById('cart-btn');

  // Update Products Count
  cartBtn.setAttribute('data-products-count', cartProductsWrapper.children.length);
  // Store Products Count In The LS
  storeCartProductsCount(cartBtn.getAttribute('data-products-count'));
}

function updateCartPrice() {
  let subtotalPrice = 0;

  for (let i = 0; i < cartProductsWrapper.children.length; i++) {
    let productPrice = Number(cartProductsWrapper.children[i].querySelector('.price [data-price]').textContent);
    let productQuantity = Number(cartProductsWrapper.children[i].querySelector('input').value);

    subtotalPrice += productPrice * productQuantity;
  }

  subtotalPrice = +subtotalPrice.toFixed(2);

  cartPriceElements.forEach(ele => {
    ele.textContent = subtotalPrice;
  });

  storeCartPrice(subtotalPrice);
}

function deleteProduct(product) {
  product.classList.add('deleted');

  setTimeout(() => {
    product.remove();
    deleteProductFromLS(product.getAttribute('data-id'));
  }, 500);
}

function deleteProductFromLS(productId) {
  cartProductsArr = cartProductsArr.filter(product => product.id != productId);
  storeCartProducts();

  if (localStorage.getItem(`product_${productId}_quantity`)) {
    localStorage.removeItem(`product_${productId}_quantity`);
  }
}

// Store Data In The Local Storage
function storeCartProducts() {
  localStorage.setItem('cart_products', JSON.stringify(cartProductsArr));
}

function storeCartProductsCount(productsCount) {
  localStorage.setItem('cart_products_count', productsCount);
}

function storeCartPrice(subtotalPrice) {
  localStorage.setItem('cart_price', subtotalPrice);
}

function storeProductQuantity(productId, quantity) {
  localStorage.setItem(`product_${productId}_quantity`, quantity);
}

// Get Data From The Local Storage
function getCartProducts() {
  if (localStorage.getItem('cart_products')) {
    displayCartProducts();
    toggleCartEmptyContent();
    toggleDisabledCheckoutBtn();
  }
}

function getCartProductsCount() {
  if (localStorage.getItem('cart_products_count')) {
    updateCartProductsCount();
  }
}

function getCartPrice() {
  if (localStorage.getItem('cart_price')) {
    updateCartPrice();
  }
}

function getProductQuantity() {
  for (let i =0; i < cartProductsWrapper.children.length; i++) {
    let productId = cartProductsWrapper.children[i].getAttribute('data-id');

    if (localStorage.getItem(`product_${productId}_quantity`)) {
      cartProductsWrapper.children[i].querySelector('input').value = localStorage.getItem(`product_${productId}_quantity`);
    }
  }
  getCartPrice();
}

// Apply Local Storage Data To The Page
window.addEventListener('load', () => {
  getCartProducts();
  getCartProductsCount();
  getCartPrice();
  getProductQuantity();
});