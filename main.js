// Бургер меню
import { burgerMenuBtn, burgerMenu } from "./src/vars";
import { openBurgerMenu, closeBurgerMenu } from "./src/common";

burgerMenuBtn.addEventListener("click", openBurgerMenu);
burgerMenu.addEventListener("click", closeBurgerMenu);

// обработчик событий на документ/ accordion; faqS
import { handleDocumentClick } from "./src/common";
document.addEventListener("click", handleDocumentClick);

// каталог
import { loadProducts } from "./src/common";
loadProducts();
