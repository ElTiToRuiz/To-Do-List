import Task from './Task.js';
document.querySelector("main .material-symbols-outlined").style.display = "none";


// Example function to create and add a task
function addTask(task) {
  const taskList = document.querySelector('.task-section .task-list');
  const taskCard = task.setUpTask();
  taskList.appendChild(taskCard);
}

// Example tasks
const task1 = new Task('Task 1', 'Description 1', '', new Date('2023-12-31'), 'Pending');
const task2 = new Task('Task 2', 'Description 2', '', new Date('2024-01-15'), 'Pending');
const task3 = new Task('Task 3', 'Description 3', '', new Date('2024-02-20'), 'Pending');

// Add tasks to the task list
addTask(task1);
addTask(task2);
addTask(task3);

document.querySelector("section .material-symbols-outlined").addEventListener("click", () => {
    document.querySelector("section").style.display = "none";
    document.querySelector("main .material-symbols-outlined").style.display = "block";
});

document.querySelector("main .material-symbols-outlined").addEventListener("click", () => {
    document.querySelector("section").style.display = "block";
    document.querySelector("main .material-symbols-outlined").style.display = "none";
});

document.getElementById("add-task").addEventListener("click", () => {
  addTask(new Task('untitled', 'untitled', '', new Date(), 'Pending'))
  const taskList = document.querySelectorAll('.task-section .task-list .task-card');
  taskList[taskList.length - 1].click();
});

const sort_task= ['pending', 'progress', 'completed'];
sort_task.forEach(status => {
  document.getElementById(status).addEventListener('click', () => {
    const taskList = document.querySelectorAll('.task-section .task-list .task-card');
    taskList.forEach(task => {
      if (task.querySelector('.task-status').textContent.toLowerCase() === status) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
  });
})

document.getElementById('all').addEventListener('click', () => {
    const taskList = document.querySelectorAll('.task-section .task-list .task-card');
    taskList.forEach(task => {
        task.style.display = 'block';
    });
});

const deleteTask = ['delete-category', 'delete-all'];
deleteTask.forEach(id => {
  document.getElementById(id).addEventListener('click', () => {
    const taskList = document.querySelectorAll('.task-section .task-list .task-card');
    taskList.forEach(task => {
      if (id === 'delete-category' && task.querySelector('.task-status').textContent.toLowerCase() === 'completed') {
        task.remove();
      } else if (id === 'delete-all') {
        task.remove();
      }
    });
  });
})