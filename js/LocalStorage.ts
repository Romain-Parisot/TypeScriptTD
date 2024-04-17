import Task from "./Task";

class LocalStorage {
  constructor(private listTasks: Task[]) {}

  // createTask(task:Task):Task {
  //     return ;
  // }

  selectAll(): Task[] {
    return [];
  }

  deleteTask(task: Task): void {}

  deleteAllTask(): void {}

  updateTask(task: Task): void {}
}
