import { html, LitElement } from "lit";
import "../task-card/task-card";

export class TaskList extends LitElement {
  static properties = {
    task: { type: Object },
  };
  _renderTemplate(task) {
  switch (task.type) {
    case "text":
      return html`
        <task-card .task=${task}>
          <h1>${task.id}</h1>
          <h2>${task.priority}</h2>
        </task-card>
      `;

    case "checklist":
      return html`
        <task-card .task=${task}>
          <h1>${task.content.title}</h1>
          <h2>${task.priority}</h2>
        </task-card>
      `;

    case "alert":
      return html`
        <task-card .task=${task}>
          <h1>${task.id}</h1>
          <h2>${task.priority}</h2>
        </task-card>
      `;

    default:
      return html`<p>Tipo de tarea desconocido</p>`;
  }
}
  render() {
    return this._renderTemplate(this.task);
  }
}
customElements.define("task-list", TaskList);
