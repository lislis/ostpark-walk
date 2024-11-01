<script>
 import { createEventDispatcher } from 'svelte';
 import { onMount } from 'svelte';


 const dispatch = createEventDispatcher();

 export let audioSrc = undefined;
 export let autoplay = false;

 let playingOnHide = false;

 onMount(() => {
     const audio = document.querySelector("audio");

     document.addEventListener("visibilitychange", () => {
         if (document.hidden) {
             playingOnHide = !audio.paused;
             audio.pause();
         } else {
             // Page became visible! Resume playing if audio was "playing on hide"
             if (playingOnHide) {
                 audio.play();
             }
         }
     });
 })

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
