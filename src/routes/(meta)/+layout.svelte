<script>
 import { page } from '$app/stores';
 import {onMount} from 'svelte';
 import MainNav from '$lib/components/main_nav.svelte';

 let path;
 $: path = $page.url.pathname;

 let closeSrc = "/icons/close.png";

 onMount(() => {
     document.querySelector('html').classList.remove('a-fullscreen');
     if (document.querySelector('video')) {
         document.querySelector('video').remove();
     }
 })

</script>

<div class="wrapper-meta">
    <header>

        <div class="logo">
            <a href="/anleitung" title="Hilfeseite">
                <img src="/spp.png" width="130" alt="sterna | pau produktionen" />
            </a>
        </div>

        <h1>
            <span class="a11y-hidden">Von anderen Zeiten</span>
            <img src="/von-anderen-zeiten.svg" alt="">
        </h1>
    </header>
    <main>
        <div class="tabnav">
            <nav>
                <a href="/anleitung" class={path === '/anleitung' ? 'active' : ''}>Anleitung</a>
                <a href="/faq" class={path === '/faq' ? 'active' : ''}>FAQ</a>
                <a href="/info" class={path === '/info' ? 'active' : ''}>Info</a>
            </nav>
        </div>
        <slot>
        </slot>


        <MainNav />
    </main>
</div>
