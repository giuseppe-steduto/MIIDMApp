<html>
  <head>
    <title>Segnala un bug</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <link rel="stylesheet" href="segnalaUnBug.css">
  </head>
  <body>
    <div id = "segnalaUnBug_divTitolo">
      <h1 id = "segnalaUnBug_titolo">Segnala un bug</h1>
    </div>
    <div id = "segnalaUnBug_divForm">
      <form>
        <div>
          <h1 class = "segnalaUnBug_titoloDivForm">Inserisci dati personali</h1>
          <input type="text" name="nome" placeholder="Inserisci il tuo nome...">
          <input type="text" name="cognome" placeholder="Inserisci il tuo cognome..." class = "segnalaUnBug_altriInput">
          <input type="text" name="indirizzoEmail" placeholder="Inserisci il tuo indirizzo e-mail..." class = "segnalaUnBug_altriInput">
        </div>
        <div style = "margin-top: 2vh">
          <h1 class = "segnalaUnBug_titoloDivForm">Scrivi e-mail</h1>
          <input type="text" name="oggetto" placeholder="Inserisci l'oggetto...">
          <textarea type="text" name="indirizzoEmail" placeholder="Inserisci il testo dell'e-mail..." class = "segnalaUnBug_altriInput"></textarea>
          <input type="submit" value="Invia">
        </div>
      </form>
    </div>
    <footer id = "segnalaUnBug_footer">
      <img id = "segnalaUnBug_iconaFooter" src = "./media/chiudi.svg"></img>
    </footer>
  </body>
</html>
