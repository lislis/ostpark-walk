<script>
 import origData from '$lib/data/data.json';
 import lisaData from '$lib/data/lisa.json';
 import jolandaData from '$lib/data/jolanda.json';
 import marenData from '$lib/data/maren.json';

 import { browser } from '$app/environment';
 import FloatyAudio from '$lib/components/floatyAudio.svelte';
 import { checkForFloaty } from '$lib/util.js';

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


 let myPos;
 let arPOIs = data.pois.filter(x => x.type === "ar");

 let floatySrc;
 let floatyTitle;
 let floatyId;
 let floaty = false;

 function foundLocation(ev) {
     let myPos = [ev.coords.latitude, ev.coords.longitude];

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
             arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false'
             renderer="precision: mediump; antialias: false; alpha: true; logarithmicDepthBuffer: true; colorManagement: true;">
        <a-camera gps-projected-camera rotation-reader near="1" far="50"></a-camera>
        <a-light type="point" intensity="0.9" position="0 0 0"></a-light>

        {#each arPOIs as poi}
            <a-entity
                data-instance-id={poi.id}
                gltf-model={ poi.gltf }
                animation-mixer
                gps-projected-entity-place={`latitude: ${poi.coords[0]}; longitude: ${poi.coords[1]}`},
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
                 item2fetch={arPOIs.find(x => x.id == floatyId)}
                 on:floatyplayer={handlePlayerState} />
{/if}
