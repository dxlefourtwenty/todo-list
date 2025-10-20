import DailyTasks from "./dailyTasks.js";

const Display = (() => {
    const startPage = document.getElementById("start-page");
    const modal = document.getElementById("daily-task-modal");

    function displayHome() {
        startPage.classList.remove("hidden");
    }

    function displayPage(page) {
        startPage.classList.add("hidden");
        page.classList.remove("hidden");
    }

    function hidePage(page) {
        page.classList.add("hidden");
    }

    function displayDailyTasks() {
        const dailyTaskContainer = document.getElementById("daily-task-content");
        const startPageDaily = document.getElementById("start-page-daily");
        dailyTaskContainer.innerHTML = "";
        startPageDaily.innerHTML = "";
        let i = 0;

        for (const task of DailyTasks.getDailyTasks().values()) {

            const taskDiv = document.createElement("div");
            const taskCompleted = task.completed ? 'yes' : 'no';
            taskDiv.textContent = `${i + 1}. ${task.name} ${taskCompleted}`;
            const clone = taskDiv.cloneNode(true);

            dailyTaskContainer.appendChild(taskDiv);
            startPageDaily.appendChild(clone);
            i++;
        }
    }

    function displayTaskModal() {
        modal.classList.remove("hidden");
    }

    function hideTaskModal() {
        modal.classList.add("hidden");
    }

    return {
        displayHome,
        displayPage,
        displayDailyTasks,
        displayTaskModal,
        hideTaskModal,
        hidePage
    }

})();

export default Display;