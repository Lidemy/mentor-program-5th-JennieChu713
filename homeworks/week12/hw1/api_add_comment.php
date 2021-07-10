<?php
 require_once("conn.php");
 require_once("utils.php");
 header("Content-Type: application/json;charset=utf-8");
 header("Access-Control-Allow-Origin: *");

 //empty field process
 if (empty($_POST["nickname"]) || empty($_POST["site_key"]) || empty($_POST["comment"])) {
    jsonMsg("All Fields Required!", false);
    die();
  }

  $nickname = $_POST["nickname"];
  $site_key = $_POST["site_key"];
  $comment = $_POST["comment"];

  $sql = "INSERT INTO jen713_wk12_comments(nickname, site_key, comment) VALUES (?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sss", $nickname, $site_key, $comment);
  $result = $stmt->execute();

  if (!$result) {
    jsonMsg("Something Went Wrong.", false);
    die();
  }

  jsonMsg("Success!", true);
?>