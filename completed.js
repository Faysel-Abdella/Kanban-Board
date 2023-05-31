let formContainer = document.querySelectorAll(".form-container");

let inProgressContainer = document.getElementById("in-progress-container");
let notStartedContainer = document.getElementById("not-started-container");
let completedContainer = document.getElementById("completed-container");

let inProgressArray = localStorage.getItem("in-progress-tasks")
  ? JSON.parse(localStorage.getItem("in-progress-tasks"))
  : [];

let notStartedTasksArray = localStorage.getItem("not-started-tasks")
  ? JSON.parse(localStorage.getItem("not-started-tasks"))
  : [];

let completedTasksArray = localStorage.getItem("completed-tasks")
  ? JSON.parse(localStorage.getItem("completed-tasks"))
  : [];

const thirdAddBtn = document.getElementById("third-add-btn");

getTaskFromLocal_3();

thirdAddBtn.onclick = function () {
  addTask_3();
};

// Add task to array and DOM when the add button is clicked
function addTask_3() {
  // Task data
  const task = {
    id: Math.floor(Math.random() * 10_000),
    title: "",
  };

  // Push to array of task
  completedTasksArray.push(task);
  // Add to DOM
  addTaskToDOMFrom_3(completedTasksArray);
  // Add to localStorage
  addTaskToLocalFrom_3(completedTasksArray);
  // Add drag functionality for this new task
  addDragForForm_3();
}

// display task in DOM
function addTaskToDOMFrom_3(completedTasksArray) {
  // First empty the container
  completedContainer.innerHTML = "";
  // Loop throgh notStartedTasksArray
  completedTasksArray.forEach((task) => {
    // Create the element
    const newTask_3 = document.createElement("div");
    newTask_3.classList.add("form");
    newTask_3.setAttribute("draggable", true);

    newTask_3.setAttribute("data-id", task.id);
    let inputTxt =
      // Fill the element
      (newTask_3.innerHTML = `
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

    completedContainer.appendChild(newTask_3);
  });
}

// Add task to localstorag
function addTaskToLocalFrom_3(array) {
  localStorage.setItem("completed-tasks", JSON.stringify(array));
}

function getTaskFromLocal_3() {
  if (localStorage.getItem("completed-tasks")) {
    let storedTasks = JSON.parse(localStorage.getItem("completed-tasks"));
    addTaskToDOMFrom_3(storedTasks);
  }
}

function deleteTaskOfId_3(taskID) {
  completedTasksArray = completedTasksArray.filter((task) => {
    return task.id != taskID;
  });
  addTaskToLocalFrom_3(completedTasksArray);
}

// ##### EVENTS #####
// delete button event
completedContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("in-delete-btn")) {
    // Remove from array and loclstorag
    deleteTaskOfId_3(
      +event.target.parentElement.parentElement.getAttribute("data-id")
    );

    // Remove from DOM
    let targetedEl = event.target.parentElement.parentElement;

    targetedEl.remove();
  }
});

// Edit button
completedContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("in-edit-btn")) {
    let input = event.target.parentElement.parentElement.firstElementChild;
    input.removeAttribute("readonly");
    input.focus();
    input.value = "";
    input.addEventListener("blur", (e) => {
      input.setAttribute("readonly", true);
      let ID = +input.getAttribute("data-id");
      completedTasksArray.forEach((task) => {
        if (task.id == ID) {
          task.title = input.value;
        }
      });

      addTaskToLocalFrom_3(completedTasksArray);
    });
  }
});
// ##### DRAG AND DROP #####
// Add isdragging class for all in-dragging form
function addDragForForm_3() {
  let con = completedContainer.querySelectorAll(".form");

  con.forEach((draggableEl) => {
    draggableEl.addEventListener("dragstart", (e) => {
      draggableEl.classList.add("isdragging");
      let title = draggableEl.getElementsByTagName("input")[0].value;
      let id = draggableEl.getAttribute("data-id");

      e.dataTransfer.setData("dragged-from", draggableEl.parentElement.id);
      e.dataTransfer.setData("title", title);
      e.dataTransfer.setData("id", id);
    });
    draggableEl.addEventListener("dragend", () => {
      draggableEl.classList.remove("isdragging");
    });
  });
}
addDragForForm_3();

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
notStartedContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
  const bottomTask = insertAboveTask(notStartedContainer, e.clientY);
  const currentTask = document.querySelector(".isdragging");

  if (!bottomTask) {
    notStartedContainer.appendChild(currentTask);
  } else {
    notStartedContainer.insertBefore(currentTask, bottomTask);
  }
});

inProgressContainer.addEventListener("drop", (e) => {
  let darggedFrom = e.dataTransfer.getData("dragged-from");
  if (darggedFrom == "completed-container") {
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
    completedTasksArray = completedTasksArray.filter(
      (task) => task.id != droppedTask.id
    );

    localStorage.setItem(
      "completed-tasks",
      JSON.stringify(completedTasksArray)
    );
    localStorage.setItem("in-progress-tasks", JSON.stringify(inProgressArray));
  }
});

notStartedContainer.addEventListener("drop", (e) => {
  let darggedFrom = e.dataTransfer.getData("dragged-from");
  if (darggedFrom == "completed-container") {
    console.log("dragged from", darggedFrom);
    let dropedId = e.target.getAttribute("data-id");

    let theBottm = insertAboveTask(notStartedContainer, e.clientY);
    notStartedTasksArray = JSON.parse(
      localStorage.getItem("not-started-tasks")
    );

    let title = e.dataTransfer.getData("title"); // title of dropped item
    let id = +e.dataTransfer.getData("id"); // id of droped item
    let indexOfBottom;
    let idOfBottm = theBottm ? +theBottm.getAttribute("data-id") : 0;
    if ((theBottm !== null) & (theBottm !== 0)) {
      indexOfBottom = notStartedTasksArray
        .map((e) => {
          return +e.id;
        })
        .indexOf(idOfBottm);
    } else {
      indexOfBottom = notStartedTasksArray.length;
    }

    let droppedTask = {
      id: +id,
      title: title,
    };

    notStartedTasksArray.splice(indexOfBottom, 0, droppedTask); // add the dropped task to the droped container array
    completedTasksArray = completedTasksArray.filter(
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
