export default class Slider {
  constructor({
    container = null,
    btns = null,
    nextModule = null,
    prevModule = null,
    next = null, 
    prev = null, 
    activeClass = null, 
    animate = false, 
    autoPlay = false
  } = {}) {
    this.container = document.querySelector(container);
    try {
    this.slides = this.container.children;
    } catch(e) {}
    this.btns = document.querySelectorAll(btns);
    this.nextModule = document.querySelectorAll(nextModule);
    this.prevModule = document.querySelectorAll(prevModule);
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoPlay = autoPlay;
    this.slideIndex = 1;
  }
}