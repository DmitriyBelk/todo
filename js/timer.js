'use strict'

const sessionPlus = document.querySelector('.inner-session__btn-plus');
const sessionMinus = document.querySelector('.inner-session__btn-minus');
const breakPlus = document.querySelector('.inner-break__btn-plus');
const breakMinus = document.querySelector('.inner-break__btn-minus');

const numberSession = document.querySelector('.session');
const numberBreak = document.querySelector('.break');

const circle = document.querySelector('.circle');

const timeWork = document.querySelector('.time-work');
const timeBreak = document.querySelector('.time-break');
const workMinutes = document.querySelector('.time-work__minutes');
const workSeconds = document.querySelector('.time-work__seconds');
const breakMinutes = document.querySelector('.time-break__minutes');
const breakSeconds = document.querySelector('.time-break__seconds');

const audio = new Audio('/audio/onceagain.mp3');
audio.loop = true;
audio.muted = false;
const volume = document.querySelector('.volume');
const volumeOff = document.querySelector('.volume-off');

const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
const reset = document.querySelector('.reset');




let countSession = 0;
let countBreak = 0;

volume.addEventListener('click', () => {
  if (audio.muted === false) {
    volume.innerText = 'volume_off';
    audio.muted = true;
  } else {
    volume.innerText = 'volume_up';
    audio.muted = false;
  }
  })

// !Заполняем строки времени работы и перерыва
sessionPlus.addEventListener('click', () => {
  countSession += 5;
  numberSession.innerText = countSession;
  workMinutes.innerText = countSession;
})

sessionMinus.addEventListener('click', () => {
  if (countSession >= 5) {
    countSession -= 5;
    numberSession.innerText = countSession;
    workMinutes.innerText = countSession;
  }
  if (countSession == 0) workMinutes.innerText = '00';
})

breakPlus.addEventListener('click', () => {
  countBreak += 1;
  numberBreak.innerText = countBreak
  breakMinutes.innerText = countBreak;
})

breakMinus.addEventListener('click', () => {
  if (countBreak >= 1) {
    countBreak -= 1;
    numberBreak.innerText = countBreak;
    breakMinutes.innerText = countBreak;
  }
  if (countBreak == 0) breakMinutes.innerText = '00';
})

let startTimer;

//! Кнопки управления таймером

start.addEventListener('click', () => {
  if (workMinutes.innerText == '00' && workSeconds.innerText == '00') return
  start.classList.toggle('hidden')
  stop.classList.toggle('hidden')
  if(startTimer === undefined){
    startTimer = setInterval(timer, 1000)
  }
})

reset.addEventListener('click', () => {
  if (workMinutes.innerText == '00' && workSeconds.innerText == '00') return
  if (!start.classList.contains('hidden') && stop.classList.contains('hidden')) {
    workSeconds.innerText = '00'
    workMinutes.innerText = countSession
    breakSeconds.innerText = '00'
    breakMinutes.innerText = countBreak
  }
  if (start.classList.contains('hidden') && !stop.classList.contains('hidden')) {
    workSeconds.innerText = '00'
    workMinutes.innerText = countSession
    breakSeconds.innerText = '00'
    breakMinutes.innerText = countBreak
    start.classList.toggle('hidden')
    stop.classList.toggle('hidden')
  }
  if (timeWork.classList.contains('hidden')) {
    timeWork.classList.remove('hidden')
    timeBreak.classList.add('hidden')
    circle.classList.remove('timer-done')
  }
  audio.pause()
  stopInterval()
  startTimer = undefined;
})

stop.addEventListener('click', () => {
  start.classList.toggle('hidden')
  stop.classList.toggle('hidden') 
  stopInterval()
  startTimer = undefined;
})

//! Функция запуска таймера
function timer() {
  //! Обратный отсчет рабочего таймера
  if(workSeconds.innerText != 0){
      workSeconds.innerText--;
  } else if(workMinutes.innerText != 0 && workSeconds.innerText == 0){
      workSeconds.innerText = 59;
      workMinutes.innerText--;
  }
  if(workMinutes.innerText == 0 && workSeconds.innerText == 0 && countBreak == 0) stopInterval()

  //! Обратный отсчет таймера отдыха
  if(workMinutes.innerText == 0 && workSeconds.innerText == 0){
    audio.play()
    circle.classList.add('timer-done');
    timeWork.classList.add('hidden');
    timeBreak.classList.remove('hidden');
    if(breakSeconds.innerText != 0){
      audio.play()
      breakSeconds.innerText--;
    } else if(breakMinutes.innerText != 0 && breakSeconds.innerText == 0){
      breakSeconds.innerText = 59;
      breakMinutes.innerText--;
    }
  }

  if(workMinutes.innerText == 0 && workSeconds.innerText == 0 && breakMinutes.innerText == 0 && breakSeconds.innerText == 0){
    audio.pause()
    timeWork.classList.remove('hidden');
    timeBreak.classList.add('hidden');
    circle.classList.remove('timer-done');
    workMinutes.innerText = countSession;
    workSeconds.innerText = "00";
    breakMinutes.innerText = countBreak;
    breakSeconds.innerText = "00";
  }
}

//! Функция остановки таймера
function stopInterval(){
  clearInterval(startTimer);
}
