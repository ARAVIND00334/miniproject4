document.addEventListener("DOMContentLoaded", function () {
  const todoinput = document.getElementById("todoinput");
  const todobutton = document.getElementById("todobutton");
  const todolist = document.getElementById("todolist");

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  function rendertodos() {
    todolist.innerHTML = ""
    todos.forEach((todo, index) => {
      const listitem = document.createElement("li")
      listitem.className =
        "list-group-item d-flex justy-content-center align-item-center";

      if (todo.completed) {
        listitem.classList.add("completed");
      }
      listitem.textContent = todo.text;

      const deletebutton = document.createElement("button");
      deletebutton.className = "btn btn-success p-2 m-10 btn-lm";
      deletebutton.textContent = "delete";
      deletebutton.addEventListener("click", () => {
        deletetodo(index);
      });
      listitem.appendChild(deletebutton);
      listitem.addEventListener("click", () => {
        toogletodocompleted(index);
      });
      todolist.appendChild(listitem);
    });

    function deletetodo(index) {
      todos.splice(index, 1);
      savetodos();
      rendertodos();
    }
    function toogletodocompleted(index) {
      todos[index].completed = !todos[index].completed;
      savetodos();
      rendertodos();
    }
  }

  function addtodo() {
    const tasktext = todoinput.value.trim()
    if (tasktext === "") return
    todos.push({ text: tasktext, completed: true })
    
    savetodos()
    rendertodos()
  }
  function savetodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  todobutton.addEventListener("click", addtodo);

  todoinput.addEventListener("keypress", (event) => {
    if (event.key == "enter") {
      addtodo()
    }
  });
  rendertodos();
});
