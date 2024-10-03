<script>
 import { Map, TileLayer, Circle  } from 'sveaflet';

 let center = [51.509640, 7.491308];
</script>

<Map options={{ center: center, zoom: 17 }}>

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


    <Circle latLng={[51.508, -0.11]} />

</Map>
