"use strict"; // enforces stricter rules hence lesser errors since the errors are called out

//all selections from the dom
const totalPreVATSelector = document.querySelector(".totalPreVAT");
const tableInput = document.querySelectorAll(".input_table");
const VATselector = document.querySelector(".VAT");
const grandTotalSelector = document.querySelector(".grandTotal");
const tableContainer = document.querySelector(".table-container");
const totals = document.querySelectorAll(".total");
const section1 = document.querySelector("#section--1");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const navLinks = document.querySelector(".nav");
const reset = document.querySelector(".reset");

//Cost calculation
//1st step Attach event handler to parent (event delegation) to avoid attaching to each child
//attaching click function
tableContainer.addEventListener("click", function (e) {
  const current = e.target;

  calculationFunction(current);
});

//attaching focus out for the user input when they leave the input field
tableContainer.addEventListener("mouseout", function (e) {
  const current = e.target;

  calculationFunction(current);
});

// function for calculations
const calculationFunction = function (current) {
  const newVal = [];
  if (current.classList.contains("input_table")) {
    const userInput = Number(current.value); // convert the input into a number
    //Find the price of product from the string in the text content
    const price = current.parentElement.textContent.replace(/\D/g, "");
    // total for each
    const eachPrice = Number(userInput * price);
    //filling the next td(sibling) with the price
    current.parentElement.nextElementSibling.textContent = `💲${eachPrice.toFixed(
      2
    )}`;

    //go through the td of totals, remove dollar sign , convert result to a number, and push the number to array NewVal
    totals.forEach((el) => {
      const changedNumber = Number(el.textContent.replace("💲", ""));
      newVal.push(changedNumber);
    });
    //calculate total of the values in newVAL(our total before VAT)
    const totalNew = newVal.reduce((a, c) => a + c, 0);
    //update the textContent of our total before vat  addition
    totalPreVATSelector.textContent = `💲${totalNew.toFixed(2)}`;
    //find VAT and update the txt content
    const totalVATNew = (totalNew * 0.15).toFixed(2);
    VATselector.textContent = `💲${totalVATNew}`;
    //update the  grand total and fill the textContent
    const grandTotalNew = parseFloat(totalNew) + parseFloat(totalVATNew);

    grandTotalSelector.textContent = `💲 ${grandTotalNew.toFixed(2)}`;
  }
};

// resetting when a user clicks. Change everything back to zero

const formatter = (arr, checker) => {
  arr.forEach((input) => {
    checker === 1 ? (input.textContent = "💲0") : (input.value = "💲0");
  });
  totalPreVATSelector.textContent = `💲0`;
  VATselector.textContent = `💲0`;
  grandTotalSelector.textContent = `💲0`;
};

reset.addEventListener("click", function () {
  formatter(totals, 1);
  formatter(tableInput);
});

//smooth scroll to a "see our products"
btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

//smooth scroll for the links
//attaching event to a common parent
navLinks.addEventListener("click", function (e) {
  //preventing default "jumping to a section of a page"
  e.preventDefault();
  //find all elements with the navlink class
  if (e.target.classList.contains("nav__link")) {
    //get the id attribute of the current link from which event originated
    const id = e.target.getAttribute("href");

    //smooth scroll
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//form validation
//form selection
const form = document.getElementById("form");

//all functions
//function name validation
const nameFunction = function (fullName, fnameHolder) {
  const fullNameChecker = /^[a-zA-Z]+\s+[a-zA-Z]+$/;
  if (fullNameChecker.test(fullName.value)) {
    fnameHolder.textContent = "✅ Correct Input";
    fnameHolder.classList.remove("invalid");
    fnameHolder.classList.add("valid");
    return true;
  } else {
    fnameHolder.textContent =
      "❌ wrong Input.Please key in Name Surname. Example: Ahmed Hoca";
    fnameHolder.classList.add("invalid");
    fnameHolder.classList.remove("valid");
    return false;
  }
};

//function validate email
const emailFunction = function (email, emailHolder) {
  //validate email field. Must start with a small letter and must contain @
  const emailChecker = /^[a-z].*@/;
  if (emailChecker.test(email.value)) {
    emailHolder.textContent = "✅ Correct Input";
    emailHolder.classList.remove("invalid");
    emailHolder.classList.add("valid");
    return true;
  } else {
    emailHolder.textContent = "❌ wrong Input.Expected format: example@example";
    emailHolder.classList.remove("valid");
    emailHolder.classList.add("invalid");
    return false;
  }
};
//function validate phone
const phoneFunction = function (phone, phoneHolder) {
  const phoneChecker = /^\d{4}-\d{3}-\d{4}$/;
  if (phoneChecker.test(phone.value)) {
    phoneHolder.textContent = "✅ Correct Input";
    phoneHolder.classList.remove("invalid");
    phoneHolder.classList.add("valid");
    return true;
  } else {
    phoneHolder.textContent = "❌ wrong Input. Expected format 1234-123-1234";
    phoneHolder.classList.remove("valid");
    phoneHolder.classList.add("invalid");
    return false;
  }
};

//function validate textarea
const textareaFunction = function (textarea, textAreaHolder) {
  //validate text area. It should not be empty
  const textAreaChecker = /\S/; //at least one nonwhite space character
  if (textAreaChecker.test(textarea.value)) {
    textAreaHolder.textContent = "✅ Correct Input";
    textAreaHolder.classList.remove("invalid");
    textAreaHolder.classList.add("valid");
    return true;
  } else {
    textAreaHolder.textContent =
      "❌ Input field cannot be empty.Please fill the field.";
    textAreaHolder.classList.remove("valid");
    textAreaHolder.classList.add("invalid");
    return false;
  }
};
// Attach event listeners to the input fields
const fullName = document.getElementById("fname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const textarea = document.getElementById("textarea");
const fnameHolder = document.getElementById("fname_holder");
const emailHolder = document.getElementById("email_holder");
const phoneHolder = document.getElementById("phone_holder");
const textAreaHolder = document.getElementById("textArea_holder");
const submit = document.getElementById("submit");
const resetBtn = document.getElementById("reset");

// Attach event listeners to the input fields when focus is lost
fullName.addEventListener("focusout", function () {
  nameFunction(fullName, fnameHolder);
});

email.addEventListener("focusout", function () {
  emailFunction(email, emailHolder);
});

phone.addEventListener("focusout", function () {
  phoneFunction(phone, phoneHolder);
});

textarea.addEventListener("focusout", function () {
  textareaFunction(textarea, textAreaHolder);
});
//event listener once a user clicks the submit
submit.addEventListener("click", function (e) {
  e.preventDefault();
  const isNameValid = nameFunction(fullName, fnameHolder);
  const isEmailValid = emailFunction(email, emailHolder);
  const isPhoneValid = phoneFunction(phone, phoneHolder);
  const isTextAreaValid = textareaFunction(textarea, textAreaHolder);

  if (isNameValid && isEmailValid && isPhoneValid && isTextAreaValid)
    alert("Form submitted successfully");
  else alert("One or more inputs have Errors.Try again");
});

//reset button for the form
resetBtn.addEventListener("click", function (e) {
  e.preventDefault();
  resetFunction();
});
//reset function to change the UI
const resetFunction = function () {
  fullName.value = "";
  fnameHolder.textContent = "";

  email.value = "";
  emailHolder.textContent = "";

  phone.value = "";
  phoneHolder.textContent = "";

  textarea.value = "";
  textAreaHolder.textContent = "";
};
