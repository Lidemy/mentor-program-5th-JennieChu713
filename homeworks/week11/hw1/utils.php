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
    $sql = sprintf("SELECT * FROM jen713_wk11_msg_users WHERE username = '%s'", $username);
    $result = $conn->query($sql);

    if (!$result) {
      die($conn->error);
    }

    $row = $result->fetch_assoc();
    return $row;
  }

  function htmlEscape($str) {
    return htmlspecialchars($str, $ENT_QUOTES);
  }
?>
