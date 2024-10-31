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
} from "./vars";
import { addColor, getFinalPrice, getRuSize } from "./common";

const getProductId = () => JSON.parse(localStorage.getItem("cardID"));

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
                    <input class="size__input" type="radio" name="size-btn">
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

  productSliderMainBtn
    ? productSliderMainBtn.addEventListener("click", updateIndexImage)
    : "";

  productSliderListItemBtn
    ? productSliderListItemBtn.addEventListener("click", updateIndexImage)
    : "";
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
