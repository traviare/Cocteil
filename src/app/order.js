import { orderForm } from "../vars";

export const deliveryTypes = orderForm.elements["delivery-type"];
export const payTypes = orderForm.elements["pay-type"];
const inputs = Array.from(orderForm.elements[0].elements);
const [validField, inputValues] = initializationInputsInformation();
const confirmationButton = document.querySelector(".confirmation__button");
const messageOrder = document.querySelector(".order-message");

const confirmationBlock = document.querySelector(".confirmation");


inputs.forEach((input) => {
  input.addEventListener("input", changeInputData);
  input.addEventListener("focus", focusStyle);
  input.addEventListener("blur", blurStyle);
});

[...payTypes, ...deliveryTypes].forEach((element) =>
  element.addEventListener("change", getOptionsValue)
);

confirmationButton.addEventListener("click", createOrder);

function createOrder(evt) {
  confirmationBlock.style.display = "none";
  messageOrder.style.display = "flex";
  orderForm.reset();
}
orderForm.addEventListener("submit", validationForm);

function changeInputData(evt) {
  const curField = evt.target;
  const curValue = curField.value.trim();
  const fieldName = curField.name;
  switch (fieldName) {
    case "surname":
    case "username":
    case "patronymic":
      nameValidation(curValue, fieldName);
      break;
    case "email":
      emailValidation(curValue);
      break;
    case "telephone":
      telephoneNumberValidation(curValue, curField);
      break;
    case "address":
      inputValues["address"] = curValue;
      validField["address"] = true;
      break;
    case "agreement":
      validField["agreement"] = inputValues["agreement"] = true;
      hiddenHelper("agreement");
      break;
    case "comment":
      inputValues["comment"] = curValue;
      break;
    default:
      break;
  }
}

function nameValidation(strValue, fieldName) {
  const regexp = /^[А-Яа-яёa-zA-Z]*$/;
  let messageError = "";
  if (strValue.length < 2 || strValue.length > 20) {
    messageError =
      "Текст должен быть не короче 2 символов. Максимальная длина текста 20 символов.";
  } else if (strValue.includes(" ")) {
    messageError = "Поле должно содежать одно слово.";
  } else if (!regexp.test(strValue)) {
    messageError =
      "Поле может содержать только буквы белорусского и латинского алфавитов.";
  } else {
    validField[fieldName] = true;
    inputValues[fieldName] = strValue;
  }
  hiddenHelper(fieldName);
  if (messageError) {
    showHelper(messageError, fieldName);
  }
}

function emailValidation(strValue) {
  const regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let messageError = "";
  if (!strValue.includes("@")) {
    messageError = "Электронный адрес должен содержать символ @.";
  } else if (!regexp.test(strValue)) {
    messageError = "Некорректный формат адреса электронной почты.";
  } else {
    validField["email"] = true;
    inputValues["email"] = strValue;
  }
  hiddenHelper("email");
  if (messageError) {
    showHelper(messageError, "email");
  }
}

function telephoneNumberValidation(strValue, inputField) {
  const regexp = /^\+[1-9]{1}\d{10,11}$/;
  let messageError = "";
  if (strValue[0] !== "+") {
    messageError = "Введите номер телефона с кодом страны.";
    inputField.value = strValue.length >= 3 ? "+" + strValue : strValue;
  } else if (/[а-яА-ЯёЁa-zA-Z]/.test(strValue)) {
    messageError = "Номер телефона может содержать только цифры.";
  } else if (!regexp.test(strValue)) {
    messageError = "Некорректный формат номера телефона.";
  } else {
    validField["telephone"] = true;
    inputValues["telephone"] = strValue;
  }
  hiddenHelper("telephone");
  if (messageError) {
    showHelper(messageError, "telephone");
  }
}

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
    console.log("Форма отправлена");
    orderConfirmation();
  }
}

function orderConfirmation() {
  const orderFormBlock = document.querySelector(".order");
  orderFormBlock.style.display = "none";
  confirmationBlock.style.display = "flex";
  fillConfirmationFields();
  //orderForm.reset();
}

function fillConfirmationFields() {
  console.log(inputValues);
  for (let key in inputValues) {
    if (["comment", "agreement"].includes(key)) {
      continue;
    }
    console.log(key);
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
}

function getOptionsValue(evt) {
  inputValues[evt.target.name] = evt.target.value;
  validField[evt.target.name] = true;
  hiddenHelper(evt.target.name);
}

function showHelper(errorMsg, fieldName) {
  const curHelper = document.querySelector(`.helper--${fieldName}`);
  curHelper.textContent = "Поле заполнено некорректно." + errorMsg;
  curHelper.style.display = "block";
}

function hiddenHelper(fieldName) {
  const curHelper = document.querySelector(`.helper--${fieldName}`);
  curHelper.style.display = "none";
}

function mandatoryFillingMessage(fieldName) {
  hiddenHelper(fieldName);
  const curHelper = document.querySelector(`.helper--${fieldName}`);
  curHelper.style.display = "block";
  if (["pay-type", "delivery-type", "agreement"].includes(fieldName)) {
    return;
  }
  curHelper.textContent = "Обязательное поле для заполнения.";
}

function focusStyle(evt) {
  evt.target.style.borderBottom = "2px solid #514a7e";
  evt.target.style.color = "#514a7e";
  evt.target.style.fontSize = "20px";
  if (evt.target.name === "telephone" && evt.target.value.length === 0) {
    evt.target.value = "+";
  }
}

function blurStyle(evt) {
  if (evt.target.value.length === 0 && evt.target.name !== "comment") {
    mandatoryFillingMessage(evt.target.name);
  }
  evt.target.style.borderBottom = "0.5px solid #7d7d7d";
}

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
