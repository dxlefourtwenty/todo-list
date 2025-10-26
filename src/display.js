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
    dailyTaskContainer.innerHTML = "";

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
      taskNumber.classList.add("daily-task-number");
      taskNumber.textContent = `${i + 1}. `;
      taskText.textContent = `${task.name}`;

      taskDiv.appendChild(taskNumber);
      taskDiv.appendChild(taskText);

      checkBox.addEventListener("change", () => {
        DailyTasks.toggleTask(id);
        DailyTasks.updateRemainingTasks();
        displayDailyTasksStart();
      });

      taskDiv.appendChild(checkBox);
      dailyTaskContainer.appendChild(taskDiv);

      displayDailyTasksStart();

      i++;
    }
  }

  function displayDailyTasksStart() {
    DailyTasks.updateRemainingTasks();
    const startPageDaily = document.getElementById("start-page-daily");
    startPageDaily.innerHTML = "";

    if (DailyTasks.getRemainingTasks().size === 0) {
      startPageDaily.innerHTML = "Completed";
      return;
    }

    let i = 0;
    for (const [id, task] of DailyTasks.getRemainingTasks().entries()) {
      const taskDivStart = document.createElement("div");
      const taskNumberStart = document.createElement("span");
      const taskTextStart = document.createElement("span");

      taskNumberStart.textContent = `${i + 1}. `;
      taskTextStart.textContent = `${task.name}`;

      taskDivStart.appendChild(taskNumberStart);
      taskDivStart.appendChild(taskTextStart);

      startPageDaily.appendChild(taskDivStart);

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
    displayDailyTasksStart,
    displayTaskModal,
    hideTaskModal,
    hidePage,
  };
})();

export default Display;
