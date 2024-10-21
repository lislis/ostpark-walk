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
     return `latitude: ${myPos.latitude + (0.001 * index)}; longitude: ${myPos.longitude + 0.001 * index}`;
 }

 let coords1 = [52.531106, 13.351918];
 let coords2 = [52.531311, 13.352691];

 let testCoords = [coords1, coords2, [52.533827, 13.350143,], [52.532658, 13.350514]];

 let sound = `src: url(/audio/eichhoernchen.mp3); autoplay: true; on: click`;
</script>


{#if myPos}
<div class="aframe">
    <a-scene vr-mode-ui='enabled: false'
             arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false' renderer='antialias: true; alpha: true'>
        <a-camera gps-camera rotation-reader></a-camera>

        {#each testCoords as poi}
            <a-entity  gltf-model="url(/models/ententanz.glb)"
                       animation-mixer=""
                       gps-entity-place={`latitude: ${poi[0]}; longitude: ${poi[1]}`},
                       scale="5 5 5"
                       rotation="0 0 0"
                       position="0 -1.6 0"
            ></a-entity>
        {/each}

    </a-scene>
</div>
{/if}
