import TaskManager from "./Task.js";
var savedTasks = localStorage.getItem("taskList");
var storedTaskList = savedTasks ? JSON.parse(savedTasks) : [];
var taskManager = new TaskManager(storedTaskList);
export function updateTaskElement(task, taskElement) {
    taskElement.innerHTML = "\n    <h3>".concat(task.title, " <span>\u2013 Priorit\u00E9 ").concat(task.priority, "</span></h3>\n    <p>Cat\u00E9gorie: ").concat(task.category.title, "</p>\n    <p>Date d'\u00E9ch\u00E9ance: ").concat(task.date, "</p>\n    <p>").concat(task.description, "</p>\n    <button type=\"button\" data-index=\"").concat(taskManager.tasks.indexOf(task), "\" class=\"delete-btn\">Supprimer</button>\n    <button type=\"button\" data-index=\"").concat(taskManager.tasks.indexOf(task), "\" class=\"edit-btn\">Modifier</button>\n  ");
}
export function createFormDom(taskIndex) {
    // Create a form in the dom like a popup
    // Same form template as the one in index.html, thanks GPT for the conversion from html to dom creating form
    var form = document.createElement("form");
    form.id = "editTaskForm";
    // title
    var title = document.createElement("input");
    title.name = "title";
    title.type = "text";
    title.id = "taskTitle";
    title.placeholder = "Titre de la tâche";
    title.required = true;
    console.log(taskManager.tasks);
    if (taskManager && taskManager.tasks && taskManager.tasks[taskIndex]) {
        title.value = taskManager.tasks[taskIndex].title;
    }
    form.appendChild(title);
    // description
    var description = document.createElement("textarea");
    description.name = "description";
    title.type = "text";
    description.id = "taskDescription";
    description.placeholder = "Description de la tâche";
    if (taskManager && taskManager.tasks && taskManager.tasks[taskIndex]) {
        description.value = taskManager.tasks[taskIndex].description;
    }
    form.appendChild(description);
    // date
    var date = document.createElement("input");
    date.name = "date";
    date.type = "date";
    date.id = "taskDueDate";
    if (taskManager && taskManager.tasks && taskManager.tasks[taskIndex]) {
        date.value = taskManager.tasks[taskIndex].date;
    }
    form.appendChild(date);
    // priority
    var priority = document.createElement("select");
    priority.name = "priority";
    priority.id = "taskPriority";
    if (taskManager && taskManager.tasks && taskManager.tasks[taskIndex]) {
        priority.value = taskManager.tasks[taskIndex].priority;
    }
    var optionLow = document.createElement("option");
    optionLow.value = "low";
    optionLow.textContent = "Faible";
    priority.appendChild(optionLow);
    var optionMedium = document.createElement("option");
    optionMedium.value = "medium";
    optionMedium.textContent = "Moyenne";
    optionMedium.selected = true;
    priority.appendChild(optionMedium);
    var optionHigh = document.createElement("option");
    optionHigh.value = "high";
    optionHigh.textContent = "Haute";
    priority.appendChild(optionHigh);
    form.appendChild(priority);
    // category
    var category = document.createElement("input");
    category.name = "category";
    category.type = "text";
    category.id = "taskCategory";
    category.placeholder = "Nom de la Categorie";
    if (taskManager && taskManager.tasks && taskManager.tasks[taskIndex]) {
        category.value = taskManager.tasks[taskIndex].category.title;
    }
    form.appendChild(category);
    // submit button
    var submit = document.createElement("button");
    submit.type = "submit";
    submit.id = "addTask";
    submit.textContent = "Ajouter Tâche";
    form.appendChild(submit);
    // cancel button
    var cancel = document.createElement("button");
    cancel.type = "submit";
    cancel.id = "cancel";
    cancel.textContent = "Annuler";
    form.appendChild(cancel);
    var editFromSection = document.getElementById("editFrom");
    editFromSection === null || editFromSection === void 0 ? void 0 : editFromSection.appendChild(form);
}
export function deleteAllTasks() {
    var taskList = document.getElementById("tasks");
    if (taskList) {
        taskList.innerHTML = "";
    }
}
export function renderTasks(taskManager) {
    var taskList = document.getElementById("tasks");
    if (taskList) {
        taskManager.tasks.forEach(function (task, index) {
            var taskElement = document.createElement("div");
            var classPriority = "";
            switch (task.priority.toLowerCase()) {
                case "faible":
                    classPriority = "low";
                    break;
                case "moyenne":
                    classPriority = "medium";
                    break;
                case "haute":
                    classPriority = "high";
                    break;
            }
            taskElement.className = "task ".concat(classPriority);
            taskElement.dataset.index = index.toString();
            taskElement.innerHTML = "\n        <h3>".concat(task.title, " <span>\u2013 Priorit\u00E9 ").concat(task.priority, "</span></h3>\n        <p>Cat\u00E9gorie: ").concat(task.category.title, "</p>\n        <p>Date d'\u00E9ch\u00E9ance: ").concat(task.date, "</p>\n        <p>").concat(task.description, "</p>\n        <button class=\"delete-btn\" data-index=\"").concat(index, "\" type=\"button\">Supprimer</button>\n        <button class=\"edit-btn\" data-index=\"").concat(index, "\" type=\"button\">Modifier</button>\n      ");
            taskList.appendChild(taskElement);
        });
    }
}
