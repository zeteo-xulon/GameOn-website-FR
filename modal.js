// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".btn-submit");

// launch & clode modal form
const launchModal = () => { modalbg.style.display = "block" }
const closeModal = () => { modalbg.style.display = "none" }

// Event Listeners
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.addEventListener("click", closeModal);
submitBtn.addEventListener("click", (e)=> validate(e));
window.addEventListener("click", (e) => { 
  if(e.target.className === "btn-close-form" ){ return closeModal() }
});

function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") { x.className += " responsive" } 
  else { x.className = "topnav" }
}

function validate(e){
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
function getValue(){
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
function displayValidatedForm(){
  const modalContent = document.querySelector(".modal-body");
  const formText = createThis("p", "form-text", "formText", "Merci pour votre inscription");
  const closeFormBtn = createThis("button", "btn-close-form", "closeFormBtn", "Fermer");
  modalContent.innerHTML = "";
  modalContent.appendChild(formText);
  modalContent.appendChild(closeFormBtn);
}
function createThis(type, classname, id, text){
  let element = document.createElement(type);
  element.className = classname;
  element.id = id;
  element.innerHTML = text;
  return element;
}