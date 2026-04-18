import { html, LitElement } from 'lit';

export class ErrorBoundary extends LitElement {
 static properties = {
    hasError: { type: Boolean },
    errorMessage: { type: String },
  };

  constructor() {
    super();
    this.hasError = false;
    this.errorMessage = "";
  }

  performUpdate() {
    try {
      super.performUpdate();
    } catch (error) {
      this.hasError = true;
      this.errorMessage = error.message;
      this.requestUpdate();
    }
  }

  render() {
    if (this.hasError) {
      return html`
        <div class="error-card">
          <span>Error al renderizar esta tarea</span>
          <small>${this.errorMessage}</small>
        </div>
      `;
    }

    return html`<slot></slot>`;
  }

}
customElements.define('error-boundary', ErrorBoundary);
