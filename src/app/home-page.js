import { itemsToShow, carouselInner } from "./vars";
import { renderProducts } from "./common";

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

export function displayProducts(products) {
  const filteredProducts = products.filter(
    (product) => product.discount && product.discount > 0
  );

  if (filteredProducts.length === 0) {
    carouselInner.innerHTML = "<p>Нет доступных товаров со скидкой.</p>";
    return;
  }

  renderProducts(filteredProducts, carouselInner);
}

export function startCarousel() {
  const totalCards = document.querySelectorAll(".card-item").length;
  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + itemsToShow) % totalCards;
    carouselInner.style.transform = `translateX(-${
      (currentIndex * 100) / itemsToShow
    }%)`;
  }, 5000);
}
