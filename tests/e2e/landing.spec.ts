import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('renders hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page).not.toHaveTitle(/Error/);
    await expect(page.getByTestId('hero-section')).toBeVisible();
  });

  test('navbar is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('banner')).toBeVisible();
  });

  test('renders features preview section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('features-preview-section')).toBeVisible();
  });

  test('renders download section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('download-section')).toBeVisible();
  });

  test('renders testimonials section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('testimonials-section')).toBeVisible();
  });

  test('footer is visible with app store links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });

  test('features preview explore link navigates to /features', async ({ page }) => {
    await page.goto('/');
    const link = page.getByRole('link', { name: /explore all features/i });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/features');
  });
});
