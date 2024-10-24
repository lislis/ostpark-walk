<script>
 import lisaData from '$lib/data/lisa.json';
 import jolandaData from '$lib/data/jolanda.json';
 import marenData from '$lib/data/maren.json';
 import { Map, TileLayer, Popup, Icon, LayerGroup, Marker } from 'sveaflet';
 import Pop from '$lib/components/pop.svelte';
 import { iconPath, haversine, checkForFloaty } from '$lib/util.js'
 import { goto } from '$app/navigation';
 import FloatyAudio from '$lib/components/floatyAudio.svelte';

 export let data;
 //console.log(data.debug.debugUser);

 if (data.debug.debugUser === 'lisa') {
     data = lisaData;
 } else if (data.debug.debugUser === 'jolanda') {
     data = jolandaData;
 } else if (data.debug.debugUser === 'maren') {
     data = marenData;
 }

 let map;
 let meMarker;

 let points = data.pois;
 let markers = Array.apply(null, Array(points.length)).map(function () {});

 let floatySrc;
 let floatyTitle;
 let floaty = false;


 function foundLocation(position) {
     let pos = [position.coords.latitude, position.coords.longitude];
     map.setView(pos);
     meMarker = pos;

     points.forEach((val, index) => {
         let h = haversine(meMarker, val.coords);
         if (h < data.config.radiusPOI) {
             markers[index]._icon.classList.add("jump");
         } else {
             markers[index]._icon.classList.remove("jump");
         }
     })

     floaty = checkForFloaty(meMarker, points, (val) => {
         floatySrc = val.audioSrc;
         floatyTitle = val.title;
     });
 }

 $: if(map) {
     let watchId = navigator.geolocation.watchPosition(
         foundLocation,
         (error) => {
             console.error(`ERROR(${err.code}): ${err.message}`);
         }, {
             enableHighAccuracy: true,
             maximumAge: 1500
     });
     if (markers.every(x => x != undefined)) {

         L.featureGroup(markers)
          .on('click', (ev) => {
              points.forEach((val, key) => {
                  let clickedPoint = [ev.latlng.lat, ev.latlng.lng]
                  let h = haversine(clickedPoint, val.coords);

                  if (h < data.config.radiusPOI && val.clickable) {
                      if (val.type === "ar") {
                          if (data && data.debug && data.debug.debug) {
                              goto(`/ardebug`);
                          }  else {
                              goto(`/ar`);
                          }
                      } else {
                          goto(`/poi/${val.id}`);
                      }
                  }
              })
          }).addTo(map);
     }
 }
</script>


<Map options={{ center: data.config.mapCenter, zoom: 17 }} bind:instance={map}>
    <TileLayer
	layerType="base"
	           name="OpenStreetMap.HOT"
        url={'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'}
	           options={{
		           maxZoom: 19,
		           attribution:
		           '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors. Tile style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OSM</a>, hosted by <a href="https://openstreetmap.fr/" target="_blank">OSM France</a>'
		           }}
    />


    {#each points as point, index}
        <Marker bind:instance={markers[index]} latLng={ point.coords }
                options={{ radius: data.config.radiusPOI,
                        title: point.id}}>
            <Icon options={{
                          iconUrl: iconPath(point.type),
                          iconSize: [60, 75],
		          iconAnchor: [30, 75]}} />
        </Marker>
    {/each}

    {#if meMarker}
        <Marker latLng={meMarker}>
	    <Icon options={{ iconUrl: '/icons/shoes-marker.svg',
                          iconSize: [60, 60],
		          iconAnchor: [30, 30] }} />
	</Marker>
    {/if}
</Map>

{#if floaty}
    <FloatyAudio audioSrc={floatySrc} title={floatyTitle} autoplay={true} />
{/if}
