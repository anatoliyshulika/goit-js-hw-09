import "../styles/main.scss";
import Vimeo from "@vimeo/player";
const _ = require("lodash");

const iframePlayerRef = document.querySelector("#vimeo-player");
const player = new Vimeo(iframePlayerRef);

player.on(
  "timeupdate",
  _.throttle(function (data) {
    const { seconds } = data;
    localStorage.setItem("videoplayer-current-time", seconds);
  }, 1000)
);

window.addEventListener("load", () => {
  if (localStorage.getItem("videoplayer-current-time")) {
    player.setCurrentTime(localStorage.getItem("videoplayer-current-time"));
  }
});
