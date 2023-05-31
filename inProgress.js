let formContainer = document.querySelectorAll(".form-container");

let inProgressContainer = document.getElementById("in-progress-container");
let notStartedContainer = document.getElementById("not-started-container");
let completedContainer = document.getElementById("completed-container");

const secondAddBtn = document.getElementById("second-add-btn");

let inProgressArray = localStorage.getItem("in-progress-tasks")
  ? JSON.parse(localStorage.getItem("in-progress-tasks"))
  : [];

let notStartedTasksArray = localStorage.getItem("not-started-tasks")
  ? JSON.parse(localStorage.getItem("not-started-tasks"))
  : [];

let completedTasksArray = localStorage.getItem("completed-tasks")
  ? JSON.parse(localStorage.getItem("completed-tasks"))
  : [];

getTaskFromLocal_2();

secondAddBtn.onclick = function () {
  addTask_2();
};

// Add task to array and DOM when the add button is clicked
function addTask_2() {
  // Task data
  const task = {
    id: Math.floor(Math.random() * 100 + 100),
    title: "",
  };

  // Push to array of task
  inProgressArray.push(task);
  // Add to DOM
  addTaskToDOMFrom_2(inProgressArray);
  // Add to localStorage
  addTaskToLocalFrom_2(inProgressArray);
  // Add drag functionality for this new task
  addDragForForm_2();
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
      +event.target.parentElement.parentElement.getAttribute("data-id")
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
      let ID = +input.getAttribute("data-id");
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
function addDragForForm_2() {
  let con = inProgressContainer.querySelectorAll(".form");

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
addDragForForm_2();

// Listen to dragover and insert the element at desired position
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

notStartedContainer.addEventListener("drop", (e) => {
  let darggedFrom = e.dataTransfer.getData("dragged-from");
  if (darggedFrom == "in-progress-container") {
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
    inProgressArray = inProgressArray.filter(
      (task) => task.id != droppedTask.id
    );
    console.log(inProgressArray);
    localStorage.setItem("in-progress-tasks", JSON.stringify(inProgressArray));
    localStorage.setItem(
      "not-started-tasks",
      JSON.stringify(notStartedTasksArray)
    );
  }
});

completedContainer.addEventListener("drop", (e) => {
  let darggedFrom = e.dataTransfer.getData("dragged-from");
  if (darggedFrom == "in-progress-container") {
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
    inProgressArray = inProgressArray.filter(
      (task) => task.id != droppedTask.id
    );

    localStorage.setItem("in-progress-tasks", JSON.stringify(inProgressArray));
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
