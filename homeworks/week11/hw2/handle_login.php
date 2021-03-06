<?php
  session_start();
  require_once("conn.php");

  if (empty($_POST["username"]) || empty($_POST["password"])) {
    header("Location: login.php?errCode=1");
    die($conn->error);
  }

  $username = $_POST["username"];
  $password = $_POST["password"];

  $stmt = $conn->prepare("SELECT * FROM jen713_wk11_blog_users WHERE username = ?");
  $stmt->bind_param("s", $username);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();
  if ($result->num_rows === 0) {
    header("Location: login.php?errCode=2");
    exit();
  }

  $row = $result->fetch_assoc();
  if (password_verify($password, $row["password"])) {
    $_SESSION["username"] = $username;
    header("Location: admin.php");
  } else {
    header("Location: login.php?errCode=3");
  }
?>