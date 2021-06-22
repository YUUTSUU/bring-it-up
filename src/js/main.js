import MainSlider from "./modules/slider/main-slider";
import MiniSlider from "./modules/slider/mini-slider";
import Player from "./modules/player";
import Difference from "./modules/difference";

window.addEventListener("DOMContentLoaded", () => {

  const mainPageSlider = new MainSlider({container: ".page", btns: ".next"});
  mainPageSlider.render();

  const showUpSlider = new MiniSlider({
    container: ".showup__content-slider",
    prev: ".showup__prev",
    next: ".showup__next",
    activeClass: "card-active",
    animate: true
  })
  showUpSlider.init();

  const modulesSlider = new MiniSlider({
    container: ".modules__content-slider",
    prev: ".modules__info-btns .slick-prev",
    next: ".modules__info-btns .slick-next",
    activeClass: "card-active",
    animate: true,
    autoPlay: true
  })
  modulesSlider.init();

  const feedSlider = new MiniSlider({
    container: ".feed__slider",
    prev: ".feed__slider .slick-prev",
    next: ".feed__slider .slick-next",
    activeClass: "feed__item-active"
  })
  feedSlider.init();

  const player = new Player(".play", ".overlay");
  player.init();

  const officerold = new Difference(".officerold", ".officer__card-item", ".officerold .plus");
  officerold.init();

  const officernew = new Difference(".officernew", ".officer__card-item", ".officernew .plus");
  officernew.init();

});