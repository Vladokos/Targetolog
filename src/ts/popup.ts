import outsideClick from "./outsideClick";

const popup = document.getElementById("popup") as HTMLElement;
const poup__inner = document.getElementById("poup__inner") as HTMLElement;
const closeButton = document.getElementById("close_popup");

const buttons = document.getElementsByClassName("red-round-button");

for (let i = 0; i < buttons.length - 1; i++) {
  buttons[i].addEventListener("click", () => {
    popup?.classList.toggle("active");

    outsideClick(
      poup__inner,
      () => {
        popup?.classList.remove("active");
      },
      buttons[i] as HTMLElement
    );
  });
}

buttons[buttons.length - 1].addEventListener("click", () => {
  popup?.classList.remove("active");
});
closeButton?.addEventListener("click", () => {
  popup?.classList.remove("active");
});


