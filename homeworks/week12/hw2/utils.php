<?php
  require_once("conn.php");

  function jsonMsg($msg, $isOk) {
    $json = array(
      "ok" => $isOk,
      "message" => $msg
    );
    $response = json_encode($json);
    echo $response;
  }
?>