<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  let currentPath = $derived(page.url.pathname);

  function navigateTo(path: string) {
    goto(path);
  }

  // Navigation items
  const navItems = [
    {
      id: 'home',
      label: 'Program',
      path: '/',
      icon: 'calendar'
    },
    { 
      id: 'progress',
      label: 'Progress',
      path: '/progress',
      icon: 'chart'
    },
    { 
      id: 'settings',
      label: 'Settings',
      path: '/settings',
      icon: 'settings'
    }
  ];


  function getIconSVG(iconName: string): string {
    const icons = {
      calendar: `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
      </svg>`,
      chart: `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3.5 18.49l6-6.01 4 4L22 6.91l-1.41-1.41-7.09 7.97-4-4L3.5 16.99z"/>
      </svg>`,
      settings: `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
      </svg>`
    };
    return icons[iconName] || '';
  }
</script>

<!-- Bottom Navigation -->
<nav class="bottom-nav">
  <div class="nav-container">
    {#each navItems as item}
      <button 
        onclick={() => navigateTo(item.path)}
        class="nav-item"
        class:active={currentPath === item.path}
      >
        <div class="nav-icon">
          {@html getIconSVG(item.icon)}
        </div>
        <span class="nav-label">{item.label}</span>
      </button>
    {/each}
  </div>
</nav>


<style>

  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    border-top: 1px solid #e5e7eb;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }

  .nav-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 64px;
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 8px 4px;
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .nav-item:hover {
    color: #374151;
  }

  .nav-item.active {
    color: #2563eb;
  }

  .nav-icon {
    margin-bottom: 4px;
  }

  .nav-label {
    font-size: 12px;
    font-weight: 500;
  }

</style>

