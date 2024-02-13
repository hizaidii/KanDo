const draggables = document.querySelectorAll(".taskCard");
const droppables = document.querySelectorAll(".eachSwimlane");

draggables.forEach((task) => {
  let orgSwimlaneId = null;
  let board = task.closest(".boardContainer");
  let boardId = board.getAttribute("data-id");

  task.addEventListener("dragstart", (ev) => {
    task.classList.add("is-dragging");
    const orgSwimlane = task.closest(".eachSwimlane");
    orgSwimlaneId = orgSwimlane.getAttribute("data-id");

    // let pickSound = document.getElementById("pickSound");
    // pickSound.play();
    // const dropSound = document.getElementById("dropSound");
    // dropSound.play();
  });
  task.addEventListener("dragend", (ev) => {
    // const dropSound = document.getElementById("dropSound");
    // dropSound.play();
    let pickSound = document.getElementById("pickSound");
    pickSound.play();

    const swimlane = task.closest(".eachSwimlane");
    const swimlaneId = swimlane.getAttribute("data-id");
    const taskId = task.getAttribute("data-id");

    // Find the index of the task's data-id within tasksInSwimlane
    const tasksInSwimlane = swimlane.querySelectorAll(".taskCard");
    // const tasksInSwimlane = swimlane.querySelectorAll(".taskCard:not(.is-dragging)");
    let newPosition = -1;
    tasksInSwimlane.forEach((taskInSwimlane, index) => {
      if (taskInSwimlane.getAttribute("data-id") === taskId) {
        newPosition = index;
        return; // exit loop once found
      }
    });

    // console.log("boardId: " + boardId, "orgSwimlaneID: " + orgSwimlaneId, "swimlaneID: " + swimlaneId, "taskID: " + taskId, "newPOsition: " + newPosition, "tasksInSwimlane: " + tasksInSwimlane.length);

    task.classList.remove("is-dragging");

    // Send a request to the server to update the task's position in the database
    axios.get(`/app/moveTask?boardId=${boardId}&orgSwimlaneId=${orgSwimlaneId}&swimlaneId=${swimlaneId}&taskId=${taskId}&newPosition=${newPosition}`);
  });
});

// end event with CRUD operation in db
droppables.forEach((swimlane) => {
  swimlane.addEventListener("dragover", (ev) => {
    ev.preventDefault();
    const bottomTask = insertAboveTask(swimlane, ev.clientY);
    const currTask = document.querySelector(".is-dragging");

    const currTaskId = currTask.getAttribute("data-id");
    const swimlaneId = swimlane.getAttribute("data-id");

    if (!bottomTask) {
      swimlane.appendChild(currTask);
    } else {
      swimlane.insertBefore(currTask, bottomTask);

      const bottomTaskId = bottomTask.getAttribute("data-id");
    }
  });
});

// helper function
const insertAboveTask = (swimlane, mouseY) => {
  const els = swimlane.querySelectorAll(".taskCard:not(.is-dragging)");
  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;
  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();
    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestTask = task;
      closestOffset = offset;
    }
  });

  return closestTask;
};
