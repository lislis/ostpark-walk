<script>
 import data from '$lib/data/data.json';
 import { Map, TileLayer, CircleMarker, Marker, Popup } from 'sveaflet';
 import Pop from '$lib/components/pop.svelte';
 import { withinRadius } from '$lib/util.js'
 import { goto } from '$app/navigation';

 let map;
 let meMarker;
 let outsidePark = false;
 let center;

 let coords1 = [52.5320503, 13.3513988];
 let coords2 = [52.5320003, 13.3513788];

 let audio;

 let point1 =  {
     "id": 1,
     "type": "audio",
     "title": "POI A",
     "description": "ein kurzer Text",
     "audioSrc": "/audio/20shortsfstories_17_various_128kb.mp3",
     "text": "/text/text1.txt",
     "clickable": true,
     coords: coords1
 };
 let point2 =     {
     "id": 5,
     "type": "audio",
     "title": "POI E",
     "description": "ambient",
     "audioSrc": "/audio/eichhoernchen.mp3",
     "clickable": false,
     coords: coords2
 };


 let once = true;

 $: if (map) {
     map.on('locationfound', function(ev){
         meMarker = ev.latlng;
         center = meMarker;
         locationUpdate();
     });

     map.locate({
         setView: true,
         watch: true,
         maxZoom: 19
     })
 }

 function locationUpdate() {
     //console.log("update")
     [point1, point2].forEach((val, key) => {
         if (withinRadius(meMarker, val.coords, 5)) {
             if (val.clickable === false) {
                 if (!audio.playing) {
                     audio = new Audio(val.audioSrc);
                     audio.play();
                 }
             } else {
                 goto(`/poi/${val.id}`, { replaceState: false });
             }

         }
     })
 }


</script>


<Map options={{ center, zoom: 17 }} bind:instance={map}>
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

    {#if coords1}
        <CircleMarker latLng={ coords1 }
                      options={{ radius: data.config.radiusPOI,
                              color: 'blue' }}>
            <Popup options={{ content: `${point1.title}` }}>
                <Pop title={ point1.title }
                     id={ point1.id }
                     description={ point1.description }
                />
            </Popup>
        </CircleMarker>
    {/if}

    {#if coords2}
        <CircleMarker latLng={ coords2 }
                      options={{ radius: data.config.radiusPOI,
                              color: 'green' }}>
        </CircleMarker>
    {/if}
</Map>
