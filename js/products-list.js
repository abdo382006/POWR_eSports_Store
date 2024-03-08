// Import Functions
import { fetchData, updateClass } from "./main.js";
import { displayProducts } from "./search.js";

/* Go To Products List Page */
const allCategoryLinks = document.querySelectorAll("[data-categoryname]");

allCategoryLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    // Locate To The Products List Page
    location.href = `products-list.html?category=${link.dataset.categoryname}`;
  })
});

/* Display The Category Name & Products */
const categorieNameWrapper = document.getElementById("categorieNameWrapper");
const productsGrid = document.querySelector(".products-categorie .products-grid");

window.addEventListener("load", () => {
  if (categorieNameWrapper) {
    // Get Category Name
    const categoryName =  new URLSearchParams(location.search).get("category");
    // Display Category Name
    displayCategoryName(categoryName);
    // Fetch Products Data
    fetchData("../json/all-products.json", "category", categoryName, displayProducts, productsGrid);
    // Update Active Category Link
    updateActiveCategoryLink(categoryName);
  }
});

// Functions
function displayCategoryName(categoryName) { 
  // Format The Category Name
  categoryName = categoryName[0].toUpperCase() + categoryName.slice(1);
  categoryName.endsWith("s") ? categoryName : categoryName += "s";
  // Display The Category Name To The Page Title
  document.title += ` ${categoryName}`;
  // Display The Category Name
  categorieNameWrapper.textContent = categoryName;
}

function updateActiveCategoryLink(categoryName) {
  const megaMenuLinks = document.querySelectorAll(".mega-menu a");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu .categories-list a");
  
  // Loop Throw The Mega Menu Links
  megaMenuLinks.forEach(link => {
    if (link.dataset.categoryname === categoryName) {
      updateClass(link, megaMenuLinks, "active");
    }
  });
  // Loop Throw The Mobile Menu Links
  mobileMenuLinks.forEach(link => {
    if (link.dataset.categoryname === categoryName) {
      updateClass(link, mobileMenuLinks, "active");
    }
  });
}