<script>

 //export let model = undefined;

</script>

<div class="aframe">
<a-scene vr-mode-ui='enabled: false' arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false' renderer='antialias: true; alpha: true'>
    <a-camera gps-new-camera='gpsMinDistance: 5'></a-camera>
    <a-entity material='color: red' geometry='primitive: box' gps-new-entity-place="latitude: 50.134211; longitude: 11.430251" scale="10 10 10"></a-entity>
</a-scene>
</div>
