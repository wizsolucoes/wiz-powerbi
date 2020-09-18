import { newE2EPage } from '@stencil/core/testing';

describe('wiz-powerbi sem parametros', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`<wiz-powerbi></wiz-powerbi>`);

    const element = await page.find('wiz-powerbi');
    expect(element).toHaveClass('hydrated');
  });
});
