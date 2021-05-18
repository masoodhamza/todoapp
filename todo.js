// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCsYbVVwvsDYF5l8ATKDywEMt75Q8Jf5js",
  authDomain: "todos-devnation.firebaseapp.com",
  projectId: "todos-devnation",
  storageBucket: "todos-devnation.appspot.com",
  messagingSenderId: "918867420794",
  appId: "1:918867420794:web:38857dfc247a6e15c4fdc3",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Implement the Add Function.
const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const completed = document.querySelector(".completed");

//add form data
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = addForm.add.value.trim();
  //call the addTodo function to add the Todo to the list.
  if (title.length) {
    const todo = {
      title: title,
    };

    addForm.reset();

    db.collection("todos")
      .add(todo)
      .then(() => {
        console.log("Todo added");
      })
      .catch((err) => console.log(err));
  }
});

//Implement a function that creates an HTML template that we can add to the DOM.
const addTodo = (todo, id) => {
  const html = `
  <li class="list-group-item" data-id=${id}>
    ${todo.title}
    <button class="btn btn-danger float-right">
      <i class="material-icons float-right delete">delete</i>
    </button>
  </li>
    `;
  list.innerHTML += html;
};

// Delete documents from firestore.
list.addEventListener("click", (e) => {
  if (e.target.tagName === "I") {
    const id = e.target.parentElement.parentElement.getAttribute("data-id");
    db.collection("todos")
      .doc(id)
      .delete()
      .then(() => {
        console.log("todo deleted");
      });
  }
});

const deleteTodo = (id) => {
  const todos = document.querySelectorAll("li");
  todos.forEach((todo) => {
    if (todo.getAttribute("data-id") === id) {
      todo.remove();
    }
  });
};

// Real Time UI Updates.
// By attaching a real-time updates listener that firestore provides us.
db.collection("todos").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    const doc = change.doc;
    if (change.type === "added") {
      addTodo(doc.data(), doc.id);
    } else if (change.type === "removed") {
      deleteTodo(doc.id);
    }
  });
});

// Implement the Searching & Filtering Function.
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
