import type { Page, Route } from '@playwright/test';

/**
 * Les tests e2e ne doivent jamais dépendre de l'API hébergée
 * (https://merchstoreapi.applikuapp.com/api) : chaque appel est stubbé ici.
 * Toute requête non prévue répond 404, ce qui rend un oubli visible.
 */
export const API = 'https://merchstoreapi.applikuapp.com/api';

export interface ProductFixture {
  uuid: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  image_url: string;
  category: string[];
  status: string;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
}

const PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

export function product(overrides: Partial<ProductFixture> = {}): ProductFixture {
  const uuid = overrides.uuid ?? '00000000-0000-4000-8000-000000000001';
  return {
    uuid,
    name: 'T-shirt e2e',
    slug: 't-shirt-e2e',
    price: 25,
    description: 'Un t-shirt de test.',
    image_url: PIXEL,
    category: ['Vêtements'],
    status: 'published',
    stock_quantity: 10,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    ...overrides,
  };
}

export interface ApiStubs {
  products?: ProductFixture[];
  categories?: { id: number; name: string }[];
}

const json = (route: Route, body: unknown, status = 200) =>
  route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });

/** Stubbe les lectures publiques du catalogue. À appeler avant `page.goto`. */
export async function stubApi(page: Page, stubs: ApiStubs = {}): Promise<void> {
  const products = stubs.products ?? [product()];
  const categories = stubs.categories ?? [{ id: 1, name: 'Vêtements' }];

  await page.route(`${API}/**`, (route) => {
    const url = new URL(route.request().url());
    const path = url.pathname.replace(/^\/api/, '');

    if (route.request().method() !== 'GET') return json(route, { detail: 'non stubbé' }, 404);
    if (path === '/store/category-list/') return json(route, categories);
    if (path === '/store/product/') {
      return json(route, { results: products, count: products.length, next: null, previous: null });
    }
    const detail = path.match(/^\/store\/product\/([^/]+)\/detail\/$/);
    if (detail) {
      const found = products.find((p) => p.uuid === detail[1]);
      return found ? json(route, found) : json(route, { detail: 'Not found.' }, 404);
    }
    return json(route, { detail: 'non stubbé' }, 404);
  });
}
