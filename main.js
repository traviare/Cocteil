import { loadProducts } from "./src/app/database";
import {
  handlBurgerMenu,
  getCardItemIdAndAddLocalStorage,
} from "./src/app/common";
import { handleDocumentClick } from "./src/app/home-page";
import { burgerMenuBtn, burgerMenu } from "./src/app/vars";

loadProducts();

burgerMenuBtn.addEventListener("click", handlBurgerMenu);
burgerMenu.addEventListener("click", handlBurgerMenu);
document.addEventListener("click", handleDocumentClick);
document.addEventListener("click", getCardItemIdAndAddLocalStorage);
