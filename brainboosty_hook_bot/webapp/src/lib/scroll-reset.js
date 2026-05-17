/** Не восстанавливать скролл после F5 / перезагрузки вкладки. */
export function initScrollReset() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const scrollTop = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  scrollTop();

  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      scrollTop();
    }
  });
}
