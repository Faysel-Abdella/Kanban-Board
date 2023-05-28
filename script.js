const container = document.getElementById("container");
const inputTxt = document.getElementById("input");

let notStartedContainer = document.getElementById("not-started-container");

const firstAddBtn = document.getElementById("first-add-btn");

const form = document.getElementById("form");

let notStartedTasksArray = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

getTaskFromLocal();

firstAddBtn.onclick = function () {
  addTask();
  // inputTxt.focus();
};

// Add task to array and DOM when the add button is clicked
function addTask() {
  // Task data
  const task = {
    id: Math.floor(Math.random() * 10000),
  };

  // Push to array of task
  notStartedTasksArray.push(task);
  // Add to DOM
  addTaskToDOMFrom(notStartedTasksArray);
  // Add to localStorage
  addTaskToLocalFrom(notStartedTasksArray);
}

// display task in DOM
function addTaskToDOMFrom(notStartedTasksArray) {
  // First empty the container
  notStartedContainer.innerHTML = "";
  // Loop throgh notStartedTasksArray
  notStartedTasksArray.forEach((task) => {
    // Create the element
    const newTask = document.createElement("div");
    newTask.classList.add("form");
    newTask.setAttribute("data-id", task.id);

    // Fill the element
    newTask.innerHTML = `
    <input type="text" placeholder="New task"/>
    <button class="inside-btn edit-btn" id="edit-btn">
    <i class="fa fa-pencil in-edit-btn"></i>
    </button>
    <button class="inside-btn delete-btn" id="delete-btn">
    <i class="fa fa-trash in-delete-btn"></i>
    </button>
    `;

    notStartedContainer.appendChild(newTask);
  });
}

// Add task to localstorag
function addTaskToLocalFrom(array) {
  localStorage.setItem("tasks", JSON.stringify(array));
}

function getTaskFromLocal() {
  if (localStorage.getItem("tasks")) {
    let storedTasks = JSON.parse(localStorage.getItem("tasks"));
    addTaskToDOMFrom(storedTasks);
  }
}

function deleteTaskOfId(taskID) {
  notStartedTasksArray = notStartedTasksArray.filter((task) => {
    return task.id != taskID;
  });
  addTaskToLocalFrom(notStartedTasksArray);
}

// ##### EVENTS #####
// delete button event
notStartedContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("in-delete-btn")) {
    // Remove from array and loclstorag
    deleteTaskOfId(
      event.target.parentElement.parentElement.getAttribute("data-id")
    );

    // Remove from DOM
    let targetedEl = event.target.parentElement.parentElement;

    targetedEl.remove();
  }
});
