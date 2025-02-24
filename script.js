document.addEventListener("DOMContentLoaded", loadTasks);

const tasks = JSON.parse(localStorage.getItem("tasks")) || [
    { id: 1, description: "Bandecar", group: "pessoal", routine: "diaria", completed: false },
    { id: 2, description: "Biblioteca", group: "estudos", routine: "as-vezes", completed: false },
    { id: 3, description: "Toquei em algum projeto pessoal que não terminei", group: "trabalho", routine: "semanal", completed: false }
];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    document.querySelectorAll(".task-list").forEach(el => el.innerHTML = "");
    tasks.forEach(renderTask);
    updateStats();
}

function addTask() {
    const description = document.getElementById("task-desc").value;
    const group = document.getElementById("task-group").value;
    const routine = document.getElementById("task-routine").value;

    if (!description.trim()) return;

    const newTask = {
        id: Date.now(),
        description,
        group,
        routine,
        completed: false
    };

    tasks.push(newTask);
    renderTask(newTask);
    saveTasks();
    document.getElementById("task-desc").value = "";
}

function renderTask(task) {
    const taskList = document.getElementById(task.group).querySelector(".task-list");
    const taskElement = document.createElement("div");
    taskElement.classList.add("task-card", task.routine);
    if (task.completed) taskElement.classList.add("complete");

    taskElement.innerHTML = `
        <p>${task.description}</p>
        <button onclick="toggleCompletion(${task.id})">✔</button>
    `;

    taskList.appendChild(taskElement);
}

function toggleCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        loadTasks();
    }
}

function updateStats() {
    const completedCount = tasks.filter(t => t.completed).length;
    document.getElementById("completed-count").textContent = completedCount;
}
