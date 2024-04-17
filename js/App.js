import TaskManager, { Priority } from './Task.js';
var taskManager = new TaskManager();
// Add a new task
var form = document.querySelector('#taskForm');
if (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('submit');
        var formData = new FormData(form);
        var title = formData.get('title');
        var description = formData.get('description');
        var date = formData.get('date');
        var priority = formData.get('priority');
        var category = formData.get('category');
        // if not empty
        if (title && description && date && priority && category) {
            taskManager.addTask({
                title: title.toString(),
                description: description.toString(),
                date: date.toString(),
                priority: Priority[priority.toString()],
                category: { title: category.toString() },
            });
            console.log(taskManager.tasks);
            // cerate the task
            var taskElement = document.createElement('div');
            taskElement.className = "task ".concat(priority.toString().toLowerCase());
            taskElement.innerHTML = "\n        <h3>".concat(title, " <span>\u2013 Priorit\u00E9 ").concat(Priority[priority.toString()], "</span></h3>\n        <p>Cat\u00E9gorie: ").concat(category, "</p>\n        <p>Date d'\u00E9ch\u00E9ance: ").concat(date, "</p>\n        <p>").concat(description, "</p>\n        <button data-index=\"").concat(taskManager.tasks.length - 1, "\" type=\"button\">Supprimer</button>\n        <button class=\"edit-btn\">Modifier</button>\n      ");
            var taskList_1 = document.getElementById('tasks');
            if (taskList_1) {
                taskList_1.appendChild(taskElement);
            }
            // reset from after submit
            form.reset();
        }
        else {
            alert('Veuillez remplir tous les champs');
        }
    });
}
// Remove a task
var taskList = document.getElementById('tasks');
if (taskList) {
    taskList.addEventListener('click', function (event) {
        var target = event.target;
        // if it is a delete button
        if (target && target.dataset.index) {
            // get index of the task
            var taskIndex = Number(target.dataset.index);
            // call deleteTask
            taskManager.deleteTask(taskIndex);
            // remove from dom
            if (target.parentElement) {
                taskList.removeChild(target.parentElement);
            }
        }
    });
}
/// CRUD
// ON PAGE LOAD RÉCUPÉRER TOUTES LES TACHES DANS LE LOCALSTORAGE
// CAPTER L'ÉVÉNEMENT AJOUTER UNE TACHE
// CAPTER L'ÉVENEMENT JE MODIFIE UNE TACHE
// CAPTER L'ÉVÉNEMENT JE SUPPRIME UNE TACHE
// J'APPLIQUE UN FILTRE
// JE FAIS UNE RECHERCHE
