import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const flatpickrOptions = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (isPickedDateCorrect(selectedDates[0])) {
        timerBtn.disabled = false;
      }
    },
  };

  const notifyOptions = {
    width: "500px",
    timeout: 10000,
  }

let picker = flatpickr("#datetime-picker", flatpickrOptions);

const timerBtn = document.querySelector("button[data-start]");
timerBtn.addEventListener("click", runTimer)
timerBtn.disabled = true;

const face = document.querySelector("div.timer__items");

function runTimer() {
    if (isPickedDateCorrect(picker.selectedDates[0])) {
        Notify.info("The countdown is started");
        timerBtn.disabled = true;
        
        const timer = setInterval(()=>{
            let interval = picker.selectedDates[0].getTime() - Date.now();

            if (interval<=0) {
                Notify.success(`Time's up!!!`);
                clearInterval(timer);
                timerBtn.disabled = false;
                return true;
            }

            const timeRemaining = convertMs(interval);

            Object.entries(timeRemaining).forEach(([key, value], index) => {
                face.children[index].textContent = addLeadingZero(value);
                const intervalName = nameInterval(key, value, index);
                face.children[index].dataset.title = intervalName;
            });

        }, 1000);
        
    }
}

function isPickedDateCorrect(selectedDate) {
    if (selectedDate.getTime() <= Date.now()) {
        Notify.failure("Last time Moscow was burnt in September 1812! You have to chose the next date in the future!", notifyOptions);
        timerBtn.disabled = true;
        return false;
    }
    return true;
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    if (value < 10) {return String(value).padStart(2, '0')} else return value;
  }

  function nameInterval(key, value) {
    if (value !== 1) return key
    else return key.slice(0, key.length-1);
  }