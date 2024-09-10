// Бургер меню
import { burgerMenuBtn } from "./src/vars";
import { openBurgerMenu } from "./src/common";

burgerMenuBtn.addEventListener("click", openBurgerMenu);
// body.addEventListener("click", closeBurgerMenu);

// обработчик событий на документ/ accordion; faqS
import { handleDocumentClick } from "./src/common";
document.addEventListener("click", handleDocumentClick);
