// Export Functions
export { updateSelectedOption, storeItem };

/* Change Website Language */
const languageSelectBoxes = document.querySelectorAll(".language-select-box");

languageSelectBoxes.forEach(selectBox => {
  selectBox.addEventListener("change", (e) => {
    // Store Choosen Language In The LS
    storeItem("language", e.target.value);
    // Reload The Page
    location.reload();
  });
});

window.addEventListener("load", getLanguage);

// Functions
function storeItem(key, value) {
  localStorage.setItem(key, value);
}

function getLanguage() {
  if (localStorage.getItem("language")) {
    // Update The Selected Option
    updateSelectedOption(languageSelectBoxes, localStorage.getItem("language"));
    // Update Website Language
    updateWebsiteLanguage(localStorage.getItem("language"));
    // Update Search Input Placeholder Content
    updateInputsPlaceHolders(localStorage.getItem("language"));
  } else {
    // Set Website Default Language As Arabic
    updateWebsiteLanguage("ar");
    // Set The Default Search Input Placeholder Content In Arabic
    updateInputsPlaceHolders("ar");
  }

  // Update Website Direction
  if (localStorage.getItem("language")) {
    localStorage.getItem("language") === "ar"
      ? document.documentElement.dir = "rtl"
      : document.documentElement.dir = "ltr";
  } 
}

function updateSelectedOption(selectBoxes, selectedOptionValue) {
  // Loop Throw All Options From Each Select Box
  selectBoxes.forEach(selectBox => {
    const options = [...selectBox.children];
    // Remove "selected" Attr From All Options
    options.forEach(option => option.removeAttribute("selected"));
    // Loop Throw All Of The Options
    options.forEach(option => {
      // Add "selected" Attr To The Choosen Option
      if (option.value === selectedOptionValue) option.setAttribute("selected", "true");
    });
  }); 
}

function updateWebsiteLanguage(language) {
  // Fetch Translations Data (JSON Object)
  fetch("../json/translations.json")
    .then(response => response.json())
    .then(data => {
      // Wait Until The Page Content Is Added
      setTimeout(() => {
        updateWebsiteContent(data[language]);
      }, 10);
    });
}

function updateWebsiteContent(languageObject) {
  const allContentElements = document.querySelectorAll("[data-content]");
  
  allContentElements.forEach(ele => {
    const dataAttr = ele.dataset.content;
    ele.textContent = languageObject[dataAttr];
  });
}

function updateInputsPlaceHolders(language) {
  // Select Inputs
  const searchInput = document.getElementById("searchInput");
  const loginFNInput = document.getElementById("loginFNInput");
  const loginLNInput= document.getElementById("loginLNInput");
  const loginEmailInput = document.getElementById("loginEmailInput");
  const loginPhoneInput = document.getElementById("loginPhoneInput");
  const loginGenderSelectBox = document.getElementById("loginGenderSelectBox");
  const contactFullNameInput = document.getElementById("contactFullNameInput");
  const contactEmailInput = document.getElementById("contactEmailInput");
  const contactPhoneInput = document.getElementById("contactPhoneInput");
  const contactSubjectInput = document.getElementById("contactSubjectInput");
  const contactMessageInput = document.getElementById("contactMessageInput");

  if (language === "ar") {
    // Search Input
    searchInput.setAttribute("placeholder", "كلمة البحث...");
    // Login Inputs
    loginFNInput.setAttribute("placeholder", "الأسم الأول");
    loginLNInput.setAttribute("placeholder", "الأسم الأخير");
    loginEmailInput.setAttribute("placeholder", "البريد الإلكتروني");
    loginPhoneInput.setAttribute("placeholder", "رقم الجوال");
    // Login Gender Select Box Options
    loginGenderSelectBox.children[0].textContent = "الجنس";
    loginGenderSelectBox.children[1].textContent = "ذكر";
    loginGenderSelectBox.children[2].textContent = "انثي";
    // Contact Inputs
    contactFullNameInput !== null && contactFullNameInput.setAttribute("placeholder", "الأسم الكامل");
    contactEmailInput !== null && contactEmailInput.setAttribute("placeholder", "البريد الإلكتروني");
    contactPhoneInput !== null && contactPhoneInput.setAttribute("placeholder", "رقم الجوال");
    contactSubjectInput !== null && contactSubjectInput.setAttribute("placeholder", "موضوع الرسالة");
    contactMessageInput !== null && contactMessageInput.setAttribute("placeholder", "الرسالة...");
  } else if (language === "en") {
    // Search Input
    searchInput.setAttribute("placeholder", "Search keyword...");
    // Login Inputs
    loginFNInput.setAttribute("placeholder", "First Name");
    loginLNInput.setAttribute("placeholder", "Last Name");
    loginEmailInput.setAttribute("placeholder", "Email Address");
    loginPhoneInput.setAttribute("placeholder", "Phone Number");
    // Login Gender Select Box Options
    loginGenderSelectBox.children[0].textContent = "Gender";
    loginGenderSelectBox.children[1].textContent = "Male";
    loginGenderSelectBox.children[2].textContent = "Female";
    // Contact Inputs
    contactFullNameInput !== null && contactFullNameInput.setAttribute("placeholder", "Full Name");
    contactEmailInput !== null && contactEmailInput.setAttribute("placeholder", "Email Address");
    contactPhoneInput !== null && contactPhoneInput.setAttribute("placeholder", "Phone Number");
    contactSubjectInput !== null && contactSubjectInput.setAttribute("placeholder", "Subject");
    contactMessageInput !== null && contactMessageInput.setAttribute("placeholder", "Message...");
  } else {
    // Search Input
    searchInput.setAttribute("placeholder", "Rechercher Un Mot-clé...");
    // Login Inputs
    loginFNInput.setAttribute("placeholder", "Prénom");
    loginLNInput.setAttribute("placeholder", "Nom De Famille");
    loginEmailInput.setAttribute("placeholder", "Adresse E-mail");
    loginPhoneInput.setAttribute("placeholder", "Numéro De Téléphone");
    // Login Gender Select Box Options
    loginGenderSelectBox.children[0].textContent = "Genre";
    loginGenderSelectBox.children[1].textContent = "Mâle";
    loginGenderSelectBox.children[2].textContent = "Femelle";
    // Contact Inputs
    contactFullNameInput !== null && contactFullNameInput.setAttribute("placeholder", "Nom Complet");
    contactEmailInput !== null && contactEmailInput.setAttribute("placeholder", "Adresse E-mail");
    contactPhoneInput !== null && contactPhoneInput.setAttribute("placeholder", "Numéro De Téléphone");
    contactSubjectInput !== null && contactSubjectInput.setAttribute("placeholder", "Sujet");
    contactMessageInput !== null && contactMessageInput.setAttribute("placeholder", "Message...");
  }
}