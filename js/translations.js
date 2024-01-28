// Export updateSelectedOption Function
export { updateSelectedOption, updateWebsiteContent };

// Languages Select Box
const langSelectBox = document.getElementById('language-select-box');

langSelectBox.addEventListener('change', (e) => {
  // Auto Reload Page
  location.reload();
  // Store Selected Language In The Local Storage
  storeLanguage(e.target.value);
});

// Content Translations Object
const contentTranslations = {
  ar: {
    introParagraph: "مرحبًا بكم في متجر باور <i class='fas fa-heart icon'></i> !",
    langLabel: "اللغة:",
    currencyLabel: "العملة:",

    mainMenu: "القائمة الرئيسية",
    jerseys: "الجيرسي الرسمي",
    ccProducts: "مجموعات شباب الفريق",
    hoodies: "الهوديات",
    perfumes: "العطور",
    tshirts: "التشيرتات",
    bottomPieces: "القطع السفلية",
    swimmingSet: "مجموعة السباحة",
    accessories: "الإكسسوارات",
    stickers: "الإستيكرات", 
    giftVouchers: "قسائم الإهداء", 
    faqs: "الأسئلة الشائعة",
    support: "الدعم الفني",

    login: "تسجيل الدخول",
    emailLabel: "البريد الإلكتروني",

    cartMenu: "سلة المنتجات",
    emptyCartHeading: "سلة منتجاتك فارغة",
    emptyCartParagraph: "يبدو أنك لم تضف أي منتجات للسلة بعد...",
    subtotalPrice: "السعر الإجمالي:",
    continueShopping: "إكمال الشراء",
  
    downloadApp: "تحميل تطبيق POWR eSports",
    downloadAppParagraph: "يمكنك الان متابعة كل ماهو مميز و جديد بالمتجر من عروض و منتجات على مدار الساعة وطوال أيام الأسبوع.",

    testiminialsHeading: "قالوا عن POWR eSports",

    footerFollowHeading: "تابع POWR eSports:",
    footerParagraph: "فريق POWER eSports من 2010 الى الأبد | حائزون على اكثر من 160 بطولة وجائزة افضل منظمة | في رحلة مع جمهورنا لخلق مجال يدعم المواهب. شركة نادي القبضة الرقمية الرياضي",
    footerLinksTitle: "روابط تهمك",
    footerLink1: "خطوات الطلب",
    footerLink2: "سياسة الشحن والاستبدال",
    footerLink3: "الأسئلة الشائعة",
    footerLink4: "الدعم الفني",
    footerCustomerServicesTitle: "خدمة العملاء",
    footerAppTitle: "تطبيق POWR eSports",
    footerTaxNumLabel: "الرقم الضريبي",
    footerCopyrightMsg: `الحقوق محفوظة | <span class='year'>${new Date().getFullYear()}</span> POWR eSports`,

    searchResults: "نتائج البحث",
    homePage: "الرئيسية",
    searchResultsLabel: "نتائج البحث عن:",
    emptySearchResults: "للأسف لا توجد أي نتائج بحث",

    addToCart: `<ion-icon name="bag-outline" class="icon"></ion-icon> أضف للسلة`,

    addedToCartPopupTxt: "تم إضافة المنتج للسلة بنجاح.",
    addedAlreadyToCartPopupTxt: "تم إضافة المنتج للسلة بالفعل.",
    removedFromCartPopupTxt: "تم حذف المنتج من السلة بنجاح.",
  },

  en: {
    introParagraph: "Welcome to POWR Store <i class='fas fa-heart icon'></i> !",
    langLabel: "Language:",
    currencyLabel: "Currency:",
  
    mainMenu: "Main Menu",
    jerseys: "Official Jerseys",
    ccProducts: "Content Creators Collections",
    hoodies: "Hoodies",
    perfumes: "Perfumes",
    tshirts: "T-Shirts",
    bottomPieces: "Bottom Pieces",
    swimmingSet: "Swimming Set",
    accessories: "Accessories",
    stickers: "Stickers",
    giftVouchers: "Gift Vouchers",
    faqs: "Frequently Asked Questions",
    support: "Support",
  
    login: "Login",
    emailLabel: "Email Address:",
  
    cartMenu: "Shopping Cart",
    emptyCartHeading: "Your cart is empty",
    emptyCartParagraph: "It seems you haven't added any products to your cart yet...",
    subtotalPrice: "Subtotal Price:",
    continueShopping: "Continue Shopping",
  
    downloadApp: "Download POWR eSports App",
    downloadAppParagraph: "Now you can stay updated with all the special offers and products in the store around the clock and throughout the week.",
  
    testiminialsHeading: "What people say about POWR eSports",

    footerFollowHeading: "Follow POWR eSports:",
    footerParagraph: "POWER eSports Team from 2010 to Forever | Winners of more than 160 championships and the Best Organization Award On a journey with our audience to create a field that supports talent. Digital Fist Sports Club Company",
    footerLinksTitle: "Important Links",
    footerLink1: "Ordering steps",
    footerLink2: "Shipping and exchange policy",
    footerLink3: "FAQs",
    footerLink4: "Support",
    footerCustomerServicesTitle: "Customer Services",
    footerAppTitle: "POWR eSports App",
    footerTaxNumLabel: "Tax Number",
    footerCopyrightMsg: `Rights Reserved | <span class='year'>${new Date().getFullYear()}</span> POWR eSports`,

    searchResults: "Search Results",
    homePage: "Home Page",
    searchResultsLabel: "Search Results for:",
    emptySearchResults: "Sorry, we didn't find any results",

    addToCart: `Add to cart <ion-icon name="bag-outline" class="icon"></ion-icon>`,

    addedToCartPopupTxt: "The product has been added to the cart.",
    addedAlreadyToCartPopupTxt: "The cart content has been updated.",
    removedFromCartPopupTxt: "The product has been deleted from the cart.",
  },

  fr: {
    introParagraph: "Bienvenue chez POWR Store <i class='fas fa-heart icon'></i> !",
    langLabel: "Langue :",
    currencyLabel: "Devise :",
  
    mainMenu: "Menu Principal",
    jerseys: "Maillots officiels",
    ccProducts: "Collections de créateurs de contenu",
    hoodies: "Sweat à capuche",
    perfumes: "Parfums",
    tshirts: "T-shirts",
    bottomPieces: "Pièces inférieures",
    swimmingSet: "Ensemble de natation",
    accessories: "Accessoires",
    stickers: "Autocollants",
    giftVouchers: "Bons cadeaux",
    faqs: "Foire aux questions",
    support: "Support",
  
    login: "Connexion",
    emailLabel: "E-mail",
    loginBtn: "Connexion",
  
    cartMenu: "Panier",
    emptyCartHeading: "Votre panier est vide",
    emptyCartParagraph: "Il semble que vous n'ayez pas encore ajouté de produits à votre panier...",
    subtotalPrice: "Sous-total :",
    continueShopping: "Continuer les achats",
  
    downloadApp: "Télécharger l'application POWR eSports",
    downloadAppParagraph: "Maintenant, vous pouvez rester informé de toutes les offres spéciales et des produits de la boutique 24 heures sur 24 et 7 jours sur 7.",
  
    testiminialsHeading: "Ce que les gens disent de POWR eSports",

    footerFollowHeading: "Suivez POWR eSports:",
    footerParagraph: "L'équipe POWER eSports de 2010 à toujours | Gagnants de plus de 160 championnats et du prix de la meilleure organisation. En voyage avec notre public pour créer un domaine qui soutient les talents. Société de club de sport Digital Fist",
    footerLinksTitle: "Liens Importants",
    footerLink1: "Étapes d'achat",
    footerLink2: "Politique d'expédition et d'échange",
    footerLink3: "FAQs",
    footerLink4: "Soutien",
    footerCustomerServicesTitle: "Service client",
    footerAppTitle: "Application POWR eSports",
    footerTaxNumLabel: "Numéro d'identification fiscale",
    footerCopyrightMsg: `Droits Réservés | <span class='year'>${new Date().getFullYear()}</span> POWR eSports`,

    searchResults: "Résultats de la recherche",
    homePage: "Page d'accueil",
    searchResultsLabel: "Résultats de la recherche pour :",
    emptySearchResults: "Désolé, nous n'avons trouvé aucun résultat",

    addToCart: `Ajouter au panier <ion-icon name="bag-outline" class="icon"></ion-icon>`,

    addedToCartPopupTxt: "Le produit a été ajouté au panier.",
    addedAlreadyToCartPopupTxt: "Le contenu du panier a été mis à jour.",
    removedFromCartPopupTxt: "Le produit a été supprimé du panier.",
  }
}

// Functionality
function storeLanguage(language) {
  localStorage.setItem('language', language);
}

function updateSelectedOption(selectBox, selectedOptionValue) {
  [...selectBox.children].forEach(opt => {
    if (opt.value === selectedOptionValue) {
      opt.setAttribute('selected', 'selected');
    } else {
      opt.removeAttribute('selected');
    }
  });
}

function updateWebsiteContent(language) {
  // Get All data-translation Elements
  const allContentElements = document.querySelectorAll('[data-translation]');

  // Loop Throw The Content Elements
  allContentElements.forEach(ele => {
    let content = ele.getAttribute('data-translation');

    if (contentTranslations[language][content]) {
      ele.innerHTML = contentTranslations[language][content];
    }
  });

  // Update The Search Input Placeholder Content
  const searchInput = document.getElementById('search-input');
  
  if (language === 'ar') {
    searchInput.setAttribute('placeholder', 'أدخل كلمة البحث...');
  } else if (language === 'en') {
    searchInput.setAttribute('placeholder', 'Type the search keyword...');
  } else {
    searchInput.setAttribute('placeholder', 'Tapez le mot-clé de recherche...');
  }
}

function getLanguage() {
  if (localStorage.getItem('language')) {
    updateSelectedOption(langSelectBox, localStorage.getItem('language'));
    updateWebsiteContent(localStorage.getItem('language'));

    if (localStorage.getItem('language') !== 'ar') {
      document.documentElement.classList.add('ltr');
    } else {
      document.documentElement.classList.remove('ltr');
    }
  } else {
    // Set The Default Language
    updateWebsiteContent('ar');
  }
}

// Aplly Local Storage Data
window.addEventListener('load', getLanguage);