document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const routineSelect = document.getElementById("routine-select");
    const groupSelect = document.getElementById("group-select");
    const addTaskButton = document.getElementById("add-task");
    const tasksContainer = document.getElementById("tasks-container");
    const toggleThemeButton = document.getElementById("toggle-theme");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
    document.body.classList.toggle("dark-mode", darkMode);

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        tasksContainer.innerHTML = "";

        tasks.forEach((task, index) => {
            const taskCard = document.createElement("div");
            taskCard.classList.add("task-card");

            const taskInfo = document.createElement("div");
            taskInfo.classList.add("task-info");
            taskInfo.innerHTML = `
                <strong>${task.group}</strong>: ${task.description}
                <p>Feita ${task.completed} vezes</p>
            `;

            const taskButtons = document.createElement("div");
            taskButtons.classList.add("task-buttons");

            const completeButton = document.createElement("button");
            completeButton.textContent = "+1";
            completeButton.addEventListener("click", () => {
                task.completed++;
                saveTasks();
                renderTasks();
            });

            const decreaseButton = document.createElement("button");
            decreaseButton.textContent = "-1";
            decreaseButton.addEventListener("click", () => {
                if (task.completed > 0) task.completed--;
                saveTasks();
                renderTasks();
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "🗑";
            deleteButton.addEventListener("click", () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            taskButtons.appendChild(completeButton);
            taskButtons.appendChild(decreaseButton);
            taskButtons.appendChild(deleteButton);

            taskCard.appendChild(taskInfo);
            taskCard.appendChild(taskButtons);
            tasksContainer.appendChild(taskCard);
        });
    }

    addTaskButton.addEventListener("click", () => {
        const description = taskInput.value.trim();
        const routine = routineSelect.value;
        const group = groupSelect.value;

        if (description === "") return;

        tasks.push({
            id: Date.now(),
            description,
            group,
            routine,
            completed: 0
        });

        taskInput.value = "";
        saveTasks();
        renderTasks();
    });

    toggleThemeButton.addEventListener("click", () => {
        darkMode = !darkMode;
        document.body.classList.toggle("dark-mode", darkMode);
        localStorage.setItem("darkMode", darkMode);
    });

    renderTasks();
});
