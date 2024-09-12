// для функций

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

//end

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
import { itemsToShow, carouselInner} from "./vars";
export async function loadProducts() {
  try {
      const response = await fetch('./db.json');
      if (!response.ok) {
          throw new Error('Сеть не отвечает');
      }
      const data = await response.json();
      displayProducts(data['products-catalog']);
      startCarousel(); // Запускаем карусель после загрузки продуктов
  } catch (error) {
      console.error('Ошибка загрузки данных:', error);
  }
}

function displayProducts(products) {
  products.forEach(product => {
      carouselInner.innerHTML += `
      <div class='buyNow__carousel-card'>
              <img class='buyNow__carousel-img' src='${product.picture[0]}' alt='${product.name}'/>
              <div class='buyNow__carousel-price'>
                  <span class='buyNow__carousel-currentPrice'>${product.price} ₽</span>
                  <span class='buyNow__carousel-startPrice'>${product.discount}</span>
              </div>
              <div class='buyNow__carousel-descriptinAndBasket'>
                  <p class='buyNow__carousel-description'>${product.name}</p>
                  <img class='buyNow__carousel-svgBasket' src="./src/assets/images/globalImages/header_shopping-bag-line.svg" alt='basketSvg'/>
              </div>
              <div class='buyNow__carousel-info'>
                  <button class='buyNow__carousel-thoroughBtn'>Подробнее ⟶</button>
                  <span class='buyNow__carousel-stars'>${product.rating} ★</span>
              </div>  
          </div>
      `
      ;
  });
}

function startCarousel() {
  const totalCards = document.querySelectorAll('.buyNow__carousel-card').length;
   let currentIndex = 0; // Текущий индекс для прокрутки
  
  setInterval(() => {
      currentIndex = (currentIndex + itemsToShow) % totalCards; // Обновляем индекс

      // Сдвигаем карусель
      carouselInner.style.transform = `translateX(-${(currentIndex * 100) / itemsToShow}%)`;
  }, 5000); // Интервал в 5 секунды
}

/*end*/