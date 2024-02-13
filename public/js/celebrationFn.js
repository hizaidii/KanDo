const celebrateButtons = document.querySelectorAll(".celebrate-btn");

celebrateButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Deleting the task first, via axios request
    const taskId = this.getAttribute("data-task-id");
    const swimlaneId = this.getAttribute("data-swimlane-id");
    const boardId = this.getAttribute("data-board-id");

    const url = `/app/board/deleteTask?taskId=${taskId}&swimlaneId=${swimlaneId}&boardId=${boardId}`;

    axios
      .get(url)
      .then(function (response) {
        // Remove the task card from the DOM
        const taskCard = button.closest(".taskCard");
        if (taskCard) {
          taskCard.remove();
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    // Continue with the celebration animation
    // Play celebration sound
    document.getElementById("celebrationSound").play();

    // Show the unicorn, start animation
    const unicorn = document.getElementById("unicorn");
    unicorn.style.display = "block";

    // Automatically hide the unicorn after animation ends (2 seconds)
    setTimeout(() => {
      unicorn.style.display = "none";
    }, 2300); // Adjust to match the animation duration

    // Generate confetti (using canvas-confetti library)
    var confetti = window.confetti;
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Optionally, clear confetti after a set duration
    setTimeout(() => {
      // Clear method depends on how confetti is implemented
    }, 2000);
  });
});
