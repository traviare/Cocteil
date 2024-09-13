import { getAddress } from "./data-suggest";

//name field validation
export function nameValidation(strValue, fieldName) {
  hideHelper(fieldName);
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
    //validField[fieldName] = true;
    //inputValues[fieldName] = strValue;
    return true;
  }
  if (messageError) {
    showHelper(messageError, fieldName);
    return false;
  }
}

//email field validation
export function emailValidation(strValue) {
  hideHelper("email");
  const regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let messageError = "";
  if (!strValue.includes("@")) {
    messageError = "Электронный адрес должен содержать символ @.";
  } else if (!regexp.test(strValue)) {
    messageError = "Некорректный формат адреса электронной почты.";
  } else {
    //validField["email"] = true;
    //inputValues["email"] = strValue;
    return true;
  }
  if (messageError) {
    showHelper(messageError, "email");
    return false;
  }
}

//telephone number field validation
export function telephoneNumberValidation(strValue, inputField) {
  hideHelper("telephone");
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
    return true;
  }
  if (messageError) {
    showHelper(messageError, "telephone");
    return false;
  }
}

//address validation
export function addressValidation(strValue) {
  hideHelper("address");
  showSuggest(strValue);
  let messageError = "";
  if (!strValue.includes(" ул ")) {
    messageError = "Введите адрес с указанием улицы.";
  } else if (!strValue.includes(" д ")) {
    messageError = "Введите адрес с указанием номера дома.";
  } else {
    return true;
  }
  if (messageError) {
    showHelper(messageError, "address");
    return false;
  }
}

//show address hints
function showSuggest(strValue) {
  const datalist = document.querySelector("#suggested-addresses");
  const suggestList = Array.from(datalist.children);
  getAddress(strValue).then((suggestedAddresses) => {
    for (let i = 0; i < suggestList.length; i++) {
      suggestList[i].value = suggestedAddresses[i];
    }
  });
}

//show error messages
function showHelper(errorMsg, fieldName) {
  const curHelper = document.querySelector(`.helper--${fieldName}`);
  curHelper.textContent = "Поле заполнено некорректно." + errorMsg;
  curHelper.style.display = "block";
}

//hide error messages
export function hideHelper(fieldName) {
  const curHelper = document.querySelector(`.helper--${fieldName}`);
  curHelper.style.display = "none";
}
