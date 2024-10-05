<script>
 import data from '$lib/data/data.json';
 import { page } from '$app/stores';
 import PoiText from '$lib/components/poi_text.svelte';
 import PoiAudio from '$lib/components/poi_audio.svelte';
 import PoiEmbed from '$lib/components/poi_embed.svelte';
 import PoiAr from '$lib/components/poi_ar.svelte';

 const poi = data.pois.find(x => x.id == $page.params.id)
</script>


{#if poi}
<h1 class="site-title">{poi.title}</h1>
<div>{@html poi.description}</div>

{#if poi.type == 'audio'}
    <PoiAudio audioSrc={poi.audioSrc} />
{/if}

{#if poi.type == 'embed'}
    <PoiEmbed embedCode={poi.embedCode} />
{/if}

{#if poi.type == 'ar'}
    <PoiAr poi={poi} />
{/if}

<PoiText text={poi.text} />
{/if}
