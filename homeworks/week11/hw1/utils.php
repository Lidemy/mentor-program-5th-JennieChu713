<?php
  require_once("conn.php");

  function errMsg($code) {
    $err_msg = "ERROR: ";
    if ($code === "1") {
      $err_msg .= "Field(s) Required.";
    } elseif ($code === "2") {
      $err_msg .= "User Already Exist.";
    } elseif ($code === "3") {
      $err_msg .= "Incorrect Username or Password.";
    } elseif ($code === "4") {
      $err_msg .= "Unidentify User.";
    } elseif ($code === "5") {
      $err_msg .= "The Post Doesn't Exist.";
    } else {
      header("Location: index.php");
    }
    return $err_msg;
  }
  
  
  function getUserByUsername($username) {
    global $conn;
    $sql = "SELECT * FROM jen713_wk11_msg_users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $result = $stmt->execute();

    if(!$result) {
      die($conn->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row;
  }

  function htmlEscape($str) {
    return htmlspecialchars($str, $ENT_QUOTES);
  }
?>