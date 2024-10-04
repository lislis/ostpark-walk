<script>
 export let title = undefined;
 export let id = undefined;
 export let description = "";

 let path = `/poi/${id}`;

</script>

{#if title && id}
<div>
    <p><strong>{title}</strong></p>
    <p>{description}</p>
    <a class="button" href={ path } >Ansehen</a>
</div>
{/if}
