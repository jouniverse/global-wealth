let canvas = document.querySelector("canvas");
let parent = canvas.parentNode;
let wrapper = document.createElement("div");
wrapper.classList.add("wrapper");
parent.replaceChild(wrapper, canvas);
wrapper.appendChild(canvas);
let overlay = document.createElement("div");
overlay.classList.add("overlay");
let date = new Date();
let year = date.getFullYear();
overlay.innerHTML += `<img class="logo-img" src="./img/ubs-logo-inv.png"></img><ul class="navbar">
    <li class="item"><a href="home.html">Enter</a></li>
    </ul>
    <footer id="copyright">
    © jouniverse ${year}
    </footer>`;
parent.appendChild(overlay);

// Create mobile restriction overlay
const mobileRestriction = document.createElement("div");
mobileRestriction.classList.add("mobile-restriction");
mobileRestriction.innerHTML = `
    <h1>Desktop Only</h1>
    <p>This application is optimized for desktop viewing only. Please access this site on a device with a screen width of at least 1050px for the best experience.</p>
`;
document.body.appendChild(mobileRestriction);

// Check screen size on resize
window.addEventListener("resize", checkScreenSize);

// Initial check
function checkScreenSize() {
  if (window.innerWidth < 1050) {
    mobileRestriction.style.display = "flex";
  } else {
    mobileRestriction.style.display = "none";
  }
}

// Run initial check
checkScreenSize();
