document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("new-task");
    const addTaskButton = document.getElementById("add-task");
    const groupsContainer = document.getElementById("groups");
    const statsList = document.getElementById("stats-list");
    const themeToggle = document.getElementById("toggleTheme");
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [
        { name: "Bandecar", group: "Pessoal", routine: "diaria", count: 0 },
        { name: "Biblioteca", group: "Estudos", routine: "vezes", count: 0 },
        { name: "Toquei em algum projeto pessoal que não terminei", group: "Trabalho", routine: "semanal", count: 0 }
    ];
    
    let theme = localStorage.getItem("theme") || "light";
    document.body.classList.toggle("dark-mode", theme === "dark");

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }

    function renderTasks() {
        groupsContainer.innerHTML = "";
        statsList.innerHTML = "";

        let groupedTasks = {};
        tasks.forEach(task => {
            if (!groupedTasks[task.group]) groupedTasks[task.group] = [];
            groupedTasks[task.group].push(task);
        });

        Object.keys(groupedTasks).forEach(group => {
            const groupDiv = document.createElement("div");
            groupDiv.classList.add("group");
            groupDiv.innerHTML = `<h3>${group}</h3>`;

            groupedTasks[group].forEach((task, index) => {
                const taskDiv = document.createElement("div");
                taskDiv.classList.add("task", task.routine);
                taskDiv.innerHTML = `
                    <span>${task.name}</span>
                    <button onclick="markTask(${index})">✔</button>
                    <button onclick="deleteTask(${index})">🗑</button>
                `;
                groupDiv.appendChild(taskDiv);
            });

            groupsContainer.appendChild(groupDiv);
        });

        tasks.forEach(task => {
            const statItem = document.createElement("li");
            statItem.textContent = `${task.name}: ${task.count} vezes`;
            statsList.appendChild(statItem);
        });
    }

    window.markTask = function(index) {
        tasks[index].count++;
        saveTasks();
    };

    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        saveTasks();
    };

    addTaskButton.addEventListener("click", () => {
        const taskName = taskInput.value.trim();
        if (taskName) {
            tasks.push({ name: taskName, group: "Outros", routine: "semanal", count: 0 });
            taskInput.value = "";
            saveTasks();
        }
    });

    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTaskButton.click();
        }
    });

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
        localStorage.setItem("theme", theme);
    });

    renderTasks();
});
