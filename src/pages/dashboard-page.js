import { html, LitElement, unsafeCSS } from "lit";
import "../custom-elements/task-list/task-list";
import { TaskDataManager } from "../dm/task-data-manager";
import styles from "../styles/main.scss?inline";
export class DashboardPage extends LitElement {
  static properties = {
    task: { type: Array },
  };
  static styles = unsafeCSS(styles);

  constructor() {
    super();
    this.task = [];

    this.dm = new TaskDataManager();
  }
  connectedCallback() {
    super.connectedCallback();

    window.addEventListener("tasks-updated", (e) => {
      this.task = e.detail.tasks;
    });

    this.dm.loadTaskData();
    // console.log(this.dm.task);

    // console.log("this.task:", this.task);
  }

  render() {
    return html`
      <div class="dashboard">
        <h1>Lista de actividades</h1>

        <div class="list">
          ${this.task.map(
            (task) => html` <task-list .task=${task}></task-list> `,
          )}
        </div>
      </div>
    `;
  }
}
customElements.define("dashboard-page", DashboardPage);
