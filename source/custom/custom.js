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

    function toggleDarkMode(currentMode) {
        const htmlElement = document.documentElement;
        if (!currentMode) {
            currentMode = htmlElement.getAttribute('data-theme-mode');
        }

        if (currentMode && currentMode === 'dark') {
            htmlElement.setAttribute('data-theme-mode', 'light');
        } else {
            htmlElement.setAttribute('data-theme-mode', 'dark');
        }
    }

    // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //     console.log("当前系统是暗色模式")
    //     const htmlElement = document.documentElement;
    //     htmlElement.setAttribute('data-theme-mode', 'dark');
    // } else {
    //     console.log("当前系统是浅色模式")
    //     const htmlElement = document.documentElement;
    //     htmlElement.setAttribute('data-theme-mode', 'light');
    // }
});