<script>
 export let audioSrc = undefined;
</script>

{#if audioSrc}
    <audio controls>
        <source src={audioSrc} type="audio/mpeg">
        <p>
            Dein Browser untersützt HTML Audio nicht. Du kannst die Datei immer noch
            <a href={audioSrc}>herunterladen</a>
        </p>
    </audio>
{/if}
