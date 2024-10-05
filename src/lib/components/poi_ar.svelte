<script>

 export let poi = undefined;
 //export let model = undefined;

</script>

{#if poi}
<div class="aframe">
<a-scene vr-mode-ui='enabled: false' arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false' renderer='antialias: true; alpha: true'>
    <a-camera gps-new-camera='gpsMinDistance: 5'
              simulateLatitude="50.134211"
              simulateLongitude="11.430251"
    ></a-camera>
    <a-entity material='color: red'
              geometry='primitive: box'
              gps-new-entity-place="latitude: 50.134211; longitude: 11.430251"
              scale="10 10 10"
              position="0 30 0"
    ></a-entity>
</a-scene>
</div>
{/if}
