export const clickOutside = {
  beforeMount(el, binding) {
    const ourClickEventHandler = (event) => {
      if (!el.contains(event.target) && el !== event.target) {
        binding.value();
      }
    }

    document.addEventListener('click', ourClickEventHandler)
    el._clickOutsideHandler = ourClickEventHandler
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutsideHandler)
  },
}
