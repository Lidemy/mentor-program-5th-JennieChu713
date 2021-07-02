<?php
  require_once("conn.php");
  require_once("utils.php");
  header("Content-Type: application/json;charset=utf-8");
  header("Access-Control-Allow-Origin: *");

  if (empty($_GET["id"])) {
    jsonMsg("Id is Required!",false);
    die();
  }

  $id = intval($_GET["id"]);

  $sql = "SELECT id, todo FROM jen713_wk12_todos WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $id);
  $result = $stmt->execute();

  if (!$result) {
    jsonMsg("Something Went Wrong", false);
    die();
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  $json = array(
    "ok" => true,
    "data" => array(
        "id" => $row["id"],
        "todo" => $row["todo"]
      )
  );
  $response = json_encode($json);
  echo $response;
?>