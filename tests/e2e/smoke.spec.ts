import { test, expect } from '@playwright/test';

test('health check endpoint returns 200', async ({ request }) => {
  const response = await request.get('/api/health');
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.status).toBe('ok');
});

test('landing page renders without errors', async ({ page }) => {
  await page.goto('/');
  await expect(page).not.toHaveTitle(/Error/);
  await expect(page.getByTestId('hero-section')).toBeVisible();
});

test('features page renders without errors', async ({ page }) => {
  await page.goto('/features');
  await expect(page).not.toHaveTitle(/Error/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('privacy page renders without errors', async ({ page }) => {
  await page.goto('/privacy');
  await expect(page).not.toHaveTitle(/Error/);
  await expect(page.getByRole('heading', { name: /privacy policy/i })).toBeVisible();
});

test('pricing page renders without errors', async ({ page }) => {
  await page.goto('/pricing');
  await expect(page).not.toHaveTitle(/Error/);
});

test('unauthenticated /admin redirects to /login', async ({ page }) => {
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/login/);
});
