<script>
 import { invalidateAll } from '$app/navigation'

 export let data;
 let form;

 async function sendDebug(event) {
     const formEl = event.target;
     const data = new FormData(formEl);
     console.dir(data);

     const response = await fetch(formEl.action, {
         method: 'POST',
         body: data
     })
     const responseData = await response.json()

     // { success: true, errors: {} } object
     form = responseData

     // reset form
     formEl.reset()

     await invalidateAll()
 }

</script>

<h1 class="a11y-hidden">Info</h1>

<p>
<strong>Worum geht's?</strong><br>
Was ist eigentlich Zeit? Ist sie relativ? Und wenn ja, zu was? Kann man sie verlieren?
Warum ist sie ständig so knapp? Fehlt dir die Zeit, eine Pause zu machen?
Spielt es keine Rolle, weil die Geschichte sich wiederholt?
Ist es schon fünf vor zwölf? <br>
Jetzt nur keine Zeit verlieren – jetzt alle Zeit der Welt verlieren.
Take your time, nimm dir die Zeit zurück, in deinem ganz eigenen Tempo.<br>
STERNA | PAU haben für dich den Ostfriedhof erkundet, Interviews mit Spaziergänger:innen, Friedhofsgärtner:innen,
Historiker:innen und Bestatter:innen geführt und sich von Eichhörnchen und Bronzestatuen inspirieren lassen.
„VON ANDEREN ZEITEN“ ist ein interaktiver Spaziergang, der dich mithilfe deines Smartphones über den Ostfriedhof führt.
Das ganze Jahr, in deiner eigenen Geschwindigkeit.
Das Projekt lädt dazu ein, sich Zeit zu nehmen, eine Pause zu machen und Orte der Entspannung mitten in der Großstadt zu entdecken.
</p>

<p>
<strong>Termine</strong><br>
Eröffnungswalks mit performativen Elementen:
Sonntag, 27.10.2024, 16 Uhr <br>
Samstag, 02.11.2024, 16 Uhr <br>
Ostfriedhof, Dortmund <br>
Treffpunkt Haupteingang <br>
</p>

<p>
<strong>Über uns</strong><br>
STERNA │ PAU Produktionen ist ein Theater- und Performance-Netzwerk aus Bochum, Berlin und Dortmund.
Die Künstler*innen produzieren Theater für Jugendliche und Erwachsene und erproben dabei immer
wieder neue Formen von Teilhabe  –  im Entstehungsprozess sowie in Aufführungssituationen.
Gerne arbeiten sie auch mit nicht-menschlichen Akteur*innen und transferieren Theater in digitale Räume.
Im Mittelpunkt stehen vor allem Fragen des Zusammenlebens, Beziehungen jeglicher Form und wie
diese durch Technik, Digitalität und Popkultur geprägt sind. Ihre Agenda ist klar feministisch.
</p>

<p>
<strong>So erreichst du uns</strong><br>
Per Mail: <a href="mailto:info@sternapau.de">info@sternapau.de</a>
Instagram: <a href="https://www.instagram.com/sterna.pau/">@sterna.pau</a>
</p>

<p>
<strong>Dankeschön</strong><br>
Dieses Projekt war nur durch die Unterstützung vieler toller Menschen vor Ort und anderswo möglich.
Wir bedanken uns bei:
</p>

<p>
<strong>"Von anderen Zeiten" wird gefördert durch</strong><br>
</p>

<p>
<strong>Spenden</strong><br>
Falls euch der Spaziergang gefallen hat, bitten wir euch, eine kleine Spende an ... zu schicken.
</p>

<p>
<strong>Quellen 3D</strong><br>
</p>

<div>
    <strong>Debug</strong>
    <form on:submit|preventDefault={sendDebug} method="POST">
        <label>enable debug: <input type="checkbox"
                                    name="enableDebug"
                             checked={data.debug.debug}></label>
        <button type="submit">set</button>
    </form>
    <form  on:submit|preventDefault={sendDebug} method="POST">
        <label>
            data file:
            <select name="selectUser">
                <option value="lisa" selected={data.debug.debugUser == 'lisa'}>lisa</option>
                <option value="jolanda" selected={data.debug.debugUser == 'jolanda'}>jolanda</option>
            </select>
        </label>
        <button type="submit">set</button>
    </form>
</div>
