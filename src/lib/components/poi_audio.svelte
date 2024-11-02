<script>
 import { createEventDispatcher } from 'svelte';

 const dispatch = createEventDispatcher();

 export let audioSrc = undefined;
 export let autoplay = false;

 function sendPlay() {
     //console.log("firing send")
     dispatch('floatyplayer', {
         text: "play"
     })
 }
 function sendPause() {
     //console.log("firing pause")
     dispatch('floatyplayer', {
         text: "pause"
     })
 }
</script>

{#if audioSrc}
    <audio controls {autoplay} on:play={sendPlay} on:pause={sendPause}>
        <source src={audioSrc} type="audio/mpeg">
        <p>
            Dein Browser untersützt HTML Audio nicht. Du kannst die Datei immer noch
            <a href={audioSrc}>herunterladen</a>
        </p>
    </audio>
{/if}
