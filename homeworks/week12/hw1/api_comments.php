<?php
  require_once("conn.php");
  require_once("utils.php");
  header("Content-Type: application/json;charset=utf-8");
  header("Access-Control-Allow-Origin: *");

  //no site_key process
  if (empty($_GET["site_key"])) {
    jsonMsg("Site Key Required!", false);
    die();
  }

  $site_key = $_GET["site_key"];

  $sql = "SELECT nickname, comment, created_at, id FROM jen713_wk12_comments WHERE site_key = ? ORDER BY id DESC LIMIT 5";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $site_key);
  $result = $stmt->execute();

  if (!$result) {
    jsonMsg("Something Went Wrong.", false);
    die();
  }

  $result = $stmt->get_result();
  $comments = array();
  while ($row = $result->fetch_assoc()) {
    array_push(
      $comments,
      array(
        "nickname" => $row["nickname"],
        "comment" => $row["comment"],
        "created_at" => $row["created_at"],
        "id" => $row["id"],
        "site_key" => $site_key
      )
    );
  }

  //transform to json data
  $json = array(
    "ok" => true,
    "comments" => $comments
  );
  $response = json_encode($json);
  echo $response;
?>