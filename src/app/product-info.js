import {
  productInfoContainer,
  productSliderList,
  productSliderMainBtn,
  productSliderListItemBtn,
  productImageMain,
  productPrice,
  productTitle,
  productPageNavTitle,
  productArticle,
  productDescription,
  productSize,
  productColor,
  productRating,
  productShopBtn,
  productSizeErrorMessage,
} from "./vars";
import { addColor, getFinalPrice, getRuSize } from "./common";

function getProductId() {
  const url = new URLSearchParams(window.location.search);
  const getId = url.get("id");
  return getId;
}

function addProductImages(product) {
  const images = product.picture;
  productSliderList.innerHTML = "";
  images.forEach((image) => {
    const imageHTML = `
              <div class="product-slider__item">
                <img class="product-slider__item-image" src=".${image}" alt="${product.name}" />
              </div>
              `;
    productSliderList.insertAdjacentHTML("beforeend", imageHTML);
    productImageMain.src = `.${images[0]}`;
    productImageMain.alt = `${product.name}`;
  });
}

function addProductTextDescription(product) {
  productPageNavTitle.innerHTML = product.name;
  productTitle.textContent = product.name;
  productArticle.textContent = `Арт ${product.article}`;
  productDescription.textContent = product.description;
  productRating.textContent = `${product.rating} ★`;
  addProductPrice(product);
}

function addSize(product) {
  const sizes = product.size;
  sizes.forEach((size) => {
    const sizeHTML = `
                    <div class="size__select-btn">
                  <label class="size__label">
                    <input class="size__input" type="radio" name="size-btn" value="${size}">
                    <div class="size__content">
                      <span class="size__letter">${size.toUpperCase()}</span>
                      <span class="size__figure">${getRuSize(size)}</span>
                    </div>
                  </label>
                </div>
    `;
    productSize.insertAdjacentHTML("beforeend", sizeHTML);
  });
}

function addProductPrice(product) {
  if (product.discount > 0) {
    const finalPrice = getFinalPrice(product);
    const priceHTML = `
    <span class='product-price__discount'>${finalPrice} ₽</span>
    <span class='product-price__start-price'>${product.price} ₽</span>
    `;
    productPrice.insertAdjacentHTML("beforeend", priceHTML);
  } else {
    productPrice.textContent = `${product.price} ₽`;
  }
}

function addColorProduct(product) {
  const color = product.color;
  addColor(productColor, color);
}

function productImageSlider() {
  const productSliderListItemImage = document.querySelectorAll(
    ".product-slider__item-image"
  );
  let indexImage = 0;
  const imageArr = Array.from(productSliderListItemImage).map(
    (image) => image.src
  );

  function updateMainImage(index) {
    productImageMain.src = imageArr[index];
  }

  productSliderListItemImage.forEach((image, index) => {
    image.addEventListener("click", () => {
      indexImage = index;
      updateMainImage(indexImage);
    });
  });

  function updateIndexImage() {
    indexImage =
      (indexImage - 1 + productSliderListItemImage.length) %
      productSliderListItemImage.length;
    updateMainImage(indexImage);
  }

  if (productSliderMainBtn) {
    productSliderMainBtn.addEventListener("click", updateIndexImage);
  }

  if (productSliderListItemBtn) {
    productSliderListItemBtn.addEventListener("click", updateIndexImage);
  }
}

function addProductInfo(product) {
  const getProduct = product;
  addProductImages(getProduct);
  addProductTextDescription(getProduct);
  addColorProduct(getProduct);
  addSize(getProduct);
}

export function renderProductInfo(product) {
  const id = getProductId();
  const filterProduct = product.filter((product) => product.id === id);
  const getProduct = filterProduct[0];
  if (getProduct) {
    addProductInfo(getProduct);
    productImageSlider();
  } else productInfoContainer.innerHTML = "Товара не найдено";
}

function addProductInBasket() {
  const checked = document.querySelector(`input[name="size-btn"]:checked`);
  const btns = document.querySelectorAll(".size__select-btn");
  const inputs = document.querySelectorAll(`input[name="size-btn"]`);
  if (!checked) {
    btns.forEach((item) => item.classList.add("size-btn-validation"));
    productSizeErrorMessage.textContent = "Выберите размер";
  } else {
    btns.forEach((item) => item.classList.remove("size-btn-validation"));
    inputs.forEach((item) => (item.checked = false));
    productSizeErrorMessage.textContent = "";
    const value = checked.value;
    console.log(value);
  }
}

if (productShopBtn) {
  productShopBtn.addEventListener("click", addProductInBasket);
}
