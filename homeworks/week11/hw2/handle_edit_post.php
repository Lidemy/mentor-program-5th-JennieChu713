<?php
 require_once("conn.php");
 
 if (empty($_POST["title"]) || empty($_POST["category"]) || empty($_POST["content"])) {
   header("Location: show_post.php?errCode=1");
   die($conn->error);
  }

  $title = $_POST["title"];
  $content = $_POST["content"];
  $category = $_POST["category"];
  $id = $_POST["id"];

  $sql = "UPDATE jen713_wk11_blog_posts SET title = ?, post = ?, category_id = ? WHERE id = ?";
  $stmt =$conn->prepare($sql);
  $stmt->bind_param("ssii", $title, $content, $category, $id);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }
  
  header("Location: show_post.php?id=" . $id);
?>