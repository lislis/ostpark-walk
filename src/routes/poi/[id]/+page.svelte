<script>
 import data from '$lib/data/data.json';
 import { page } from '$app/stores';
 import PoiText from '$lib/components/poi_text.svelte';
 import PoiAudio from '$lib/components/poi_audio.svelte';
 import PoiEmbed from '$lib/components/poi_embed.svelte';

 const poi = data.pois.find(x => x.id == $page.params.id)

</script>


<h1 class="site-title">{poi.title}</h1>
<div>{@html poi.description}</div>

{#if poi.type == 'audio'}
    <PoiAudio audioSrc={poi.audioSrc} />
{/if}

{#if poi.type == 'embed'}
    <PoiEmbed embedCode={poi.embedCode} />
{/if}

<PoiText text={poi.text} />
