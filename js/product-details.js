// Import Functions
import { updateClass, displayHomeProducts } from "./main.js";

/* Get Product Details */

// Wait Until The Page Content Added
setTimeout(() => {
  const allProductDetailsLinks = document.querySelectorAll("[data-id]");
  allProductDetailsLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.tagName === "H3" || e.target.tagName === "IMG") {
        // Locate To The Product View Page
        location.href = `product-view.html?product-id=${link.dataset.id}`;
      }
    });
  });
}, 1000);

/* Display The Product Details */
const productViewSection = document.querySelector(".product-view");

window.addEventListener("load", () => {
  // Get The Product Id
  const productId =  Number(new URLSearchParams(location.search).get("product-id"));
  
  if (productViewSection) {
    // Fetch Product Data
    fetchProductData("../json/all-products.json", productId);
    // Fetch Simimlar Products Data
    fetchSimilarProductsData(productId);
  }
});

// Functions
function fetchProductData(url, productId) {
  fetch(url).then(response => response.json()).then(data => {
    // Loop Throw All The Products Objects
    data.forEach(product => {
      if (product.id === productId) {
        displayProductData(product);
      }
    });
  });
}

function displayProductData(productObj) {
  // Display Page Title
  document.title = productObj.title;
  // Display Product Main Img
  const mainImg = productViewSection.querySelector(".main-image img");
  mainImg.src = productObj.imgSrc;
  mainImg.alt = productObj.title;
  mainImg.title = productObj.title;
  // Create Product Small Images
  if (productObj.smallImgs) {
    createSmallImages(productObj.smallImgs, productObj.title, productObj.imgSrc);
  }
  // Display Product Title & Id
  const productTitle = productViewSection.querySelector(".product-title");
  productTitle.textContent = productObj.title;
  productTitle.dataset.id = productObj.id;
  // Display Product Code
  const code = productViewSection.querySelector(".code");
  code.textContent = productObj.code;
  // Display Product Rate
  const rate = productViewSection.querySelector(".rate");
  rate.textContent = productObj.rate;
  // Display Product Description
  const description = productViewSection.querySelector(".product-description");
  localStorage.getItem("language")
    ? description.textContent = productObj.description[localStorage.getItem("language")]
    : description.textContent = productObj.description.ar;
  // Display Product Price
  const price = productViewSection.querySelector(".price span:last-child");
  price.dataset.price = productObj.price;
  price.textContent = productObj.price;
  // Display Product Quantity
  const quantity = productViewSection.querySelector(".quantity-input");
  localStorage.getItem(`product_${productObj.id}_quantity`) && quantity.classList.add(`product-${productObj.id}-quantity`);
  localStorage.getItem(`product_${productObj.id}_quantity`)
    ? quantity.value = localStorage.getItem(`product_${productObj.id}_quantity`)
    : quantity.value = 1;
  // Disable The Add To Cart Btn If The Product Is Unavailable
  const addToCartBtn = productViewSection.querySelector(".add-to-cart-btn");
  !productObj.isAvailable && addToCartBtn.classList.add("disabled");
}

function createSmallImages(imgsArr, productName, mainImgSrc) {
  imgsArr.forEach(imgURL => {
    // Create Image Container
    const imgContainer = document.createElement("figure");
    imgContainer.classList.add("image", "swiper-slide");
    if (imgURL === mainImgSrc) {
      imgContainer.classList.add("active");
    }
    document.querySelector(".small-images").append(imgContainer);
    // Update The Main Image Src When Clicking The Image
    updateMainImageSrc(imgContainer);
    // Create The Img 
    const img = document.createElement("img");
    img.src = imgURL;
    img.alt = productName;
    img.title = productName;
    imgContainer.append(img);
  });
}

function updateMainImageSrc(clickedImg) {
  clickedImg.addEventListener("click", () => {
    // Update The Src Of The Clicked Image
    const mainImg = productViewSection.querySelector(".main-image img"); 
    mainImg.src = clickedImg.firstElementChild.src;
    // Update The Active Image
    updateClass(clickedImg, clickedImg.parentElement.children, "active");
  });
}

function fetchSimilarProductsData(productId) {
  fetch("../json/all-products.json")  
    .then(response => response.json())
    .then(data => {
      let category = data.filter(product => product.id === productId)[0].category;
      const similarProductsArr = data.filter(product => product.id !== productId && product.category === category);
      return similarProductsArr;
    })
    .then(similarProductsArr => {
      const similarProductsWrapper = document.getElementById("similarProductsWrapper");
      displayHomeProducts(similarProductsArr, similarProductsWrapper);
    });
}