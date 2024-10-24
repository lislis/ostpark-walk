<script>
 import { createEventDispatcher } from 'svelte';

 const dispatch = createEventDispatcher();

 export let isCenter = false;

 function handleClick() {
     dispatch('centermap-event', {
         text: !isCenter
     })
 }
</script>

<button class="center-button" on:click={handleClick}>
    {#if isCenter}
        <span class="a11y-hidden">zentriert</span>
        <img src="/icons/person.svg" width="20" height="20" alt="person icon">
    {:else}
        <span class="a11y-hidden">frei</span>
        <img src="/icons/freemap.svg" width="20" height="20" alt="person icon">
    {/if}
</button>
