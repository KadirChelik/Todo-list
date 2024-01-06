// Get the reference to the <ul> element
let ulDOM = document.querySelector("#list");

// Get the reference to the input element
let inputElement = document.querySelector("#task");

// Get the references to the toast elements
const toasts = document.querySelectorAll("#liveToast");

// Get the reference to the add button
const btnadd = document.querySelector("#liveToastBtn");

// Retrieve the task list from localStorage
let todoList = localStorage.getItem("todolist");

// Create an array to store the tasks
let dizi = [];

// If the task list exists in localStorage
if (todoList) {

  // Parse the JSON string to an array
  dizi = JSON.parse(todoList);

  // Iterate through the array to create and append <li> elements for each task
  for (let i = 0; i < dizi.length; i++) {
    let value = dizi[i];
    let liDOM = createListItem(value, i);
    ulDOM.appendChild(liDOM);
  }
}

// Listen for "keyup" event on the input element
inputElement.addEventListener("keyup", function (event) {

  // Check if the Enter key is pressed
  if (event.key === "Enter") {

    // Trim the input value and check if it is empty
    if (inputElement.value.trim() === "") {
      // Show the empty input toast
      $(toasts[1]).toast('show');
      event.preventDefault();
      return;
    }

    // Call the newElement function to add a new task
    newElement();
  }
});

// Function to add a new task
function newElement() {

  // Trim the input value and check if it is empty
  if (inputElement.value.trim() === "") {
    // Show the empty input toast
    $(toasts[1]).toast('show');
    event.preventDefault();
    return;
  }

  // Get the input value
  let value = inputElement.value;

  // Create a new <li> element for the task
  let liDOM = createListItem(value, dizi.length);
  // Append the <li> element to the <ul> element
  ulDOM.appendChild(liDOM);

  // Add the task to the array
  dizi.push(value);

  // Update the task list in localStorage
  localStorage.setItem("todolist", JSON.stringify(dizi));

  // Clear the input value
  inputElement.value = "";

  // Show the success toast
  $(toasts[0]).toast('show');
}

// Function to create a <li> element for a task
function createListItem(value, index) {

  // Create a new <li> element
  let liDOM = document.createElement("li");

  // Create a text node with the task value
  let textNode = document.createTextNode(value);

  // Set the innerHTML of the <li> element with the task value and a delete button
  liDOM.innerHTML = `${textNode.textContent} <button type="button" class="btn btn-dark"><i class="fa-solid fa-xmark" style="color: #ffffff;"></i></button>`;

  // Add the necessary classes to the <li> element
  liDOM.classList.add(
    "rounded-pill",
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );

  // Get the reference to the delete button within the <li> element
  let closeButton = liDOM.querySelector(".btn-dark");

  // Listen for click event on the delete button
  closeButton.addEventListener("click", function () {

  // Remove the <li> element from the DOM
  liDOM.remove();

  // Remove the task from the array using the index
  dizi.splice(index, 1);

  // Update the task list in localStorage
  localStorage.setItem("todolist", JSON.stringify(dizi));

  // Reorder the items and update the indexes
  ulDOM.innerHTML = "";
  for (let i = 0; i < dizi.length; i++) {
  let value = dizi[i];
  let liDOM = createListItem(value, i);
  ulDOM.appendChild(liDOM);
}
});
  // Return the created <li> element
  return liDOM;
}
// Listen for click event on the task list
let completed1 = document.querySelector("#list");
completed1.addEventListener("click", function (event) {
let clickedElement = event.target;

// Check if the clicked element is an <li> element
if (clickedElement.tagName === "LI") {
  
// Toggle the "checked" class to mark/unmark the task as completed
clickedElement.classList.toggle("checked");
}
});
