// Import
import { createThis, createInput, createCheckbox } from "./utils.js";
import { inputData, checkboxData } from "./data.js";


// DOM Elements
const modalbg = document.querySelector(".bground");
const modalForm = document.querySelector(".modal-body");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close");
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

// FUNCTIONS

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
 * If the form is not valid, it will display an error message in the form
 * If the form is valid, it will display a success message in the form
 * To double check, it will also create an array of the data entered by the user and compare it with the model from formObject
 * Every time its wrong, it will display an error message in the form
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
    tournamentQuantity: /^0|[1-9][0-9]*$/,
  }
  const formObject = getValue();
  let validInputs = [];
  let inputIsValide = true;
  const inputArray = [
    { regex: regexObject.firstName, value: formObject.firstName,
    id: "firstname", error: "Veuillez entrer 2 caractères ou plus pour le champ du nom." },
    { regex: regexObject.lastName, value: formObject.lastName,
    id: "lastname", error: "Veuillez entrer 2 caractères ou plus pour le champ du prénom." },
    { regex: regexObject.email, value: formObject.email,
    id: "email", error: "Vous devez entrer une adresse email valide." },
    { regex: regexObject.birthdate, value: formObject.birthdate,
    id: "birthdate", error: "Vous devez entrer votre date de naissance." },
    { regex: regexObject.tournamentQuantity, value: formObject.tournamentQuantity,
    id: "tournament-quantity", error: "Vous devez entrer un nombre." }];

  inputArray.forEach((input) => {
    inputIsValide = true;
    if (input.regex.test(input.value) === false) { 
      inputIsValide = false;
      return displayError(input.id, input.error) 
    } else { 
      resetOrRemoveError(input.id)
      validInputs.push(input.id) 
    }
  })
  if (inputIsValide === false) { return }
  let checkboxIsValide = false;
  const checkboxArray = [ formObject.location1, formObject.location2, formObject.location3, formObject.location4, formObject.location5, formObject.location6 ];
  checkboxArray.forEach(checkbox => checkbox ? checkboxIsValide = true : "" )

  if (!checkboxIsValide) {
    const locationContainer = document.getElementById('error-location');
    return locationContainer.innerText = "Vous devez choisir une option.";
  } else { 
    const locationContainer = document.getElementById('error-location');
    locationContainer.innerText = "" }

  if (formObject.checkbox1 == false) {
    const rulesContainer = document.getElementById('error-rules');
    return rulesContainer.innerText = "Vous devez vérifier que vous acceptez les termes et conditions.";
  } else { 
    const rulesContainer = document.getElementById('error-rules');
    rulesContainer.innerText = "" }

  // verify if all the inputs are valid before submitting the form, kind of a double check
  if(inputIsValide && validInputs.length === inputArray.length) {
    return displayValidatedForm();
  } else { 
    const errorContainer = document.getElementById('error-all');
    return errorContainer.innerText = "Veuillez remplir tous les champs correctement." }
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
  const firstName = document.getElementById("firstname").value !== null ? document.getElementById("firstname").value : "";
  const lastName = document.getElementById("lastname").value !== null ? document.getElementById("lastname").value : "";
  const email = document.getElementById("email").value !== null ? document.getElementById("email").value : "";
  const birthdate = document.getElementById("birthdate").value !== null ? document.getElementById("birthdate").value : "";
  const tournamentQuantity = document.getElementById("tournament-quantity").value !== null ? document.getElementById("tournament-quantity").value : "";
  const location1 = document.getElementById("location1").checked;
  const location2 = document.getElementById("location2").checked;
  const location3 = document.getElementById("location3").checked;
  const location4 = document.getElementById("location4").checked;
  const location5 = document.getElementById("location5").checked;
  const location6 = document.getElementById("location6").checked;
  const checkbox1 = document.getElementById("checkbox1").checked;
  const checkbox2 = document.getElementById("checkbox2").checked;
  const objectForm = {
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
/**
 * If the input from the form is not valid, display the error message
 * @param {String} name  - Name of the input field
 * @param {String} message  - Message to display
 * @example
 * displayError("firstname", "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
 */
function displayError(name, message) {
  const errorContainer = document.getElementById("error-"+name);
  const inputContainer = document.getElementById(name);
  inputContainer.classList.add("error-visible");
  errorContainer.innerText = message;
}
/**
 * If the input from the form is valid, reset or remove the error message
 * @param {String} name  - Name of the input field
 * @param {String} message  - Message to display
 * @example
 * resetOrRemoveError("firstname");
*/
function resetOrRemoveError(name) {
  const errorContainer = document.getElementById("error-"+name);
  const inputContainer = document.getElementById(name);
  inputContainer.classList.remove("error-visible");
  errorContainer.innerText = "";
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
  
      <p class="error-message" id="error-location"></p>
    </div>

    <div
      class="formData">
      <input class="checkbox-input" type="checkbox" id="checkbox1" checked />
      <label class="checkbox2-label" for="checkbox1" required>
        <span class="checkbox-icon"></span>
        J'ai lu et accepté les conditions d'utilisation.
      </label>
      <p class="error-message" id="error-rules"></p>
      
      <input class="checkbox-input" type="checkbox" id="checkbox2" />
      <label class="checkbox2-label" for="checkbox2">
        <span class="checkbox-icon"></span>
        Je Je souhaite être prévenu des prochains évènements.
      </label>
      <p class="error-message" id="error-all"></p>
    </div>

    <input class="btn-submit button" type="submit" value="C'est parti" />

  </form>`
}