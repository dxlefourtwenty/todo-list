import "./styles.css";
import Display from "./display.js";
import DailyTasks from "./dailyTasks.js";

console.log("Webpack success!");
const id1 = DailyTasks.newDailyTask("Take out the trash");
const id2 = DailyTasks.newDailyTask("Walk the dog");
const id3 = DailyTasks.newDailyTask("Workout");
const id4 = DailyTasks.newDailyTask("Meditate");
Display.displayDailyTasks();
DailyTasks.updateRemainingTasks();
Display.displayDailyTasksStart();

const daily = document.getElementById("daily");
const scheduled = document.getElementById("scheduled");
const returnHome = document.querySelectorAll(".return-home");

// daily task buttons
const dailyTaskModal = document.getElementById("daily-task-modal");
const dailyTaskForm = document.getElementById("daily-task-form");
const newDailyTask = document.getElementById("new-daily-task");
const dailyTaskInput = document.getElementById("daily-task-input");

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

    if (targetId === "start-page") {
      Display.displayHome();
      currPage = null;
    } else {
      Display.displayPage(targetPage);
      currPage = targetPage;
    }
  });
});

// **Daily Task Page Functionality**
// Bring up daily task modal
newDailyTask.addEventListener("click", () => {
  dailyTaskInput.value = "";
  Display.displayTaskModal();
});

// Clear daily tasks
document.getElementById("clear-daily-task").addEventListener("click", () => {
  DailyTasks.clearTasks();
  DailyTasks.updateRemainingTasks();
  Display.displayDailyTasks();
  Display.displayDailyTasksStart();
});

// Submit task input
dailyTaskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const value = dailyTaskInput.value.trim();
    if (value) {
      DailyTasks.newDailyTask(value);
      DailyTasks.updateRemainingTasks();
      Display.displayDailyTasks();
      Display.displayDailyTasksStart();
      console.log(`${value} created`);
      Display.hideTaskModal();
    }
  }
});

// Hide daily-task-modal with esc or clicking out
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !dailyTaskModal.classList.contains("hidden"))
    Display.hideTaskModal();
});
dailyTaskModal.addEventListener("click", (e) => {
  if (e.target === dailyTaskModal) Display.hideTaskModal();
});

// Edit daily tasks
let editingAll = false;
const editDailyTaskBtn = document.getElementById("edit-daily-task");
editDailyTaskBtn.addEventListener("click", () => {
  if (!editingAll) {
    DailyTasks.editTasks();
    editDailyTaskBtn.textContent = "Save";

    newDailyTask.classList.add("hidden");
    document.getElementById("clear-daily-task").classList.add("hidden");
  } else {
    DailyTasks.saveTasks();
    editDailyTaskBtn.textContent = "Edit";

    newDailyTask.classList.remove("hidden");
    document.getElementById("clear-daily-task").classList.remove("hidden");
  }
  editingAll = !editingAll;
});
