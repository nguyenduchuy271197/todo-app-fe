function renderTodos(todos) {
  const todoContainer = document.querySelector("#todo-container");

  const markup = todos.reduce(
    (prev, item) =>
      prev +
      `
        <li
        class="list-group-item d-flex justify-content-between align-items-center"
        >
            <div class="flex-shrink-0">
                <input
                class="todo-check-input"
                type="checkbox"
                ${item.done && "checked"}
                id="${item.id}"
                />
            </div>

            <div class="ms-2 me-auto ${item.done && "text-line-through"}">
            ${item.content}</div>

            <div>
                <button type="button" class="btn btn-light" data-edit-target="${
                  item.id
                }">Edit</button>
                <button type="button" class="btn btn-danger" data-delete-target="${
                  item.id
                }">Delete</button>
            </div>
        </li>
    `,
    ""
  );

  todoContainer.innerHTML = markup;

  const todoCheckEls = document.querySelectorAll(".todo-check-input");
  const editBtnEls = document.querySelectorAll("[data-edit-target]");
  const deleteBtnEls = document.querySelectorAll("[data-delete-target]");

  todoCheckEls.forEach((checkEl) => {
    checkEl.addEventListener("change", function (e) {
      const todoId = e.target.id;

      const todo = todos.find((todo) => todo.id === todoId);
      todo.done = !todo.done;

      renderTodos(todos);
    });
  });

  deleteBtnEls.forEach((deleteEl) => {
    deleteEl.addEventListener("click", function (e) {
      const todoId = e.target.dataset.deleteTarget;
      todos = todos.filter((todo) => todo.id !== todoId);
      renderTodos(todos);
    });
  });
}

function randomId(length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}

let todos = [
  {
    id: "1",
    content: "Task 1",
    done: false,
  },
  {
    id: "2",
    content: "Task 2",
    done: true,
  },
  {
    id: "3",
    content: "Task 3",
    done: true,
  },
];

const taskInputEl = document.querySelector("#new-task-input");
const addBtnEl = document.querySelector("#add-btn");

addBtnEl.addEventListener("click", function () {
  const content = taskInputEl.value;
  todos = [...todos, { id: randomId(), content, done: false }];
  renderTodos(todos);
});

renderTodos(todos);
