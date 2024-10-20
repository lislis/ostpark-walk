<script>
 import { onMount } from 'svelte';

 let intro = false;

 onMount(() => {
     setTimeout(() => {
         intro = false;
     }, 3000);
 })




</script>


{#if intro}
<div class="intro-screen-1">

    <h1>
        <span class="a11y-hidden">Von anderen Zeiten</span>
        <img src="/vaz-intro.svg" alt="">
    </h1>

    <p><img src="/sternapau_logo_white.svg"
            alt="STERNA | PAU produktionen"
            width="240" height="auto"></p>

</div>

{:else}

<div class="intro-screen-2">
<h1 class="site-title">Willkommen zur Ostpark-Experience!</h1>

<p>Hallo, du bist ja genau zur richtigen Zeit gekommen!
Erstmal tief durchatmen. </p>
<div class="gridlike">
    <h2>Karte</h2>
    <div>
        <p>
        In der Karten-Ansicht kannst du sehen, wo du dich gerade befindest und an welchen Orten sich verschiedene Medien verstecken.<br>
        <strong>Wichtig:</strong> Bitte gib der App die Berechtigung, auf deinen Standort zuzugreifen!
        </p>
    </div>

    <h2>GPS</h2>
    <div>
        <p>
        Im Zentrum der Karte siehst du deine Position auf der Karte.
        </p>
    </div>

    <h2>3D</h2>
    <div>
        <p>
        Das Rechteck steht für 3D-Elemente, die du durch deine Smartphone-Kamera sehen kannst.
        Wenn du in der Nähe des markierten Ortes bist, schalte auf die Kamera-Ansicht um. <br>
        <strong>Wichtig: </strong> Bitte gib der App die Berechtigung, auf deine Kamera zuzugreifen!
        </p>
    </div>

    <h2>Audio</h2>
    <div>
        <p>
        Das Lautsprecher-Symbol steht für Medien, die man hören kann.
        Sie fangen automatisch an zu spielen, wenn du in einem Umkreis von 10 Meter des markierten Ortes bist.
        </p>
    </div>


    <h2>Kamera</h2>
    <div>
        <p>
        In der Kamera-Ansicht kannst du die Welt um dich herum durch die Kamera deines Smartphones sehen.
        Hier haben sich einige Dinge versteckt, die du mit deinen eigenen Augen nicht wahrnehmen kannst.
        </p>
    </div>

</div>

<a href="/karte" class="button">Los geht's!</a>
</div>
{/if}
