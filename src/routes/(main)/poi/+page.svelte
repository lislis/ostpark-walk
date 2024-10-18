<script>
 import data from '$lib/data/data.json';

</script>

<h1 class="site-title">Points of interest</h1>

<ul>
{#each data.pois as poi}
   <li><a href="/poi/{poi.id}">{poi.title}</a> ({poi.type})</li>
{:else}
  <li>Keine da</li>
{/each}
</ul>
