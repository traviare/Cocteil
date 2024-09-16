// для функций

// Home page

// Бургер меню
import { burgerMenu } from "./vars";

// Появление бургер меню
export function openBurgerMenu() {
  burgerMenu.classList.remove("burger-menu-display");
}

// Закрытие бургер меню
export function closeBurgerMenu() {
  burgerMenu.classList.add("burger-menu-display");
}

// Бургер меню end

// Функции для аккордеона / faqS
const toggleAccordionItem = (item) => {
  item.classList.toggle("open");
};

const closeOtherAccordionItems = (currentItem) => {
  const openItems = document.querySelectorAll(".faqS__accordion-item.open");
  openItems.forEach((openItem) => {
    if (openItem !== currentItem) {
      openItem.classList.remove("open");
    }
  });
};

export const handleDocumentClick = (event) => {
  if (event.target.matches(".faqS__accordion-trigger")) {
    const item = event.target.closest(".faqS__accordion-item");
    toggleAccordionItem(item);
    closeOtherAccordionItems(item);
  }
};
//end faqS

// Home page end

// Страница с каталогом товаров
import { catalogJeans, catalogDress, catalogShirts } from "./vars";

export async function loadProducts() {
  try {
    const response = await fetch("../db.json");
    if (!response.ok) {
      throw new Error("Сеть не отвечает");
    }
    const data = await response.json();
    console.log(data["products-catalog"]);
    globalFunction(data["products-catalog"]);
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
}

//отображение карточки товара в каталоге
function globalFunction(products) {
  const filtrJeans = products.filter((product) => product.category == "Джинсы");
  const filtrDress = products.filter(
    (product) => product.category == "Платья и сарафаны"
  );
  const filtrShirts = products.filter(
    (product) => product.category == "Блузки и рубашки"
  );

  if (catalogJeans != null) {
    filtrJeans.forEach((jeans) => {
      catalogJeans.insertAdjacentHTML(
        "beforeend",
        `
            <div class="card-item" data-id='${jeans.id}'>
        <div class="card-item__image">
          <img src='.${jeans.picture[0]}' alt='${jeans.name}'/>
        </div>
        <div class="card-item__price">${jeans.price} ₽</div>
        <div class="card-item__info">
          <h3 class="card-item__name">${jeans.name}</h3>
          <div class="card-item__icons">
            <img src="../src/assets/images/globalImages/header_shopping-bag-line.svg" alt="" class="card-item__icon" />
          </div>
        </div>
        <div class="card-item__links">
          <button class="card-item__btn">
            <a href="#" class="card-item__link">Подробнее<img src="../src/assets/images/globalImages/card-item-arrow.svg"
                alt="" class="card-item__link-arrow" /></a>
          </button>
          <div class="card-item__rating">${jeans.rating} ★</div>
        </div>
      </div>`
      );
    });
  }

  if (catalogDress != null) {
    filtrDress.forEach((dress) => {
      catalogDress.insertAdjacentHTML(
        "beforeend",
        `
            <div class="card-item" data-id='${dress.id}'>
        <div class="card-item__image">
          <img src='.${dress.picture[0]}' alt='${dress.name}'/>
        </div>
        <div class="card-item__price">${dress.price} ₽</div>
        <div class="card-item__info">
          <h3 class="card-item__name">${dress.name}</h3>
          <div class="card-item__icons">
            <img src="../src/assets/images/globalImages/header_shopping-bag-line.svg" alt="" class="card-item__icon" />
          </div>
        </div>
        <div class="card-item__links">
          <button class="card-item__btn">
            <a href="#" class="card-item__link">Подробнее<img src="../src/assets/images/globalImages/card-item-arrow.svg"
                alt="" class="card-item__link-arrow" /></a>
          </button>
          <div class="card-item__rating">${dress.rating} ★</div>
        </div>
      </div>`
      );
    });
  }

  if (catalogShirts != null) {
    filtrShirts.forEach((shirts) => {
      catalogShirts.insertAdjacentHTML(
        "beforeend",
        `
          <div class="card-item" data-id='${shirts.id}'>
        <div class="card-item__image">
          <img src='.${shirts.picture[0]}' alt='${shirts.name}'/>
        </div>
        <div class="card-item__price">${shirts.price} ₽</div>
        <div class="card-item__info">
          <h3 class="card-item__name">${shirts.name}</h3>
          <div class="card-item__icons">
            <img src="../src/assets/images/globalImages/header_shopping-bag-line.svg" alt="" class="card-item__icon" />
          </div>
        </div>
        <div class="card-item__links">
          <button class="card-item__btn">
            <a href="#" class="card-item__link">Подробнее<img src="../src/assets/images/globalImages/card-item-arrow.svg"
                alt="" class="card-item__link-arrow" /></a>
          </button>
          <div class="card-item__rating">${shirts.rating} ★</div>
        </div>
      </div>`
      );
    });
  }
}
//сортировка товаров
// import { btnRating, btnPrice, btnDiscount, btnUpdate } from "./vars";

// export function sortRatingProducts() {}
// export function sortPriceProducts() {}
// export function sortDiscountProducts() {}
// export function sortUpdateProducts() {}

// настройка ранжирования цены
import { rangeInput, progress, priceInput } from "./vars";

// заменить на суммы с json
const priceGapMin = 1000;
const priceGapMax = 10000;

priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(priceInput[0].value);
    let maxVal = parseInt(priceInput[1].value);

    if (maxVal - minVal >= priceGap && maxVal <= priceGapMax) {
      if (e.target.className === "price-range__min") {
        rangeInput[0].value = minVal;
        progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxVal;
        progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value);
    let maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGapMin) {
      if (e.target.className === "range-input__min") {
        rangeInput[0].value = maxVal - priceGapMin;
      } else {
        rangeInput[1].value = maxVal + priceGapMin;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });
});
