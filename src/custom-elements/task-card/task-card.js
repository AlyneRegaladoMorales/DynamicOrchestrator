import { css, html, LitElement, unsafeCSS } from "lit";
import { HasAnalytics } from "../shared/analytics-mixin";
import styles from "./task-card.scss?inline";

export class TaskCard extends HasAnalytics(LitElement) {
  static styles = unsafeCSS(styles);

  static properties = {
    task: { type: Object },
  };

  _handleAction(action, extra = {}) {
    let detail = {
      id: this.task.id,
      ...extra,
    };
    let option = {
      detail: detail,
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent(action, option));

    this.logInteraction(action, { id: this.task.id });

    // console.log(`Action: ${action}, Detail:`, detail);
  }
  _onPriorityChange(e) {
    this._handleAction("update-task", {
      priority: e.target.value,
    });
    console.log("style", styles);
  }

  render() {
    return html`
      <div class="card">
        <slot></slot>

        <!-- <button @click=${() => this._handleAction("update-task")}>
        Actualizar
      </button> -->
        <select .value=${this.task.priority} @change=${this._onPriorityChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>

        <button @click=${() => this._handleAction("delete-task")}>
          Eliminar
        </button>
      </div>
    `;
  }
}
customElements.define("task-card", TaskCard);
