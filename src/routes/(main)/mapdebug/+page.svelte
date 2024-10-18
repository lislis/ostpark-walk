<script>
 import data from '$lib/data/data.json';
 import { Map, TileLayer, Popup, Icon, LayerGroup, Marker } from 'sveaflet';
 import Pop from '$lib/components/pop.svelte';
 import { withinRadius, haversine } from '$lib/util.js'
 import { goto } from '$app/navigation';

 let map;
 let meMarker;
 let outsidePark = false;

 let coords1 = [52.532331, 13.350593];
 let coords2 = [52.531981, 13.351076];

 let audio = new Audio();

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

 let marker1;
 let marker2;

 $: if(marker1 && marker2) {
     L.featureGroup([marker1, marker2])
      .on('click', (ev) => {
          [point1, point2].forEach((val, key) => {
              let clickedPoint = [ev.latlng.lat, ev.latlng.lng]
              let h = haversine(clickedPoint, val.coords);

              if (h < data.config.radiusPOI) {
                  //console.log(h);
                  //console.log("clicked on marker ", val.id, val.title)
                  goto(`/poi/${val.id}`);
              }
          })
      }).addTo(map);

 }
 navigator.geolocation.getCurrentPosition((position) => {
     let pos = [position.coords.latitude, position.coords.longitude];
     map.setView(pos);
     meMarker = pos;
     console.log(position);
 });

</script>


<Map options={{ center: data.config.mapCenter, zoom: 17 }} bind:instance={map}>
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

        <Marker latLng={meMarker}>
	    <Icon options={{ iconUrl: '/icons/shoes.svg',
                          iconSize: [60, 60],
		          iconAnchor: [30, 30] }} />
	</Marker>
    {/if}


    <Marker bind:instance={marker1} latLng={ coords1 }

            options={{ radius: data.config.radiusPOI,
                    color: 'blue',
                    title: point1.id}}>
        <Icon options={{
                      iconUrl: '/icons/audio.svg',
                      iconSize: [60, 75],
		      iconAnchor: [30, 75]}} />
    </Marker>


    <Marker  bind:instance={marker2} latLng={ coords2 }

             options={{ radius: data.config.radiusPOI,
                     color: 'green',
                     title: point2.id}}
    >
        <Icon options={{ iconUrl: '/icons/3d.svg',
                      iconSize: [60, 75],
		      iconAnchor: [30, 75] }} />
    </Marker>

</Map>
