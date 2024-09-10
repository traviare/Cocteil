import { deliveryInfo } from "../vars";

export function openPopupWindow(evt) {
  console.log("2");
  evt.preventDefault();
  deliveryInfo.style.display = "flex";
  
}

export function closePopupWindowClickButton(evt) {
  evt.preventDefault();
  deliveryInfo.style.display = "none";
}

export function closePopupWindowClickOutside(evt) {
  if (evt.target.className === "product__delivery-info") {
    return;
  }
  const closeWindow = evt.composedPath().includes(deliveryInfo);
  if (!closeWindow) {
    deliveryInfo.style.display = "none";
  }
}
