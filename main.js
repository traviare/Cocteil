// Бургер меню
import { burgerMenuBtn, burgerMenu } from "./src/vars";
import { handlBurgerMenu } from "./src/common";

burgerMenuBtn.addEventListener("click", handlBurgerMenu);
burgerMenu.addEventListener("click", handlBurgerMenu);

// обработчик событий на документ/ accordion; faqS
import { handleDocumentClick } from "./src/app/home-page";
document.addEventListener("click", handleDocumentClick);

//Автоматическая прокрутка карусели
// import { loadProducts } from "./src/app/home-page";
// document.addEventListener("DOMContentLoaded", loadProducts);

// отображение товаров в каталоге
// import { loadProductsCatalog } from "./src/app/catalog-page";
// loadProductsCatalog();
