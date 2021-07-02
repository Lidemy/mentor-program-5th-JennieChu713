<?php
  require_once("conn.php");
  require_once("utils.php");
  header("Content-Type: application/json;charset=utf-8");
  header("Access-Control-Allow-Origin: *");
  if (empty($_POST["todo"])) {
    jsonMsg("Fields Required!", false);
    die();
  }

  $todo = $_POST["todo"];
  
  $sql = "INSERT INTO jen713_wk12_todos(todo) VALUES (?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $todo);
  $result = $stmt->execute();
  
  if (!$result) {
    jsonMsg("Something Went Wrong.", false);
    die();
  }

  $json = array(
    "ok" => true,
    "message" => "Success!",
    "id" => $conn->insert_id
  );
  $response = json_encode($json);
  echo $response;
?>