import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/form-input.js';
import { validateAlphabetic, validateNumeric, validateAlphaNumeric, validatePostal} from '../src/components/validation.js';

describe('Input field', () => {
    it('should have label.', async () => {
        const inputField = await fixture(html`
      <form-input label=${'Foo Bar'}>
      </form-input>
    `);
        await inputField.updateComplete;
        expect(inputField.label).to.equal('Foo Bar');
    });

    it('should have placeholder.', async () => {
        const inputField = await fixture(html`
      <form-input placeholder=${'Foo Bar'}>
      </form-input>
    `);
        await inputField.updateComplete;
        expect(inputField.placeholder).to.equal('Foo Bar');
    });

    it('should have a value.', async () => {
        const inputField = await fixture(html`
      <form-input .value=${'Foo Bar'}>
      </form-input>
    `);
        await inputField.updateComplete;
        expect(inputField.value).to.equal('Foo Bar');
    });

    it('should have a invalid message.', async () => {
        const inputField = await fixture(html`
      <form-input .invalidMessage=${'Foo Bar'}>
      </form-input>
    `);
        await inputField.updateComplete;
        expect(inputField.invalidMessage).to.equal('Foo Bar');
    });

});


describe('Street name field', () => {

    it('should be valid with alphanumeric values.', async () => {
        const inputField = await fixture(html`
            <form-input 
                .value="${'aA1'}"
                .validation=${validateAlphaNumeric}
                ?mandatory="${true}"
            ></form-input>
            `);

        await inputField.updateComplete;  
        expect(inputField.validate()).to.equal(true);
    });

    it('should be invalid with non-alphanumeric values.', async () => {
        const inputField = await fixture(html`
            <form-input 
                .value="${'aA1-'}"
                .validation=${validateAlphaNumeric}
                ?mandatory="${true}"
            ></form-input>
            `);

        await inputField.updateComplete;  
        expect(inputField.validate()).to.equal(false);
        expect(inputField.invalidMessage).to.equal('Value should only contain alphabetic or numeric characters');
    });

    it('should be invalid if empty because it is mandatory.', async () => {
        const inputField = await fixture(html`
            <form-input 
                .value="${''}"
                .validation=${validateAlphaNumeric}
                ?mandatory="${true}"
            ></form-input>
            `);

        await inputField.updateComplete;  
        expect(inputField.validate()).to.equal(false);
        expect(inputField.invalidMessage).to.equal('This field is mandatory');
    });

});

describe('House number field', () => {

    it('should be valid with numeric values.', async () => {
        const inputField = await fixture(html`
            <form-input 
                .value="${'0123456789'}"
                .validation=${validateNumeric}
                ?mandatory="${true}"
            ></form-input>
            `);

        await inputField.updateComplete;  
        expect(inputField.validate()).to.equal(true);
    });

    it('should be invalid with non-numeric values.', async () => {
        const inputField = await fixture(html`
            <form-input 
                .value="${'0123456789a'}"
                .validation=${validateNumeric}
                ?mandatory="${true}"
            ></form-input>
            `);

        await inputField.updateComplete;  
        expect(inputField.validate()).to.equal(false);
        expect(inputField.invalidMessage).to.equal('Value should only contain numeric characters');
    });

    it('should be invalid if empty because it is mandatory.', async () => {
        const inputField = await fixture(html`
            <form-input 
                .value="${''}"
                .validation=${validateNumeric}
                ?mandatory="${true}"
            ></form-input>
            `);

        await inputField.updateComplete;  
        expect(inputField.validate()).to.equal(false);
        expect(inputField.invalidMessage).to.equal('This field is mandatory');
    });

});

describe('House number addition field', () => {

    it('should be valid with alphabetic values.', async () => {
        const inputField = await fixture(html`
            <form-input 
                .value="${'Aa'}"
                .validation=${validateAlphabetic}
            ></form-input>
            `);

        await inputField.updateComplete;  
        expect(inputField.validate()).to.equal(true);
    });

    it('should be invalid with non-alphabetic values.', async () => {
        const inputField = await fixture(html`
            <form-input 
                .value="${'Aa1'}"
                .validation=${validateAlphabetic}
            ></form-input>
            `);

        await inputField.updateComplete;  
        expect(inputField.validate()).to.equal(false);
        expect(inputField.invalidMessage).to.equal('Value should only contain alphabetic characters');
    });

    it('should be valid if empty because it is not mandatory.', async () => {
        const inputField = await fixture(html`
            <form-input 
                .value="${''}"
                .validation=${validateAlphabetic}
            ></form-input>
            `);

        await inputField.updateComplete;  
        expect(inputField.validate()).to.equal(true);
    });

});

describe('Postal code field', () => {   

    it('should be valid with postal format values.', async () => {
        const inputField = await fixture(html`
            <form-input 
                .value="${'1111AA'}"
                .validation=${validatePostal}
                ?mandatory="${true}"
            ></form-input>
            `);

        await inputField.updateComplete;  
        expect(inputField.validate()).to.equal(true);

        inputField.value = '1111 AA';
        expect(inputField.validate()).to.equal(true);
    });

    it('should be invalid with non-postal format.', async () => {
        const inputField = await fixture(html`
            <form-input 
                .value="${'111AAA'}"
                .validation=${validatePostal}
                ?mandatory="${true}"
            ></form-input>
            `);

        await inputField.updateComplete;  
        expect(inputField.validate()).to.equal(false);
        expect(inputField.invalidMessage).to.equal('Value is not a valid postal code');

        inputField.value = '1111 A';
        expect(inputField.validate()).to.equal(false);
        expect(inputField.invalidMessage).to.equal('Value is not a valid postal code');

        inputField.value = '1111 AAA';
        expect(inputField.validate()).to.equal(false);
        expect(inputField.invalidMessage).to.equal('Value is not a valid postal code');
    });

    it('should be invalid if empty because it is mandatory.', async () => {
        const inputField = await fixture(html`
            <form-input 
                .value="${''}"
                .validation=${validatePostal}
                ?mandatory="${true}"
            ></form-input>
            `);

        await inputField.updateComplete;  
        expect(inputField.validate()).to.equal(false);
        expect(inputField.invalidMessage).to.equal('Value is not a valid postal code');
    });

});

describe('City field', () => { 

    it('should be valid with alphanumeric values.', async () => {
        const inputField = await fixture(html`
            <form-input 
                .value="${'aA1'}"
                .validation=${validateAlphaNumeric}
                ?mandatory="${true}"
            ></form-input>
            `);

        await inputField.updateComplete;  
        expect(inputField.validate()).to.equal(true);
    });

    it('should be invalid with non-alphanumeric values.', async () => {
        const inputField = await fixture(html`
            <form-input 
                .value="${'aA1-'}"
                .validation=${validateAlphaNumeric}
                ?mandatory="${true}"
            ></form-input>
            `);

        await inputField.updateComplete;  
        expect(inputField.validate()).to.equal(false);
        expect(inputField.invalidMessage).to.equal('Value should only contain alphabetic or numeric characters');
    });

    it('should be invalid if empty because it is mandatory.', async () => {
        const inputField = await fixture(html`
            <form-input 
                .value="${''}"
                .validation=${validateAlphaNumeric}
                ?mandatory="${true}"
            ></form-input>
            `);

        await inputField.updateComplete;  
        expect(inputField.validate()).to.equal(false);
        expect(inputField.invalidMessage).to.equal('This field is mandatory');
    });

});

describe('Additional information field', () => { 

    it('should be valid with alphanumeric values.', async () => {
        const inputField = await fixture(html`
            <form-input 
                .value="${'aA1'}"
                .validation=${validateAlphaNumeric}
            ></form-input>
            `);

        await inputField.updateComplete;  
        expect(inputField.validate()).to.equal(true);
    });

    it('should be invalid with non-alphanumeric values.', async () => {
        const inputField = await fixture(html`
            <form-input 
                .value="${'aA1-'}"
                .validation=${validateAlphaNumeric}
            ></form-input>
            `);

        await inputField.updateComplete;  
        expect(inputField.validate()).to.equal(false);
        expect(inputField.invalidMessage).to.equal('Value should only contain alphabetic or numeric characters');
    });

    it('should be valid if empty because it is not mandatory.', async () => {
        const inputField = await fixture(html`
            <form-input 
                .value="${''}"
                .validation=${validateAlphaNumeric}
            ></form-input>
            `);

        await inputField.updateComplete;  
        expect(inputField.validate()).to.equal(true);
    });

});