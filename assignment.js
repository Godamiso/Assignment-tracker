const assignmentList = document.getElementById("assignmentList");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks
function renderTasks() {
  assignmentList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      tasks[index].done = checkbox.checked;
      saveTasks();
    });

    const span = document.createElement("span");
    span.textContent = task.name;
    if (task.done) span.style.textDecoration = "line-through";

    checkbox.addEventListener("change", () => {
      span.style.textDecoration = checkbox.checked ? "line-through" : "none";
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    assignmentList.appendChild(li);
  });
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Add new task
addBtn.addEventListener("click", () => {
  const taskName = taskInput.value.trim();
  if (taskName !== "") {
    tasks.push({ name: taskName, done: false });
    saveTasks();
    taskInput.value = "";
  }
});

// Load on startup
renderTasks();
