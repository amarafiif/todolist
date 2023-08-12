window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const listEl = document.querySelector("#tasks");

    loadTasksFromLocalStorage();

    form.addEventListener('submit', handleFormSubmission);

    function handleFormSubmission(e) {
        e.preventDefault();

        const task = input.value.trim();
        if (!task) {
            alert("Please fill out the task");
            return;
        }

        createTaskElement(task);
        saveTasksToLocalStorage();

        input.value = "";
    }

    function loadTasksFromLocalStorage() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        for (const taskText of savedTasks) {
            createTaskElement(taskText);
        }
    }

    function createTaskElement(taskText) {
        const taskEl = document.createElement("div");
        taskEl.classList.add("relative", "mb-2");
    
        const taskInputEl = document.createElement("input");
        taskInputEl.classList.add("block", "w-full", "p-4", "text-sm", "text-gray-900", "border", "border-gray-300", "rounded-lg", "bg-gray-50", "focus:ring-blue-500", "focus:border-blue-500", "dark:bg-gray-700", "dark:border-gray-600", "dark:placeholder-gray-400", "dark:text-white", "dark:focus:ring-blue-500", "dark:focus:border-blue-500");
        taskInputEl.type = "text";
        taskInputEl.value = taskText;
        taskInputEl.setAttribute("readonly", "readonly");
        taskInputEl.placeholder = "What do you have planned?";
        
        taskEl.appendChild(taskInputEl);
    
        const taskActionEl = document.createElement("div");
        taskActionEl.classList.add("actions", "absolute", "right-2", "top-1/2", "transform", "-translate-y-1/2", "flex", "gap-2");
    
        const taskEditEl = document.createElement("button");
        taskEditEl.classList.add("text-white", "bg-blue-700", "hover:bg-blue-800", "focus:ring-4", "focus:outline-none", "focus:ring-blue-300", "font-medium", "rounded-lg", "text-sm", "px-4", "py-2", "dark:bg-blue-600", "dark:hover:bg-blue-700", "dark:focus:ring-blue-800");
        taskEditEl.innerHTML = "Edit";
    
        const taskDeleteEl = document.createElement("button");
        taskDeleteEl.classList.add("text-white", "bg-green-700", "hover:bg-green-800", "focus:ring-4", "focus:outline-none", "focus:ring-green-300", "font-medium", "rounded-lg", "text-sm", "px-4", "py-2", "dark:bg-green-600", "dark:hover:bg-green-700", "dark:focus:ring-blue-800");
        taskDeleteEl.innerHTML = "Done";
    
        taskActionEl.appendChild(taskEditEl);
        taskActionEl.appendChild(taskDeleteEl);
        taskEl.appendChild(taskActionEl);
    
        listEl.appendChild(taskEl);
    
        taskEditEl.addEventListener('click', (e) => {
            e.preventDefault();
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
    
        taskDeleteEl.addEventListener('click', (e) => {
            e.preventDefault();
            listEl.removeChild(taskEl);
            saveTasksToLocalStorage();
        });
    }

    function saveTasksToLocalStorage() {
        const tasks = Array.from(document.querySelectorAll(".relative input"))
                    .map(input => input.value)
                    .filter((value, index, self) => self.indexOf(value) === index); // filter out duplicates
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    
});
