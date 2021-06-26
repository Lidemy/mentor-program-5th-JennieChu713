<?php
  session_start();
  require_once("conn.php");

  if (empty($_GET["id"])) {
    header("Location: index.php?errCode=5");
    die($conn->error);
  }

  $id = $_GET["id"];
  $username = $_SESSION["username"];

  $sql = "UPDATE jen713_wk11_msg_comments SET is_deleted = 1";
  if ($username === "admin") {
    $sql .= " WHERE id=?";
  } else {
    $sql .= " WHERE id = ? AND username = ?";
  }

  $stmt = $conn->prepare($sql);
  if ($username === "admin") {
    $stmt->bind_param("i", $id);
  } else {
    $stmt->bind_param("is", $id, $username);
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