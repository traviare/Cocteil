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
