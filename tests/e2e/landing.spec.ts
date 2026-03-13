// TODO: Expand with real section assertions once landing page sections are implemented
import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('renders without errors', async ({ page }) => {
    await page.goto('/');
    await expect(page).not.toHaveTitle(/Error/);
    await expect(page.getByTestId('hero-section')).toBeVisible();
  });

  test('navbar is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('banner')).toBeVisible();
  });
});
