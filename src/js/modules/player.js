export default class Player {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector(".close");
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  bindTriggers() {
    this.btns.forEach((btn, i) => {
      try {
        const blockedItem = btn.closest(".module__video-item").nextElementSibling;

        if (i % 2 == 0) {
          blockedItem.setAttribute("data-disabled", "false");
        }
      } catch(e) {}

      btn.addEventListener("click", () => {
        if (!btn.closest(".module__video-item") || 
            btn.closest(".module__video-item").getAttribute("data-disabled") !== "false") {

          this.activeBtn = btn;

          if (document.querySelector("iframe#frame")) {
            this.overlay.style.display = "flex";
            if (this.path !== btn.getAttribute("data-url")) {
              this.path = btn.getAttribute("data-url");
              this.player.loadVideoById({videoId: this.path});
            }
          } else {
            this.overlay.style.display = "flex";
            this.path = btn.getAttribute("data-url");
            this.createPlayer(this.path);
          }
        }     
      });
    });
  }

  bindClose() {
    this.close.addEventListener("click", () => {
      this.overlay.style.display = "none";
      try {
        this.player.stopVideo();
      } catch(e) {}
    });

    this.overlay.addEventListener("click", (event) => {
      if (event.target === this.overlay) {
        this.overlay.style.display = "none";
        this.player.stopVideo();
      }
    });
  }

  createPlayer(url) {
    try {
      this.player = new YT.Player('frame', {
        height: '100%',
        width: '100%',
        videoId: `${url}`,
        events: {
          'onStateChange': this.onPlayerStateChange
        }
      });
    } catch(e) {}
  }

  onPlayerStateChange(event) {
    try {
      const blockedItem = this.activeBtn.closest(".module__video-item").nextElementSibling;
      const playIcon = this.activeBtn.querySelector("svg").cloneNode(true);

      if (event.data === 0) {
        if (blockedItem.querySelector(".play__circle").classList.contains("closed")) {
          blockedItem.querySelector(".play__circle").classList.remove("closed");
          blockedItem.querySelector(".play__circle svg").remove();
          blockedItem.querySelector(".play__circle").appendChild(playIcon);

          blockedItem.querySelector(".play__text").classList.remove("attention");
          blockedItem.querySelector(".play__text").textContent = "play video"

          blockedItem.style.opacity = 1;
          blockedItem.style.filter = "none";

          blockedItem.setAttribute("data-disabled", "true");
        }
      }
    } catch(e) {}
  }

  init() {
    if (this.btns.length > 0) {
      const tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      this.bindTriggers();
      this.bindClose();
    }
  }
}