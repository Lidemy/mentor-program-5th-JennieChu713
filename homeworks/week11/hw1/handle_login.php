<?php
  session_start();
  require_once("conn.php");

  if (empty($_POST["username"]) || empty($_POST["password"])) {
    header("Location: login.php?errCode=1");
    die($conn->error);
  }

  $username = $_POST["username"];
  $password = $_POST["password"];

  $sql = "SELECT * FROM jen713_wk11_msg_users WHERE username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $username);
  $result = $stmt->execute();
  
  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();
  if ($result->num_rows === 0) {
    header("Location: login.php?errCode=4");
    exit();
  }

  $row = $result->fetch_assoc();
  if (password_verify($password, $row["password"])) {
    $_SESSION["username"] = $username;
    
    if ($username === "admin") {
      header("Location: admin.php");
    } else {
      header("Location: index.php");
    }
    
  } else {
    header("Location: login.php?errCode=3");
  }
?>