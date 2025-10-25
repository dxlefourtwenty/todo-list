const DailyTasks = (() => {
    // getTasks() from API db module
    const tasks = new Map();

    class DailyTask {
        #name;
        #completed;

        constructor(name) {
            this.#name = name;
            this.#completed = false;
        }

        get name() {
            return this.#name;
        }

        rename(newName) {
            this.#name = newName;
        }

        get completed() {
            return this.#completed;
        }

        toggle() {
            this.#completed = !this.#completed;
        }

        toJSON() {
            return { name: this.#name, completed: this.#completed};
        }

        static fromJSON(obj) {
            const task = new DailyTask(obj.name);
            if (obj.completed) task.toggle();
            return task;
        }
    }

    function newDailyTask(name) {
        const id = Date.now() + Math.random();
        const task = new DailyTask(name);
        tasks.set(id, task);
        
        return id;
    }

    function editTasks() {
        const container = document.getElementById("daily-task-content");
        const checkBoxes = document.querySelectorAll(".daily-task-check");
        const tasks = container.querySelectorAll(".daily-task-div");

        tasks.forEach(taskDiv => {
            const span = taskDiv.querySelector(".daily-task-text");
            if (!span) return;
            const textarea = document.createElement("textarea");
            textarea.value = span.textContent;
            textarea.classList.add("border", "resize-none", "rounded", "h-[3rem]");
            span.replaceWith(textarea);
        });

        checkBoxes.forEach(checkBox => {
            checkBox.classList.add("hidden");
        });
    }

    function saveTasks() {
        const container = document.getElementById("daily-task-content");
        const checkBoxes = document.querySelectorAll(".daily-task-check");
        const tasks = container.querySelectorAll(".daily-task-div");

        const taskMap = getDailyTasks();

        tasks.forEach(taskDiv => {
            const textarea = taskDiv.querySelector("textarea");
            if (!textarea) return;

            const newName = textarea.value.trim();
            const span = document.createElement("span");
            span.classList.add("daily-task-text");
            span.textContent = newName;
            textarea.replaceWith(span);

            const id = Number(taskDiv.dataset.id);
            const task = taskMap.get(id);
            if (task && typeof task.rename === "function") task.rename(newName);
        });

        checkBoxes.forEach(checkBox => {
            checkBox.classList.remove("hidden");
        });
    }

    function getDailyTasks() {
        return tasks;
    }

    function toggleTask(id) {
        const task = tasks.get(id);
        if (task) {
            task.toggle();
        }
    }

    function clearTasks() {
        tasks.clear();
    }

    return {
        newDailyTask,
        editTasks,
        saveTasks,
        getDailyTasks,
        toggleTask,
        clearTasks
    }

})();

export default DailyTasks;