<script>

 let src = "/spp.png";
</script>

<div class="wrapper">
<header>
<h1 class="logo"><img {src} width="130" alt="sterna | pau produktionen" /></h1>
</header>

<main>
<slot></slot>
</main>

<footer>
    <nav>
        <a href="/">Home</a>
        <a href="/karte">
           <img src="/icons/map.svg" width="30" alt="Karten-Icon" />
           <span class="a11y-hidden">Karte</span>
           </a>
           <a href="/ar">
               <img src="/icons/camera.svg" width="30" alt="Kamera-Icon" />
               <span class="a11y-hidden">AR</span>
           </a>
        <a href="/anleitung">
            <img src="/icons/question.svg" width="30" alt="Fragezeichen-Icon" />
            <span class="a11y-hidden">Hilfe</span>
        </a>
        <a href="/mapdebug">mapdebug</a>
    </nav>
</footer>
</div>
