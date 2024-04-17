// Les trois option possible du chanmp priority
export var Priority;
(function (Priority) {
  Priority["low"] = "Faible";
  Priority["medium"] = "Moyenne";
  Priority["high"] = "Haute";
})(Priority || (Priority = {}));
var TaskManager = /** @class */ (function () {
  function TaskManager() {
    this.tasks = [];
  }
  TaskManager.prototype.addTask = function (task) {
    this.tasks.push(task);
  };
  TaskManager.prototype.deleteTask = function (taskIndex) {
    this.tasks.splice(taskIndex, 1);
  };
  TaskManager.prototype.modifyTask = function (task, taskIndex) {
    this.tasks[taskIndex] = task;
  };
  return TaskManager;
})();
export default TaskManager;
