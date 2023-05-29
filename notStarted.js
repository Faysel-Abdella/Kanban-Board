let formContainer = document.querySelectorAll(".form-container");

let notStartedContainer = document.getElementById("not-started-container");
inProgressContainer = document.getElementById("in-progress-container");

const firstAddBtn = document.getElementById("first-add-btn");

let notStartedTasksArray = [];

notStartedTasksArray = localStorage.getItem("not-started-tasks")
  ? JSON.parse(localStorage.getItem("not-started-tasks"))
  : [];

getTaskFromLocal();

firstAddBtn.onclick = function () {
  addTask();
};

// Add task to array and DOM when the add button is clicked
function addTask() {
  // Task data
  const task = {
    id: Math.floor(Math.random() * 10000),
    title: "",
  };

  // Push to array of task
  notStartedTasksArray.push(task);
  // Add to DOM
  addTaskToDOMFrom(notStartedTasksArray);
  // Add to localStorage
  addTaskToLocalFrom(notStartedTasksArray);
  // Add drag functionality for this new task
  addDragForForm();
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
    newTask.setAttribute("draggable", true);
    let inputTxt =
      // Fill the element
      (newTask.innerHTML = `
    <input type="text"  placeholder="Enter New Task.." readonly value="${task.title}" data-id="${task.id}"/>
    <button class="inside-btn edit-btn" id="edit-btn">
    <i class="fa fa-pencil in-edit-btn"></i>
    </button>
    <button class="inside-btn delete-btn" id="delete-btn">
    <i class="fa fa-trash in-delete-btn"></i>
    </button>
    `);

    notStartedContainer.appendChild(newTask);
  });
}

// Add task to localstorag
function addTaskToLocalFrom(array) {
  localStorage.setItem("not-started-tasks", JSON.stringify(array));
}

function getTaskFromLocal() {
  if (localStorage.getItem("not-started-tasks")) {
    let storedTasks = JSON.parse(localStorage.getItem("not-started-tasks"));
    addTaskToDOMFrom(storedTasks);
  }
}

function deleteTaskOfId(taskID) {
  notStartedTasksArray = notStartedTasksArray.filter((task) => {
    return task.id != taskID;
  });
  addTaskToLocalFrom(notStartedTasksArray);
}

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

// Listen to dragover and insert the elemnt in desired position
formContainer.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const bottomTask = insertAboveTask(container, e.clientY);
    const currentTask = document.querySelector(".isdragging");
    console.log(bottomTask);

    if (!bottomTask) {
      container.appendChild(currentTask);
    } else {
      container.insertBefore(currentTask, bottomTask);
    }
  });
});

const insertAboveTask = (container, mouseY) => {
  const tasks = container.querySelectorAll(".form:not(.isdragging)");

  let closestTask = null;
  let closestOffSet = Number.NEGATIVE_INFINITY;

  tasks.forEach((task) => {
    const { top } = task.getBoundingClientRect();
    const offSet = mouseY - top;
    if (offSet < 0 && offSet > closestOffSet) {
      closestOffSet = offSet;
      closestTask = task;
    }
  });
  console.log(closestTask);

  return closestTask; // return the closest bottom task
};

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

// Edit button
notStartedContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("in-edit-btn")) {
    let input = event.target.parentElement.parentElement.firstElementChild;
    input.removeAttribute("readonly");
    input.focus();
    input.value = "";
    input.addEventListener("blur", (e) => {
      input.setAttribute("readonly", true);
      let ID = input.getAttribute("data-id");
      notStartedTasksArray.forEach((task) => {
        if (task.id == ID) {
          task.title = input.value;
        }
      });
      console.log(notStartedTasksArray);
      addTaskToLocalFrom(notStartedTasksArray);
    });
  }
});
