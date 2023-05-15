const outsideClick = (
  element: HTMLElement,
  switcher: Function,
  ignore: HTMLElement | null,
): void => {
  document.addEventListener("click", function listener (event) {
    if (
      event.target !== element &&
      !element.contains(event.target as HTMLElement) &&
      event.target !== ignore &&
      !ignore?.contains(event.target as HTMLElement)
    ) {
      switcher();
      document.removeEventListener("click",listener)
    }
  });
};

export default outsideClick;
