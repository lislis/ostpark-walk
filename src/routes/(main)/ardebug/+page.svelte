<script>
 import data from '$lib/data/lisa.json';
 import { browser } from '$app/environment';
  import FloatyAudio from '$lib/components/floatyAudio.svelte';
 import { checkForFloaty } from '$lib/util.js';


 let myPos;
 let arPOIs = data.pois.filter(x => x.type === "ar");

 let floatySrc;
 let floatyTitle;
 let floaty = false;

 function foundLocation(ev) {
     let myPos = [ev.coords.latitude, ev.coords.longitude];

     floaty = checkForFloaty(myPos, arPOIs, (val) => {
        floatySrc = val.audioSrc;   
        floatyTitle = val.title; 
     });
 }

 if (browser) {
     let watchId = navigator.geolocation.watchPosition(
         foundLocation,
         (error) => {
             console.error(`ERROR(${err.code}): ${err.message}`);
         }, {
             enableHighAccuracy: true,
             maximumAge: 1000
     });
 }
 
</script>

<div class="aframe">
    <a-scene vr-mode-ui='enabled: false'
             arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false' renderer='antialias: true; alpha: true'>
        <a-camera gps-projected-camera="maxDistance: 10;" rotation-reader></a-camera>

        {#each arPOIs as poi}
            <a-entity  gltf-model={ poi.gltf }
                       animation-mixer
                       gps-projected-   entity-place={`latitude: ${poi.coords[0]}; longitude: ${poi.coords[1]}`},
                       scale={poi.gltfScale}
                       rotation={poi.gltfRotation}
                       position={poi.gltfPosition}
            >
            </a-entity>
        {/each}
        
    </a-scene>
</div>

{#if floaty}
    <FloatyAudio audioSrc={floatySrc} title={floatyTitle} autoplay={true} />
{/if}
