import outsideClick from "./outsideClick";

const burgerButton = document.getElementById("burger") as HTMLDivElement;
const menu = document.getElementById("menu") as HTMLUListElement;

function listener() {
  if (burgerButton.classList.contains("open")) {
    menu.classList.remove("open");
    burgerButton.classList.remove("open");
  } else {
    menu.classList.add("open");
    burgerButton.classList.add("open");

    setTimeout(() => {
      outsideClick(menu, listener, burgerButton);
    }, 1000);    
  }
}

burgerButton.addEventListener("click", listener);

