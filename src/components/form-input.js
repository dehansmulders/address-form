import { LitElement, html, css } from "lit-element";

class FormInput extends LitElement {

    static get properties() {
        return {
            name: {type: String },
            value: { type: String},
            label: { type: String},
            placeholder: {type: String },
            onChange: () => String,
            validation: () => Boolean,
            
            //appearance
            mandatory: {type: Boolean},
            invalidMessage: {type: null | String, reflect: true},
            setValidation: {type: Function},
            maxLength: {type: Number},
            formatValue: () => String,
        }
    }

    constructor() {
        super();
        this.value = "";
        this.label = "";
        this.placeholder = "";
        this.onChange = () => {};
        this.validation = (n, v) => {};

        this.mandatory = false;
        this.invalidMessage = null;
        this.setValidation = () => {};
        this.maxLength = null;
        this.formatValue = (x) => {return x};
    }

    static get styles() {
        return css`
          .input-wrapper {
            padding: 5px;
            display: flex;
            flex-direction: column;
          }

          .input-wrapper input {
              padding: 8px 14px;
              font-size: 1em;
          }

          .input-wrapper .input-label {
              color: grey; 
              font-size: 0.8em;
          }

          .input-wrapper.invalid input{
            border-color: red;
            border-radius: 4px;
          }

          .invalid-message{
            color: red;
            font-size: 0.8em;
          }
        `
      }

    //use this method by parent to check validation
    validate() {
        return (() => this.doValidation(this.value))()
    }

    doValidation(val) {
        this.invalidMessage = this.validation(val);;
        
        if(!this.invalidMessage && this.mandatory && val === "") {
            this.invalidMessage = "This field is mandatory"
        }

        this.setValidation(this.name, this.invalidMessage)

        return this.invalidMessage ? false : true
    }
    
    onInputChanged(e) {
        //check validation
        this.doValidation(e.target.value)

        //send value
        this.onChange(e.target.value)
    }

    //catch keystroke and apply any formatting
    onKeyUp(e) {
        e.target.value = this.formatValue(e.target.value);
    }

    render() {
        return html`
        <div class="input-wrapper ${this.invalidMessage ? "invalid" : ""}">
            <label class="input-label">
                ${this.label !== "" ? html`<span>${this.label}</span>` : null}
                ${this.mandatory ? html`<span> *</span>` : null}
            </label>
            
            <input 
                placeholder="${this.placeholder}"
                name="${this.name}"
                value=${this.value}
                maxLength="${this.maxLength}"
                @keyup=${this.onKeyUp}
                @input=${this.onInputChanged}
                ?required=${this.mandatory}
            />
            <div class="invalid-message">${this.invalidMessage}</div>
        </div>
        `;
    }
}

customElements.define('form-input', FormInput);