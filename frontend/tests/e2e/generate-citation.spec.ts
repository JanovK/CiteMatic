import { test, expect } from '@playwright/test';

test('generates an APA citation from a YouTube URL', async ({ page }) => {
  await page.goto('/');
  await page.waitForURL('/');

  await page.getByLabel('Paste a YouTube video URL:').fill('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  await page.getByRole('button', { name: /generate/i }).click();

  await expect(page.getByText('Your APA Citation')).toBeVisible({ timeout: 5000 });

  const citation = await page.getByTestId('citation-output').textContent();
  expect(citation).toContain('Rick Astley');
  expect(citation).toContain('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

  const copyButton = page.getByRole('button', { name: /copy/i });
  await expect(copyButton).toBeVisible();
  await copyButton.click();
});
