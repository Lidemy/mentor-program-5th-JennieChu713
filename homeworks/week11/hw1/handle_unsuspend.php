<?php
 require("conn.php");

 if (empty($_GET["id"])) {
   header("Location: admin.php?errCode=5");
   die($conn->error);
  }

 $id = $_GET["id"];

 $stmt = $conn->prepare("UPDATE jen713_wk11_msg_auth SET is_suspend = NULL WHERE id = ?");
 $stmt->bind_param("i", $id);
 $result = $stmt->execute();

 if(!$result) {
   die($conn->error);
 }

 header("Location: admin.php");