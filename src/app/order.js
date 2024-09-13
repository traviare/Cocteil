import { orderForm, confirmationButton, confirmationBlock } from "../vars";
import { CartProducts, addOrderDB } from "./database";
import {
  nameValidation,
  addressValidation,
  emailValidation,
  telephoneNumberValidation,
  hideHelper,
} from "./validation-fields";

//form fields
const inputs = Array.from(orderForm.elements[0].elements);
const deliveryTypes = orderForm.elements["delivery-type"];
const payTypes = orderForm.elements["pay-type"];
const [validField, inputValues] = initializationInputsInformation();

inputs.forEach((input) => {
  input.addEventListener("input", changeInputData);
  input.addEventListener("focus", focusStyle);
  input.addEventListener("blur", blurStyle);
});

[...payTypes, ...deliveryTypes].forEach((element) =>
  element.addEventListener("change", getOptionsValue)
);

orderForm.addEventListener("submit", validationForm);
confirmationButton.addEventListener("click", createOrder);

//processing input fields
function changeInputData(evt) {
  const curField = evt.target;
  let curValue = curField.value.trim();
  const fieldName = curField.name;
  if (fieldName === "comment") {
    inputValues["comment"] = curValue;
    return;
  }

  let result = false;
  switch (fieldName) {
    case "surname":
    case "username":
    case "patronymic":
      result = nameValidation(curValue, fieldName);
      curValue = upperCaseFirst(curValue);
      break;
    case "email":
      result = emailValidation(curValue);
      break;
    case "telephone":
      result = telephoneNumberValidation(curValue, curField);
      break;
    case "address":
      result = addressValidation(curValue);
      break;
    case "agreement":
      result = true;
      hideHelper("agreement");
      break;
    default:
      break;
  }

  validField[fieldName] = result;
  inputValues[fieldName] = result ? curValue : "";
}

//validation of the entire form
function validationForm(evt) {
  evt.preventDefault();
  for (let key in inputValues) {
    if (!inputValues[key] && key !== "comment") {
      mandatoryFillingMessage(key);
    }
  }
  let resultValidation = true;
  for (let key in validField) {
    resultValidation = resultValidation && validField[key];
  }
  if (resultValidation) {
    console.log("Форма заполнена");
    orderConfirmation();
  }
}

//show order confirmation message
function orderConfirmation() {
  const orderFormBlock = document.querySelector(".order");
  orderFormBlock.style.display = "none";
  confirmationBlock.style.display = "flex";
  fillConfirmationFields();
}

//adding an order to the database
function createOrder() {
  confirmationBlock.style.display = "none";
  const messageOrder = document.querySelector(".order-message__container");
  messageOrder.style.display = "flex";
  const quantityProduct = CartProducts.getCartProducts().then((data) => {
    inputValues["order-description"] = Array.from(data);
    addOrderDB(inputValues);
    return data.length;
  });
  quantityProduct.then((quantity) => CartProducts.clearCartProduct(quantity));
  orderForm.reset();
}

//filling fields of the confirmation message
function fillConfirmationFields() {
  for (let key in inputValues) {
    if (["comment", "agreement"].includes(key)) {
      continue;
    }
    const valueField = document.querySelector(`.confirmation__value--${key}`);
    switch (inputValues[key]) {
      case "belposhta":
        valueField.textContent = "Белпочта";
        break;
      case "euromail":
        valueField.textContent = "Европочта";
        break;
      case "euromail-courier":
        valueField.textContent = "Европочта + курьер";
        break;
      case "courier-minsk":
        valueField.textContent = "Курьер г.Минск";
        break;
      case "bank-card":
        valueField.textContent = "Банковская карта";
        break;
      case "erip-pay":
        valueField.textContent = "Оплата ЕРИП";
        break;
      case "cash-on-delivery":
        valueField.textContent = "Наложенный платеж";
        break;
      default:
        valueField.textContent = inputValues[key];
        break;
    }
  }
  const valueField = document.querySelector(
    `.confirmation__value--delivery-time`
  );
  const timeDelivery = getTimeDelivery(inputValues["delivery-type"]);
  console.log(timeDelivery);
  valueField.textContent = timeDelivery;
  inputValues["delivery-time"] = timeDelivery;
}

//delivery date calculation
function getTimeDelivery(typeDelivery) {
  const optionsData = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const currentDate = new Date();
  if (typeDelivery === "courier-minsk") {
    return currentDate.toLocaleString("ru", optionsData);
  }
  currentDate.setDate(currentDate.getDate() + 3);
  return currentDate.toLocaleString("ru", optionsData);
}

//getting the value of a field with radio buttons
function getOptionsValue(evt) {
  inputValues[evt.target.name] = evt.target.value;
  validField[evt.target.name] = true;
  hideHelper(evt.target.name);
}

//message about required field completion
function mandatoryFillingMessage(fieldName) {
  hideHelper(fieldName);
  const curHelper = document.querySelector(`.helper--${fieldName}`);
  curHelper.style.display = "block";
  if (["pay-type", "delivery-type", "agreement"].includes(fieldName)) {
    return;
  }
  curHelper.textContent = "Обязательное поле для заполнения.";
}

//field input style on focus
function focusStyle(evt) {
  evt.target.style.borderBottom = "2px solid #514a7e";
  evt.target.style.color = "#514a7e";
  evt.target.style.fontSize = "20px";
  if (evt.target.name === "telephone" && evt.target.value.length === 0) {
    evt.target.value = "+";
  }
}

//field input style when focus is lost
function blurStyle(evt) {
  if (evt.target.value.length === 0 && evt.target.name !== "comment") {
    mandatoryFillingMessage(evt.target.name);
  }
  evt.target.style.borderBottom = "0.5px solid #7d7d7d";
}

//initialization of data on validation and value of input fields
function initializationInputsInformation() {
  const validInfo = {},
    inputValues = {};
  inputs.forEach((item) => {
    inputValues[item.name] = "";
    if (item.name !== "comment") {
      validInfo[item.name] = false;
    }
  });
  validInfo["delivery-type"] = false;
  validInfo["pay-type"] = false;
  inputValues["delivery-type"] = "";
  inputValues["pay-type"] = "";
  return [validInfo, inputValues];
}

//capitalize the first letter of a line
function upperCaseFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}
