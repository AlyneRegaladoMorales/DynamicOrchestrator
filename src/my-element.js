import { html, LitElement } from "lit";
import './pages/dashboard-page'

export class MyElement extends LitElement {
  render() {
    return html` 
      <dashboard-page></dashboard-page>
      `;
  }
}

window.customElements.define("my-element", MyElement);
