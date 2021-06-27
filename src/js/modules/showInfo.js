export default class ShowInfo {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
  }

  bindTriggers() {
    this.btns.forEach(btn => {
      btn.addEventListener("click", function() {
        if (this.closest(".module__info-show").nextElementSibling.style.display === "block") {
          this.closest(".module__info-show").nextElementSibling.style.display = "none";
          this.closest(".module__info-show").nextElementSibling.classList.remove("animated", "fadeIn");
        } else {
          this.closest(".module__info-show").nextElementSibling.style.display = "block";
          this.closest(".module__info-show").nextElementSibling.classList.add("animated", "fadeIn");
        }
      });
    })
  }

  init() {
    this.bindTriggers();
  }
}