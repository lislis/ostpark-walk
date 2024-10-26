<script>
 import { onMount } from 'svelte';
 import InfoGrid from '$lib/components/info_grid.svelte';
 import MainNav from '$lib/components/main_nav.svelte';

 let intro = true;

 onMount(() => {
     setTimeout(() => {
         intro = false;
     }, 2500);
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
        <header>
            <div class="logo"><img src="/spp.png" width="130" alt="STERNA | PAU produktionen" /></div>
            <h1>
                <span class="a11y-hidden">Von anderen Zeiten</span>
                <img src="/von-anderen-zeiten.svg" alt="">
            </h1>
        </header>

        <p>Hallo, du bist ja genau zur richtigen Zeit gekommen!
            Erstmal tief durchatmen. </p>

        <InfoGrid />

        <div class="intro-cta">   
        <a class="button cta" href="/karte" title="Kartenansicht">Los geht's</a>
        </div>

        <MainNav />
    </div>
{/if}
