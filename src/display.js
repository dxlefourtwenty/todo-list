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

        for (const [id, task] of DailyTasks.getDailyTasks().entries()) {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("daily-task-div");
            taskDiv.dataset.id = id;

            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.classList.add("daily-task-check");
            checkBox.checked = task.completed;

            const taskText = document.createElement("span");
            const taskNumber = document.createElement("span");
            taskText.classList.add("daily-task-text");
            taskNumber.textContent = `${i + 1}. `;
            taskText.textContent = `${task.name}`;
            
            taskDiv.appendChild(taskNumber);
            taskDiv.appendChild(taskText);
            taskDiv.appendChild(checkBox);
            dailyTaskContainer.appendChild(taskDiv);
            
            // Clone for start page
            const clone = taskDiv.cloneNode(true);
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