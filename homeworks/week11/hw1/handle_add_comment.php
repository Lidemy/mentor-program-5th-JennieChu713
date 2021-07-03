<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (empty($_POST["comment"])) {
    header("Location: index.php?errCode=1");
    die($conn->error);
  }

  $user = getUserByUsername($_SESSION["username"]);
  $username = $user["username"];
  $comment = $_POST["comment"];

  $sql = "INSERT INTO jen713_wk11_msg_comments(username, comment) VALUES (?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ss", $username, $comment);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>