import { burgerMenu, wordsDictionary } from "./vars";

export function handlBurgerMenu() {
  burgerMenu.classList.toggle("burger-menu-display");
}

function renderCardItemSize(sizes, container) {
  container.innerHTML = "";

  if (sizes) {
    sizes.forEach((size) => {
      const cardItemSizeBtnHTML = `
        <div class="size-list__select-btn">
          <label class="size-list__label">
            <input class="size-list__input" type="radio" name="size-list-btn" value="${size}">
            <div class="size-list__content">${size.toUpperCase()}</div>
          </label>
        </div>
      `;
      container.insertAdjacentHTML("beforeend", cardItemSizeBtnHTML);
    });
  }
}

export function renderProducts(products, container) {
  container.innerHTML = "";

  products.forEach((product) => {
    if (product.discount > 0) {
      const finalPrice = getFinalPrice(product);
      const productSaleHTML = `
      <div class="card-item" id='${product.id}'>
        <div class="card-item__image">
            <img src='.${product.picture[0]}' alt='${product.name}'/>
            <div class="card-item__size-list size-list-display"></div>
        </div>
        <div class="card-item__price">
          <span class='card-item__discount'>${finalPrice} ₽</span>
          <span class='card-item__start-price'>${product.price} ₽</span>
        </div>
        <div class="card-item__info-wrap">
          <div class="card-item__info">
            <h3 class="card-item__name">${product.name}</h3>
            <a href="#" class="card-item__btn">Подробнее<svg class="card-item__link-arrow" width="27" height="4" viewBox="0 0 27 4" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.3442 2.17678C26.4418 2.07915 26.4418 1.92085 26.3442 1.82322L24.7532 0.232233C24.6556 0.134602 24.4973 0.134602 24.3997 0.232233C24.302 0.329864 24.302 0.488155 24.3997 0.585786L25.8139 2L24.3997 3.41421C24.302 3.51184 24.302 3.67014 24.3997 3.76777C24.4973 3.8654 24.6556 3.8654 24.7532 3.76777L26.3442 2.17678ZM0.951172 2.25H26.1674V1.75H0.951172V2.25Z" fill="#514A7E"/>
            </svg></a>
          </div>
          <div class="card-item__info-right">
            <button class="card-item__shop-btn">
              <img src="../src/assets/images/globalImages/header_shopping-bag-line.svg" alt="" class="card-item__icon" />
            </button>
            <div class="card-item__rating">${product.rating} ★</div>
          </div>
        </div>
      </div>`;
      container.insertAdjacentHTML("beforeend", productSaleHTML);
      const cardItemID = container.querySelector(`#${product.id}`);
      const cardItemSizeList = cardItemID.querySelector(
        ".card-item__size-list"
      );
      renderCardItemSize(product.size, cardItemSizeList);
    } else {
      const productHTML = `
      <div class="card-item" id='${product.id}'>
  <div class="card-item__image">
    <img src='.${product.picture[0]}' alt='${product.name}'/>
    <div class="card-item__size-list size-list-display"></div>
  </div>
  <div class="card-item__price">${product.price} ₽</div>
  <div class="card-item__info-wrap">
  <div class="card-item__info">
    <h3 class="card-item__name">${product.name}</h3>
      <a href="#" class="card-item__btn">Подробнее<svg class="card-item__link-arrow" width="27" height="4" viewBox="0 0 27 4" xmlns="http://www.w3.org/2000/svg">
<path d="M26.3442 2.17678C26.4418 2.07915 26.4418 1.92085 26.3442 1.82322L24.7532 0.232233C24.6556 0.134602 24.4973 0.134602 24.3997 0.232233C24.302 0.329864 24.302 0.488155 24.3997 0.585786L25.8139 2L24.3997 3.41421C24.302 3.51184 24.302 3.67014 24.3997 3.76777C24.4973 3.8654 24.6556 3.8654 24.7532 3.76777L26.3442 2.17678ZM0.951172 2.25H26.1674V1.75H0.951172V2.25Z" fill="#514A7E"/>
</svg></a>
  </div>
  <div class="card-item__info-right">
      <button class="card-item__shop-btn">
      <img src="../src/assets/images/globalImages/header_shopping-bag-line.svg" alt="" class="card-item__icon" />
    </button>
    <div class="card-item__rating">${product.rating} ★</div>
  </div>
  </div>
</div>
`;
      container.insertAdjacentHTML("beforeend", productHTML);
      const cardItemID = container.querySelector(`#${product.id}`);
      const cardItemSizeList = cardItemID.querySelector(
        ".card-item__size-list"
      );
      renderCardItemSize(product.size, cardItemSizeList);
    }
  });
}

export function handlCardItemShopBtn(event) {
  if (event.target.className === "card-item__shop-btn") {
    const cardItem = event.target.closest(".card-item");
    const id = cardItem.id;
    const sizeList = cardItem.querySelector(".card-item__size-list");
    sizeList.classList.remove("size-list-display");
    setInputCheckedFalse(sizeList);
    setSizeListActiveTimer(sizeList);
    sizeList.addEventListener("click", addCardItemInBasket);
  }
}

function setInputCheckedFalse(element) {
  const findInputs = element.querySelectorAll(`input[name="size-list-btn"]`);
  findInputs.forEach((btn) => (btn.checked = false));
}

function addCardItemInBasket(event, id) {
  if (event.target.className === "size-list__input") {
    console.log(event.target.value);
  }
}

function setSizeListActiveTimer(element) {
  let time;

  function addClassList() {
    element.classList.add("size-list-display");
    element.removeEventListener("mousemove", resetTime);
  }

  function resetTime() {
    clearTimeout(time);
    time = setTimeout(addClassList, 2000);
  }

  resetTime();

  element.addEventListener("mousemove", resetTime);
}

function getCardItemId(event) {
  const card = event.target.closest(".card-item");
  const id = card.id;
  return id;
}

export function goToProductInfoPage(event) {
  if (event.target.className === "card-item__btn") {
    const id = getCardItemId(event);
    if (id) {
      window.location.href = `/pages/product-info.html?id=${id}`;
    }
  }
}

export function translateWordsEnglish(ruWordsColors, wordsDictionary) {
  const wordMap = Object.fromEntries(wordsDictionary);
  return ruWordsColors.map((word) => wordMap[word] || word);
}

export function translateWordToRussian(enWordColor, wordsDictionary) {
  const wordMap = Object.fromEntries(
    wordsDictionary.map(([ru, en]) => [en, ru])
  );
  return wordMap[enWordColor] || enWordColor;
}

export function addColor(container, ruWordsColors) {
  translateWordsEnglish(ruWordsColors, wordsDictionary).forEach((color) => {
    const colorBtnHTML = `
      <label class="color-filtr__color">
        <input type="radio" name="color" value="${color}" class="${color}">
      </label>
    `;
    container.insertAdjacentHTML("beforeend", colorBtnHTML);
  });
}

export function getFinalPrice(product) {
  return product.discount > 0
    ? product.price - (product.price * product.discount) / 100
    : product.price;
}

export function getRuSize(size) {
  switch (size) {
    case "xs":
      return 42;
    case "s":
      return 44;
    case "m":
      return 46;
    case "l":
      return 48;
    case "xl":
      return 50;
    default:
      return null;
  }
}

// Добавляем обработчик событий для кнопок "Добавить в корзину"
// const addToCartButtons = document.querySelectorAll('.buyNow__carousel-basket');
// addToCartButtons.forEach(button => {
//     button.addEventListener('click', (event) => {
//         const card = event.target.closest('.buyNow__carousel-card');
//         const productId = card.dataset.id;
//         const productName = card.dataset.name;
//         const productPrice = card.dataset.price;

//         addToCart({ id: productId, name: productName, price: productPrice });
//     });
// });

// function addToCart(product) {
//   let cart = JSON.parse(localStorage.getItem('cart')) || [];

//   // Проверяем, есть ли товар уже в корзине
//   const existingProductIndex = cart.findIndex(item => item.id === product.id);

//   if (existingProductIndex > -1) {
//       // Если товар уже есть, увеличиваем количество
//       cart[existingProductIndex].quantity += 1;
//   } else {
//       // Если товара нет, добавляем его в корзину с количеством 1
//       cart.push({ ...product, quantity: 1 });
//   }

//   // Сохраняем обновлённую корзину в localStorage
//   localStorage.setItem('cart', JSON.stringify(cart));

//   console.log(`${product.name} добавлен в корзину!`);
// }
