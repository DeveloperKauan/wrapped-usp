document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const routineSelect = document.getElementById("routine-select");
    const groupSelect = document.getElementById("group-select");
    const addTaskButton = document.getElementById("add-task");
    const tasksContainer = document.getElementById("tasks-container");
    const toggleThemeButton = document.getElementById("toggle-theme");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [
        { id: 1, description: "Bandecar", group: "Pessoal", routine: "diaria", completed: 0 },
        { id: 2, description: "Biblioteca", group: "Estudos", routine: "asvezes", completed: 0 },
        { id: 3, description: "Toquei em algum projeto pessoal que não terminei", group: "Trabalho", routine: "semanal", completed: 0 }
    ];

    let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
    document.body.classList.toggle("dark-mode", darkMode);

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        tasksContainer.innerHTML = "";

        tasks.forEach(task => {
            const taskCard = document.createElement("div");
            taskCard.classList.add("task-card");

            const routineIndicator = document.createElement("div");
            routineIndicator.classList.add("routine-indicator", `routine-${task.routine}`);

            const taskInfo = document.createElement("div");
            taskInfo.classList.add("task-info");
            taskInfo.innerHTML = `
                <strong>${task.group}</strong>: ${task.description}
                <p>Feita ${task.completed} vezes</p>
            `;

            const completeButton = document.createElement("button");
            completeButton.textContent = "Concluir";
            completeButton.addEventListener("click", () => {
                task.completed++;
                saveTasks();
                renderTasks();
            });

            taskCard.appendChild(routineIndicator);
            taskCard.appendChild(taskInfo);
            taskCard.appendChild(completeButton);
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
