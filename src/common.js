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

/*carousel*/
import { itemsToShow, carouselInner } from "./vars";

export async function loadProducts() {
  try {
    const response = await fetch("./db.json");
    if (!response.ok) {
      throw new Error("Сеть не отвечает");
    }
    const data = await response.json();
    displayProducts(data["products-catalog"]);
    startCarousel(); // Запускаем карусель после загрузки продуктов
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
}

function displayProducts(products) {
  const filteredProducts = products.filter(
    (product) => product.discount && product.discount > 0
  );

  if (filteredProducts.length === 0) {
    carouselInner.innerHTML = "<p>Нет доступных товаров со скидкой.</p>";
    return;
  }

  // Отображаем отфильтрованные продукты
  filteredProducts.forEach((product) => {
    let finalPrice =
      product.price -
      (product.price * product.discount) /
        100; /*формула для вычисления итоговой суммы товара с учетом скидки, которая указанна в json*/
    carouselInner.innerHTML += `
      <div class='buyNow__carousel-card' data-id='${product.id}' data-name='${product.name}' data-price='${finalPrice}'>
              <img class='buyNow__carousel-img' src='${product.picture[0]}' alt='${product.name}'/>
              <div class='buyNow__carousel-price'>
                  <span class='buyNow__carousel-currentPrice'>${finalPrice} ₽</span>
                  <span class='buyNow__carousel-startPrice'>${product.price} ₽</span>
              </div>
              <div class='buyNow__carousel-descriptinAndBasket'>
                  <p class='buyNow__carousel-description'>${product.name}</p>
                  <button class='buyNow__carousel-basket'><img class='buyNow__carousel-svgBasket' src="./src/assets/images/globalImages/header_shopping-bag-line.svg" alt='basketSvg'/></button>
              </div>
              <div class='buyNow__carousel-info'>
                  <button class='buyNow__carousel-thoroughBtn'>Подробнее ⟶</button>
                  <span class='buyNow__carousel-stars'>${product.rating} ★</span>
              </div>  
          </div>
      `;

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
  });
}

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

function startCarousel() {
  const totalCards = document.querySelectorAll(".buyNow__carousel-card").length;
  let currentIndex = 0; // Текущий индекс для прокрутки

  setInterval(() => {
    currentIndex = (currentIndex + itemsToShow) % totalCards; // Обновляем индекс

    // Сдвигаем карусель
    carouselInner.style.transform = `translateX(-${
      (currentIndex * 100) / itemsToShow
    }%)`;
  }, 5000); // Интервал в 5 секунды
}

/*end*/

// Home page end

// Страница с каталогом товаров
import { catalogJeans, catalogDress, catalogShirts } from "./vars";
import { btnRating, btnPrice, btnDiscount, btnUpdate } from "./vars";
// import { container } from "./vars";

export async function loadProductsCatalog() {
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


  //сортировка товаров

    // Добавляем обработчики событий для кнопок сортировки
    btnRating.addEventListener("click", () => handleSort('rating'));
    btnPrice.addEventListener("click", () => handleSort('price'));
    btnDiscount.addEventListener("click", () => handleSort('discount'));
    btnUpdate.addEventListener("click", () => handleSort('date'));

    
    
    // Функция обработки сортировки
    function handleSort(criteria) {
      //const filteredJeans = filterByCategory(products, 'Джинсы'); // или другая текущая категория
      const sortedJeans = sortProducts(filtrJeans, criteria);
      renderProducts(sortedJeans, catalogJeans);

    //const filteredDress = filterByCategory(products, 'Платья и сарафаны');
    const sortedDress = sortProducts(filtrDress, criteria);
    renderProducts(sortedDress, catalogDress);

    //const filteredShirts = filterByCategory(products, 'Блузки и рубашки');
    const sortedShirts = sortProducts(filtrShirts, criteria);
    renderProducts(sortedShirts, catalogShirts);
  }
  // Фильтрация товаров по категории
  // function filterByCategory(products, category) {
  //   return products.filter(product => product.category === category);
  // }

  function sortProducts(products, criteria) {
    if (criteria === 'rating') {
      return products.sort((a, b) => b.rating - a.rating);
    }
    
    if (criteria === 'price') {
      return products.sort((a, b) => a.price - b.price); // Для возрастания цены
    }
    
    if (criteria === 'discount') {
      return products.sort((a, b) => b.discount - a.discount);
    }
    
    if (criteria === 'date') {
      return products.sort((a, b) => new Date(b.added) - new Date(a.added));
    }
  }

  function renderProducts(products, container) {
    container.innerHTML = ''; // Очищаем контейнер перед отрисовкой

    products.forEach(product => {
      const productHTML = `
            <div class="card-item" data-id='${product.id}'>
        <div class="card-item__image">
          <img src='.${product.picture[0]}' alt='${product.name}'/>
        </div>
        <div class="card-item__price">${product.price} ₽</div>
        <div class="card-item__info">
          <h3 class="card-item__name">${product.name}</h3>
          <div class="card-item__icons">
            <img src="../src/assets/images/globalImages/header_shopping-bag-line.svg" alt="" class="card-item__icon" />
          </div>
        </div>
        <div class="card-item__links">
          <button class="card-item__btn">
            <a href="#" class="card-item__link">Подробнее<img src="../src/assets/images/globalImages/card-item-arrow.svg"
                alt="" class="card-item__link-arrow" /></a>
          </button>
          <div class="card-item__rating">${product.rating} ★</div>
        </div>
      </div>
      `;
      container.insertAdjacentHTML('beforeend', productHTML);
    });
  }

}




//сортировка товаров
// import { btnRating, btnPrice, btnDiscount, btnUpdate } from "./vars";

// export function sortProducts(products, criteria) {
//   if (criteria === 'rating') {
//     return products.sort((a, b) => b.rating - a.rating);
//   }
  
//   if (criteria === 'price') {
//     return products.sort((a, b) => a.price - b.price); 
//   }
  
//   if (criteria === 'discount') {
//     return products.sort((a, b) => b.discount - a.discount);
//   }
  
//   if (criteria === 'date') {
//     return products.sort((a, b) => new Date(b.added) - new Date(a.added));
//   }
// }

// btnRating.addEventListener("click", () => {
//   const sortedProducts = sortProducts(products, 'rating');
//   console.log(sortedProducts);
// })


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

// Страница с каталогом товаров end
