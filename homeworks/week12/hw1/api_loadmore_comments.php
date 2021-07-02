<?php
  require_once("conn.php");
  require_once("utils.php");
  header("Content-Type: application/json;charset=utf-8");
  header("Access-Control-Allow-Origin: *");

  if (empty($_GET["id"])||empty($_GET["site_key"])) {
    jsonMsg("Id and Site-key are Required!",false);
    die();
  }

  $id = $_GET["id"];
  $site_key = $_GET["site_key"];

  $sql = "SELECT id, nickname, comment, created_at FROM jen713_wk12_comments WHERE id < ? AND site_key = ? ORDER BY id DESC LIMIT 5";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("is", $id, $site_key);
  $result = $stmt->execute();

  if (!$result) {
    jsonMsg("Something Went Wrong." ,false);
    die();
  }

  $result = $stmt->get_result();
  $comments = array();
  while ($row = $result->fetch_assoc()) {
    array_push(
      $comments,
      array(
        "id" => $row["id"],
        "nickname" => $row["nickname"],
        "comment" => $row["comment"],
        "created_at" => $row["created_at"],
        "site_key" => $site_key
      )
    );
  }

  $json = array(
    "ok" => true,
    "comments" => $comments
  );
  $response = json_encode($json);
  echo $response;
?>