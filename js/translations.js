// Export Functions
export { updateSelectedAttr };

// Language Select Box Event
const languageSelectBox = document.getElementById("language-select");

languageSelectBox.addEventListener("change", (e) => {
  // Reload Page
  location.reload();
  // Store Translations In The Local Storage
  storeLang(e.target.value);
  // Update Selected Attr
  updateSelectedAttr(languageSelectBox, e.target.value);
});

// Create Translations Object
const translations = {
  ar: {
    "intro-paragraph": `مرحبًا بكم في متجر باور <i class="fas fa-heart"></i> !`,
    "language-label": "اللغة:",
    "currency-label": "العملة:",
    "menu-heading": "القائمة الرئيسية",
    "jerses-page-link": "الجيرسي الرسمي",
    "cc-page-link": "مجموعات شباب الفريق ",
    "perfumes-page-link": "العطور",
    "hoodies-page-link": "الهوديات",
    "tshirts-page-link": "التشيرتات",
    "pants-page-link": "القطع السفلية",
    "accessories-page-link": "الإكسسوارات",
    "gifts-page-link": "قسائم الإهداء",
    "support-page-link": "الدعم الفني",
    "faqs-page-link": "الأسئلة الشائعة",
    "signin-label": "تسجيل الدخول",
    "signin-email-input-label": "البريد الألكتروني",
    "signin-submit-btn": "دخول",
    "perfumes-section-heading": "العطور",
    "brooches-section-heading": "البروشات",
    "gifts-section-heading": "مجموعات الاهداء",
    "hoodies-section-heading": "الهوديات",
    "tshirts-section-heading": "التشيرتات",
    "swimming-section-heading": "مجموعة السباحة",
    "accessories-section-heading": "الإكسسوارات",
    "stickers-section-heading": "الإستيكرات",
    "cart-menu-heading": "سلة المشتريات",
    "empty-cart-label": "السلة فارغة",
    "empty-cart-paragraph": "يبدو انك لم تضف أي منتجات للسلة بعد...",
    "subtotal-price-label": "السعر الإجمالي:",
    "checkout-btn": "إكمال الشراء:",
    "download-heading": "تحميل تطبيق باور ستور",
    "download-paragraph":
      "يمكنك الان متابعة كل ماهو مميز و جديد بالمتجر من عروض و منتجات على مدار الساعة وطوال أيام الأسبوع.",
    "download-btn": `<i class="fas fa-mobile"></i> حمل تطبيق باور ستور`,
    "testimonials-heading": "قالوا عن POWR eSports",
    "footer-follow-heading": "تابع POWR eSports",
    "powr-desc-paragraph":
      "فريق POWER eSports من 2010 الى الأبد | حائزون على اكثر من 160 بطولة وجائزة افضل منظمة | في رحلة مع جمهورنا لخلق مجال يدعم المواهب. شركة نادي القبضة الرقمية الرياضي",
    "footer-links-heading": "روابط تهمك",
    "footer-link-1": "خطوات الطلب",
    "footer-link-2": "سياسة الشحن والاستبدال",
    "footer-link-3": "الأسئلة الشائعة",
    "footer-link-4": "الدعم الفني",
    "footer-customer-services-heading": "خدمة العملاء",
    "footer-app-heading": "تطبيق POWR eSports",
    "tax-id": `الرقم الضريبي <span>311339579100003</span>`,
    "copyright-paraggraph": "الحقوق محفوظة | 2024 POWR eSports",
  },
  en: {
    "intro-paragraph": `Welcome To POWR store <i class="fas fa-heart"></i> !`,
    "language-label": "language:",
    "currency-label": "currency:",
    "menu-heading": "Main Menu",
    "jerses-page-link": "Official Jersay",
    "cc-page-link": "Content Creators Sets",
    "perfumes-page-link": "Perfumes",
    "hoodies-page-link": "Hoodies",
    "tshirts-page-link": "T-shirts",
    "pants-page-link": "Pants",
    "accessories-page-link": "Accessories",
    "gifts-page-link": "Gifts",
    "support-page-link": "Support",
    "faqs-page-link": "FAQs",
    "signin-label": "Sign In",
    "signin-email-input-label": "Email Address",
    "signin-submit-btn": "Login",
    "perfumes-section-heading": "Perfumes",
    "brooches-section-heading": "Brooches",
    "gifts-section-heading": "Gifts Vouchers",
    "hoodies-section-heading": "Hoodies",
    "tshirts-section-heading": "T-shirts",
    "swimming-section-heading": "Swimming Set",
    "accessories-section-heading": "Accessories",
    "stickers-section-heading": "Stickers",
    "cart-menu-heading": "Shopping Cart",
    "empty-cart-label": "Cart Is Empty",
    "empty-cart-paragraph":
      "It seems you didn't add any product to the cart yet...",
    "subtotal-price-label": "Subtotal Price:",
    "checkout-btn": "Checkout",
    "download-heading": "Download POWR Store App",
    "download-paragraph":
      "You can now follow everything special and new in the store, including offers and products, 24 hours a day, 7 days a week.",
    "download-btn": `<i class="fas fa-mobile"></i> Download POWR Store App`,
    "testimonials-heading": "What They Say About POWR eSports",
    "footer-follow-heading": "Follow POWR eSports",
    "powr-desc-paragraph":
      "POWER eSports Team from 2010 to eternity | Winners of more than 160 championships and awards for best organization | On a journey with our audience to create a space that supports talents. Digital sports club company.",
    "footer-links-heading": "Important Links",
    "footer-link-1": "Order Steps",
    "footer-link-2": "Shipping and Replacement Policy",
    "footer-link-3": "FAQs",
    "footer-link-4": "Support",
    "footer-customer-services-heading": "Customer Services",
    "footer-app-heading": "POWR eSports App",
    "tax-id": `Tax ID <span>311339579100003</span>`,
    "copyright-paraggraph": "All rights reserved | 2024 POWR eSports",
  },
};

// Functionality
function applyTranslations(lang) {
  const allIdElement = document.querySelectorAll("[id]");

  // Loop On All The Elements That Have Id
  allIdElement.forEach((ele) => {
    let id = ele.id;

    if (translations[lang][id]) {
      ele.innerHTML = translations[lang][id]; // Here
    }
  });
}

function updateSelectedAttr(selectBox, optionVal) {
  [...selectBox.children].forEach((option) => {
    if (option.value.toUpperCase() === optionVal.toUpperCase()) {
      option.setAttribute("selected", "selected");
    } else {
      option.removeAttribute("selected");
    }
  });
}

function storeLang(lang) {
  localStorage.setItem("language", lang);
}

function getLang() {
  if (localStorage.getItem("language")) {
    applyTranslations(localStorage.getItem("language"));
    updateSelectedAttr(languageSelectBox, localStorage.getItem("language"));
  }
  if (localStorage.getItem("language") === "en") {
    document.body.classList.add("ltr");
  } else {
    document.body.classList.remove("ltr");
  }
}

// Get Language From The Local Storage
window.addEventListener("load", getLang);
