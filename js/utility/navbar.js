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

//  TOGGLE MOBILE MENU AND SUB MENU
// MOBILE MENU
let toggleMobile = document.getElementById("mobile-logo");
let mobileMenu = document.getElementById("mobile-menu");

// MOBILE SUB MENU
let toggleMobileSub;
if (document.getElementById("toggle-mobile-sub-menu")) {
  toggleMobileSub = document.getElementById("toggle-mobile-sub-menu");
  toggleMobileSub.addEventListener("click", () => {
    toggleMobileSubMenu();
  });
}

let openMobileSubMenu;
if (document.getElementById("mobile-sub-menu")) {
  openMobileSubMenu = document.getElementById("mobile-sub-menu");
}

function toggleMobileMenu() {
  mobileMenu.classList.toggle("open-mobile-menu");
}

toggleMobile.addEventListener("click", () => {
  // CLOSE THE SUB MENU IF IT IS OPEN
  if (document.getElementById("toggle-mobile-sub-menu")) {
    if (openMobileSubMenu.classList.contains("open-mobile-sub-menu")) {
      toggleMobileSubMenu();
    }
  }
  toggleMobileMenu();
});

// TOGGLE MOBILE SUB MENU
function toggleMobileSubMenu() {
  openMobileSubMenu.classList.toggle("open-mobile-sub-menu");
}

document.querySelectorAll(".mobile-sub-menu-link").forEach((n) =>
  n.addEventListener("click", () => {
    toggleMobileMenu();
  })
);
