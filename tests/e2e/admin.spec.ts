// TODO: Add authenticated tests using storageState: 'tests/e2e/.auth/admin.json'
// once the login flow is implemented
import { test, expect } from '@playwright/test';

test.describe('Admin CMS', () => {
  test('unauthenticated /admin redirects to /login', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/login/);
  });
});
