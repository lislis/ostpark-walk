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
     return `latitude: ${myPos.latitude + (0.0011 * index)}; longitude: ${myPos.longitude + 0.001 * index}`;
 }

 let coords1 = [52.531106, 13.351918];
 let coords2 = [52.531311, 13.352691];

 let testCoords = [coords1, coords2];
</script>


{#if myPos}
<div class="aframe">
    <a-scene vr-mode-ui='enabled: false' arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false' renderer='antialias: true; alpha: true'>
        <a-camera gps-new-camera='gpsMinDistance: 5'></a-camera>

        {#each testCoords as poi}
            <a-entity  gltf-model="url(/models/character_jack.gltf)"
                       animation-mixer
                       gps-new-entity-place={poi}
                       scale="10 10 10"
                       position="0 0 0"
            ></a-entity>
        {/each}

    </a-scene>
</div>
{/if}
