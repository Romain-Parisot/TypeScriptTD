import TaskManager, { Priority } from './Task.js';
const taskManager = new TaskManager();

const form = document.querySelector('#taskForm');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('submit');
    

    const formData = new FormData(form as HTMLFormElement);

    const title = formData.get('title');
    const description = formData.get('description');
    const date = formData.get('date');
    const priority = formData.get('priority');
    const category = formData.get('category');

    if (title && description && date && priority && category) {
      taskManager.addTask({
        title: title.toString(),
        description: description.toString(),
        date: date.toString(),
        priority: Priority[priority.toString() as keyof typeof Priority],
        category: { title: category.toString() },
      });

      console.log(taskManager.tasks);
    }
    else{
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


