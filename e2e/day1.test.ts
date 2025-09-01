import { expect, test } from '@playwright/test';

test.describe('Day 1 Workout Page', () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to Day 1 workout page
		await page.goto('/workout/1');
	});

	test('initial state is correct', async ({ page }) => {
		// Check for correct heading
		await expect(
			page.getByRole('heading', { name: /Week \d+, Day 1/ })
		).toBeVisible();

		// Check for rep input and buttons
		await expect(page.locator('input[name="rep-input"]')).toBeVisible();
		await expect(
			page.getByRole('button', { name: 'Complete Set' })
		).toBeVisible();
	});

	test('completing a set shows timer and updates chart', async ({ page }) => {
		// Check that the chart initially has no bars
		await expect(page.locator('.chart-container svg rect')).toHaveCount(0);

		// Enter reps
		await page.locator('input[name="rep-input"]').fill('5');

		// Click complete set
		await page.getByRole('button', { name: 'Complete Set' }).click();

		// Check for timer modal
		await expect(
			page.getByRole('heading', { name: 'Recovery Timer' })
		).toBeVisible();

		// Close the modal to check the chart state
		await page.getByRole('button', { name: 'Close modal' }).click();

		// Check that the chart now has one bar
		await expect(page.locator('.chart-container svg rect')).toHaveCount(1);

		// Check the text inside the bar
		await expect(page.locator('.chart-container svg text.label')).toHaveText(
			'5'
		);
	});
});
