<script>
 import data from '$lib/data/data.json';
 import { page } from '$app/stores';

 const poi = data.pois.find(x => x.id == $page.params.id)
</script>


<h1>POI {poi.id}</h1>

{poi.type}
