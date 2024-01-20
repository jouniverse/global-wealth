function triggerChangeEvent(item) {
  const event = new Event("selectedChange");
  item.dispatchEvent(event);
}

function addDropDown(
  menuItems,
  menuName,
  sectionName,
  selectedName,
  selectName
) {
  let section = document.getElementById(sectionName);
  const menu = section.querySelector(".menu");

  for (let i = 0; i < menuItems.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = menuItems[i];
    menu.appendChild(li);
  }

  const dropdowns = section.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const select = dropdown.querySelector(".select");
    const caret = dropdown.querySelector(".caret");
    const menu = dropdown.querySelector(".menu");
    const options = dropdown.querySelectorAll(".menu li");
    const selected = dropdown.querySelector(".selected");
    selected.classList.add("selected");

    select.addEventListener("click", () => {
      select.classList.toggle("select-clicked");
      caret.classList.toggle("caret-rotate");
      menu.classList.toggle("menu-open");
    });

    let selectItem = document.getElementById(selectedName);
    let selectMenu = document.getElementById(selectName);

    options.forEach((option) => {
      option.addEventListener("click", () => {
        selected.innerText = option.innerText;
        select.classList.remove("select-clicked");
        caret.classList.remove("caret-rotate");
        menu.classList.remove("menu-open");
        options.forEach((opt) => {
          opt.classList.remove("active");
        });
        option.classList.add("active");

        triggerChangeEvent(selectItem);
      });
    });
  });
}
