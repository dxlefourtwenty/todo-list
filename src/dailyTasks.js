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

    function editTask(task) {

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

    return {
        newDailyTask,
        editTask,
        getDailyTasks,
        toggleTask
    }

})();

export default DailyTasks;