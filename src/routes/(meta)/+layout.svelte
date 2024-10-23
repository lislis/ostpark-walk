<script>
 import { page } from '$app/stores';
 import {onMount} from 'svelte';


 export let data;

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
    <header class="meta-back">
        {#if data && data.debug.debug}
            <a href="/mapdebug">zurück <img src={closeSrc} with="36" height="36" alt="schließen" /></a>
        {:else }
            <a href="/karte">zurück <img src={closeSrc} with="36" height="36" alt="schließen" /></a>
        {/if}
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
    </main>
</div>
