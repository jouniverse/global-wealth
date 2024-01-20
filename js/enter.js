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
    © Jouni Rantanen ${year}
    </footer>`;
parent.appendChild(overlay);
