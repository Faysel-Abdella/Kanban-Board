const container = document.getElementById("container");

const notStartedForm = document.getElementById("not-started-form");
const progressForm = document.getElementById("progress-form");
const completeForm = document.getElementById("complete-form");

const firstAddBtn = document.getElementById("first-add-btn");
const secondAddBtn = document.getElementById("second-add-btn");
const thirdAddBtn = document.getElementById("third-add-btn");

// localStorage.removeItem("notStartedStored");
// localStorage.removeItem("inProgressStored");
// localStorage.removeItem("CompletedStored");

let notStartedTasks =
  localStorage.getItem("notStartedStored") !== null
    ? JSON.parse(localStorage.getItem("notStartedStored"))
    : [];

let inProgressTasks =
  localStorage.getItem("inProgressStored") !== null
    ? JSON.parse(localStorage.getItem("inProgressStored"))
    : [];

let completeTasks =
  localStorage.getItem("CompletedStored") !== null
    ? JSON.parse(localStorage.getItem("completedStored"))
    : [];

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
    value: newInput.outerHTML,
  };

  whichArray.push(singleTask);

  localStorage.setItem("notStartedStored", JSON.stringify(notStartedTasks));
  localStorage.setItem("inProgressStored", JSON.stringify(inProgressTasks));
  localStorage.setItem("CompletedStored", JSON.stringify(completeTasks));
}

console.log(notStartedTasks);
console.log(inProgressTasks);
console.log(completeTasks);

// Add new task to DOM
function addNewTaskToDOM(fromWhicArray, toWhichType) {
  toWhichType.innerHTML = "";
  if (fromWhicArray !== null) {
    fromWhicArray.forEach((task) => {
      toWhichType.innerHTML += task.value;
      // toWhichType.appendChild(task.value);
    });
  }

  localStorage.setItem("notStartedStored", JSON.stringify(notStartedTasks));
  localStorage.setItem("inProgressStored", JSON.stringify(inProgressTasks));
  localStorage.setItem("CompletedStored", JSON.stringify(completeTasks));
}

function updateLocalStorage(transactions) {
  localStorage.setItem("notStartedStored", JSON.stringify(transactions));
}

function init() {
  addNewTaskToDOM(notStartedTasks, notStartedForm);
  addNewTaskToDOM(inProgressTasks, progressForm);
  addNewTaskToDOM(completeTasks, completeForm);
}

init();

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
  // Remove from DOM
  let targetedEl = event.target.parentElement;
  if (event.target.classList.contains("delete-btn")) {
    removeTask(targetedEl);
  }

  // Remove from array

  notStartedTasks = notStartedTasks.filter((item) => {
    return item.id != targetedEl.id;
  });
  localStorage.setItem("notStartedStored", JSON.stringify(notStartedTasks));

  inProgressTasks = inProgressTasks.filter((item) => {
    return item.id != targetedEl.id;
  });
  localStorage.setItem("inProgressStored", JSON.stringify(inProgressTasks));

  completeTasks = completeTasks.filter((item) => {
    return item.id != targetedEl.id;
  });
  localStorage.setItem("CompletedStored", JSON.stringify(completeTasks));
});
