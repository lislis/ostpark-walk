<script>
 import data from '$lib/data/data.json';
 import { Map, TileLayer, CircleMarker, Marker, Popup } from 'sveaflet';

 let map;
 let meMarker;

 let clear;

 $: if (map) {
     map.on('locationfound', function(ev){
         // check four bounds around Ostpark?
         meMarker = ev.latlng;
     })
     map.locate({
         setView: true,
         watch:true,
         maxZoom: 19
     })
 }

 function logMe(ev) {
     console.log("logged me")
 }

 let center = [51.509640, 7.491308];
</script>

<Map options={{ center: center, zoom: 17 }} bind:instance={map}>
    <TileLayer
	layerType="base"
	name="OpenStreetMap.HOT"
        url={'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'}
	options={{
		maxZoom: 19,
		attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
		}}
    />


    {#if meMarker}
        <CircleMarker latLng={ meMarker } options={{color: 'red'}} />
    {/if}

    {#each data.pois as poi}
        <CircleMarker latLng={ poi.coords  } on:click={logMe} >
            <Popup options={{ content: `${poi.title}` }} />
        </CircleMarker>
    {/each}

</Map>
