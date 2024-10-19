<script>
 import data from '$lib/data/data.json';
 import { Map, TileLayer, Icon, Marker,  } from 'sveaflet';
 import { haversine, iconPath, checkForFloaty } from '$lib/util.js';
 import { goto } from '$app/navigation';
 import FloatyAudio from '$lib/components/floatyAudio.svelte';

 let map;
 let meMarker;
 // this will hold the representations of the POIs on the map
 // we can then identify the POI markers by index
 let markers = Array.apply(null, Array(data.pois.length)).map(function () {});
 let outsidePark = false;
 let center = data.config.mapCenter;
 let floatySrc;
 let floatyTitle;
 let floaty = false;

 function foundLocation(position) {
     let pos = [position.coords.latitude, position.coords.longitude];

     if (haversine(pos, center) > data.config.radiusPark) {
         outsidePark = true;
         map.setView(center);
     } else {
         outsidePark = false;
         map.setView(pos);
         meMarker = pos;

         data.pois.forEach((val, index) => {
             let h = haversine(meMarker, val.coords);
             if (h < data.config.radiusPOI) {
                 markers[index]._icon.classList.add("jump")
             } else {
                 markers[index]._icon.classList.remove("jump");
             }
         });

         floaty = checkForFloaty(meMarker, points, (val) => {
             floatySrc = val.audioSrc;
             floatyTitle = val.title;
         });
     }
 }

 $: if (map) {
     let watchId = navigator.geolocation.watchPosition(
         foundLocation,
         (error) => {
             console.error(`ERROR(${err.code}): ${err.message}`);
         }, {
             enableHighAccuracy: true,
             maximumAge: 2000
     });

     if (markers.every(x => x != undefined)) {
         L.featureGroup(markers)
          .on('click', (ev) => {
              data.pois.forEach((val, key) => {
                  let clickedPoint = [ev.latlng.lat, ev.latlng.lng]
                  let h = haversine(clickedPoint, val.coords);
                  if (h < data.config.radiusPOI && val.clickable) {
                      goto(`/poi/${val.id}`);
                  }
              })
          }).addTo(map);
     }
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
        <Marker latLng={meMarker} options={{ title: "Du"}}>
	    <Icon options={{ iconUrl: '/icons/shoes.svg',
                          iconSize: [60, 60],
		          iconAnchor: [30, 30] }} />
	</Marker>
    {/if}

    {#each data.pois as poi, index }
        <Marker  bind:instance={markers[index]} latLng={ poi.coords }
                 options={{ radius: data.config.radiusPOI,
                         title: poi.title }} >
            <Icon options={{ iconUrl: iconPath(poi.type),
                          iconSize: [60, 75],
		          iconAnchor: [30, 75] }} />
        </Marker>
    {/each}
</Map>

{#if outsidePark}
    <div class="outside-notice">
        <p>Du bist außerhalb des Parks.</p>
    </div>
{/if}

{#if floaty}
    <FloatyAudio audioSrc={floatySrc} title={floatyTitle} autoplay="true" />
{/if}
