import "./styles.css";
import Display from "./display.js";

console.log("Webpack success!");

const daily = document.getElementById("daily");
const scheduled = document.getElementById("scheduled");
const returnHome = document.querySelectorAll(".return-home");

let currPage = null;

// Go to task page
daily.addEventListener("click", () => {
    const page = document.getElementById("task-page");
    Display.displayPage(document.getElementById("task-page"));
    currPage = page; // track current page
});

// Go to scheduled page
scheduled.addEventListener("click", () => {
    const page = document.getElementById("scheduled-page");
    Display.displayPage(document.getElementById("scheduled-page"));
    currPage = page; // track current page
});

returnHome.forEach((button) => {
    button.addEventListener("click", () => {
        const targetId = button.dataset.target;
        const targetPage = document.getElementById(targetId);

        if (currPage && currPage !== targetPage) {
            Display.hidePage(currPage);
        }

        if (targetId === "start-page" ) {
            Display.displayHome();
            currPage = null;
        } else {
            Display.displayPage(targetPage);
            currPage = targetPage;
        }
    });
});

