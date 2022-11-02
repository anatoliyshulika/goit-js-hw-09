import "../styles/main.scss";
const flatpickr = require("flatpickr");
import Notiflix from "notiflix";

let selectedDate = 0;
let currentDate = 0;
let timerId = 0;

const datetimePickerRef = document.querySelector("#datetime-picker");
const btnStartRef = document.querySelector("[data-start]");
const btnResetRef = document.querySelector("[data-reset]");
const daysFieldRef = document.querySelector("[data-days]");
const hoursFieldRef = document.querySelector("[data-hours]");
const minutesFieldRef = document.querySelector("[data-minutes]");
const secondsFieldRef = document.querySelector("[data-seconds]");

const calendar = datetimePickerRef.flatpickr({
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  // disable: [
  //   {
  //     from: "1970-01-01",
  //     to: getCurrentDate(),
  //   },
  // ],
  time_24hr: true,
  // defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {},
});

// function getCurrentDate() {
//   const date = new Date();
//   const day = date.getDate();
//   const month = date.getMonth() + 1;
//   const year = date.getFullYear();
//   return `${year}-${month}-${day}`;
// }

datetimePickerRef.addEventListener("input", toggleDisabledAttribute);

function toggleDisabledAttribute() {
  const inputCurrentValue = datetimePickerRef.value;
  const selectedTime = Date.parse(calendar.selectedDates);
  let currentTime = new Date();
  let dateInput;
  currentTime = Date.parse(currentTime);
  const differenceTime = selectedTime - currentTime;
  if (localStorage.getItem("selected-date")) {
    const { selectDateInput, selectedDateCounter } = JSON.parse(
      localStorage.getItem("selected-date")
    );
    dateInput = selectDateInput;
  } else {
    dateInput = undefined;
  }
  if (differenceTime <= 0) {
    btnStartRef.setAttribute("disabled", "");
    Notiflix.Notify.failure("Please choose a date in the future");
  } else {
    if (inputCurrentValue !== dateInput) {
      btnStartRef.removeAttribute("disabled");
    } else {
      btnStartRef.setAttribute("disabled", "");
    }
  }
}

function resetTimer() {
  clearInterval(timerId);
  daysFieldRef.textContent = "00";
  hoursFieldRef.textContent = "00";
  minutesFieldRef.textContent = "00";
  secondsFieldRef.textContent = "00";
  localStorage.removeItem("selected-date");
}

function parseRestTime() {
  const restTimeObject = {};
  let intermediateValue = 0;
  const restTime = selectedDate - currentDate;
  const milisecondsPerDay = 86400000;
  const milisecondsPerHour = 3600000;
  const milisecondsPerMinute = 60000;
  const milisecondsPerSecond = 1000;
  restTimeObject.days = parseInt(restTime / milisecondsPerDay);
  intermediateValue = restTime % milisecondsPerDay;
  restTimeObject.hours = parseInt(intermediateValue / milisecondsPerHour);
  intermediateValue = intermediateValue % milisecondsPerHour;
  restTimeObject.minutes = parseInt(intermediateValue / milisecondsPerMinute);
  intermediateValue = intermediateValue % milisecondsPerMinute;
  restTimeObject.seconds = intermediateValue / milisecondsPerSecond;
  return restTimeObject;
}

function rendering(restTimeObject) {
  const { days, hours, minutes, seconds } = restTimeObject;
  if (days < 10) {
    daysFieldRef.textContent = "0" + days;
  } else {
    daysFieldRef.textContent = days;
  }

  if (hours < 10) {
    hoursFieldRef.textContent = "0" + hours;
  } else {
    hoursFieldRef.textContent = hours;
  }

  if (minutes < 10) {
    minutesFieldRef.textContent = "0" + minutes;
  } else {
    minutesFieldRef.textContent = minutes;
  }

  if (seconds < 10) {
    secondsFieldRef.textContent = "0" + seconds;
  } else {
    secondsFieldRef.textContent = seconds;
  }
}

function startCounting() {
  timerId = setInterval(() => {
    currentDate = new Date();
    currentDate = Date.parse(currentDate);
    let restTimeObject = parseRestTime();
    rendering(restTimeObject);
    if (selectedDate - currentDate <= 0) {
      resetTimer();
    }
  }, 1000);
}

function saveDataTolocalStorage(selectDateInput, selectedDateCounter) {
  const storageData = {};
  storageData.selectDateInput = selectDateInput;
  storageData.selectedDateCounter = selectedDateCounter;
  localStorage.setItem("selected-date", JSON.stringify(storageData));
}

btnStartRef.addEventListener("click", () => {
  selectedDate = Date.parse(calendar.selectedDates);
  startCounting();
  btnStartRef.setAttribute("disabled", "");
  saveDataTolocalStorage(datetimePickerRef.value, selectedDate);
});

btnResetRef.addEventListener("click", resetTimer);

window.addEventListener("load", () => {
  if (localStorage.getItem("selected-date")) {
    const { selectDateInput, selectedDateCounter } = JSON.parse(
      localStorage.getItem("selected-date")
    );
    datetimePickerRef.value = selectDateInput;
    selectedDate = selectedDateCounter;
    startCounting();
    btnStartRef.setAttribute("disabled", "");
  }
});
