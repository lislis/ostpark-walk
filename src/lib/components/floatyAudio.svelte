<script>
 import PoiAudio from '$lib/components/poi_audio.svelte';
 import PoiText from '$lib/components/poi_text.svelte';

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


        {#if item2fetch.text}
            <div class="transcript">
                <button class="button" on:click={toggleTranscript}>
                    Transcript
                    {#if openTranscript}
                        ausblenden
                    {:else}
                        anzeigen
                    {/if}
                </button>
                {#if openTranscript}
                    <div class="transcript-container">
                        <PoiText text={item2fetch.text} />
                    </div>
                {/if}
            </div>
        {/if}
    </div>
{/if}
