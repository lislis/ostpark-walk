<script>
 import { page } from '$app/stores';
 import {onMount} from 'svelte';

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
        <a href="/karte">zurück <img src={closeSrc} with="36" height="36" alt="schließen" /></a>
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
