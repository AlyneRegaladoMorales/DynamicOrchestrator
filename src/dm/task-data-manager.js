import "../custom-elements/shared/analytics-mixin";

export class TaskDataManager {
  constructor() {
    this.task = [];
    // se escucha eventos globales para actualizar la data cuando se actualice o elimine una tarea
    window.addEventListener("update-task", (e) => this._updateTask(e));
    window.addEventListener("delete-task", (e) => this._deleteTask(e));
  }

  async loadTaskData() {
    const response = await fetch("/task.json");
    const data = await response.json();
    this.task = data.data;

    this._change();

    // console.log("Data cargada:", this.task);
  }

  _deleteTask(event) {
    const { id } = event.detail;

    const newTaskList = this.task.filter((task) => task.id !== id);

    this.task = newTaskList;

    this._change();
  }

  _updateTask(event) {
    const { id, priority } = event.detail;
    const updatedTask = this.task.map((task) => {
      if (task.id === id) {
        return { ...task, priority: priority };
      }
      return task;
    });

    this.task = updatedTask;

    this._change();
  }

  _change() {
    window.dispatchEvent(
      new CustomEvent("tasks-updated", {
        detail: { tasks: this.task },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
