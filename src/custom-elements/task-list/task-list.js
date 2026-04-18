import { html, LitElement, unsafeCSS } from "lit";
import "../task-card/task-card";
import styles from "./task-list.scss?inline";
import "../shared/error-boundary"
export class TaskList extends LitElement {
  static styles = unsafeCSS(styles);
  static properties = {
    task: { type: Object },
  };
  _renderHeader(task) {
    return html`
      <div class="header">
        <span class="id">${task.id}</span>
        <span class="priority ${task.priority}">${task.priority}</span>
      </div>
      <span class="type ">${task.type}</span>
    `;
  }
  _renderTemplate(task) {
    switch (task.type) {
      case "text":
        return html`
          <task-card class="task" .task=${task}>
            ${this._renderHeader(task)}
            <h2 class="title">${task.content.title}</h2>
            <p class="description">${task.content.description}</p>
            <span class="category">Categoria: ${task.metadata.category}</span>
          </task-card>
        `;

      case "checklist":
        return html`
          <task-card .task=${task} class="task checklist">
            ${this._renderHeader(task)}
            
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
          <task-card .task=${task} class="task">
            ${this._renderHeader(task)}
            <h2 class="title">${task.content.title}</h2>
            <p class="description">${task.content.message}</p>
            <span class="alert">${task.content.errorCode}</span>

            <span class="category">Categoria: ${task.metadata.category}</span>
          </task-card>
        `;

      default:
        return html`<p>Tipo de tarea desconocido</p>`;
    }
  }

  _safeRender(task) {
    try {
      return this._renderTemplate(task);
    } catch (error) {
      console.error(`Error renderizando tarea ${task?.id}:`, error);
      return html`
        <error-boundary>
          <div class="error-card"> 
            No se pudo renderizar la tarea <strong>${task?.id}</strong>
            <small>${error.message}</small>
          </div>
        </error-boundary>
      `;
    }
  }
  render() {
    return html` <div class="list">${this._safeRender(this.task)}</div> `;
  }
}
customElements.define("task-list", TaskList);
