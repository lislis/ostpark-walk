<script>
 import PoiAudio from '$lib/components/poi_audio.svelte';
 import PoiText from '$lib/components/poi_text.svelte';
 import { page } from '$app/stores';

 export let title = "";
 export let audioSrc = undefined;
 export let autoplay = false;
 export let item2fetch = undefined;

 let openTranscript = false;

 console.log(item2fetch)

 function toggleTranscript() {
     openTranscript = !openTranscript;
 }
</script>


{#if audioSrc}
    <div class="floaty-audio">
        <p>{title}</p>
        <PoiAudio {audioSrc} {autoplay} on:floatyplayer />


        {#if item2fetch.text || item2fetch.type === "ar"}
            <div class="transcript">
                <div class="transcript-header">
                    {#if  item2fetch.text}
                        <button class="button" on:click={toggleTranscript}>
                            Transcript
                            {#if openTranscript}
                                ausblenden
                            {:else}
                                anzeigen
                            {/if}
                        </button>
                    {/if}

                    {#if item2fetch.type === "ar" && $page.url.pathname !== '/ar' }
                        <a href="/ar" title="Kameraansicht" class="button">

                            <img src="/icons/camera.svg" width="24" height="24" alt="" />
                            <span class="">Kameraansicht</span>
                        </a>
                    {:else}
                        <a href="/karte" title="Kartenansicht" class="button">

                            <img src="/icons/map.svg" width="24" height="24" alt="" />
                            <span class="">Kartenansicht</span>
                        </a>
                    {/if}
                </div>

                {#if openTranscript}
                    <div class="transcript-container">
                        <PoiText text={item2fetch.text} />
                    </div>
                {/if}
            </div>
        {/if}
    </div>
{/if}
