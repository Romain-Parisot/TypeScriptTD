import { updateTaskElement, createFormDom, renderTasks, deleteAllTasks } from "./utils.js";
import TaskManager, { Priority } from "./Task.js";
// get data from local storage
var savedTasks = localStorage.getItem("taskList");
var storedTaskList = savedTasks ? JSON.parse(savedTasks) : [];
console.log("Loaded tasks:", storedTaskList); // Debugging line
var taskManager = new TaskManager(storedTaskList);
console.log("Initialized taskManager:", taskManager); // Debugging line
renderTasks(taskManager);
function saveTasks() {
    localStorage.setItem("taskList", JSON.stringify(taskManager.tasks));
}
// Add a new task
var form = document.querySelector("#taskForm");
if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var formData = new FormData(form);
        var title = formData.get("title");
        var description = formData.get("description");
        var date = formData.get("date");
        var priority = formData.get("priority");
        var category = formData.get("category");
        // if not empty
        if (title && description && date && priority && category) {
            taskManager.addTask({
                title: title.toString(),
                description: description.toString(),
                date: date.toString(),
                priority: Priority[priority.toString()],
                category: { title: category.toString() },
            });
            saveTasks();
            console.log(taskManager.tasks);
            // cerate the task
            var taskElement = document.createElement("div");
            taskElement.className = "task ".concat(priority.toString().toLowerCase());
            taskElement.dataset.index = (taskManager.tasks.length - 1).toString();
            taskElement.innerHTML = "\n        <h3>".concat(title, " <span>\u2013 Priorit\u00E9 ").concat(Priority[priority.toString()], "</span></h3>\n        <p>Cat\u00E9gorie: ").concat(category, "</p>\n        <p>Date d'\u00E9ch\u00E9ance: ").concat(date, "</p>\n        <p>").concat(description, "</p>\n        <button class=\"delete-btn\" data-index=\"").concat(taskManager.tasks.length - 1, "\" type=\"button\">Supprimer</button>\n        <button class=\"edit-btn\" data-index=\"").concat(taskManager.tasks.length - 1, "\" type=\"button\">Modifier</button>\n      ");
            var taskList_1 = document.getElementById("tasks");
            if (taskList_1) {
                taskList_1.appendChild(taskElement);
            }
            // reset from after submit
            form.reset();
        }
        else {
            alert("Veuillez remplir tous les champs");
        }
    });
}
var taskList = document.getElementById("tasks");
if (taskList) {
    taskList.addEventListener("click", function (event) {
        var target = event.target;
        // if it is a delete button
        if (target &&
            target.dataset.index &&
            target.classList.contains("delete-btn")) {
            // get index of the task
            var taskIndex = Number(target.dataset.index);
            // call deleteTask
            taskManager.deleteTask(taskIndex);
            saveTasks();
            // remove from dom
            if (target.parentElement) {
                taskList.removeChild(target.parentElement);
            }
        }
        // if it is a edit button
        if (target &&
            target.dataset.index &&
            target.classList.contains("edit-btn")) {
            var taskIndex_1 = Number(target.dataset.index);
            createFormDom(Number(target.dataset.index));
            var editFromSection_1 = document.getElementById("editFrom");
            editFromSection_1.addEventListener("click", function (event) {
                event.preventDefault();
                var target = event.target;
                if (target && target.id.match("addTask")) {
                    var editTaskForm = document.getElementById("editTaskForm");
                    var formData = new FormData(editTaskForm);
                    var title = formData.get("title");
                    var description = formData.get("description");
                    var date = formData.get("date");
                    var priority = formData.get("priority");
                    var category = formData.get("category");
                    if (title && description && date && priority && category) {
                        var taskPriority = Priority[priority];
                        if (taskPriority !== undefined) {
                            var editedTask = {
                                title: title.toString(),
                                description: description.toString(),
                                date: date.toString(),
                                priority: taskPriority,
                                category: { title: category.toString() },
                            };
                            // call modifyTask
                            taskManager.modifyTask(editedTask, taskIndex_1);
                            saveTasks();
                            // update dom
                            var taskElement = document.querySelector(".task[data-index=\"".concat(taskIndex_1, "\"]"));
                            updateTaskElement(editedTask, taskElement);
                        }
                        else {
                            console.error("Invalid priority value: ".concat(priority));
                        }
                    }
                }
                if ((target && target.id.match("cancel")) ||
                    target.id.match("addTask")) {
                    var editForm = document.getElementById("editTaskForm");
                    if (editForm) {
                        editFromSection_1.removeChild(editForm);
                    }
                }
            });
        }
    });
}
// Filters 
var filterForm = document.querySelector("#filterForm");
// Add an event listener to the button
filterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(filterForm);
    var priority = formData.get("filterPriority");
    var date = formData.get("filterDate");
    var category = formData.get("filterCaregory");
    // call filterTasks
    var priorityFilterValue = "";
    switch (priority === null || priority === void 0 ? void 0 : priority.toString()) {
        case "low":
            priorityFilterValue = "Faible";
            break;
        case "medium":
            priorityFilterValue = "Moyenne";
            break;
        case "high":
            priorityFilterValue = "Haute";
            break;
        default:
            priorityFilterValue = "all";
            break;
    }
    console.log("Filter", priorityFilterValue, date === null || date === void 0 ? void 0 : date.toString(), category === null || category === void 0 ? void 0 : category.toString());
    var filteredTasks = taskManager.filterTasks(priorityFilterValue, date.toString(), category.toString());
    console.log("Filtered Tasks", filteredTasks);
    var taskManagerFiltered = new TaskManager(filteredTasks);
    // update the dom
    deleteAllTasks();
    renderTasks(taskManagerFiltered);
});
// rechercher une tâche
var searchForm = document.querySelector("#taskSearch");
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(searchForm);
    var search = formData.get("searchInput");
    if (search) {
        var filteredTasks = taskManager.tasks.filter(function (task) {
            return task.title.match(search.toString()) || task.description.match(search.toString());
        });
        var taskManagerFiltered = new TaskManager(filteredTasks);
        deleteAllTasks();
        renderTasks(taskManagerFiltered);
    }
});
