<!-- settings/+page.svelte (Settings) -->
<div class="page">
	<h1 class="page-title">Settings</h1>

	<div class="settings-sections">
		<div class="settings-card">
			<div class="card-header">
				<h3 class="card-title">Notifications</h3>
			</div>
			<div class="card-content">
				<label class="setting-item">
					<span class="setting-label">Daily reminders</span>
					<input type="checkbox" class="checkbox" checked />
				</label>
			</div>
		</div>

		<div class="settings-card">
			<div class="card-header">
				<h3 class="card-title">Program</h3>
			</div>
			<div class="card-content">
				<button class="setting-button">Reset Progress</button>
				<button class="setting-button">Export Data</button>
			</div>
		</div>
	</div>
</div>

<style>
	.page {
		padding: 16px;
		background-color: #f9fafb;
		min-height: 100vh;
	}

	.page-title {
		font-size: 24px;
		font-weight: 700;
		color: #111827;
		margin: 0 0 24px 0;
	}

	.settings-sections {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.settings-card {
		background: white;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		border: 1px solid #e5e7eb;
	}

	.card-header {
		padding: 16px;
		border-bottom: 1px solid #e5e7eb;
	}

	.card-title {
		font-weight: 600;
		color: #111827;
		margin: 0;
	}

	.card-content {
		padding: 16px;
	}

	.setting-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
	}

	.setting-label {
		color: #374151;
	}

	.checkbox {
		margin: 0;
	}

	.setting-button {
		width: 100%;
		text-align: left;
		color: #374151;
		background: none;
		border: none;
		padding: 12px 0;
		cursor: pointer;
		transition: color 0.2s ease;
	}

	.setting-button:hover {
		color: #111827;
	}

	.setting-button + .setting-button {
		border-top: 1px solid #f3f4f6;
	}
</style>
