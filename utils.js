// Create HTML elements

/**
 * A function called to create an HTML element
 * @param {String} type - Type of the element to create 
 * @param {String} classname - Class of the element to create 
 * @param {Stirng} id - Id of the element to create
 * @param {String} text - Text of the element to create
 * @returns An HTML element created with the parameters defined
 */
export function createThis(type, classname, id, text){
    let element = document.createElement(type);
    element.className = classname;
    element.id = id;
    element.innerHTML = text;
    return element;
  }

  /**
 * A function called to create an input with a label and a div wrapper
 * @param {String} labelFor - For attribute of the label
 * @param {String} labelText - Text of the label
 * @param {String} inputType - Type of the input
 * @param {String} inputId - Id of the input
 * @param {String} inputName - Name of the input
 * @param {String} inputMinLength - Min length of the input
 * @param {Boolean} inputRequired - Is the input required
 * @param {Stirng} inputMin - Min value of the input
 * @param {String} inputMax - Max value of the input
 * @returns The html code of the input customized through the parameters
 */
export function createInput(labelFor, labelText, inputType, inputId, inputName, inputMinLength, inputRequired, inputMin, inputMax) {
    return `
    <div class="formData" id="${"formData_"+inputName}">
      <label for="${labelFor}">${labelText}</label>
      <input 
      type="${inputType}" 
      class="text-control error-invisible" 
      id="${inputId}" 
      name="${inputName}" 
      ${inputMinLength !== "" ? "minlength=" + inputMinLength : "" } 
      ${inputRequired !== "" ? "required" : "" }
      ${inputMin !== "" ? "min=" + inputMin : "" }
      ${inputMax !== "" ? "max=" + inputMax : "" }
      />
      <p class="error-message" id="${"error-"+inputName}"></>
    </div>
    `
  }

/**
 * A function called to create a checkbox with a label and a div wrapper
 * @param {String} inputId - Id of the input
 * @param {String} inputValue - Value of the input
 * @param {String} labelFor - For attribute of the label
 * @param {String} labelText - Text of the label
 * @returns The html code of the checkbox customized through the parameters
*/
export function createCheckbox(inputId, inputValue, labelFor, labelText) {
  return `
    <input class="checkbox-input" type="radio" id="${inputId}" name="location" value="${inputValue}" />
    <label class="checkbox-label" for="${labelFor}">
        <span class="checkbox-icon"></span>
        ${labelText}
    </label>
  `;
}
