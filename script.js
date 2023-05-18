const firstAddBtn = document.getElementById("first-add-btn");
const secondAddBtn = document.getElementById("second-add-btn");
const thirdAddBtn = document.getElementById("third-add-btn");

const notStartedForm = document.getElementById("not-started-form");
const progressForm = document.getElementById("progress-form");
const completeForm = document.getElementById("complete-form");

// Add new input to DOM
function addNewInputToDom(whichType) {
  const newInput = document.createElement("div");
  newInput.classList.add("form");

  newInput.innerHTML = `
  <input type="text" placeholder="New task" />
  <button class="inside-btn edit-btn" id="edit-btn">
    <i class="fa fa-pencil"></i>
  </button>
  <button class="inside-btn delete-btn" id="delete-btn">
    <i class="fa fa-trash"></i>
  </button>
  `;

  whichType.appendChild(newInput);
}

// ************ Events ************** //

// Add button event

firstAddBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addNewInputToDom(notStartedForm);
});

secondAddBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addNewInputToDom(progressForm);
});

thirdAddBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addNewInputToDom(completeForm);
});
