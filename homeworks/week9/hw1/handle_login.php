<?php
  require_once("conn.php");

  if (empty($_POST["username"]) || empty($_POST["password"])) {
    header("Location: login.php?errCode=1");
    die("fields required.");
  }

  $username = $_POST["username"];
  $password = $_POST["password"];
  $sql = sprintf(
    "SELECT * FROM jen713_wk9_users WHERE username = '%s' AND `password` = '%s'",
    $username,
    $password
  );
  $result = $conn->query($sql);
  
  if (!$result) {
    die($conn->error);
  }
  if ($result->num_rows) {
    session_start();
    $_SESSION["username"] = $username;
    header("Location: index.php");
  } else {
    header("Location: login.php?errCode=3");
    die("invalid username or password, or the user does not exist.");
  }
?>