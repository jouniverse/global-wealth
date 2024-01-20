let footer = document.querySelector("footer");

let date = new Date();
let year = date.getFullYear();

footer.innerHTML = `<p id="copyright">
© Jouni Rantanen ${year}
</p>`;
