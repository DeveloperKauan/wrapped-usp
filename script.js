// scripts.js

document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskGroups = document.getElementById("task-groups");
    const statistics = document.getElementById("statistics");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [
        { description: "Bandecar", group: "Pessoal", routine: "Diariamente", count: 0 },
        { description: "Biblioteca", group: "Estudos", routine: "As vezes", count: 0 },
        { description: "Toquei em algum projeto pessoal que não terminei", group: "Trabalho", routine: "Semanalmente", count: 0 }
    ];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        taskGroups.innerHTML = "";
        const groupedTasks = {};

        tasks.forEach(task => {
            if (!groupedTasks[task.group]) {
                groupedTasks[task.group] = [];
            }
            groupedTasks[task.group].push(task);
        });

        Object.keys(groupedTasks).forEach(group => {
            const groupElement = document.createElement("div");
            groupElement.classList.add("task-group");
            groupElement.innerHTML = `<h3>${group}</h3>`;

            groupedTasks[group].forEach((task, index) => {
                const taskElement = document.createElement("div");
                taskElement.classList.add("task");
                taskElement.innerHTML = `
                    <div class="task-left" style="border-left: 5px solid ${getRoutineColor(task.routine)}">
                        <span>${task.description}</span>
                        <button class="complete-btn" data-index="${index}">Concluir (${task.count})</button>
                        <button class="delete-btn" data-index="${index}">🗑</button>
                    </div>
                `;
                groupElement.appendChild(taskElement);
            });

            taskGroups.appendChild(groupElement);
        });

        updateStatistics();
    }

    function getRoutineColor(routine) {
        switch (routine) {
            case "Diariamente": return "green";
            case "As vezes": return "yellow";
            case "Semanalmente": return "gray";
            default: return "black";
        }
    }

    function updateStatistics() {
        statistics.innerHTML = "<h3>Retrospectiva Universitária</h3>";
        tasks.forEach(task => {
            statistics.innerHTML += `<p>${task.description}: ${task.count} vezes</p>`;
        });
    }

    addTaskBtn.addEventListener("click", () => {
        const description = taskInput.value.trim();
        const group = document.getElementById("group-select").value;
        const routine = document.getElementById("routine-select").value;
        if (description) {
            tasks.push({ description, group, routine, count: 0 });
            saveTasks();
            renderTasks();
            taskInput.value = "";
        }
    });

    taskGroups.addEventListener("click", (e) => {
        if (e.target.classList.contains("complete-btn")) {
            const index = e.target.getAttribute("data-index");
            tasks[index].count += 1;
            saveTasks();
            renderTasks();
        } else if (e.target.classList.contains("delete-btn")) {
            const index = e.target.getAttribute("data-index");
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    });

    renderTasks();
});
