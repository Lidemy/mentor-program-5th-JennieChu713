<?php
  function jsonMsg($msgContent, $isOk) {
    $json = array(
      "ok" => $isOk,
      "message" => $msgContent
    );
    $response = json_encode($json);
    echo $response;
  }
?>