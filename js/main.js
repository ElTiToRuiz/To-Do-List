import Task from "./Task.js";

const taskContainer = document.querySelector('#task-list');

const tasks = [
  new Task('Task 1', 'Description 1', ['Group1'], new Date('2023-12-31')),
  new Task('Task 2', 'Description 2', ['Group2'], new Date('2024-01-15')),
  new Task('Task 3', 'Description 3', ['Group3'], new Date('2024-02-20'))
];

tasks.forEach(task =>  {
  const taskCard = task.setUpTask();
  taskContainer.appendChild(taskCard);
});

const taskCard = document.querySelector('.task-card');
const closeButton = taskCard.querySelector('.material-symbols-outlined');

closeButton.addEventListener('click', () => {
  taskCard.classList.toggle('open');
});