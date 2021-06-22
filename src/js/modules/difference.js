export default class Difference {
  constructor(container, cards, btns) {
    this.container = document.querySelector(container);
    this.cards = this.container.querySelectorAll(cards);
    this.btns = document.querySelector(btns);
    this.counter = 0;
  }

  hideCards() {
    this.cards.forEach((card, i) => {
      if (i !== this.cards.length - 1) {
        card.style.display = "none"
        card.classList.add("animated", "fadeIn");
      }
    });
  }

  bindTriggers() {
    this.btns.addEventListener("click", () => {
      if (this.counter !== this.cards.length - 2) {
        this.cards[this.counter].style.display = "flex";
        this.counter++;
      } else {
        this.cards[this.counter].style.display = "flex";
        this.cards[this.cards.length - 1].classList.add("animated", "fadeOut");
      }
    });
  }

  init() {
    this.hideCards();
    this.bindTriggers();
  }
}