<script>
 import data from '$lib/data/data.json';
 import { Map, TileLayer, CircleMarker, Marker, Popup } from 'sveaflet';
 import Pop from '$lib/components/pop.svelte';
 import { withinRadius } from '$lib/util.js'

 let map;
 let meMarker;

 let clear;
 let outsidePark = false;
 let center = data.config.mapCenter;

 $: if (map) {
     map.on('locationfound', function(ev){
         meMarker = ev.latlng;
         if (withinRadius(ev.latlng, center, data.config.radiusPark)) {
             outsidePark = false;
             //map.locate();
             map.setView(meMarker);
             //console.log("inside the park")
         } else {
             outsidePark = true;
             map.setView(center);
             map.stopLocate();
             //console.log("outside the park");
         }
     });

     map.locate({
         setView: false,
         watch: false,
         maxZoom: 19
     })
 }

 function logMe() {
     console.log("logme")
 }

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
            <Popup options={{ content: `${poi.title}` }}>
                <Pop title={ poi.title }
                     id={ poi.id }
                     description={ poi.description }
                />
            </Popup>
        </CircleMarker>
    {/each}
</Map>

{#if outsidePark}

    <div class="outside-notice">
        <p>Du bist außerhalb des Parks</p>
    </div>

{/if}
