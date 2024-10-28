// для переменных

/*Dasha*/
export const databaseAddress = "http://localhost:3001";
export const deliveryCloseButton = document.querySelector(
  ".delivery-message__close-button"
);
export const deliveryInfo = document.querySelector(".delivery-message");
export const productsContainer = document.querySelector(".shopping-cart");
export const totalQuantity = document.querySelectorAll(".total-quantity");
export const totalPrice = document.querySelector(".total-info__total-price");
export const buyButton = document.querySelector(".shopping-cart__button");
export const orderForm = document.forms.formOrder;
export const confirmationButton = document.querySelector(
  ".confirmation__button"
);
export const confirmationBlock = document.querySelector(".confirmation");
/*end*/

/*Violetta*/
// бургер меню
export const burgerMenuBtn = document.querySelector(".menu-btn");
export const burgerMenu = document.querySelector(".burger-menu");

// ранжирование цены
export const rangeInputs = document.querySelectorAll(".range-input input");
export const rangeValue = document.querySelector(
  ".price-range__slider-progress"
);
export const priceInputs = document.querySelectorAll(
  ".price-range__inputs input"
);
//каталог товаров
export const catalogJeans = document.querySelector(".product-catalog-jeans");
export const catalogDress = document.querySelector(".product-catalog-dress");
export const catalogShirts = document.querySelector(".product-catalog-shirts");

export const container = document.querySelector(".product-catalog");

export const productsSort = document.querySelector(".products-sort");
export const btnRating = document.querySelector(".products-sort__btn-rating");
export const btnPrice = document.querySelector(".products-sort__btn-price");
export const btnDiscount = document.querySelector(
  ".products-sort__btn-discount"
);

export const sizeFilterWrap = document.querySelector(".size-filtr__wrap");
export const colorFilterWrap = document.querySelector(".color-filtr__wrap");
export const priceFilterWrap = document.querySelector(".price-range__wrap");
export const sizeFilter = document.querySelector(".size-filtr");
export const colorFilter = document.querySelector(".color-filtr");
export const btnRange = document.querySelector(".btn-price");
export const btnSize = document.querySelector(".btn-size");
export const btnColor = document.querySelector(".btn-color");

export const selectedBtnRating = document.querySelector(
  `button[name="rating"]`
);
export const selectedBtnPrice = document.querySelector(`button[name="price"]`);
export const selectedBtnDiscount = document.querySelector(
  `button[name="discount"]`
);
export const selectedBtnDate = document.querySelector(`button[name="date"]`);

export const btnFilter = document.querySelector(".product-filtr__btn");
export const productFilters = document.querySelector(".product-filtr");

export const pageNavBtnSort = document.querySelector(
  ".catalog-page-nav__btn-sort"
);
export const pageNavBtnFilter = document.querySelector(
  ".catalog-page-nav__btn-filter"
);

/*end*/

/*Alice*/
export const itemsToShow = 3; // Количество карточек для отображения
export const carouselInner = document.querySelector(".buyNow__carousel-inner");
/*end*/
