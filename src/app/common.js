import { burgerMenu, wordsDictionary } from "./vars";

export function handlBurgerMenu() {
  burgerMenu.classList.toggle("burger-menu-display");
}

export function getCardItemIdAndAddLocalStorage(event) {
  if (event.target.className === "card-item__btn") {
    const card = event.target.closest(".card-item");
    const id = card.id;
    console.log("ID выбранной кнопки:", id);
    localStorage.setItem("cardID", JSON.stringify(id));
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
