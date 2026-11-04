import { expect, test } from '@playwright/test';
import { product, stubApi } from './helpers/api';

test.describe('catalogue', () => {
  test('affiche les produits renvoyés par l’API', async ({ page }) => {
    await stubApi(page, {
      products: [
        product({ name: 'Sweat e2e', uuid: '00000000-0000-4000-8000-000000000002' }),
        product({ name: 'Mug e2e', uuid: '00000000-0000-4000-8000-000000000003' }),
      ],
    });

    await page.goto('/');

    await expect(page).toHaveURL(/\/fr\/home$/);
    await expect(page.getByRole('heading', { name: 'Sweat e2e' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Mug e2e' })).toBeVisible();
  });

  test('affiche un message quand le catalogue est vide', async ({ page }) => {
    await stubApi(page, { products: [] });

    await page.goto('/fr/home');

    await expect(page.getByText('No products found.')).toBeVisible();
  });
});
