<script>
 import data from '$lib/data/data.json';
 import { page } from '$app/stores';
 import PoiText from '$lib/components/poi_text.svelte';

 const poi = data.pois.find(x => x.id == $page.params.id)

</script>


<h1>{poi.title}</h1>

<PoiText text={poi.text} />
