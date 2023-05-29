let completedContainer = document.getElementById("completed-container");

const thirdAddBtn = document.getElementById("third-add-btn");

completedTasksArray = localStorage.getItem("comleted-tasks")
  ? JSON.parse(localStorage.getItem("comleted-tasks"))
  : [];

getTaskFromLocal_3();

thirdAddBtn.onclick = function () {
  addTask_3();
};

// Add task to array and DOM when the add button is clicked
function addTask_3() {
  // Task data
  const task = {
    id: Math.floor(Math.random() * 10000),
    title: "",
  };

  // Push to array of task
  completedTasksArray.push(task);
  // Add to DOM
  addTaskToDOMFrom_3(completedTasksArray);
  // Add to localStorage
  addTaskToLocalFrom_3(completedTasksArray);
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
    newTask_3.setAttribute("data-id", task.id);
    let inputTxt =
      // Fill the element
      (newTask_3.innerHTML = `
    <input type="text"  placeholder="Enter New Task.." readonly value="${task.title}" data-id="${task.id}"/>
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
      event.target.parentElement.parentElement.getAttribute("data-id")
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
      let ID = input.getAttribute("data-id");
      completedTasksArray.forEach((task) => {
        if (task.id == ID) {
          task.title = input.value;
        }
      });
      console.log(completedTasksArray);
      addTaskToLocalFrom_3(completedTasksArray);
    });
  }
});
