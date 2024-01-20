const toggle = document.querySelector(".toggle");
const navMenu = document.querySelector(".navbar");
const item = document.querySelectorAll(".item");

function toggleMenu() {
  if (navMenu.classList.contains("active-mobile")) {
    navMenu.classList.remove("active-mobile");
    navMenu.childNodes[9].style.marginLeft = "0";
  } else {
    navMenu.classList.add("active-mobile");
    navMenu.style.backgroundColor = "transparent";
    console.log(navMenu.offsetWidth);
    let width = navMenu.offsetWidth / 2;
    // magic number 42% to center the hamburger menu ?
    navMenu.childNodes[9].style.marginLeft = "42%";
  }
}

function toggleTransform() {
  toggle.classList.toggle("change");
}

toggle.addEventListener("click", () => {
  toggleMenu();
  toggleTransform();
});
