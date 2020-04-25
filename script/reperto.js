function visualizzaReperto(codassoluto) {
    fetch("./serverSide/ricercaReperti.php?id=" + codassoluto)
    .then(response => {
        if(response.status != 200) {
            console.log("Richiesta fallita!");
            return;
        }

        response.json().then(jsonRep => {stamparep(jsonRep)});
    })
    .catch(err => {console.log("C'è stato un errore!")});
}

function stamparep(rep){
    //Inserimento informazioni principali
    document.getElementById("rep_sezione_codassoluto").innerHTML = ricavaSezione(rep.sezione).toUpperCase() + " - " + rep.codrelativo;
    document.getElementById("rep_titolo").innerHTML = rep.nome;
    document.getElementById("rep_autore").innerHTML = rep.autori.join(", ");
    document.getElementById("rep_descrizione").innerHTML = rep.didascalia.IT;
    document.getElementById("rep_materiali").innerHTML = camelCasizza(rep.materiale.join(", "));
    var div_misure = document.getElementById("rep_dimensioni");
    var div_media = document.getElementById("container_immagini");

    div_misure.innerHTML = "";
    div_media.innerHTML = "";

    //Inserimento immagini
    const numeroImmagini = parseInt(rep.nmedia);
    for(var nImmagine = 0; nImmagine < numeroImmagini; nImmagine++) {
        var img = document.createElement("img");
        img.src = "../res/miniature/min_" + nomeFoto(rep.sezione, rep.codrelativo, nImmagine);
        div_media.appendChild(img);
        img.classList.add("mySlides");
    }
    mostraImmagine(0);

    //Ottenimento misure
    Object.keys(rep.misura).forEach(m => {
        var divMisuraSingola = document.createElement("div");
        divMisuraSingola.classList.add("reperto_misura_singola");

        var valoreMisura = document.createElement("div");
        valoreMisura.innerText = rep.misura[m];

        var iconaMisura = document.createElement("img");
        iconaMisura.src = "../res/iconaMisura_" + m.replace("à", "a") + ".svg";

        var descrizioneMisura = document.createElement("div");
        descrizioneMisura.innerHTML = m;

        divMisuraSingola.appendChild(descrizioneMisura);
        divMisuraSingola.appendChild(iconaMisura);
        divMisuraSingola.appendChild(valoreMisura);
        div_misure.appendChild(divMisuraSingola);
    });

    //Visualizza pagina del reperto
    apriPaginaReperto();
}

//Trasforma una stringa rendendo solo la prima lettera maiuscola
function camelCasizza(s) {
    s = s.toLowerCase()
    var c = s[0].toUpperCase();
    return c + s.substring(1, s.length);
}

function chiudiPaginaReperto() {
    document.getElementById("pagina_reperto_principale").style.top = "150vh";
    document.getElementById("chiudi_pagina_reperto").style.left = "150vw";
}

function apriPaginaReperto() {
    document.getElementById("pagina_reperto_principale").style.top = 0;
    document.getElementById("chiudi_pagina_reperto").style.left = 0;
}
