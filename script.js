const container = document.getElementById("container");

const notStartedForm = document.getElementById("not-started-form");
const progressForm = document.getElementById("progress-form");
const completeForm = document.getElementById("complete-form");

const firstAddBtn = document.getElementById("first-add-btn");
const secondAddBtn = document.getElementById("second-add-btn");
const thirdAddBtn = document.getElementById("third-add-btn");

const form = document.getElementById("form");

let notStartedTasks = [];

let inProgressTasks = [];

let completeTasks = [];

// Add new task to desired array
function addNewTaskToArray(whichArray) {
  const newInput = document.createElement("div");
  newInput.classList.add("form");
  let idForBoth = randomID();
  newInput.setAttribute("id", `${idForBoth}`);

  newInput.innerHTML = `
  <input type="text" placeholder="New task" />
  <button class="inside-btn edit-btn" id="edit-btn">
    <i class="fa fa-pencil in-edit-btn"></i>
  </button>
  <button class="inside-btn delete-btn" id="delete-btn">
    <i class="fa fa-trash in-delete-btn"></i>
  </button>
  `;

  const singleTask = {
    id: idForBoth,
    value: newInput,
  };

  whichArray.push(singleTask);
}

// Add new task to DOM
function addNewTaskToDOM(fromWhicArray, toWhichType) {
  fromWhicArray.forEach((task) => {
    toWhichType.appendChild(task.value);
  });
}

// Generate a random ID
function randomID() {
  return Math.floor(Math.random() * 100);
}

// Remove a task from DOM
function removeTask(targetedElement) {
  targetedElement.remove();
}

// ************ Events ************** //

// Add button event

firstAddBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addNewTaskToArray(notStartedTasks);
  addNewTaskToDOM(notStartedTasks, notStartedForm);
});

secondAddBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addNewTaskToArray(inProgressTasks);
  addNewTaskToDOM(inProgressTasks, progressForm);
});

thirdAddBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addNewTaskToArray(completeTasks);
  addNewTaskToDOM(completeTasks, completeForm);
});

// Inside delete button event

container.addEventListener("click", (event) => {
  // Remove from Dom
  let targetedEl = event.target.parentElement;
  if (event.target.classList.contains("delete-btn")) {
    removeTask(targetedEl);
  }

  // Remove from array

  notStartedTasks = notStartedTasks.filter((item) => {
    return item.id != targetedEl.id;
  });

  inProgressTasks = inProgressTasks.filter((item) => {
    return item.id != targetedEl.id;
  });

  completeTasks = completeTasks.filter((item) => {
    return item.id != targetedEl.id;
  });
});
