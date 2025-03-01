// TOGGLE DESKTOP MENU
let toggleSubMenu;
if (document.getElementById("toggle-menu")) {
  toggleSubMenu = document.getElementById("toggle-menu");
  toggleSubMenu.addEventListener("click", (event) => {
    toggleMenu();
  });
}
let subMenu = document.getElementById("sub-menu");

function toggleMenu() {
  subMenu.classList.toggle("open-menu");
}

// CLOSE THE DESKTOP MENU IF A SUBMENU ITEM IS CLICKED
document.querySelectorAll(".sub-menu-link").forEach((n) =>
  n.addEventListener("click", () => {
    toggleMenu();
  })
);
