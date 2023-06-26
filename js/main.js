"use strict"

//todo Находим элементы на странице

const form = document.querySelector('.form');
const formInput = document.querySelector('.form__input');
const formBtn = document.querySelector('.form__btn');
const entryFormText = document.querySelector('.entry-form-text');
const tasksList = document.querySelector('.tasks-list')
const headerText = document.querySelector('.header__text');

let tasks = [];

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'))
}

tasks.forEach( task => {
  //! Формируем CSS класс
  const cssClassBlock = task.done ? "group-item group-item--done" : "group-item";
  const cssClassText = task.done ? "group-item__text group-item--doneText" : "group-item__text";
  
  //! Формируем разметку для новой задачи
  const taskHTML = `
  <li id='${task.id}' class="${cssClassBlock}">
    <span class="${cssClassText}">${task.text}</span>
    <div class="group-item__btn">
      <button type="button" data-action="done" class="btn-action">
        <img src="img/tick.svg" alt="done" class="done">
      </button>
      <button type="button" data-action="delete" class="btn-action">
        <img src="img/cross.svg" alt="delete" class="delete">
      </button>
    </div>
  </li>`

  //! Добавляем разметку на страницу
  tasksList.insertAdjacentHTML('beforeend', taskHTML);
});

checkEmptyList();


//todo Добавление задачи
form.addEventListener('submit', addTask);

//todo Удаление задачи
tasksList.addEventListener('click', deleteTask)

//todo Отмечаем задачу завершенной
tasksList.addEventListener('click', doneTask)



//todo Функции

function addTask(event) {
  //! Отменяем отправку формы
  event.preventDefault();

  //! Достаем текст задачи из поля ввода
  const formInputText = formInput.value

  //! Описываем объект в виде задачи
  const newTask = {
    id: Date.now(),
    text: formInputText,
    done: false,
  }

  //! Добавляем задачу в массив с задачами
  tasks.push(newTask)
  
  //! Формируем CSS класс
  const cssClassBlock = newTask.done ? "group-item group-item--done" : "group-item";
  const cssClassText = newTask.done ? "group-item__text group-item--doneText" : "group-item__text";
  
  //! Формируем разметку для новой задачи
  const taskHTML = `
  <li id='${newTask.id}' class="${cssClassBlock}">
    <span class="${cssClassText}">${newTask.text}</span>
    <div class="group-item__btn">
      <button type="button" data-action="done" class="btn-action">
        <img src="img/tick.svg" alt="done" class="done">
      </button>
      <button type="button" data-action="delete" class="btn-action">
        <img src="img/cross.svg" alt="delete" class="delete">
      </button>
    </div>
  </li>`

  //! Добавляем разметку на страницу
  tasksList.insertAdjacentHTML('beforeend', taskHTML);

  //! Очищаем поле ввода и возвращаем на него фокус
  formInput.value = '';
  formInput.focus();


  //! Добавляем список задач в хранилище браузера LocalStorage
  saveLocalStorage();
  checkEmptyList();
}


function deleteTask(event) {
  //! Проверяем, что клик был по кнопке "удалить"
  if (event.target.dataset.action !== 'delete') return;

  const parentNode = event.target.closest('.group-item');
  

  //! Определяем ID задачи
  const id = parentNode.id
  
  //! Удаляем задачу из разметки
  parentNode.remove();

  //! Удаляем задачу через фильтрацию массивов
  tasks = tasks.filter((task) => task.id != id)

  //! Добавляем список задач в хранилище браузера LocalStorage
  saveLocalStorage();
  checkEmptyList();
}


function doneTask(event) {
  //! Проверяем, что клик был НЕ по кнопке "Задача выполнена"
  if (event.target.dataset.action !== 'done') return

  const parentNode = event.target.closest('.group-item');

  //! Определяем ID задачи
  const id = parentNode.id;
  const task = tasks.find( (task) => task.id == id )
  task.done = !task.done
  

  const groupItemText = parentNode.querySelector('.group-item__text');
  parentNode.classList.toggle('group-item--done');
  groupItemText.classList.toggle('group-item--doneText'); 

  //! Добавляем список задач в хранилище браузера LocalStorage
  saveLocalStorage();
}

function checkEmptyList() {
  if (tasks.length == 0) {
    const emptyListHTML = `
    <div class="header">
      <img src="img/file-1.svg" alt="logo" class="header__logo">
      <h3 class="header__text">Список дел на данный момент пуст!</h3>
    </div>`;

    tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
  }

  if (tasks.length > 0) {
    const emptyListEl = document.querySelector('.header');
    emptyListEl ? emptyListEl.remove() : null;
  }
}

function saveLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
