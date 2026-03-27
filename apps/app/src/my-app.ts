import { html, LitElement } from "lit";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyApp extends LitElement {
  count: number = 0;

  static override get properties() {
    return {
      /**
       * The number of times the button has been clicked.
       */
      count: { type: Number },
    };
  }

  constructor() {
    super();
    this.count = 0;
  }

  override render() {
    return html`
      <section id="center">
        <slot></slot>
        <button class="counter" @click="${this._onClick}" part="button">
          Count is ${this.count}
        </button>
      </section>

      <div class="ticks"></div>
    `;
  }

  _onClick() {
    this.count++;
  }
}

customElements.define("my-app", MyApp);
