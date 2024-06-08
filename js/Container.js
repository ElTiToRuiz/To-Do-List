import Task from "./Task.js";

class Container {
    constructor() {
        this.tasks = [];
    }

    add(task) {
        this.tasks.push(task);
    }

    remove(task) {
        this.tasks = this.tasks.filter(c => c !== task);
    }

    addTask(title = '', description = '', date = new Date(), status = 'Pending') {
        const task = new Task(title, description, date, status);
        const taskList = document.getElementById('task-list');
        const taskCard = task.setUpTask();
        taskList.appendChild(taskCard)
        task.showEditPopup(taskCard);
        this.tasks.push(task);
    }

}

export default Container;

