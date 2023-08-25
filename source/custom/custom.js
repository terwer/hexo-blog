/**
 * 自定义js
 *
 * @author terwer
 */
$(document).ready(function () {
    console.log("hello")
    const navbarEnd = document.querySelector(".navbar-end");

    const newLink = document.createElement("a");
    newLink.classList.add("navbar-item");
    newLink.setAttribute("title", "Toggle Dark Mode");
    newLink.addEventListener("click", toggleDarkMode);

    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-moon");

    newLink.appendChild(icon);
    navbarEnd.appendChild(newLink);

    function toggleDarkMode() {
        const htmlElement = document.documentElement;
        const currentMode = htmlElement.getAttribute('data-theme-mode');

        if (currentMode && currentMode === 'dark') {
            htmlElement.setAttribute('data-theme-mode', 'light');
        } else {
            htmlElement.setAttribute('data-theme-mode', 'dark');
        }
    }
});