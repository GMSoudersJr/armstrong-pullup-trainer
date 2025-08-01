<script lang="ts">
	// Modal.svelte
	let { isOpen = $bindable(false), title = '', children, onClose = () => {} } = $props();

	let startY = 0;
	let currentY = 0;
	let isDragging = false;
	let modalContent: HTMLDivElement | undefined = $state();

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}

	function closeModal() {
		isOpen = false;
		onClose();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}

	function handleTouchStart(event: TouchEvent) {
		startY = event.touches[0].clientY;
		isDragging = true;
	}

	function handleTouchMove(event: TouchEvent) {
		if (!isDragging) return;

		currentY = event.touches[0].clientY;
		const deltaY = currentY - startY;

		if (deltaY > 0) {
			// Only allow dragging down
			if (modalContent !== undefined) {
				modalContent.style.transform = `translateY(${deltaY}px)`;
			}
		}
	}

	function handleTouchEnd() {
		if (!isDragging) return;

		const deltaY = currentY - startY;
		isDragging = false;

		// If dragged more than 100px down, close the modal
		if (deltaY > 100) {
			closeModal();
		} else {
			// Snap back to original position
			if (modalContent !== undefined) {
				modalContent.style.transform = 'translateY(0)';
			}
		}
	}
</script>

{#if isOpen}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="modal-backdrop"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		tabindex="0"
		role="dialog"
		aria-modal="true"
		aria-labelledby={title ? 'modal-title' : undefined}
	>
		<div
			class="modal-content"
			bind:this={modalContent}
			ontouchstart={handleTouchStart}
			ontouchmove={handleTouchMove}
			ontouchend={handleTouchEnd}
		>
			<div class="modal-header">
				{#if title}
					<h2 id="modal-title">{title}</h2>
				{/if}
				<button class="close-button" onclick={closeModal} aria-label="Close modal"> × </button>
			</div>
			<div class="modal-body">
				{@render children()}
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		display: flex;
		justify-content: center;
		align-items: flex-end;
		z-index: 1000;
		animation: backdropFadeIn 0.3s ease-out;
	}

	.modal-content {
		background: white;
		border-radius: 20px 20px 0 0;
		width: 100%;
		max-height: 85vh;
		overflow-y: auto;
		box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
		animation: slideUp 0.3s ease-out;
		position: relative;
		transition: transform 0.2s ease-out;
	}

	@keyframes backdropFadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideUp {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}

	.modal-header {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		border-bottom: 1px solid #f0f0f0;
		position: relative;
	}

	.modal-header::before {
		content: '';
		position: absolute;
		top: 8px;
		left: 50%;
		transform: translateX(-50%);
		width: 36px;
		height: 4px;
		background-color: #d1d5db;
		border-radius: 2px;
	}

	.modal-header h2 {
		margin: 0;
		font-size: 1.125rem;
		font-weight: 600;
		color: #111827;
	}

	.close-button {
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
		background: #f3f4f6;
		border: none;
		font-size: 1.25rem;
		cursor: pointer;
		padding: 0;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		color: #6b7280;
		font-weight: 300;
	}

	.close-button:hover {
		background-color: #e5e7eb;
	}

	.modal-body {
		padding: 1.5rem;
		padding-bottom: 2rem;
	}

	/* Add safe area padding for mobile devices */
	@supports (padding-bottom: env(safe-area-inset-bottom)) {
		.modal-body {
			padding-bottom: calc(2rem + env(safe-area-inset-bottom));
		}
	}

	/* Mobile-specific styles */
	@media (max-width: 768px) {
		.modal-content {
			max-height: 90vh;
		}

		.modal-header {
			padding: 1.25rem 1rem 1rem;
		}

		.modal-body {
			padding: 1rem 1.5rem 2rem;
		}
	}
</style>
