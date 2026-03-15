// LOAD SAVED THEME + ACCENT ON EVERY PAGE

window.addEventListener("DOMContentLoaded", () => {

const savedAccent = localStorage.getItem("accentColor");
const savedTheme = localStorage.getItem("theme");

if(savedAccent){

document.documentElement.style.setProperty('--accent', savedAccent);
document.documentElement.style.setProperty('--accent-soft', savedAccent + "22");

}

if(savedTheme === "dark"){
document.body.classList.add("dark");
}

});