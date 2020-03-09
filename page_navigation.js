var bodyPagina = document.getElementById("page_render");

var cercaButton = document.getElementById("bottom-nav_button-C");
var homeButton = document.getElementById("bottom-nav_button-H");

cercaButton.addEventListener("click", function() {
    fetch("ricerca.html")
    .then(
        function(response) {
            if(response.status != 200) {
                alert("Ops, qualcosa è andato storto! Forse sei offline!");
                return;
            }

            response.text()
            .then(html => {bodyPagina.innerHTML = html;});
        }
    )
    .catch(err => {console.log("Qualcosa è andato storto!" + err);});
});

homeButton.addEventListener("click", function() {
    bodyPagina.innerHTML = "";
});

function scompareNavBarBottom() {
    document.getElementById("bottom-nav").style.display = "none";
    document.getElementById("bottom-nav_button-qr").style.display = "none";
}

function appareNavBarBottom() {
    document.getElementById("bottom-nav").style.display = "block";
    document.getElementById("bottom-nav_button-qr").style.display = "block";
    cercaRepertiPerParolaChiave(document.getElementById("keyword").value);
}
