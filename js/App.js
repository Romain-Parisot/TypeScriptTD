import TaskManager, { Priority } from './Task.js';
var taskManager = new TaskManager();
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
        if (title && description && date && priority && category) {
            taskManager.addTask({
                title: title.toString(),
                description: description.toString(),
                date: date.toString(),
                priority: Priority[priority.toString()],
                category: { title: category.toString() },
            });
            console.log(taskManager.tasks);
        }
        else {
            alert('Veuillez remplir tous les champs');
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
