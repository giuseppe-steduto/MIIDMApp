<?php
	/*
     * Funzione che trasforma un array di elementi ottenuti da una select MySQL in una stringa in formato JSON.
     * @param:
     * 	$reperti: Array di elementi (risultato di mysqli_query)
     *
     * @return:
     *  Una stringa in formato JSON che rappresenta l'array (associativo) passato per parametro
    */
	function JSONizza($reperti) {
      $numeroReperti = mysqli_num_rows($reperti);
      $JSONCompleto = "[";
      while($reperto = mysqli_fetch_array($reperti)) {
        $cod = $reperto["codassoluto"];
        $data = $reperto["datacatalogazione"];
        $nome = $reperto["nome"];
        $sezione = $reperto["sezione"];
        $codrel = $reperto["codrelativo"];
        $def = $reperto["definizione"];
        $denstorica = $reperto["denominazionestorica"];
        $des = $reperto["descrizione"];
        $modo = $reperto["modouso"];
        $annoi = $reperto["annoiniziouso"];
        $annof = $reperto["annofineuso"];
        $scopo = $reperto["scopo"];
        $stato = $reperto["stato"];
        $oss = $reperto["osservazioni"];
        $array = array($cod, $data, $nome, $sezione, $codrel, $def, $denstorica, $des, $modo, $annoi, $annof, $scopo, $stato, $oss);
        $JSONCompleto = json_encode($array);
      }
      return $JSONCompleto;
    }

	function JSONizzaParziale($con, $reperti) {
      $numeroReperti = mysqli_num_rows($reperti);
      $JSONCompleto = "[";
	  $i = 0;
      while($reperto = mysqli_fetch_array($reperti)) {
	    $i++;
        $cod = $reperto["codassoluto"];
        $nome = $reperto["nome"];
        $sezione = $reperto["sezione"];
        $codrel = $reperto["codrelativo"];
        $data = $reperto["annoiniziouso"];

		$arrayAutori = array();
		$queryAutori = "SELECT nomeautore FROM hafatto, autore WHERE autore.codautore = hafatto.codautore AND hafatto.codassoluto = $cod";
		$autoriAssieme = mysqli_query($con, $queryAutori);
		while($autoreSingolo = mysqli_fetch_array($autoriAssieme)) {
			array_push($arrayAutori, $autoreSingolo[0]);
		}
        $array = array("codassoluto" => $cod, "nome" => $nome, "sezione" => $sezione, "codrelativo" => $codrel, "annoiniziouso" => $data, "autori" => $arrayAutori);
        $JSONParziale = json_encode($array);
		$JSONCompleto .= $JSONParziale;
		if($i != $numeroReperti) {
			$JSONCompleto .= ",";
		}
      }
	  $JSONCompleto .= "]";
      return $JSONCompleto;
    }


    $con = mysqli_connect("localhost", "databasereperti", "", "my_databasereperti") or die("Connessione al server fallita!");
    mysqli_set_charset($con, "utf8");
    $id = $_GET["id"];
    $parola = $_GET["keyword"];
    $sezione = $_GET["section"];
    if (isset($id)) {
        $query1 = "SELECT * FROM `repertinuova`, `acquisizioni`, `hafatto`, `autore`, `didascalie`, `compostoda`, `media` WHERE repertinuova.codassoluto = hafatto.codassoluto AND autore.codautore = hafatto.codautore AND repertinuova.codassoluto = didascalie.codassoluto AND compostoda.codassoluto = repertinuova.codassoluto AND media.codassoluto = repertinuova.codassoluto AND repertinuova.codassoluto = $id GROUP BY repertinuova.nome";
        $one = mysqli_query($con, $query1);
        $query2 = "SELECT * FROM `misure` WHERE misure.codassoluto = $id";
        $two = mysqli_query($con, $query2);
		exit();
    }
    if (isset($parola)) {
        $query = "SELECT * FROM `repertinuova` WHERE nome LIKE '%$parola%'";
    }
    if (isset($sezione)) {
		switch($sezione) {
			
		}
        $query = "SELECT * FROM `repertinuova` WHERE sezione = '$sezione'";
    }
    $reperti = mysqli_query($con, $query);
    echo JSONizzaParziale($con, $reperti);
?>
