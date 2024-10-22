<script>
 import data from '$lib/data/data.json';
 import { browser } from '$app/environment';
 import FloatyAudio from '$lib/components/floatyAudio.svelte';
 import { checkForFloaty } from '$lib/util.js';

 let myPos;
 let arPOIs = data.pois.filter(x => x.type === "ar");

 let floatySrc;
 let floatyTitle;
 let floatyId;
 let floaty = false;

 function foundLocation(ev) {
     let myPos = [ev.coords.latitude, ev.coords.longitude];
     //console.log("found")

     floaty = checkForFloaty(myPos, arPOIs, (val) => {
         floatySrc = val.audioSrc;
         floatyTitle = val.title;
         floatyId = val.id;
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

 function handlePlayerState(msg) {
     if (msg.detail.text === "play") {
         document.querySelector(`[data-instance-id="${floatyId}"]`).setAttribute('animation-mixer', '');
     } else if (msg.detail.text === "pause") {
         //console.log("rm")
         document.querySelector(`[data-instance-id="${floatyId}"]`).removeAttribute('animation-mixer');
     }
 }

</script>

<div class="aframe">
    <a-scene vr-mode-ui='enabled: false'
             arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false' renderer='antialias: true; alpha: true'>
        <a-camera gps-camera rotation-reader></a-camera>

        {#each arPOIs as poi}
            <a-entity
                data-instance-id={poi.id}
                gltf-model={ poi.gltf }
                animation-mixer
                gps-entity-place={`latitude: ${poi.coords[0]}; longitude: ${poi.coords[1]}`},
                scale={poi.gltfScale}
                rotation={poi.gltfRotation}
                position={poi.gltfPosition}
            >
            </a-entity>
        {/each}
    </a-scene>
</div>

{#if floaty}
    <FloatyAudio audioSrc={floatySrc}
                 title={floatyTitle}
                 autoplay={false}
                 on:floatyplayer={handlePlayerState} />
{/if}
