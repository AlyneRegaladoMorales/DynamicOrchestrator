import { html, LitElement, unsafeCSS } from "lit";
import "../task-card/task-card";
import styles from "./task-list.scss?inline";

export class TaskList extends LitElement {
  static styles = [unsafeCSS(styles)];
  static properties = {
    task: { type: Object },
  };
  _renderTemplate(task) {
    switch (task.type) {
      case "text":
        return html`
          <task-card class="task text" .task=${task}>
            <div class="header">
              <span class="id">${task.id}</span>
              <span class="priority ${task.priority}">${task.priority}</span>
            </div>

            <h2 class="title">${task.content.title}</h2>
            <p class="description">${task.content.description}</p>
            <span class="category">Categoria: ${task.metadata.category}</span>
          </task-card>
        `;

      case "checklist":
        return html`
          <task-card .task=${task} class="task checklist">
            <div class="header">
              <span class="id">${task.id}</span>
              <span class="priority ${task.priority}">${task.priority}</span>
            </div>
            
            <h2 class="title">${task.content.title}</h2>

            <ul class="items">
              ${task.content.items.map(
                (item) => html`
                  <li class="description">
                    <input type="checkbox" />
                    ${item.label}
                  </li>
                `,
              )}
            </ul>

          <span class="category"> ${task.metadata.category}</span>

          </task-card>
          </task-card>
        `;

      case "alert":
        return html`
          <task-card .task=${task} class="task alert">
            <div class="header">
              <span class="id">${task.id}</span>
              <span class="priority ${task.priority}">${task.priority}</span>
            </div>
            <h2 class="title">${task.content.title}</h2>
             <p class="description">${task.content.message}</p>
             <span>${task.content.errorCode}</span>

            <span class="category">Categoria: ${task.metadata.category}</span>
          </task-card>
        `;

      default:
        return html`<p>Tipo de tarea desconocido</p>`;
    }
  }
  render() {
    return html` <div class="list">${this._renderTemplate(this.task)}</div> `;
  }
}
customElements.define("task-list", TaskList);
