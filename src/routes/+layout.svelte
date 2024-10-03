<script>
 import '../app.css'

 let src = "spp.png";
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
        <a href="/karte">Karte</a>
        <a href="/poi">POIs</a>
        <a href="/hilfe">Hilfe</a>
    </nav>
</footer>
</div>
