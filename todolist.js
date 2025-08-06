const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const dueDateInput = document.getElementById("dueDate");
const categoryInput = document.getElementById("categoryInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const desc = document.createElement("span");
    desc.className = "task-desc";
    desc.textContent = task.text;
    if (task.completed) desc.classList.add("completed");

    const meta = document.createElement("div");
    meta.className = `task-meta priority-${task.priority}`;
    meta.innerHTML = `
      Priority: ${task.priority} | 
      Due: ${task.dueDate || "N/A"} | 
      Category: ${task.category || "General"}
    `;

    const editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit task:", task.text);
      if (newText && newText.trim()) {
        task.text = newText.trim();
        saveTasks();
        renderTasks();
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(desc);
    li.appendChild(meta);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const priority = prioritySelect.value;
  const dueDate = dueDateInput.value;
  const category = categoryInput.value.trim();

  if (text === "") {
    alert("Task cannot be empty.");
    return;
  }

  tasks.push({
    text,
    completed: false,
    priority,
    dueDate,
    category
  });

  saveTasks();
  renderTasks();

  taskInput.value = "";
  categoryInput.value = "";
  dueDateInput.value = "";
  prioritySelect.value = "Low";
});

renderTasks();
