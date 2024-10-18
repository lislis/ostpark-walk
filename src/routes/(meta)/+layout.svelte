<script>
 let closeSrc = "/icons/close.png";
</script>

<div class="wrapper-meta">
    <header>
        <a href="/karte">zurück <img src={closeSrc} with="30" height="30" alt="schließen" /></a>
    </header>
    <main>
        <div class="tabnav">
            <nav>
                <a href="/anleitung">Anleitung</a>
                <a href="/faq">FAQ</a>
                <a href="/info">Info</a>
            </nav>
        </div>
        <slot>
        </slot>
    </main>
</div>
