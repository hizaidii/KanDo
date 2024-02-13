// new swimlane modal
const newSwimlaneBtn = document.querySelector(".addSwimlaneBtn");
const newSwimlaneBtn2 = document.querySelector(".addSwimlaneBtn2");
const newSwimlaneModal = document.querySelector(".newSwimlaneModal");
newSwimlaneBtn.addEventListener("click", (ev) => {
  newSwimlaneModal.showModal();
});
newSwimlaneBtn2.addEventListener("click", (ev) => {
  newSwimlaneModal.showModal();
});

// new board modal
const newBoardBtn = document.querySelector(".newBoardBtn");
const newBoardModal = document.querySelector(".newBoardModal");
newBoardBtn.addEventListener("click", (ev) => {
  newBoardModal.showModal();
});

// new task modal
const newTaskBtn = document.querySelector(".addTaskBtn");
const newTaskModal = document.querySelector(".newTaskModal");
newTaskBtn.addEventListener("click", (ev) => {
  newTaskModal.showModal();
});

// close modals
const closeModalButtons = document.querySelectorAll(".closeModal");
closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    modal.close();
  });
});

// delete board confirmation
const deleteBoard = document.querySelector(".deleteBoard");
const deleteModal = document.querySelector(".deleteModal");
deleteBoard.addEventListener("click", () => {
  deleteModal.showModal();
});

// delete swimlane confirmation
const deleteCol = document.querySelectorAll(".deleteCol");

deleteCol.forEach((item) => {
  item.addEventListener("click", (ev) => {
    ev.preventDefault(); // Prevent the default anchor action

    const swimlaneId = item.getAttribute("data-id");

    let modal = document.querySelector(`.deleteColumnModal[data-id="${swimlaneId}"]`);
    modal.showModal();
  });
});

// edit board modal
const editBoardBtn = document.querySelector(".editBoard");
const editBoardModal = document.querySelector(".editBoardModal");

editBoardBtn.addEventListener("click", () => {
  editBoardModal.showModal();
});

// edit swimlane modal
const editSwimlaneBtn = document.querySelectorAll(".editSwimlaneBtn");
const editSwimlaneModal = document.querySelector(".editSwimlaneModal");

editSwimlaneBtn.forEach((item) => {
  item.addEventListener("click", (ev) => {
    ev.preventDefault(); // Prevent the default anchor action

    const swimlaneId = item.getAttribute("data-id");

    let modal = document.querySelector(`.editSwimlaneModal[data-id="${swimlaneId}"]`);
    modal.showModal();
  });
});

// edit task modal
const editTaskBtn = document.querySelectorAll(".editTaskBtn");
const editTaskModal = document.querySelector(".editTaskModal");

editTaskBtn.forEach((item) => {
  item.addEventListener("click", (ev) => {
    ev.preventDefault(); // Prevent the default anchor action

    const taskId = item.getAttribute("data-id");

    let modal = document.querySelector(`.editTaskModal[data-id="${taskId}"]`);
    modal.showModal();
  });
});
