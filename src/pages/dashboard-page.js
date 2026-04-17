import { html, LitElement } from "lit";
import "../custom-elements/task-list/task-list";
import { TaskDataManager } from "../dm/task-data-manager";

export class DashboardPage extends LitElement {
  static properties = {
    task: { type: Array },
  };

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
    return html` ${this.task.map(
      (task) => html` <task-list .task=${task}></task-list> `,
    )}`;
  }
}
customElements.define("dashboard-page", DashboardPage);
