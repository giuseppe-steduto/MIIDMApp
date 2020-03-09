function animaSelezione(sezione) {
    sezione.style.backgroundColor = "#f1c40e";
    cercaRepertiPerSezione(sezione.id);

}

function cercaRepertiPerParolaChiave(key) {
    costruisciListaReperti("./ricercaReperti.php?keyword=" + key, key);
}

function cercaRepertiPerSezione(sez) {
    costruisciListaReperti("./ricercaReperti.php?section=" + sez, sez);
}

function costruisciListaReperti(url, key) {
    fetch(url)
        .then(
            function(response) {
                if(response.status != 200) {
                    console.log("Richiesta rifiutata!");
                    return;
                }

                response.json()
                .then(reperti => {
                    document.getElementById("page_render").innerHTML = "";
                    var intestazione = document.createElement("p");
                    intestazione.innerHTML = "Stai visualizzando i risultati di ricerca per: '<strong>" + key + "</strong>'";
                    intestazione.classList.add("intestazione");
                    document.getElementById("page_render").appendChild(intestazione);
                    reperti.forEach(stampaReperto);
                    bothEmpty(); //Mette entrambe le icone della bottomBar vuote
                });
            }
        ).catch(function(err) {
            console.log("Qualcosa è andato storto!", err);
        });
}

function stampaReperto(reperto, index) {
    //Crea article principale
    var rep = document.createElement("article");
    rep.classList.add("reperto");

    //Crea div container - grid
    var divcontainer = document.createElement("div");
    divcontainer.classList.add("informazioniReperto_gridcontainer");

    //Crea container per l'immagine
    var containerImg = document.createElement("div");
    containerImg.classList.add("imgReperto_container");
    var imgReperto = document.createElement("img");
    imgReperto.src = "res/min_" + nomeFoto(reperto.sezione, reperto.codrelativo);
    containerImg.appendChild(imgReperto);

    //Crea titolo reperto
    var titoloReperto = document.createElement("p");
    titoloReperto.appendChild(document.createTextNode(reperto.nome));
    titoloReperto.classList.add("titoloReperto");

    //Crea informazioni data
    var infoData = document.createElement("div");
    infoData.classList.add("infoReperto");
    infoData.classList.add("infoDataReperto");
    var iconaDataContainer = document.createElement("div");
    iconaDataContainer.classList.add("iconaInfoRepertoContainer");
    var iconaData = document.createElement("img");
    iconaData.classList.add("iconaInfoReperto");
    iconaData.src = "res/calendar.png";
    iconaDataContainer.appendChild(iconaData);
    infoData.appendChild(iconaDataContainer);
    var informazioniData = document.createElement("div");
    var spanData1 = document.createElement("span");
    spanData1.appendChild(document.createTextNode("Data: "));
    var spanData2 = document.createElement("span");
    spanData2.appendChild(document.createTextNode(reperto.annoiniziouso));
    informazioniData.appendChild(spanData1);
    informazioniData.appendChild(spanData2);
    infoData.appendChild(informazioniData);

    //Crea informazioni autore
    var infoAutore = document.createElement("div");
    infoAutore.classList.add("infoReperto");
    infoAutore.classList.add("infoAutoreReperto");
    var iconaAutoreContainer = document.createElement("div");
    iconaAutoreContainer.classList.add("iconaInfoRepertoContainer");
    var iconaAutore = document.createElement("img");
    iconaAutore.classList.add("iconaInfoReperto");
    iconaAutore.src = "res/tools.png";
    iconaAutoreContainer.appendChild(iconaAutore);
    infoAutore.appendChild(iconaAutoreContainer);
    var informazioniAutore = document.createElement("div");
    var spanAutore1 = document.createElement("span");
    spanAutore1.appendChild(document.createTextNode("Autore: "));
    var spanAutore2 = document.createElement("span");
    spanAutore2.appendChild(document.createTextNode(reperto.autori[0])); //DA AGGIUSTARE
    informazioniAutore.appendChild(spanAutore1);
    informazioniAutore.appendChild(spanAutore2);
    infoAutore.appendChild(informazioniAutore);

    //Crea informazioni sezione
    var infoSezione = document.createElement("div");
    infoSezione.classList.add("infoReperto");
    infoSezione.classList.add("infoSezioneReperto");
    var iconaSezioneContainer = document.createElement("div");
    iconaSezioneContainer.classList.add("iconaInfoRepertoContainer");
    var iconaSezione = document.createElement("img");
    iconaSezione.classList.add("iconaInfoReperto");
    iconaSezione.src = "res/section.png";
    iconaSezioneContainer.appendChild(iconaSezione);
    infoSezione.appendChild(iconaSezioneContainer);
    var informazioniSezione = document.createElement("div");
    var spanSezione1 = document.createElement("span");
    spanSezione1.appendChild(document.createTextNode("Sezione: "));
    var spanSezione2 = document.createElement("span");
    spanSezione2.appendChild(document.createTextNode(nomeSezione(reperto.sezione))); //DA AGGIUSTARE
    informazioniSezione.appendChild(spanSezione1);
    informazioniSezione.appendChild(spanSezione2);
    infoSezione.appendChild(informazioniSezione);

    //Vai a capo e crea bottone
    var bottone = document.createElement("button");
    bottone.classList.add("leggiDiPiu");
    bottone.appendChild(document.createTextNode("Leggi di più!"));
    bottone.addEventListener("click", function() {
        this.classList.add("bottoneCliccato");
    })

    divcontainer.appendChild(containerImg);
    divcontainer.appendChild(titoloReperto);
    divcontainer.appendChild(infoData);
    divcontainer.appendChild(infoAutore);
    divcontainer.appendChild(infoSezione);
    rep.appendChild(divcontainer);
    rep.appendChild(bottone);

    //Aggiungi tutto alla pagina
    document.getElementById("page_render").appendChild(rep);
}

function nomeFoto(sezione, cod) {
    var nome = "";
    switch(sezione) {
        case 'E':
            nome = "ELE";
            break;
        case 'I':
            nome = "INF";
            break;
        case 'M':
            nome = "MCC";
            break;
        case 'F':
            nome = "FIS";
            break;
    }
    cod = "" + cod;
    cod = cod.padStart(3, '0');
    nome += "-" + cod + ".0.jpg";
    return nome;
}

function nomeSezione(sez) {
    switch(sez) {
        case 'E':
            return "Elettronica";
        case 'I':
            return "Informatica";
        case 'M':
            return "Meccanica";
        case 'F':
            return "Scienze";
    }
}
