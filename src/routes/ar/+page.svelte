<script>
 import data from '$lib/data/data.json';
 import { browser } from '$app/environment';

 let myPos;
 let compCoordStr = "";

 if (browser) {
     navigator.geolocation.getCurrentPosition((position) => {
         myPos = position.coords
//         console.log(position.coords.latitude, position.coords.longitude);
         compCoordStr = `latitude: ${myPos.latitude}; longitude: ${myPos.longitude}`;
     });
 }

 function randPos(myPos, index) {
     return `latitude: ${myPos.latitude + (0.0001 * index)}; longitude: ${myPos.longitude + 0.0001 * index}`;
 }



</script>


{#if myPos}
<div class="aframe">
    <a-scene vr-mode-ui='enabled: false' arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false' renderer='antialias: true; alpha: true'>
        <a-camera gps-new-camera='gpsMinDistance: 5'></a-camera>

        {#each data.pois as poi, index}
            <a-entity material='color: red'
                      geometry='primitive: box'
                      gps-new-entity-place={randPos(myPos, index)}
                                scale="10 10 10"
                      position="0 30 0"
            ></a-entity>
        {/each}
    </a-scene>
</div>
{/if}
