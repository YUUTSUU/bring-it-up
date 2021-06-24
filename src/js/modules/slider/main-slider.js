import Slider from "./slider";

export default class MainSlider extends Slider {
  constructor(btns, nextModule, prevModule) {
    super(btns, nextModule, prevModule);
  }

  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    try {
      this.hanson.style.opacity = "0";

      if (n === 3) {
        this.hanson.classList.add("animated")
        setTimeout(() => {
          this.hanson.style.opacity = "1";
          this.hanson.classList.add("slideInUp");
        }, 3000);
      } else {
        this.hanson.classList.remove("slideInUp");
      }
    } catch(e) {}

    this.slides.forEach(slide => {
      slide.style.display = "none";
      slide.classList.add("animated", "fadeIn");
    });

    this.slides[this.slideIndex - 1].style.display = "block";
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  bindTriggers() {
    this.btns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.plusSlides(1);
      });
      
      btn.parentNode.previousElementSibling.addEventListener("click", (e) => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });

    this.nextModule.forEach(next => {
      next.addEventListener("click", (e) => {
        e.preventDefault();
        this.plusSlides(1);
      });
    });

    this.prevModule.forEach(prev => {
      prev.addEventListener("click", (e) => {
        e.preventDefault();
        this.plusSlides(-1);
      });
    });
  }

  render() {
    if (this.container) {
      try {
        this.hanson = document.querySelector(".hanson");
      } catch(e) {}
  
      this.bindTriggers();
  
      this.showSlides(this.slideIndex);
    }
  }
}