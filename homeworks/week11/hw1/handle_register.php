<?php
  session_start();
  require_once("conn.php");

  if (empty($_POST["username"]) || empty($_POST["nickname"]) || empty($_POST["password"])) {
    header("Location: register.php?errCode=1");
    die($conn->error);
  }
  
  $username = $_POST["username"];
  $nickname = $_POST["nickname"];
  $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
  

  $sql = "INSERT INTO jen713_wk11_msg_users(username, nickname, `password`) VALUES (?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sss", $username, $nickname, $password);
  $result = $stmt->execute();

  if($conn->errno === 1062) {
    header("Location: register.php?errCode=2");
    exit();
  }
  if (!$result) {
    die($conn->error);
  }

  $auth_stmt = $conn->prepare("INSERT INTO jen713_wk11_msg_auth(username) VALUES (?)");
  $auth_stmt->bind_param("s", $username);
  $auth_confirm = $auth_stmt->execute();
  if(!$auth_confirm) {
    die($conn->error);
  }
  
  $_SESSION["username"] = $username;
  header("Location: index.php");
?>