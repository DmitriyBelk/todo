"use strict";

const showModal = document.querySelector(".show-modal");
const modalWindow = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");


showModal.addEventListener("click", () => {
  overlay.classList.toggle("hidden");
  modalWindow.classList.toggle("hidden");
});


overlay.addEventListener("click", () => {
  overlay.classList.toggle("hidden");
  modalWindow.classList.toggle("hidden");
});

document.addEventListener("keydown", (event) => {
  if (event.key == "Escape" && !modalWindow.classList.contains("hidden")) {
    overlay.classList.toggle("hidden");
    modalWindow.classList.toggle("hidden");
  }
});
