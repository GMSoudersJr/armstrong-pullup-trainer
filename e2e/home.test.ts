import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('has correct title', async ({ page }) => {
		await expect(page).toHaveTitle(/Armstrong Pull-up Program/);
	});

	test('has correct headings', async ({ page }) => {
		await expect(
			page.getByRole('heading', { name: 'Armstrong Pull-up Program' })
		).toBeVisible();
		await expect(
			page.getByRole('heading', { name: "Today's Workout" })
		).toBeVisible();
	});

	test('has suggested workout section with actions', async ({ page }) => {
		const startButton = page.getByRole('button', { name: 'Start Workout' });
		const skipButton = page.getByRole('button', { name: 'Skip Workout' });

		await expect(startButton).toBeVisible();
		await expect(skipButton).toBeVisible();
	});

	test('Start Workout button navigates to workout page', async ({ page }) => {
		await page.getByRole('button', { name: 'Start Workout' }).click();

		await expect(page).toHaveURL(/.*workout\/\d/);
		await expect(
			page.getByRole('heading', { name: /Week \d+, Day \d+/ })
		).toBeVisible();
	});

	test('has correct subtitle format in recommended workout', async ({
		page
	}) => {
		const subtitle = page.locator('.card-subtitle');
		await expect(subtitle).toHaveText(/Week \d+, Day \d+/);
	});
});
