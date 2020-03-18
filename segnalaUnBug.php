<?php
  $json = file_get_contents('php://input');
  $data = json_decode($json);
  $header = $data -> nome . ", " . $data -> indirizzoEmail;
  mail("micheleleggi@gmail.com", $data -> oggettoEmail, $data -> testoEmail, $header);
?>
