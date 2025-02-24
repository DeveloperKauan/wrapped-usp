// Variables
const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority-select");
const groupSelect = document.getElementById("group-select");
const addTaskButton = document.getElementById("add-task");
const tasksContainer = document.getElementById("tasks-container");
const shareButton = document.getElementById("share-tasks");
const shareLinkInput = document.getElementById("share-input");
const copyLinkButton = document.getElementById("copy-link");
const toggleThemeButton = document.getElementById("toggle-theme");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

// Initialize the UI
document.body.classList.toggle("dark-mode", darkMode);
renderTasks();

// Event listeners
addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});
shareButton.addEventListener("click", generateShareLink);
copyLinkButton.addEventListener("click", copyShareLink);
toggleThemeButton.addEventListener("click", toggleTheme);

// Functions
function addTask() {
    const taskDescription = taskInput.value.trim();
    const priority = prioritySelect.value;
    const group = groupSelect.value;

    if (taskDescription === "") return;

    const newTask = {
        id: Date.now(),
        description: taskDescription,
        priority: priority,
        group: group,
        completed: false,
        count: 0,
    };

    tasks.push(newTask);
    taskInput.value = ""; // Clear input field
    saveTasks();
    renderTasks();
}

function renderTasks() {
    tasksContainer.innerHTML = "";

    tasks.sort((a, b) => {
        const priorityOrder = { baixa: 1, media: 2, alta: 3 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    tasks.forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        if (task.completed) taskCard.classList.add("complete");

        taskCard.innerHTML = `
            <span class="priority">${task.priority}</span>
            <p>${task.description}</p>
            <button class="delete-btn" onclick="deleteTask(${task.id})">X</button>
            <button onclick="toggleCompletion(${task.id})">Mark as ${task.completed ? "Incomplete" : "Complete"}</button>
            <p>Completed: ${task.count} times</p>
        `;

        tasksContainer.appendChild(taskCard);
    });
}

function toggleCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        if (task.completed) task.count++;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function generateShareLink() {
    const link = `${window.location.origin}?tasks=${encodeURIComponent(JSON.stringify(tasks))}`;
    shareLinkInput.value = link;
    document.getElementById("share-link").classList.remove("hidden");
}

function copyShareLink() {
    shareLinkInput.select();
    document.execCommand("copy");
}

function toggleTheme() {
    darkMode = !darkMode;
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
    saveTasks();
}
