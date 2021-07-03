<?php
  require_once("conn.php");

  function errMSg($code) {
    $err_msg = "ERROR: ";
    switch($code) {
      case "1":
        $err_msg .= "Field(s) Required.";
        break;
      case "2":
        $err_msg .= "Unidentify User.";
        break;
      case "3":
        $err_msg .= "Incorrect Username or Password.";
        break;
      case "4":
        $err_msg .= "User Already Exist.";
        break;
      case "5":
        $err_msg .= "The Post Doesn't Exist.";
        break;
      default:
        return;
    }
    return $err_msg;
  }

  function htmlEscape($str) {
    return htmlspecialchars($str, $ENT_QUOTES);
  }
?>