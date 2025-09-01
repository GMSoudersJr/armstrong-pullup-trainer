import { expect, test } from '@playwright/test';

test.describe('Day 2 Workout Page', () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to Day 2 workout page
		await page.goto('/workout/2');
	});

	test('initial state is correct', async ({ page }) => {
		// Check for correct heading
		await expect(
			page.getByRole('heading', { name: /Week \d+, Day 2/ })
		).toBeVisible();

		// Check for pyramid instructions
		await expect(page.getByRole('heading', { name: 'Do 1 rep' })).toBeVisible();

		// Check for buttons
		await expect(
			page.getByRole('button', { name: 'Complete Set' })
		).toBeVisible();
		await expect(
			page.getByRole('button', { name: 'Missed Set' })
		).toBeVisible();
	});

	test('completing sets increments the pyramid', async ({ page }) => {
		// Check that the chart initially has no bricks
		await expect(page.locator('.chart-container svg rect.brick')).toHaveCount(
			0
		);

		// Click complete set for 1 rep
		await page.getByRole('button', { name: 'Complete Set' }).click();

		// Close the timer modal
		await page.getByRole('button', { name: 'Close modal' }).click();

		// Check that the instructions updated
		await expect(
			page.getByRole('heading', { name: 'Do 2 reps' })
		).toBeVisible();

		// Check that the chart now has one brick
		await expect(page.locator('.chart-container svg rect.brick')).toHaveCount(
			1
		);

		// Click complete set for 2 reps
		await page.getByRole('button', { name: 'Complete Set' }).click();
		await page.getByRole('button', { name: 'Close modal' }).click();

		// Check that the instructions updated
		await expect(
			page.getByRole('heading', { name: 'Do 3 reps' })
		).toBeVisible();

		// Check that the chart now has 1 + 2 = 3 bricks
		await expect(page.locator('.chart-container svg rect.brick')).toHaveCount(
			3
		);
	});
});
