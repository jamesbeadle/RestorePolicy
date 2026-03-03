<script lang="ts">
  import { categories, policies } from '$lib/data/policies';

  let selectedCategory = $state('All categories');

  const allCategoryOptions = ['All categories', ...categories];

  const filteredPolicies = $derived(
    selectedCategory === 'All categories'
      ? policies
      : policies.filter((policy) => policy.category === selectedCategory)
  );

  const formatAnnounced = (dateString: string) =>
    new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(dateString));
</script>

<div class="page">
  <div class="container">
    <header class="header">
      <img class="logo" src="/logo.jpg" alt="Restore Policy logo" />
      <div>
        <h1 class="title">Restore Policy</h1>
        <p class="subtitle">Read party policies by category</p>
      </div>
    </header>

    <section class="filters" aria-label="Policy filters">
      <label for="category">Category</label>
      <select id="category" bind:value={selectedCategory}>
        {#each allCategoryOptions as category}
          <option value={category}>{category}</option>
        {/each}
      </select>
    </section>

    <section class="results" aria-live="polite">
      {#if filteredPolicies.length === 0}
        <div class="empty">No policies found for this category.</div>
      {:else}
        {#each filteredPolicies as policy}
          <article class="card">
            <h2>{policy.title}</h2>
            <p class="meta">
              {policy.category} | Announced: {formatAnnounced(policy.announced)}
            </p>
            <p class="detail">{policy.detail}</p>
            <a class="source" href={policy.sourceUrl} target="_blank" rel="noreferrer">
              {policy.sourceLabel}
            </a>
          </article>
        {/each}
      {/if}
    </section>
  </div>
</div>
