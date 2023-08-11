window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const listEl = document.querySelector("#tasks");

    // Load tasks from local storage on page load
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (const taskText of savedTasks) {
        createTaskElement(taskText);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert("Please fill out the task");
            return;
        }

        createTaskElement(task);
        saveTasksToLocalStorage();

        input.value = "";
    });

    function createTaskElement(taskText) {
        const taskEl = document.createElement("div");
        taskEl.classList.add("task");

        const taskContentEl = document.createElement("div");
        taskContentEl.classList.add("content");

        taskEl.appendChild(taskContentEl);

        const taskInputEl = document.createElement("input");
        taskInputEl.classList.add("text");
        taskInputEl.type = "text";
        taskInputEl.value = taskText;
        taskInputEl.setAttribute("readonly", "readonly");

        taskContentEl.appendChild(taskInputEl);

        const taskActionEl = document.createElement("div");
        taskActionEl.classList.add("actions");

        const taskEditEl = document.createElement("button");
        taskEditEl.classList.add("edit");
        taskEditEl.innerHTML = "Edit";

        const taskDeleteEl = document.createElement("button");
        taskDeleteEl.classList.add("delete");
        taskDeleteEl.innerHTML = "Delete";

        taskActionEl.appendChild(taskEditEl);
        taskActionEl.appendChild(taskDeleteEl);
        taskEl.appendChild(taskActionEl);

        listEl.appendChild(taskEl);

        taskEditEl.addEventListener('click', () => {
            if (taskInputEl.getAttribute("readonly") === "readonly") {
                taskInputEl.removeAttribute("readonly");
                taskInputEl.focus();
                taskEditEl.innerHTML = "Save";
            } else {
                taskInputEl.setAttribute("readonly", "readonly");
                taskEditEl.innerHTML = "Edit";
                saveTasksToLocalStorage();
            }
        });

        taskDeleteEl.addEventListener('click', () => {
            listEl.removeChild(taskEl);
            saveTasksToLocalStorage();
        });
    }

    function saveTasksToLocalStorage() {
        const tasks = Array.from(document.querySelectorAll(".text")).map(input => input.value);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
