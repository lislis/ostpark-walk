<script>
 import MainNav from '$lib/components/main_nav.svelte';

 let src = "/spp.png";
</script>

<div class="wrapper">
<header>
<h1 class="logo"><img {src} width="130" alt="sterna | pau produktionen" /></h1>
</header>

<main>
<slot></slot>
</main>

<MainNav />
</div>
