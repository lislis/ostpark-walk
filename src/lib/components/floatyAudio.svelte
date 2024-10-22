<script>
import PoiAudio from '$lib/components/poi_audio.svelte';

export let title = "";
export let audioSrc = undefined;
export let autoplay = false;
</script>


{#if audioSrc}
<div class="floaty-audio">
  <p>{title}</p>
  <PoiAudio {audioSrc} {autoplay} on:floatyplayer />
</div>
{/if}
