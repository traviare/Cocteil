import { CartProducts } from "./database";
import {
  closePopupWindowClickButton,
  closePopupWindowClickOutside,
  openPopupWindow,
} from "./delivery-information";
import {
  deliveryCloseButton,
  totalPrice,
  productsContainer,
  totalQuantity,
} from "../vars";

//displaying products in the cart
CartProducts.getCartProducts().then((data) => {
  data.forEach((item) => addProductToContainer(item));
  calculateTotalPriceByData(data);
  calculateTotalQuantityByData(data);

  //buttons to decrease, increase and remove products from the cart
  const minusButtons = document.querySelectorAll(".product__minus-btn");
  const plusButtons = document.querySelectorAll(".product__plus-btn");
  const deleteButtons = document.querySelectorAll(".product__delete-btn");

  minusButtons.forEach((item) =>
    item.addEventListener("click", decreaseNumberProducts)
  );
  plusButtons.forEach((item) =>
    item.addEventListener("click", increaseNumberProducts)
  );
  deleteButtons.forEach((item) =>
    item.addEventListener("click", removeProduct)
  );

  //open and close popup window with delivery information
  const deliveryShowButtons = document.querySelectorAll(
    ".product__delivery-info"
  );
  deliveryShowButtons.forEach((item) => {
    item.addEventListener("click", openPopupWindow);
  });
  deliveryCloseButton.addEventListener("click", closePopupWindowClickButton);
  document.addEventListener("click", closePopupWindowClickOutside);
});

//function of displaying products in the cart
function addProductToContainer(product) {
  const totalPriceProduct = (product.price * product.quantity).toFixed(2);
  const productElement = `<div class="product">
            <div class="product__image-container">
              <img class="product__image" src="../src/assets/images/products/${product.picture}" alt="picture of product" />
            </div>
            <div class="product__description">
              <div class="product__names">
                <h2 class="product__title">${product.name}</h2>
                <p class="product__art">
                  Арт <span class="product__art-number">${product.article}</span>
                </p>
              </div>
              <div class="product__characteristics">
                <p class="product__color">
                  Цвет: <span class="product__color-value">${product.color}</span>
                </p>
                <p class="product__size">
                  Размер: <span class="product__size-value">${product.size}</span>
                </p>
              </div>
              <div class="product__quantity">
                <button class="product__button product__minus-btn">
                  <img src="../src/assets/images/minus-btn.svg" alt="icon minus" />
                </button>
                <p class="product__quantity-value">${product.quantity}</p>
                <button class="product__button product__plus-btn">
                  <img src="../src/assets/images/plus-btn.svg" alt="icon plus" />
                </button>
              </div>
                <button class="product__delete-btn">
                  <img src="../src/assets/images/delete-btn.svg" alt="icon for delete product" />Удалить
                </button>
            </div>
            <div class="product__price">
              <div>
                <h2 class="product__title">Стоимость</h2>
                <p class="product__price-value">${totalPriceProduct}</p>
              </div>
              <button class="product__delivery-info">Информация о доставке </button>
            </div>
          </div>`;
  productsContainer.insertAdjacentHTML("afterbegin", productElement);
}

//function of changing the quantity of each product on the page and in the database
function changeNumberProducts(currentButton, action) {
  const productContainer = currentButton.closest(".product");
  const quantityProduct = productContainer.querySelector(
    ".product__quantity-value"
  );
  const priceProduct = productContainer.querySelector(".product__price-value");

  CartProducts.getCartProducts()
    .then((data) => {
      // const indexProduct = getIndexProductByArticle(productItem, data);
      //let currentProduct = data[indexProduct];
      let curProduct = getCurrentProduct(productContainer, data);
      if (curProduct.quantity === 1 && action === "minus") {
        deleteProduct(productContainer, curProduct);
        return;
      }

      const parametrAction = action === "minus" ? -1 : 1;

      changeTotalPrice(parametrAction * curProduct.price);
      changeTotalQuantity(parametrAction);
      curProduct.quantity += parametrAction;
      CartProducts.changeCartProducts(curProduct, curProduct.id);

      quantityProduct.textContent =
        +quantityProduct.textContent + parametrAction;
      priceProduct.textContent = (
        curProduct.quantity * curProduct.price
      ).toFixed(2);
    })
    .catch((error) => console.log(error));
}

//function to decrease the quantity of product by 1
function decreaseNumberProducts(evt) {
  const curButton = evt.target;
  changeNumberProducts(curButton, "minus");
}

//function to increase the quantity of product by 1
function increaseNumberProducts(evt) {
  const curButton = evt.target;
  changeNumberProducts(curButton, "plus");
}

//function for delete product from page and database
function removeProduct(evt) {
  const productContainer = evt.target.closest(".product");
  CartProducts.getCartProducts()
    .then((data) => {
      const curProduct = getCurrentProduct(productContainer, data);
      deleteProduct(productContainer, curProduct);
    })
    .catch((error) => console.log(error));
}

//function to calculate the total price using data from the database
function calculateTotalPriceByData(cartData) {
  let totalValue = cartData.reduce(
    (totalValue, n) => totalValue + n.price * n.quantity,
    0
  );
  totalPrice.textContent = totalValue.toFixed(2);
}

//function to calculate the total price using change value
function changeTotalPrice(changeValue) {
  const newValue = (Number(totalPrice.textContent) + changeValue).toFixed(2);
  totalPrice.textContent = newValue;
}

//function to calculate the total quantity using data from the database
function calculateTotalQuantityByData(cartData) {
  let totalValue = cartData.reduce(
    (totalValue, n) => totalValue + n.quantity,
    0
  );
  totalQuantity.forEach((item) => (item.textContent = totalValue));
}

//function to calculate the total quantity using change value
function changeTotalQuantity(changeValue) {
  const newValue = Number(totalQuantity[0].textContent) + changeValue;
  totalQuantity.forEach((item) => (item.textContent = newValue));
}

//search function for product index in the database by article
function getCurrentProduct(productContainer, cartData) {
  const article = productContainer.querySelector(
    ".product__art-number"
  ).textContent;
  const index = cartData.findIndex((item) => item.article === article);
  return cartData[index];
}

//function of deleting a product from the page and database
function deleteProduct(productContainer, curProduct) {
  changeTotalPrice(-curProduct.price * curProduct.quantity);
  changeTotalQuantity(-curProduct.quantity);
  productContainer.remove();
  CartProducts.deleteProductFromCartProducts(curProduct.id);
}
