document.addEventListener("DOMContentLoaded", function () {
  // Extract boardId from URL
  const params = new URLSearchParams(window.location.search);
  const currentBoardId = params.get("boardId");

  if (currentBoardId) {
    // Query all sidebar items
    const sidebarItems = document.querySelectorAll(".sidebar-item");

    sidebarItems.forEach((item) => {
      // Check if the item's href attribute contains the current boardId
      const itemBoardId = new URLSearchParams(item.search).get("boardId");
      if (itemBoardId === currentBoardId) {
        // Add the highlight class to the matching sidebar item
        item.classList.add("menu-item-glass");
      }
    });
  } else {
    // If there is no boardId in the URL, highlight the first sidebar item
    const firstSidebarItem = document.querySelector(".sidebar-item");
    firstSidebarItem.classList.add("menu-item-glass");
  }
});

let sidebarExpandBtn = document.querySelector(".sidebar-expand-btn");

sidebarExpandBtn.addEventListener("click", function () {
  let sidebar = document.querySelector(".sidebar-master-container");
  sidebar.setAttribute("style", "display: block; transition: 0.5s;");

  let sidebarCollapseBtn = document.querySelector(".sidebar-collapse-btn");
  sidebarCollapseBtn.setAttribute("style", "display: block; transition: 0.5s;z-index: 1001;");

  this.setAttribute("style", "display: none;");
});

let sidebarCollapseBtn = document.querySelector(".sidebar-collapse-btn");

sidebarCollapseBtn.addEventListener("click", function () {
  let sidebar = document.querySelector(".sidebar-master-container");
  sidebar.setAttribute("style", "display: none; transition: 0.5s;");

  let sidebarExpandBtn = document.querySelector(".sidebar-expand-btn");
  sidebarExpandBtn.setAttribute("style", "display: block; transition: 0.5s;z-index: 1001;");

  this.setAttribute("style", "display: none;");
});
