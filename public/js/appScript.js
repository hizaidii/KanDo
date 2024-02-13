// new board modal
const newBoardBtn = document.querySelector(".newBoardBtn");
const newBoardModal = document.querySelector(".newBoardModal");
newBoardBtn.addEventListener("click", (ev) => {
  newBoardModal.showModal();
});

// new board modal 2
// const newBoardBtn2 = document.querySelector(".newBoardBtn2");
// const newBoardModal2 = document.querySelector(".newBoardModal2");
// newBoardBtn2.addEventListener("click", (ev) => {
//   newBoardModal2.showModal();
// });

// close modals
const closeModalButtons = document.querySelectorAll(".closeModal");
closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    modal.close();
  });
});

//date and time function

document.addEventListener("DOMContentLoaded", function () {
  function updateDateTime() {
    const now = new Date();

    const options = { weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: true };

    const formattedDateTime = now.toLocaleDateString("en-US", options);

    document.getElementById("currentDateTime").textContent = formattedDateTime;

    if (now.getHours() < 12) {
      document.querySelector(".greeting").textContent = "Good Morning, ";
    } else if (now.getHours() < 18) {
      document.querySelector(".greeting").textContent = "Good Afternoon, ";
    } else {
      document.querySelector(".greeting").textContent = "Good Evening, ";
    }
  }

  updateDateTime();
  setInterval(updateDateTime, 60000);
});
