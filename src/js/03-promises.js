import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form:       document.querySelector('form.form'),
  delay:      document.querySelector('[name="delay"]'),
  step:       document.querySelector('[name="step"]'),
  amount:     document.querySelector('[name="amount"]'),
  submitBtn:  document.querySelector('button'),
}

refs.form.addEventListener('submit', runPromiseCreation);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}


function runPromiseCreation(event) {
  event.preventDefault();
  refs.submitBtn.disabled = true;

  let delayValue = Number.parseInt(refs.delay.value);
  if (delayValue < 4) {
     delayValue = 4; 
     refs.delay.value = 4;
     Notify.info("First delay should be longer than 3ms. Automatically corrected.") 
  }

  let delayStep = Number(refs.step.value);
  if (delayStep < 4) {
    delayStep = 4;
    Notify.info("Step interval should be longer than 3ms. Automatically corrected.");
  }

  let promisesAmount = Number(refs.amount.value);
  if (promisesAmount<1) {
    promisesAmount = 1;
    Notify.info("Number of steps should be one at least. Automatically corrected.");
  }
  if (promisesAmount > 100) {
    promisesAmount = 100;
    Notify.info("It's hard to fulfill so many promises! Let's cut them to 100");
  }

  setTimeout(()=>{refs.submitBtn.disabled = false}, delayValue + promisesAmount * delayStep);

  for (let i = 1; i <= promisesAmount; i++) {
    let promiseDelay = delayValue + i * delayStep;

    createPromise(i, promiseDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms. Making promises is easy!`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms. It's hard to take your word!`);
      });
  }
}