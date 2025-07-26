<!-- progress/+page.svelte (Progress Dashboard) -->
<script lang="ts">
  import { mockData } from "$lib";

</script>
<div class="page">
  <h1 class="page-title">Progress</h1>

  <div class="stats-grid">
    <!-- Progress Cards -->
    <div class="stat-card">
      <h3 class="stat-title">Current Streak</h3>
      <div class="stat-value blue">{mockData.completedWorkouts}</div>
    </div>

    <div class="stat-card">
      <h3 class="stat-title">Completed Workouts</h3>
      <div class="stat-value green">{mockData.completedWorkouts}</div>
    </div>

    <div class="stat-card">
      <h3 class="stat-title">Program Progress</h3>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 50%"></div>
      </div>
      <div class="progress-text">Week {mockData.currentWeek} of 6</div>
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

  .stats-grid {
    display: grid;
    gap: 16px;
  }

  .stat-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    padding: 16px;
  }

  .stat-title {
    font-weight: 600;
    color: #111827;
    margin: 0 0 8px 0;
  }

  .stat-value {
    font-size: 30px;
    font-weight: 700;
  }

  .stat-value.blue {
    color: #2563eb;
  }

  .stat-value.green {
    color: #16a34a;
  }

  .progress-bar {
    width: 100%;
    background-color: #e5e7eb;
    border-radius: 4px;
    height: 8px;
    margin-bottom: 8px;
  }

  .progress-fill {
    background-color: #2563eb;
    height: 8px;
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 14px;
    color: #6b7280;
  }
</style>
