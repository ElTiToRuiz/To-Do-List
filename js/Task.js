class Task {
    constructor(title, description, status, group, endTime, colorIndex) {
      this.#title = title;
      this.#description = description;
      this.#status = status;
      this.#group = group;
      this.#endTime = endTime;
      this.#colorIndex = colorIndex;
    }
  
    #title;
    #description;
    #status;
    #group;
    #endTime;
    #colorIndex;
  
    static Colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
  
    setUpTask() {
      const taskCard = document.createElement("div");
      taskCard.className = `task-card ${Task.Colors[this.#colorIndex % Task.Colors.length]}`;
  
      const taskHeader = document.createElement("div");
      taskHeader.className = "task-card-header";
  
      const taskTitle = document.createElement("h3");
      taskTitle.textContent = this.#title;
  
      const taskStatus = document.createElement("span");
      taskStatus.className = "task-status";
      taskStatus.textContent = this.#status;
  
      const closeSpan = document.createElement("span");
      closeSpan.className = "material-symbols-outlined";
      closeSpan.textContent = `close`;
  
      taskHeader.appendChild(taskTitle);
      taskHeader.appendChild(taskStatus);
      taskHeader.appendChild(closeSpan);
  
      const taskBody = document.createElement("div");
      taskBody.className = "task-card-body";
  
      const taskDescription = document.createElement("p");
      taskDescription.textContent = this.#description;
  
      taskBody.appendChild(taskDescription);
  
      taskCard.appendChild(taskHeader);
      taskCard.appendChild(taskBody);
  
      // Add click event listener to task card for expanding
      taskCard.addEventListener("click", () => {
        this.showEditPopup(taskCard);
      });
      
      // Add click event listener to close span for deleting
      closeSpan.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent click event from bubbling up to the task card
        taskCard.remove(); // Remove the task card from the DOM
      });

      taskHeader.appendChild(closeSpan);
  
      return taskCard;
    }
  
    showEditPopup(taskCard) {
      // Create popup container
      const popupContainer = document.createElement("div");
      popupContainer.className = "popup-container";
  
      // Clone the taskCard and append to the popup container
      const taskCardClone = taskCard.cloneNode(true);
      taskCardClone.className += " popup";
      popupContainer.appendChild(taskCardClone);
  
      // Add close button functionality to the cloned card
      const closeButton = taskCardClone.querySelector(".material-symbols-outlined");
      closeButton.addEventListener("click", () => {
        document.body.removeChild(popupContainer);
      });
  
      // Append popup container to the body
      document.body.appendChild(popupContainer);
    }
}
  

export default Task