<script>
 export let debug;

 //console.log(debug, debug.debug);
</script>


<footer>
    <nav class="mainnav">
        {#if debug && debug.debug.debug == true }
            <a href="/mapdebug">
                <img src="/icons/map-white.svg" width="40" alt="Karten-Icon" />
                <span class="a11y-hidden">Karte</span>
            </a>
            <a href="/ardebug">
                <img src="/icons/camera-white.svg" width="40" alt="Kamera-Icon" />
                <span class="a11y-hidden">Kamera</span>
            </a>
        {:else}
            <a href="/karte">
                <img src="/icons/map-white.svg" width="40" alt="Karten-Icon" />
                <span class="a11y-hidden">Karte</span>
            </a>
            <a href="/ar">
                <img src="/icons/camera-white.svg" width="40" alt="Kamera-Icon" />
                <span class="a11y-hidden">Kamera</span>
            </a>
        {/if}
        <a href="/anleitung">
            <img src="/icons/question-white.svg" width="40" alt="Fragezeichen-Icon" />
            <span class="a11y-hidden">Hilfe</span>
        </a>
    </nav>
</footer>
