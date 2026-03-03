<script lang="ts">
  import { categories, policies } from '$lib/data/policies';

  let selectedCategory = $state('All categories');
  let searchKeyword = $state('');
  let announcedFrom = $state('');
  let announcedTo = $state('');

  const allCategoryOptions = ['All categories', ...categories];

  const filteredPolicies = $derived.by(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return policies.filter((policy) => {
      const matchesCategory =
        selectedCategory === 'All categories' || policy.category === selectedCategory;

      const matchesKeyword =
        keyword.length === 0 ||
        policy.title.toLowerCase().includes(keyword) ||
        policy.detail.toLowerCase().includes(keyword) ||
        policy.category.toLowerCase().includes(keyword);

      const announcedDate = new Date(policy.announced);
      const hasValidDate = !Number.isNaN(announcedDate.getTime());
      const fromDate = announcedFrom ? new Date(announcedFrom) : null;
      const toDate = announcedTo ? new Date(announcedTo) : null;

      const matchesFrom = fromDate ? hasValidDate && announcedDate >= fromDate : true;
      const matchesTo = toDate ? hasValidDate && announcedDate <= toDate : true;

      return matchesCategory && matchesKeyword && matchesFrom && matchesTo;
    });
  });

  const formatAnnounced = (dateString: string) => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
      return 'Unknown';
    }

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };
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

      <label for="keyword">Keyword search</label>
      <input
        id="keyword"
        type="search"
        bind:value={searchKeyword}
        placeholder="Search policy text..."
        autocomplete="off"
      />

      <div class="date-filters">
        <div>
          <label for="announced-from">Announced from</label>
          <input id="announced-from" type="date" bind:value={announcedFrom} />
        </div>
        <div>
          <label for="announced-to">Announced to</label>
          <input id="announced-to" type="date" bind:value={announcedTo} />
        </div>
      </div>
    </section>

    <section class="results" aria-live="polite">
      {#if filteredPolicies.length === 0}
        <div class="empty">No policies found for this category.</div>
      {:else}
        {#each filteredPolicies as policy}
          <details class="policy-accordion">
            <summary>
              <span class="summary-title">{policy.title}</span>
              <span class="summary-meta">{policy.category} | Announced: {formatAnnounced(policy.announced)}</span>
            </summary>
            <div class="accordion-content">
              <p class="detail">{policy.detail}</p>
              <a class="source" href={policy.sourceUrl} target="_blank" rel="noreferrer">
                {policy.sourceLabel}
              </a>
            </div>
          </details>
        {/each}
      {/if}
    </section>
  </div>
</div>
