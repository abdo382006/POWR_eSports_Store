// Messages
const error = {
  empty: {
    ar: "لا يجب ترك هذا الحقل فارغا !",
    en: "You mustn't leave this field empty !",
    fr: "Vous ne devez pas laisser ce champ vide !",
  },
  name: {
    ar: "الرجاء إدخال اسمك الحقيقي !",
    en: "Please, type your real name !",
    fr: "S'il vous plaît, tapez votre vrai nom !",
  },
  birthDay: {
    ar: "الرجاء تحديد يوم ميلادك !",
    en: "Please, mark your birthday !",
    fr: "S'il vous plaît, marquez votre anniversaire !",
  },
  gender: {
    ar: "الرجاء تحديد الجنس !",
    en: "Please, select your gender !",
    fr: "S'il vous plait selectionnez votre genre !",
  },
  email: {
    ar: "الرجاء كتابة بريد إلكتروني سليم !",
    en: "Please, type a valid e-mail address !",
    fr: "Merci de saisir une adresse e-mail valide !",
  },
  phone: {
    ar: "الرجاء إدخال رقم جوال سليم !",
    en: "Please, type a valid phone number !",
    fr: "Veuillez saisir un numéro de téléphone valide !",
  }
};

const success = {
  ar: "محتوي الحقل سليم !",
  en: "The field value is valid !",
  fr: "La valeur du champ est valide !",
};

/* Login Form Validation */
const loginForm = document.querySelector(".login-popup form");

loginForm.addEventListener("submit", (e) => {
  // Inputs
  const loginFNInput = document.getElementById("loginFNInput");
  const loginLNInput= document.getElementById("loginLNInput");
  const loginDateInput = document.getElementById("loginDateInput");
  const loginGenderSelectBox = document.getElementById("loginGenderSelectBox");
  const loginEmailInput = document.getElementById("loginEmailInput");
  const loginPhoneInput = document.getElementById("loginPhoneInput");
  // Validate Fields
  nameValidation(loginFNInput);
  nameValidation(loginLNInput);
  dateValidation(loginDateInput);
  selectValidation(loginGenderSelectBox);
  emailValidation(loginEmailInput);
  phoneValidation(loginPhoneInput);
  // Check If There Are Any Error Fields
  formValidation(loginForm, e);
});

/* Contact Form Validation */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    // Inputs
    const contactFullNameInput = document.getElementById("contactFullNameInput");
    const contactEmailInput = document.getElementById("contactEmailInput");
    const contactPhoneInput = document.getElementById("contactPhoneInput");
    const contactSubjectInput = document.getElementById("contactSubjectInput");
    const contactMessageInput = document.getElementById("contactMessageInput");
    // Validate Fields
    nameValidation(contactFullNameInput);
    emailValidation(contactEmailInput);
    phoneValidation(contactPhoneInput);
    textValidation(contactSubjectInput);
    textValidation(contactMessageInput);
    // Check If There Are Any Error Fields
    formValidation(contactForm, e);
  });
}

// Functions
function nameValidation(nameInput) {
  let value = nameInput.value.trim();
  let regExp = /^[a-zA-Zأ-ي\s-_]+$/;

  if (regExp.test(value)) {
    setSuccess(nameInput);
  } else {
    value === "" ? setError(nameInput, "empty") : setError(nameInput, "name");
  }
}

function dateValidation(dateInput) {
  let value = dateInput.value.trim();
  let regExp = /^\d{4}-\d{2}-\d{2}$/;

  if (regExp.test(value)) {
    setSuccess(dateInput);
  } else {
    setError(dateInput, "birthDay");
  }
}

function selectValidation(selectBox) {
  let value = selectBox.value.trim();
  
  if (value === "#") {
    setError(selectBox, "gender");
  } else {
    setSuccess(selectBox);
  } 
}

function emailValidation(emailInput) {
  let value = emailInput.value.trim();
  let regExp = /^[\w-\.]+@[a-zA-Z0-9]+\.[a-z]{2,}(?:\.[a-z]{2,})?$/;

  if (regExp.test(value)) {
    setSuccess(emailInput);
  } else {
    value === "" ? setError(emailInput, "empty") : setError(emailInput, "email");
  }
}

function phoneValidation(phoneInput) {
  let value = phoneInput.value.trim();
  let regExp = /^\+?(\d{1,3})?[-. ]?\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;

  if (regExp.test(value)) {
    setSuccess(phoneInput);
  } else {
    value === "" ? setError(phoneInput, "empty") : setError(phoneInput, "phone");
  }
}

function textValidation(textInput) {
  let value = textInput.value.trim();

  if (value !== "") {
    setSuccess(textInput);
  } else {
    setError(textInput, "empty");
  }
}

function setSuccess(input) {
  // Set Success Status
  input.parentElement.parentElement.classList.add("success");
  input.parentElement.parentElement.classList.remove("error");
  // Update Icon 
  const icon = input.parentElement.parentElement.querySelector(".icon");
  if (icon) {
    icon.classList.replace("fa-exclamation", "fa-check")
  }
  // Set .msg Content
  input.parentElement.nextElementSibling.textContent = 
    localStorage.getItem("language")
      ? success[localStorage.getItem("language")]
      : success.ar;
}

function setError(input, type) {
  // Set Error Status
  input.parentElement.parentElement.classList.add("error");
  input.parentElement.parentElement.classList.remove("success");
  // Update Icon 
  const icon = input.parentElement.parentElement.querySelector(".icon");
  if (icon) {
    icon.classList.replace("fa-check", "fa-exclamation")
  }
  // Set .msg Content
  input.parentElement.nextElementSibling.textContent = 
    localStorage.getItem("language")
      ? error[type][localStorage.getItem("language")]
      : error[type].ar;
}

function formValidation(form, e) {
  const allFields = form.querySelectorAll(".field");

  // Loop Throw All The Fields
  for (let i = 0; i < allFields.length; i++) {
    // Check If There Are Any Error Fields
    if (allFields[i].classList.contains("error")) {
      // Prevent The Form Submition
      e.preventDefault();
      // Focus On The Error Field
      allFields[i].firstElementChild.firstElementChild.focus();
      break;
    }
  }
}