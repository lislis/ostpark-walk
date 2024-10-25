<script>
 import lisaData from '$lib/data/lisa.json';
 import jolandaData from '$lib/data/jolanda.json';
 import marenData from '$lib/data/maren.json';

 import origData from '$lib/data/data.json';
 import { Map, TileLayer, Icon, Marker,  } from 'sveaflet';
 import { haversine, iconPath, checkForFloaty, calcBearing } from '$lib/util.js';
 import { goto } from '$app/navigation';
 import FloatyAudio from '$lib/components/floatyAudio.svelte';
 import {onMount} from 'svelte';
 import CenterButton from '$lib/components/center_button.svelte';


 export let data;
 //console.log(data.debug.debugUser);

 if (data.debug.debug) {
     if (data.debug.debugUser === 'lisa') {
         data = lisaData;
     } else if (data.debug.debugUser === 'jolanda') {
         data = jolandaData;
     } else if (data.debug.debugUser === 'maren') {
         data = marenData;
     }
 } else {
     data = origData;
 }


 let map;
 let meMarker;
 let selfLocation;
 // this will hold the representations of the POIs on the map
 // we can then identify the POI markers by index
 let markers = Array.apply(null, Array(data.pois.length)).map(function () {});
 let outsidePark = false;
 let center = data.config.mapCenter;
 let floatySrc;
 let floatyTitle;
 let floatyId;
 let floaty = false;
 let bearing = 0;

 let centerMap = false;

 function toggleCenterMap(msg) {
     centerMap = msg.detail.text;
     //console.log(msg)
 }

 onMount(() => {
     document.querySelector('html').classList.remove('a-fullscreen');
     if (document.querySelector('video')) {
         document.querySelector('video').remove();
     }
 })

 function foundLocation(position) {
     let pos = [position.coords.latitude, position.coords.longitude];

     if (haversine(pos, center) > data.config.radiusPark) {
         outsidePark = true;
         if (centerMap) {
             map.setView(center);
         }
     } else {
         outsidePark = false;
         bearing = calcBearing(meMarker, pos);
         console.log(bearing, selfLocation)
         if (bearing != 0) {
             let t = selfLocation._icon.style.transform;
             t += ` rotation(${bearing}deg)`
             selfLocation._icon.style.transform = t;
             //selfLocation._icon.style
             //debugger
         }

         meMarker = pos;

         if (centerMap) {
             map.setView(pos);
         }

         data.pois.forEach((val, index) => {
             let h = haversine(meMarker, val.coords);
             if (h < data.config.radiusPOI) {
                 markers[index]._icon.classList.add("jump")
             } else {
                 markers[index]._icon.classList.remove("jump");
             }
         });

         floaty = checkForFloaty(meMarker, data.pois, (val) => {
             floatySrc = val.audioSrc;
             floatyTitle = val.title;
             floatyId = val.id;
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
             maximumAge: 1000
     });

     if (markers.every(x => x != undefined)) {
         L.featureGroup(markers)
          .on('click', (ev) => {
              data.pois.forEach((val, key) => {
                  let clickedPoint = [ev.latlng.lat, ev.latlng.lng]
                  let h = haversine(clickedPoint, val.coords);
                  if (h < data.config.radiusPOI && val.clickable) {
                      if (val.type === "ar") {
                          goto(`/ar`);
                      } else {
                          goto(`/poi/${val.id}`);
                      }
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
	options= {{
		 maxZoom: 19,
		 attribution:
		 '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors. Tile style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OSM</a>, hosted by <a href="https://openstreetmap.fr/" target="_blank">OSM France</a>'
		 }}
    />


    {#if meMarker}
        <Marker bind:instance={selfLocation} latLng={meMarker} options={{ title: "Du" }}>
	    <Icon options={{ iconUrl: '/icons/shoes-marker.svg',
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

<CenterButton isCenter={centerMap} on:centermap-event={toggleCenterMap} />


{#if floaty}
    <FloatyAudio audioSrc={floatySrc}
                 title={floatyTitle}
                 autoplay="true"
                 item2fetch={data.pois.find(x => x.id === floatyId)} />
{/if}
