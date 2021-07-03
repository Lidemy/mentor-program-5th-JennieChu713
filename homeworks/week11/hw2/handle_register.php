<?php
  session_start();
  require_once("conn.php");

  if (empty($_POST["username"]) || empty($_POST["password"])) {
    header("Location: register.php?errCode=1");
    die($conn->error);
  }

  $username = $_POST["username"];
  $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

  $sql = "INSERT INTO jen713_wk11_blog_users(username, `password`) VALUES (?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ss", $username, $password);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }
  if ($conn->errno === 1062) {
    header("Location: register.php?errCode=4");
    exit();
  }

  $_SESSION["username"] = $username;
  header("Location: index.php");
?>