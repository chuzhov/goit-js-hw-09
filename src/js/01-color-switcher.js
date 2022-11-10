function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let interval;

function setBackgroundColor(){
    startBtn.disabled = true;
    stopBtn.disabled = false;
    interval = setInterval(()=>{
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
stopBtn.disabled = true;

startBtn.addEventListener("click", setBackgroundColor);
stopBtn.addEventListener("click", ()=>{ 
    clearInterval(interval); 
    stopBtn.disabled = true;
    startBtn.disabled = false;
});
