<?php
  require_once("conn.php");
  
  function getUserByUsername($username) {
    global $conn;
    
    $sql = sprintf(
      "SELECT * FROM jen713_wk9_users WHERE username = '%s'",
      $username
    );
    $result = $conn->query($sql);
    if (!$result) {
      die($conn->error);
    }
    return $result->fetch_assoc();
  }

  function generateErrMsg($code) {
    $err_msg = "ERROR: ";
    
    if ($code === "1") {
      $err_msg .= "Field(s) Required.";
    } elseif ($code === "2") {
      $err_msg .= "The User is Already Exist.";
    } elseif ($code === "3") {
      $err_msg .= "Invalid Username or Password; or User Does Not Exist.";
    } else {
      $err_msg .= "Not a Valid Request.";
    }
    return $err_msg;
  }
?>