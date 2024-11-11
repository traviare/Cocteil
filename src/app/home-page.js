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
import { itemsToShow, carouselInner } from "../vars";

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
    console.log("Ошибка загрузки данных:", error);
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
    const addToCartButtons = document.querySelectorAll('.buyNow__carousel-basket');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.buyNow__carousel-card');
            const productId = card.dataset.id;
            const productName = card.dataset.name;
            const productPrice = card.dataset.price;

            // addToCart({ 
            //   id: productId,
            //   name: productName, 
            //   price: productPrice });
            addToCart({product});
        });
    });
  });
}

async function addToCart(product) {

  const fetchBasket = fetch("http://localhost:3001/basket");
  const response = await fetchBasket;
  const cart = await response.json();

  const validateProduct = cart.find((item)=> item.id === product.id);
  

  if(validateProduct){
    const newProduct = {
      ...validateProduct,
      quantity: validateProduct.quantity + 1,
    };
    fetch(`http://localhost:3001/basket/${validateProduct.id}`,{
      method:"PUT",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(newProduct),
    });
  } else{
    const newProduct = {...product, quantity:1};
    fetch(`http://localhost:3001/basket`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
  }
}

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
