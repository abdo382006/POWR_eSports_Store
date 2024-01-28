// Selectors
const loginForm = document.querySelector('.login-popup form');

/* Login Form */
loginForm.addEventListener('submit', (e) => {
  // Validate Email Input
  validateEmail(loginForm.querySelector('input'));
  // Validate Fields
  validateFields(loginForm, e); 
});

// Functionality
function validateEmail(emailInput) {
  let value = emailInput.value;
  let regExp = /^[\w-\.]+@[a-zA-Z0-9]+\.[a-z]{2,}(?:\.[a-z]{2,})?$/;

  if (regExp.test(value)) {
    setSuccess(emailInput);
  } else {
    if (value === '') {
      setError(emailInput, 'يجب عدم ترك هذا الحقل فارغا!');
    } else if (!value.includes('@')) {
      setError(emailInput, "يجب أن يحتوي البريد الإلكتروني علي '@'")
    } else {
      setError(emailInput, 'الرجاء إدخال بريد الكتروني صالح!');
    }
  }
}

function setSuccess(input) {
  input.parentElement.parentElement.classList.add('success');
  input.parentElement.parentElement.classList.remove('error');

  input.parentElement.nextElementSibling.innerHTML = `<i class="fas fa-check-circle icon"></i> محتوي الحقل سليم`;
}

function setError(input, msg) {
  input.parentElement.parentElement.classList.add('error');
  input.parentElement.parentElement.classList.remove('success');

  input.parentElement.nextElementSibling.innerHTML = `<i class="fas fa-circle-exclamation icon"></i> ${msg}`;
}

function validateFields(form, e) {
  const allFields = form.querySelectorAll('.field');

  for (let i = 0; i < allFields.length; i++) {
    if (allFields[i].classList.contains('error')) {
      e.preventDefault();
    }
    break;
  }
}