import { html, css, LitElement } from 'lit-element';
import './components/submit-button.js'
import './components/form-input.js'

export class AddressForm extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--address-form-text-color, #000);
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },

      streetName: {type: String},
      houseNumber: {type: Number},
      houseNumberAddition: {type: String},
      postalCode: {type: String},
      city: {type: String},
      additionalInformation: {type: String},

      invalidMessages: {type: Object}
    };
  }

  static get styles() {
    return css`
      .form-wrapper {
        display: flex;
        flex-direction: column;
        max-width: 350px;
      }
    `
  }

  constructor() {
    super();
    this.title = '';
    
    this.streetName = '';
    this.houseNumber = '';
    this.houseNumberAddition = '';
    this.postalCode = '';
    this.city = '';
    this.additionalInformation = '';

    this.invalidMessages = {
      streetName: null,
      houseNumber: null,
      houseNumberAddition: null,
      postalCode: null,
      city: null,
      additionalInformation: null,
    }

  }

  setValidation(name, validation) {
    
    let messages = {...this.invalidMessages}
    messages[name] = validation;

    this.invalidMessages = messages;
  }

  onSubmit() {
    //command all children to perform validation
      //var event = new Event('do-validate', )
      //window.dispatchEvent(event);

      let validSN = this.shadowRoot.getElementById("streetName").validate() 
      let validHN = this.shadowRoot.getElementById("houseNumber").validate()
      let validHNA = this.shadowRoot.getElementById("houseNumberAddition").validate()
      let validPC = this.shadowRoot.getElementById("postalCode").validate()
      let validC = this.shadowRoot.getElementById("city").validate()
      let validAI = this.shadowRoot.getElementById("additionalInformation").validate()

      let allValid = validSN && validHN && validHNA && validPC && validC && validAI;

      if(allValid){
        window.alert(`
        ${this.additionalInformation}
        ${this.streetName} ${this.houseNumber} ${this.houseNumberAddition}
        ${this.postalCode} ${this.city}
      `)
      }
  }

  //Validation methods
  validateAlphabetic(str) {
    var validateRegex = new RegExp(/[^A-Za-z]/gi,"g");

    if(!validateRegex.test(str))
      return null
    else
      return "Value should only contain alphabetic characters"
  }

  validateAlphaNumeric(str) {
    var validateRegex = new RegExp(/[^A-Za-z0-9]/gi,"g");
    if(!validateRegex.test(str))
      return null
    else
      return "Value should only contain alphabetic or numeric characters"
  }

  validateNumeric(str) {
    var validateRegex = new RegExp(/[^0-9]/gi,"g");
    if(!validateRegex.test(str))
      return null
    else
      return "Value should only contain numeric characters"
  }

  validatePostal(str) {
    var validateRegex = new RegExp(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[A-Za-z]{2}$/i,"g");
    if(validateRegex.test(str))
      return null
    else
      return "Value is not a valid postal code"
  }


  //Auto formatting methods
  formatAlphaNumeric(str) {
    return str.replace(/[^A-Za-z0-9]/gi,"")
  }

  formatNumeric(str) {
    return str.replace(/[^0-9]/gi,"")
  }

  formatPostal(str) {
    var validateRegex = new RegExp(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[A-Za-z]{2}$/i,"g");
    if(validateRegex.test(str)){
      let p1 = str.substring(0,4);
      let p2 = str.substring(4, (str.length));
      return p1 + " " + p2.replace(/[^a-z]/gi,"").toUpperCase();
    } 
    return str
  }

  render() {
    return html`
      <h2>${this.title}</h2>

      <div id="form-demo" class="form-wrapper">
        <form-input 
          id="streetName"
          label="Street Name"
          maxLength="${30}"
          .value="${this.streetName}"
          .validation=${this.validateAlphaNumeric}
          .invalidMessage=${this.invalidMessages.streetName}
          .setValidation=${this.setValidation}
          .onChange=${(str) => {
            this.streetName = str
          }}
          ?mandatory="${true}"
        ></form-input>

        <form-input 
          id="houseNumber"
          label="House Number"
          maxLength="${5}"
          .value="${this.houseNumber}"
          .validation=${this.validateNumeric}
          .invalidMessage=${this.invalidMessages.houseNumber}
          .setValidation=${this.setValidation}
          .onChange=${(str) => {
            this.houseNumber = str
          }}
          ?mandatory="${true}"
        ></form-input>

        <form-input 
          id="houseNumberAddition"
          label="House Number Addition"
          maxLength="${5}"
          .value="${this.houseNumberAddition}"
          .validation=${this.validateAlphabetic}
          .invalidMessage=${this.invalidMessages.houseNumberAddition}
          .setValidation=${this.setValidation}
          .onChange=${(str) => {
            this.houseNumberAddition = str
          }}
        ></form-input>

        <form-input 
          id="postalCode"
          label="Postal Code"
          maxLength="${7}"
          .value="${this.postalCode}"
          .formatValue=${this.formatPostal}
          .validation=${this.validatePostal}
          .invalidMessage=${this.invalidMessages.postalCode}
          .setValidation=${this.setValidation}
          .onChange=${(str) => {
            this.postalCode = str
          }}
          ?mandatory="${true}"
        ></form-input>

        <form-input 
          id="city"
          label="City"
          maxLength="${30}"
          .value="${this.city}"
          .validation=${this.validateAlphaNumeric}
          .invalidMessage=${this.invalidMessages.city}
          .setValidation=${this.setValidation}
          .onChange=${(str) => {
            this.city = str
          }}
          ?mandatory="${true}"
        ></form-input>

        <form-input 
          id="additionalInformation"
          label="Additional Information"
          maxLength="${50}"
          .value="${this.additionalInformation}"
          .validation=${this.validateAlphaNumeric}
          .invalidMessage=${this.invalidMessages.additionalInformation}
          .setValidation=${this.setValidation}
          .onChange=${(str) => {
            this.additionalInformation = str
          }}
        ></form-input>

        <submit-button .onClick=${() => this.onSubmit()}></submit-button>
      </div>
    `;
  }
}
