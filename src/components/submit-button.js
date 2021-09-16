import { LitElement, html, css } from "lit-element";

class SubmitButton extends LitElement {

    static get properties() {
        return {
            onClick: { type: Function},
            disabled: {type: Boolean}
        }
    }

    constructor() {
        super();
        this.onClick = (e) => {};
        this.disabled = false;
    }

    static get styles() {
        return css`
          .submit-button {
            padding: 5px
          }

          .submit-button button {
              padding: 8px 14px;
          }
        `
      }

    render() {
        return html`
        <div class="submit-button">
            <button
                ?disabled="${this.disabled}"
                @click="${this.onClick}"
            >Submit</button>
        </div>
        `;
    }
}

customElements.define('submit-button', SubmitButton);