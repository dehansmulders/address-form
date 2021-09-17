import { expect, fixture, html } from '@open-wc/testing';
import '../src/address-form.js';

describe('Address form', () => {
  it('should have title.', async () => {
    const addressForm = await fixture(html`
      <address-form .title=${'Foo Bar'}>
      </address-form>
    `);
    await addressForm.updateComplete;
    expect(addressForm.title).to.equal('Foo Bar');
  });
});
