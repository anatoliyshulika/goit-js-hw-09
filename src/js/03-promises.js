import "../styles/main.scss";
import Notiflix from "notiflix";

const formRef = document.querySelector(".form");
const inputDelayRef = document.querySelector("[name='delay']");
const inputStepRef = document.querySelector("[name='step']");
const inputAmountRef = document.querySelector("[name='amount']");

function startCreating(evt) {
  evt.preventDefault();
  let delay = parseInt(inputDelayRef.value);
  const step = parseInt(inputStepRef.value);
  const amount = inputAmountRef.value;
  formRef.reset();

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

formRef.addEventListener("submit", startCreating);
