import "../styles/main.scss";
const _ = require("lodash");
const feedbackFormState = {
  email: "",
  message: "",
};

let getElementRef = (selector) => document.querySelector(selector);
const formRef = document.querySelector(".feedback-form");
formRef.addEventListener(
  "input",
  _.throttle((evt) => {
    if (evt.target.name === "email" && evt.target.value !== "") {
      feedbackFormState.email = evt.target.value;
    }
    if (evt.target.name === "message" && evt.target.value !== "") {
      feedbackFormState.message = evt.target.value;
    }
    localStorage.setItem(
      "feedback-form-state",
      JSON.stringify(feedbackFormState)
    );
  }, 500)
);

formRef.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (localStorage.getItem("feedback-form-state")) {
    const storageItem = JSON.parse(localStorage.getItem("feedback-form-state"));
    console.log(storageItem);
    localStorage.removeItem("feedback-form-state");
    getElementRef('[name="email"]').value = "";
    getElementRef('[name="message"]').textContent = "";
  }
});

window.addEventListener("load", () => {
  if (localStorage.getItem("feedback-form-state")) {
    const { email, message } = JSON.parse(
      localStorage.getItem("feedback-form-state")
    );
    feedbackFormState.email = email;
    feedbackFormState.message = message;
    if (email !== "") {
      getElementRef('[name="email"]').value = email;
    }
    if (message !== "") {
      getElementRef('[name="message"]').textContent = message;
    }
  }
});
