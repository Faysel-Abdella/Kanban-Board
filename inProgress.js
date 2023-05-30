let formContainer = document.querySelectorAll(".form-container");

let inProgressContainer = document.getElementById("in-progress-container");

const secondAddBtn = document.getElementById("second-add-btn");

let inProgressArray = localStorage.getItem("in-progress-tasks")
  ? JSON.parse(localStorage.getItem("in-progress-tasks"))
  : [];

getTaskFromLocal_2();

secondAddBtn.onclick = function () {
  addTask_2();
};

// Add task to array and DOM when the add button is clicked
function addTask_2() {
  // Task data
  const task = {
    id: Math.floor(Math.random() * 10000),
    title: "",
  };

  // Push to array of task
  inProgressArray.push(task);
  // Add to DOM
  addTaskToDOMFrom_2(inProgressArray);
  // Add to localStorage
  addTaskToLocalFrom_2(inProgressArray);
  // Add drag functionality for this new task
  addDragForForm();
}

// display task in DOM
function addTaskToDOMFrom_2(inProgressArray) {
  // First empty the container
  inProgressContainer.innerHTML = "";
  // Loop throgh notStartedTasksArray
  inProgressArray.forEach((task) => {
    // Create the element
    const newTask_2 = document.createElement("div");
    newTask_2.classList.add("form");
    newTask_2.setAttribute("draggable", true);

    newTask_2.setAttribute("data-id", task.id);
    let inputTxt =
      // Fill the element
      (newTask_2.innerHTML = `
    <input type="text"  placeholder="Enter New Task.." readonly value="${task.title}" data-id="${task.id}"/>
    <button class="inside-btn edit-btn" id="edit-btn">
    <i class="fa fa-pencil in-edit-btn"></i>
    </button>
    <button class="inside-btn delete-btn" id="delete-btn">
    <i class="fa fa-trash in-delete-btn"></i>
    </button>
    `);

    inProgressContainer.appendChild(newTask_2);
  });
}

// Add task to localstorag
function addTaskToLocalFrom_2(array) {
  localStorage.setItem("in-progress-tasks", JSON.stringify(array));
}

function getTaskFromLocal_2() {
  if (localStorage.getItem("in-progress-tasks")) {
    let storedTasks = JSON.parse(localStorage.getItem("in-progress-tasks"));
    addTaskToDOMFrom_2(storedTasks);
  }
}

function deleteTaskOfId_2(taskID) {
  inProgressArray = inProgressArray.filter((task) => {
    return task.id != taskID;
  });
  addTaskToLocalFrom_2(inProgressArray);
}

// ##### EVENTS #####
// delete button event
inProgressContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("in-delete-btn")) {
    // Remove from array and loclstorag
    deleteTaskOfId_2(
      event.target.parentElement.parentElement.getAttribute("data-id")
    );

    // Remove from DOM
    let targetedEl = event.target.parentElement.parentElement;

    targetedEl.remove();
  }
});

// Edit button
inProgressContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("in-edit-btn")) {
    let input = event.target.parentElement.parentElement.firstElementChild;
    input.removeAttribute("readonly");
    input.focus();
    input.value = "";
    input.addEventListener("blur", (e) => {
      input.setAttribute("readonly", true);
      let ID = input.getAttribute("data-id");
      inProgressArray.forEach((task) => {
        if (task.id == ID) {
          task.title = input.value;
        }
      });

      addTaskToLocalFrom_2(inProgressArray);
    });
  }
});

// ##### DRAG AND DROP #####
// Add isdragging class for all in-dragging form
function addDragForForm() {
  formContainer.forEach((container) => {
    let con = container.querySelectorAll(".form");

    con.forEach((draggableEl) => {
      draggableEl.addEventListener("dragstart", () => {
        draggableEl.classList.add("isdragging");
      });
      draggableEl.addEventListener("dragend", () => {
        draggableEl.classList.remove("isdragging");
      });
    });
  });
}
addDragForForm();
