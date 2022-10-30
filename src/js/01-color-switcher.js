import "../styles/main.scss";

let timerId;
const bodyRef = document.querySelector("body");
const btnStartRef = document.querySelector("[data-start]");
const btnStoptRef = document.querySelector("[data-stop]");

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyBackgraundColor() {
  bodyRef.style.backgroundColor = getRandomHexColor();
}

function onBtnStart() {
  timerId = setInterval(changeBodyBackgraundColor, 1000);
  btnStartRef.setAttribute("disabled", "");
  btnStoptRef.removeAttribute("disabled");
}

function onBtnStop() {
  clearInterval(timerId);
  btnStartRef.removeAttribute("disabled");
  btnStoptRef.setAttribute("disabled", "");
}

btnStartRef.addEventListener("click", onBtnStart);
btnStoptRef.addEventListener("click", onBtnStop);
