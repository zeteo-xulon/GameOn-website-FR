// Import
import { createThis } from "./utils.js";
import { inputData } from "./data.js";
import { checkboxData } from "./data.js";
import { createInput } from "./utils.js";
import { createCheckbox } from "./utils.js";


// DOM Elements
const modalbg = document.querySelector(".bground");
const modalForm = document.querySelector(".modal-body");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".btn-submit");
const navbarBtn = document.getElementById("navbarBtn");


// launch & clode modal form
const loadModal = () => { 
  modalbg.style.display = "block";
  const form = buildForm(inputData, checkboxData);
  modalForm.innerHTML = form;
}
const closeModal = () => { modalbg.style.display = "none" }


// Event Listeners``
window.addEventListener('resize', showNav)
navbarBtn.addEventListener("click", toggleNav);
modalBtn.forEach((btn) => btn.addEventListener("click", loadModal));
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-close-form")) { return closeModal() }
  if (e.target.classList.contains("btn-submit")) { return validate(e) }
});

launchingPageCheck();

// Functions

// Check if the condition to show the navbar are fulfilled, and show it if it is
function showNav(){
  let navMenu = document.getElementById("navMenu");
  if (window.innerWidth > 768) { navMenu.classList.replace("invisible", "visible") } 
  else { navMenu.classList.replace("visible", "invisible") }
}
// After the user clicked on the navbar button, toggle the visibility of the navbar
function toggleNav() {
  let navMenu = document.getElementById("navMenu");
  if (navMenu.classList.contains("invisible") === true) { 
    navMenu.classList.replace("invisible", "visible")
  } else {
    navMenu.classList.replace("visible", "invisible")
  }
}

/**
 * Launch the validation of the form when the user click on the submit button
 * It will check if the user has filled all the required fields, and if the data is valid
 * @param {*} e - Event object
 * @returns  - Alert if the form is not valid or submit the form if it is
 */
function validate(e) {
  e.preventDefault();
  const regexObject = {
    firstName: /^[a-zA-Z]{2,}$/,
    lastName: /^[a-zA-Z]{2,}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    birthdate: /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/,
    tournamentQuantity: /^[0-9]+$/
  }

  const formObject = getValue();

  if (regexObject.firstName.test(formObject.firstName) === false) {
    return alert("Le prénom doit contenir au moins 2 lettres et aucun caractère spécial");
  }
  if (regexObject.lastName.test(formObject.lastName) === false) {
    return alert("Le nom doit contenir au moins 2 lettres et aucun caractères spécial");
  }
  if (regexObject.email.test(formObject.email) === false) {
    return alert("Veuillez entrer une adresse mail valide");
  }
  if (regexObject.birthdate.test(formObject.birthdate) === false) {
    return alert("Veuillez entrer une date de naissance valide");
  }
  if (regexObject.tournamentQuantity.test(formObject.tournamentQuantity) === false) {
    return alert("Veuillez entrer un nombre de tournois entre 0 et 99");
  }
  if (formObject.location1 == false
    && formObject.location2 == false
    && formObject.location3 == false
    && formObject.location4 == false
    && formObject.location5 == false
    && formObject.location6 == false) {
    return alert("Veuillez sélectionner une ville");
  }
  if (formObject.checkbox1 == false) {
    return alert("Veuillez accepter les conditions d'utilisation");
  }
  return displayValidatedForm();

}
/**
 * Get the value of the form and return it as an object
 * @returns {object} - Object containing the value of the form
 * @example
 * {
 * firstName: "John",
 * lastName: "Doe",
 *  email: "react@gmail.com",
 * birthdate: "1990-01-01",
 * tournamentQuantity: "1",
 * location1: true,
 * location2: false,
 * location3: false,
 * location4: false,
 * location5: false,
 * location6: false,
 * checkbox1: true,
 * checkbox2: false
 * }
*/
function getValue() {
  let firstName = document.getElementById("firstname").value !== null ? document.getElementById("firstname").value : "";
  let lastName = document.getElementById("lastname").value !== null ? document.getElementById("lastname").value : "";
  let email = document.getElementById("email").value !== null ? document.getElementById("email").value : "";
  let birthdate = document.getElementById("birthdate").value !== null ? document.getElementById("birthdate").value : "";
  let tournamentQuantity = document.getElementById("tournament-quantity").value !== null ? document.getElementById("tournament-quantity").value : "";
  let location1 = document.getElementById("location1").checked;
  let location2 = document.getElementById("location2").checked;
  let location3 = document.getElementById("location3").checked;
  let location4 = document.getElementById("location4").checked;
  let location5 = document.getElementById("location5").checked;
  let location6 = document.getElementById("location6").checked;
  let checkbox1 = document.getElementById("checkbox1").checked;
  let checkbox2 = document.getElementById("checkbox2").checked;
  let objectForm = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    birthdate: birthdate,
    tournamentQuantity: tournamentQuantity,
    location1: location1,
    location2: location2,
    location3: location3,
    location4: location4,
    location5: location5,
    location6: location6,
    checkbox1: checkbox1,
    checkbox2: checkbox2
  }
  return objectForm;
}
// Will display the thanks message after the form has been validated
function displayValidatedForm() {
  const thanksContainer = createThis("div", "thanks-container", "thanksContainer", "");
  const endContainer = createThis("div", "end-container", "endContainer", "");
  const formText = createThis("p", "form-text", "formText", "Merci pour votre inscription");
  const closeFormBtn = createThis("button", "btn-close-form", "closeFormBtn", "Fermer");
  modalForm.innerHTML = "";
  modalForm.appendChild(thanksContainer);
  thanksContainer.appendChild(endContainer);
  endContainer.appendChild(formText);
  endContainer.appendChild(closeFormBtn);
}
// Early check of the website to show the navbar if the condition are fulfilled
function launchingPageCheck(){
    showNav();
}
/**
 * Create a new element for the form with the given parameters through the different objects
 * @param {Object} inputData - Object containing the data for the input fields
 * @param {Object} checkBoxData - Object containing the data for the checkbox fields
 * @returns {string} - String containing the HTML code for the form 
 */
function buildForm(inputData, checkBoxData){
  return `
  <form name="reserve">

  ${inputData.map((input) => {
    return`
      ${ createInput(input.labelFor, input.labelText, input.inputType, input.inputId, input.inputName, input.inputMinLength, input.inputRequired, input.inputMin, input.inputMax) }
  `}).join('')} 

    <p class="text-label">A quel tournoi souhaitez-vous participer cette année ?</p>

    <div class="formData">

    ${checkBoxData.map((checkBox) => {
      return` 
        ${ createCheckbox(checkBox.inputId, checkBox.inputValue, checkBox.labelFor, checkBox.labelText) } `}
    ).join('')}
  
    </div>

    <div
      class="formData">
      <input class="checkbox-input" type="checkbox" id="checkbox1" checked />
      <label class="checkbox2-label" for="checkbox1" required>
        <span class="checkbox-icon"></span>
        J'ai lu et accepté les conditions d'utilisation.
      </label>
      
      <input class="checkbox-input" type="checkbox" id="checkbox2" />
      <label class="checkbox2-label" for="checkbox2">
        <span class="checkbox-icon"></span>
        Je Je souhaite être prévenu des prochains évènements.
      </label>
      
    </div>

    <input class="btn-submit button" type="submit" value="C'est parti" />

  </form>`
}