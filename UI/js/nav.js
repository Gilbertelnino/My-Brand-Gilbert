const navLink = document.querySelectorAll(".nav-link");
const menu = document.querySelector("#menu");
const ul = document.querySelector("ul");
const exit = document.querySelector(".exit-btn");
const openMenu = () => {
  ul.classList.toggle("hide-mobile");
};
const closeMenu = () => {
  ul.classList.add("hide-mobile");
};
menu.addEventListener("click", openMenu);
exit.addEventListener("click", closeMenu);
navLink.forEach((link) => {
  link.addEventListener("click", () => {
    ul.classList.add("hide-mobile");
    console.log("clicked");
  });
});
