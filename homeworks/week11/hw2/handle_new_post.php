<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (empty($_POST["content"]) || empty($_POST["title"]) || empty($_POST["category"])) {
    header("Location: new_post.php?errCode=1");
    die($conn->error);
  }

  $title = $_POST["title"];
  $content = $_POST["content"];
  $c_id = $_POST["category"];
  
  $sql = "INSERT INTO jen713_wk11_blog_posts(title, post, category_id) VALUES (?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ssi", $title, $content, $c_id);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>