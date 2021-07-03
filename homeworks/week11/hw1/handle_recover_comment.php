<?php
  require_once("conn.php");

  if (empty($_GET["id"])) {
    header("Location: index.php?errCode=5");
    die($conn->error);
  }

  $id = $_GET["id"];

  $sql = "UPDATE jen713_wk11_msg_comments SET is_deleted = NULL WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $id);
  $result = $stmt->execute();
  
  if (!$result) {
    die($conn->error);
  }
  
  header("Location: admin.php");
?>