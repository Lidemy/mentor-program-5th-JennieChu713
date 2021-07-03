<?php
  session_start();
  require_once("conn.php");

  if(empty($_POST["comment"])) {
    header("Location: update_comment.php?errCode=1&id=" . $_POST["id"]);
    die($conn->error);
  }

  $username = $_SESSION["username"];
  $comment = $_POST["comment"];
  $id = $_POST["id"];

  $sql = "UPDATE jen713_wk11_msg_comments SET comment = ?";
  if ($username === "admin") {
    $sql .= " WHERE id = ?";
  } else {
    $sql .= " WHERE id = ? AND username = ?";
  }
  
  $stmt = $conn->prepare($sql);
  if ($username === "admin") {
    $stmt->bind_param("si", $comment, $id);
  } else {
    $stmt->bind_param("sis", $comment, $id, $username);
  }

  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }
  if ($username === "admin") {
    header("Location: admin.php");
  } else {
    header("Location: index.php");
  }
?>