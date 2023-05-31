let formContainer = document.querySelectorAll(".form-container");

let notStartedContainer = document.getElementById("not-started-container");
let inProgressContainer = document.getElementById("in-progress-container");
let completedContainer = document.getElementById("completed-container");
const firstAddBtn = document.getElementById("first-add-btn");

let notStartedTasksArray = [];

notStartedTasksArray = localStorage.getItem("not-started-tasks")
  ? JSON.parse(localStorage.getItem("not-started-tasks"))
  : [];

let inProgressArray = localStorage.getItem("in-progress-tasks")
  ? JSON.parse(localStorage.getItem("in-progress-tasks"))
  : [];
let completedTasksArray = localStorage.getItem("completed-tasks")
  ? JSON.parse(localStorage.getItem("completed-tasks"))
  : [];

getTaskFromLocal();

firstAddBtn.onclick = function () {
  addTask();
};

// Add task to array and DOM when the add button is clicked
function addTask() {
  // Task data
  const task = {
    id: Math.floor(Math.random() * 100),
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
    <input type="text"  placeholder="Enter New Task.." readonly value="${
      task.title
    }" data-id="${+task.id}"/>
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
  let con = notStartedContainer.querySelectorAll(".form");

  con.forEach((draggableEl) => {
    draggableEl.addEventListener("dragstart", (e) => {
      draggableEl.classList.add("isdragging");
      let title = draggableEl.getElementsByTagName("input")[0].value;
      let id = draggableEl.getAttribute("data-id");
      // console.log("dargged el parent", draggableEl.parentElement.id);
      e.dataTransfer.setData("dragged-from", draggableEl.parentElement.id);
      e.dataTransfer.setData("title", title);
      e.dataTransfer.setData("id", id);
    });
    draggableEl.addEventListener("dragend", () => {
      draggableEl.classList.remove("isdragging");
    });
  });
}
addDragForForm();

// Listen to dragover and insert the element at desired position
inProgressContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
  const bottomTask = insertAboveTask(inProgressContainer, e.clientY);
  const currentTask = document.querySelector(".isdragging");

  if (!bottomTask) {
    inProgressContainer.appendChild(currentTask);
  } else {
    inProgressContainer.insertBefore(currentTask, bottomTask);
  }
});
completedContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
  const bottomTask = insertAboveTask(completedContainer, e.clientY);
  const currentTask = document.querySelector(".isdragging");

  if (!bottomTask) {
    completedContainer.appendChild(currentTask);
  } else {
    completedContainer.insertBefore(currentTask, bottomTask);
  }
});

inProgressContainer.addEventListener("drop", (e) => {
  let darggedFrom = e.dataTransfer.getData("dragged-from");
  if (darggedFrom == "not-started-container") {
    console.log("dragged from", darggedFrom);
    let dropedId = e.target.getAttribute("data-id");

    let theBottm = insertAboveTask(inProgressContainer, e.clientY);
    inProgressArray = JSON.parse(localStorage.getItem("in-progress-tasks"));

    let title = e.dataTransfer.getData("title"); // title of dropped item
    let id = +e.dataTransfer.getData("id"); // id of droped item
    let indexOfBottom;
    let idOfBottm = theBottm ? +theBottm.getAttribute("data-id") : 0;
    if ((theBottm !== null) & (theBottm !== 0)) {
      indexOfBottom = inProgressArray
        .map((e) => {
          return +e.id;
        })
        .indexOf(idOfBottm);
    } else {
      indexOfBottom = inProgressArray.length;
    }

    let droppedTask = {
      id: +id,
      title: title,
    };

    inProgressArray.splice(indexOfBottom, 0, droppedTask); // add the dropped task to the droped container array
    notStartedTasksArray = notStartedTasksArray.filter(
      (task) => task.id != droppedTask.id
    );

    localStorage.setItem(
      "not-started-tasks",
      JSON.stringify(notStartedTasksArray)
    );
    localStorage.setItem("in-progress-tasks", JSON.stringify(inProgressArray));
  }
});

completedContainer.addEventListener("drop", (e) => {
  let darggedFrom = e.dataTransfer.getData("dragged-from");
  if (darggedFrom == "not-started-container") {
    console.log("dragged from", darggedFrom);
    let dropedId = e.target.getAttribute("data-id");

    let theBottm = insertAboveTask(completedContainer, e.clientY);
    completedTasksArray = JSON.parse(localStorage.getItem("completed-tasks"));

    let title = e.dataTransfer.getData("title"); // title of dropped item
    let id = +e.dataTransfer.getData("id"); // id of droped item
    let indexOfBottom;
    let idOfBottm = theBottm ? +theBottm.getAttribute("data-id") : 0;
    if ((theBottm !== null) & (theBottm !== 0)) {
      indexOfBottom = completedTasksArray
        .map((e) => {
          return +e.id;
        })
        .indexOf(idOfBottm);
    } else {
      indexOfBottom = completedTasksArray.length;
    }

    let droppedTask = {
      id: +id,
      title: title,
    };

    completedTasksArray.splice(indexOfBottom, 0, droppedTask); // add the dropped task to the droped container array
    notStartedTasksArray = notStartedTasksArray.filter(
      (task) => task.id != droppedTask.id
    );

    localStorage.setItem(
      "not-started-tasks",
      JSON.stringify(notStartedTasksArray)
    );
    localStorage.setItem(
      "completed-tasks",
      JSON.stringify(completedTasksArray)
    );
  }
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

  return closestTask; // return the closest bottom task
};

// ##### EVENTS #####
// delete button event
notStartedContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("in-delete-btn")) {
    // Remove from array and loclstorag
    deleteTaskOfId(
      +event.target.parentElement.parentElement.getAttribute("data-id")
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
      let ID = +input.getAttribute("data-id");
      notStartedTasksArray.forEach((task) => {
        if (task.id == ID) {
          task.title = input.value;
        }
      });

      addTaskToLocalFrom(notStartedTasksArray);
    });
  }
});
