<?php
  require_once("conn.php");

  if (empty($_POST["username"]) || empty($_POST["nickname"]) || empty($_POST["password"])) {
    header("Location: register.php?errCode=1");
    die("fields required");
  }

  $username = $_POST["username"];
  $nickname = $_POST["nickname"];
  $password = $_POST["password"];
  $sql = sprintf(
    "INSERT INTO jen713_wk9_users (username, nickname, `password`) VALUES ('%s', '%s','%s')",
    $username,
    $nickname,
    $password
  );
  $result = $conn->query($sql);
  
  if($conn->errno === 1062) {
    header("Location: register.php?errCode=2");
    die("user already exist.");
  }
  if (!$result) {
    die($conn->error);
  }
  session_start();
  $_SESSION["username"] = $username;
  header("Location: index.php");
?>