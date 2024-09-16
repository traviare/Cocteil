// Бургер меню
import { burgerMenuBtn, burgerMenu } from "./src/vars";
import { openBurgerMenu, closeBurgerMenu } from "./src/common";

burgerMenuBtn.addEventListener("click", openBurgerMenu);
burgerMenu.addEventListener("click", closeBurgerMenu);

// обработчик событий на документ/ accordion; faqS
import { handleDocumentClick } from "./src/common";
document.addEventListener("click", handleDocumentClick);

// Автоматическая прокрутка карусели
import { loadProducts } from "./src/common";
document.addEventListener("DOMContentLoaded", loadProducts);

//отображение товаров в каталоге
import { loadProductsCatalog } from "./src/common";
loadProductsCatalog();
