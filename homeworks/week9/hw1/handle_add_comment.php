<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (empty($_POST["comment"])) {
    header("Location: index.php?errCode=1");
    die("fields required.");
  }

  $user_info = getUserByUsername($_SESSION["username"]);
  $comment = $_POST["comment"];
  $sql = sprintf(
    "INSERT INTO jen713_wk9_comments (nickname, comment) VALUES ('%s', '%s')",
    $user_info["nickname"],
    $comment
  );
  $result = $conn->query($sql);
  
  if (!$result) {
    die($conn->error);
  }
  header("Location: index.php");
?>