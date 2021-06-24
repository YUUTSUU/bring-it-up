import Slider from "./slider";

export default class MiniSlider extends Slider {
  constructor(container, next, prev, activeClass, animate, autoPlay) {
    super(container, next, prev, activeClass, animate, autoPlay);
  }

  decorizeSlides() {
    this.slides.forEach(slide => {
      slide.classList.remove(this.activeClass);
    })

    this.slides[0].classList.add(this.activeClass);

    if (this.animate) {
      this.slides.forEach(slide => {
        slide.querySelector(".card__title").style.opacity = 0.4;
        slide.querySelector(".card__controls-arrow").style.opacity = 0;
      })
  
      this.slides[0].querySelector(".card__title").style.opacity = 1;
      this.slides[0].querySelector(".card__controls-arrow").style.opacity = 1;
    }

    this.slides.forEach(slide => {
      if (slide.tagName === "BUTTON") {
        slide.classList.remove(this.activeClass)
      }
    })
  }

  nextSlide() {
    this.slides.forEach(slide => {
      if (slide.tagName === "BUTTON") {
        this.container.appendChild(slide);
      }
    })

    this.container.appendChild(this.slides[0]);

    this.decorizeSlides();
  }

  autoPlaySlide() {
    this.slidePause = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  bindTriggers() {
    this.next.addEventListener("click", () => {
      this.nextSlide();
    });

    this.prev.addEventListener("click", () => {
      for (let i = this.slides.length - 1; i > 0; i--) {
        if (this.slides[i].tagName !== "BUTTON") {
          this.container.insertBefore(this.slides[i], this.slides[0]);

          this.decorizeSlides();
          break;
        }
      }
    });
  }

  init() {
    try {
      this.container.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        align-items: flex-start;
      `;

      this.bindTriggers();
      this.decorizeSlides();

      if (this.autoPlay) {
        this.autoPlaySlide();
  
        this.container.addEventListener("mouseenter", () => {
          clearInterval(this.slidePause);
        });
  
        this.container.addEventListener("mouseleave", () => {
          this.autoPlaySlide();
        });
      }
    } catch(e) {}
  }
}