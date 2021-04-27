// Task 1: Implement the Add Function.
const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const completed = document.querySelector(".completed");

//get tasks from local storage
const existingTodos = localStorage.getItem("todo");
list.innerHTML = existingTodos;

const existingComplted = localStorage.getItem("completed");
completed.innerHTML = existingComplted;

//update localstorage
const updateLocalStorage = () => {
  localStorage.setItem("completed", completed.innerHTML.toString());
  localStorage.setItem("todo", list.innerHTML.toString());
};

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addForm.add.value.trim();
  //call the generateTemplate function to add the Todo to the list.
  if (todo.length) {
    generateTemplate(todo);
    // remove the todo from the input field.
    addForm.reset();
  }
});

//Implement a function that creates an HTML template that we can add to the DOM.

const generateTemplate = (todo) => {
  const html = `
  <li class="list-group-item">
    ${todo}
    <i class="material-icons float-right done">done</i>
    <i class="material-icons float-right delete">delete</i>
  </li>
    `;
  list.innerHTML += html;
  localStorage.setItem("todo", list.innerHTML.toString());
};

// Task 2: Implement the Delete Function.

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    updateLocalStorage();
  } else if (e.target.classList.contains("done")) {
    e.target.classList.add("undo");
    e.target.innerHTML = "undo";
    e.target.classList.remove("done");

    const done = e.target.parentElement.innerHTML;
    generateDone(done);
    e.target.parentElement.remove();
    updateLocalStorage();
  }
});

// Task 3: Implement the Searching & Filtering Function.

const search = document.querySelector(".search input");

search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filteredTodos(term);
});

// Implement a function that takes the term and matches with the todo item list.

const filteredTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

// Task 4: Add another "complete" icon right next to the delete icon.
// Task 5: Implement a function that takes the "complete icon" and adds a click event listener
// Task 6: background color (dull), strikethrough, add to the completed task

completed.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    updateLocalStorage();
  } else if (e.target.classList.contains("undo")) {
    e.target.classList.add("done");
    e.target.innerHTML = "done";
    e.target.classList.remove("undo");

    const undo = e.target.parentElement.innerHTML;
    generateUndo(undo);
    e.target.parentElement.remove();
    updateLocalStorage();
  }
});

const generateDone = (done) => {
  const html = `
  <li class="list-group-item">
    ${done}
  </li>
    `;
  completed.innerHTML += html;
  updateLocalStorage();
};

const generateUndo = (undo) => {
  const html = `
  <li class="list-group-item">
    ${undo}
  </li>
    `;
  list.innerHTML += html;
  updateLocalStorage();
};
