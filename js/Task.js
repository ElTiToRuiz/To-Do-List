class Task {
  #title;
  #description;
  #status;
  #group;
  #endTime;

  constructor(title = '', description = '', group = '', endTime = new Date(), status = 'Pending') {
    this.#title = title;
    this.#description = description;
    this.#status = status;
    this.#group = group;
    this.#endTime = endTime;
  }

  get title() {
    return this.#title;
  }

  get description() {
    return this.#description;
  }

  get status() {
    return this.#status;
  }

  get group() {
    return this.#group;
  }

  get endTime() {
    return this.#endTime;
  }

  set title(title) {
    this.#title = title;
  }

  set description(description) {
    this.#description = description;
  }

  set status(status) {
    this.#status = status;
  }

  set group(group) {
    this.#group = group;
  }

  set endTime(endTime) {
    this.#endTime = endTime;
  }

  setUpTask() {
    const taskCard = this.createTaskCard();
    taskCard.addEventListener("click", () => this.showEditPopup(taskCard));
    return taskCard;
  }

  createTaskCard() {
    const taskCard = document.createElement("div");
    taskCard.className = "task-card";

    const taskHeader = this.createTaskHeader();
    const taskBody = this.createTaskBody();

    taskCard.appendChild(taskHeader);
    taskCard.appendChild(taskBody);

    return taskCard;
  }

  createTaskHeader() {
    const taskHeader = document.createElement("div");
    taskHeader.className = "task-card-header";

    const taskTitle = document.createElement("h3");
    taskTitle.textContent = this.#title;

    const taskDescription = document.createElement("p");
    taskDescription.textContent = this.#description;

    const closeSpan = document.createElement("span");
    closeSpan.className = "material-symbols-outlined";
    closeSpan.textContent = "close";
    closeSpan.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent click event from bubbling up to the task card
      taskHeader.parentElement.remove(); // Remove the task card from the DOM
    });

    taskHeader.appendChild(taskTitle);
    taskHeader.appendChild(taskDescription);
    taskHeader.appendChild(closeSpan);

    return taskHeader;
  }

  createTaskBody() {
    const taskBody = document.createElement("div");
    taskBody.className = "task-card-body";

    const taskStatus = document.createElement("span");
    taskStatus.className = "task-status";
    taskStatus.textContent = this.#status;

    const taskEndDate = document.createElement("div");
    const taskEndDateP = document.createElement("p");
    taskEndDateP.className = "task-date";
    taskEndDateP.textContent = `End Date: ${this.#endTime.toLocaleDateString()}`;

    taskEndDate.appendChild(taskEndDateP);
    taskBody.appendChild(taskStatus);
    taskBody.appendChild(taskEndDate);

    return taskBody;
  }

  showEditPopup(taskCard) {
    const popupContainer = this.createPopupContainer(taskCard);
    document.body.appendChild(popupContainer);

    this.addEditableEvents(popupContainer, taskCard);
  }

  createPopupContainer(taskCard) {
    const popupContainer = document.createElement("div");
    popupContainer.className = "popup-container";

    const taskCardClone = taskCard.cloneNode(true);
    taskCardClone.className += " popup";
    popupContainer.appendChild(taskCardClone);

    const closeButton = taskCardClone.querySelector(".material-symbols-outlined");
    closeButton.addEventListener("click", () => {
      document.body.removeChild(popupContainer);
    });

    return popupContainer;
  }

  addEditableEvents(popupContainer, taskCard) {
    const taskCardClone = popupContainer.querySelector(".task-card");

    this.makeEditable(taskCardClone.querySelector(".task-card-header h3"), taskCard.querySelector(".task-card-header h3"), 'title');
    this.makeEditable(taskCardClone.querySelector(".task-card-header p"), taskCard.querySelector(".task-card-header p"), 'description');
    this.makeStatusEditable(taskCardClone.querySelector(".task-status"), taskCard.querySelector(".task-status"), 'status');
    this.makeDateEditable(taskCardClone.querySelector(".task-date"), taskCard.querySelector(".task-date"), 'endTime');
  }

  makeEditable(editableElement, originalElement, property) {
    editableElement.addEventListener('click', () => {
      editableElement.contentEditable = true;
      editableElement.focus();
    });

    editableElement.addEventListener('blur', () => {
      originalElement.textContent = editableElement.textContent;
      this[property] = editableElement.textContent; // Update the property of the Task object
      editableElement.contentEditable = false;
    });
  }

  makeStatusEditable(editableElement, originalElement) {
    editableElement.addEventListener('click', () => {
      const select = this.createStatusSelect(editableElement.textContent);
      editableElement.textContent = '';
      editableElement.appendChild(select);
      select.focus();

      select.addEventListener('change', () => {
        originalElement.textContent = select.value;
        this.status = select.value; // Update the status property of the Task object
        editableElement.textContent = select.value;
        editableElement.removeChild(select);
      });

      select.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    });
  }

  createStatusSelect(currentStatus) {
    const select = document.createElement('select');
    const options = ['Pending', 'Progress', 'Completed'];
    options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option;
      opt.textContent = option;
      if (option === currentStatus) opt.selected = true;
      select.appendChild(opt);
    });
    return select;
  }

  makeDateEditable(editableElement, originalElement) {
    editableElement.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'date';
      input.value = this.#endTime.toISOString().split('T')[0];
      editableElement.textContent = '';
      editableElement.appendChild(input);
      input.focus();

      input.addEventListener('change', () => {
        const date = new Date(input.value);
        originalElement.textContent = `End Date: ${date.toLocaleDateString()}`;
        this.endTime = date; // Update the endTime property of the Task object
        editableElement.textContent = `End Date: ${date.toLocaleDateString()}`;
        editableElement.removeChild(input);
      });

      input.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    });
  }
}

export default Task;
