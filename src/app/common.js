import {
  burgerMenu,
  wordsDictionary,
  carouselInner,
  containerCatalog,
  productInfoContainer,
} from "./vars";
import { displayProducts, startCarousel } from "./home-page";
import { loadProductCatalog } from "./catalog-page";
import { renderProductInfo } from "./product-info";
import { CartProducts, getProductsCatalog } from "./database";

export async function loadProducts() {
  try {
    const response = await fetch("/db.json");
    if (!response.ok) {
      throw new Error("Сеть не отвечает");
    }
    const data = await response.json();
    if (data["products-catalog"].length > 0) {
      if (carouselInner) {
        displayProducts(data["products-catalog"]);
        startCarousel();
      }

      if (containerCatalog) {
        loadProductCatalog(data["products-catalog"]);
      }

      if (productInfoContainer) {
        renderProductInfo(data["products-catalog"]);
      }
    }
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
}

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
            <img src='../src/assets/images/cardImages/${product.picture[0]}' alt='${product.name}'/>
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
    <img src='../src/assets/images/cardImages/${product.picture[0]}' alt='${product.name}'/>
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
    sizeList.addEventListener("click", hadleCardItemBasketBtn);
  }
}

function setInputCheckedFalse(element) {
  const findInputs = element.querySelectorAll(`input[name="size-list-btn"]`);
  findInputs.forEach((btn) => (btn.checked = false));
}

function hadleCardItemBasketBtn(event) {
  if (event.target.className === "size-list__input") {
    const checkedSize = event.target.value.toUpperCase();
    const id = getCardItemId(event);
    addProductInBasket(checkedSize, id);
  }
}

export function addProductInBasket(checkedSize, id) {
  if (checkedSize) {
    CartProducts.getCartProducts().then((data) => {
      const validateProduct = data.find(
        (item) => item.id === id && item.size === checkedSize
      );
      if (validateProduct) {
        const newProduct = {
          ...validateProduct,
          quantity: validateProduct.quantity + 1,
        };
        fetch(`http://localhost:3001/cart/${validateProduct.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        });
      } else {
        getProductsCatalog().then((catalog) => {
          const product = catalog.find((item) => item.id === id);
          const price = getFinalPrice(product);
          const newProduct = {
            id: id,
            name: product.name,
            article: product.article,
            color: product.color[0],
            size: checkedSize,
            price: price,
            picture: product.picture[0],
            quantity: 1,
          };
          fetch(`http://localhost:3001/cart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
          });
        });
      }
    });
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
