<script>
 import { onMount } from 'svelte';

 export let text = undefined;
 let fetchedText = "";

 onMount(() => {
     if (text && text !== "") {
         return fetchedText = fetch(`/${text}`)
             .then(d => d.text())
             .then(x => fetchedText = x);
     }
 });
</script>

{#if text}
    {#await fetchedText}
        <p>Text wird geladen...</p>
    {:then}
        <div>
            {@html fetchedText}
        </div>
    {:catch error}
        <p>Es gab einen Fehler beim Laden.</p>
    {/await}
{/if}
