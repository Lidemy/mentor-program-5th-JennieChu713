<?php
  require_once("conn.php");

  if (empty($_GET["id"])) {
    header("Location: show_post.php?errCode=5");
    die($conn->error);
  }

  $id = $_GET["id"];
  $stmt = $conn->prepare("UPDATE jen713_wk11_blog_posts SET is_deleted = 1 WHERE id = ?");
  $stmt->bind_param("i", $id);
  $result = $stmt->execute();

  if(!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>