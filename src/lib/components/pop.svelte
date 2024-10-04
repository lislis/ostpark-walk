<script>
 export let title = undefined;
 export let id = undefined;

 let path = `/poi/${id}`;

</script>

{#if title && id}
<div>
    <p>{title}</p>
    <a class="button" href={ path } >Ansehen</a>
</div>
{/if}
