const orderForm = document.forms.formOrder;
const { surname, telephone, index, agreement, address, email, comment } =
  orderForm.elements[0].elements;
const deliveryTypes = orderForm.elements["delivery-type"];
const payTypes = orderForm.elements["pay-type"];
const inputs = [surname, telephone, index, agreement, address, email, comment];

const validInput = {
  surname: false,
  telephone: false,
  index: false,
  agreement: false,
  address: false,
  email: false,
  deliveryType: false,
  payType: false,
};
const inputValues = {
  surname: "",
  telephone: "",
  index: "",
  agreement: "",
  address: "",
  email: "",
  comment: "",
  deliveryType: "",
  payType: "",
};
surname.addEventListener("input", changeInputData);
surname.addEventListener("focus", showHelper);
surname.addEventListener("blur", hiddenHelper);
telephone.addEventListener("input", changeInputData);
telephone.addEventListener("focus", showHelper);
telephone.addEventListener("blur", hiddenHelper);
index.addEventListener("input", changeInputData);
agreement.addEventListener("input", changeInputData);
address.addEventListener("input", changeInputData);
email.addEventListener("input", changeInputData);
email.addEventListener("focus", showHelper);
email.addEventListener("blur", hiddenHelper);
comment.addEventListener("input", changeInputData);
//orderForm.addEventListener("submit", validationForm);

payTypes.forEach((element) =>
  element.addEventListener("change", getOptionsValue)
);
deliveryTypes.forEach((element) =>
  element.addEventListener("change", getOptionsValue)
);

function changeInputData(evt) {
  console.log(evt.target.name);
  if (evt.target.value.length > 0) {
    validInput[evt.target.name] = true;
    console.log(validInput[evt.target.name]);
  }
  console.log(validInput);
}

orderForm.addEventListener("submit", validationForm);

function validationForm(evt) {
  evt.preventDefault();
  let resultFilling = true;
  for (let key in validInput) {
    resultFilling = resultFilling && validInput[key];
    console.log(validInput[key]);
  }
  console.log("отправить", resultFilling);
}

function getOptionsValue(evt) {
  inputValues[evt.target.name] = evt.target.value;
  validInput[evt.target.name] = true;
  console.log(inputValues);
}

function showHelper(evt) {
  const inputName = evt.target.name;
  evt.target.style.borderBottom = '2px solid $backgroundColorDark';
  const curHelper = document.querySelector(`.helper--${inputName}`);
  curHelper.style.display = "block";
}

function hiddenHelper(evt) {
  const inputName = evt.target.name;
  const curHelper = document.querySelector(`.helper--${inputName}`);
  curHelper.style.display = "none";
}
