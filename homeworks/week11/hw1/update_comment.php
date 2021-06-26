<?php
  session_start();
  require_once("conn.php");  
  require_once("utils.php");

  $username = NULL;
  if ($_SESSION["username"]) {
    $username = $_SESSION["username"];
  }

  $id = $_GET["id"];
  $stmt = $conn->prepare("SELECT * FROM jen713_wk11_msg_comments WHERE id = ?");
  $stmt->bind_param("i", $id);
  $result = $stmt->execute();

  if(!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  $user = getUserByUsername($username);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message Board wk11</title>
  <link rel="stylesheet" href="https://meyerweb.com/eric/tools/css/reset/reset.css">
  <link rel="stylesheet" href="index.css">
</head>
<body class="debug">
  <header class="warning">
    <h1>此為練習用網站，因教學用途刻意忽略資安實作，註冊時請勿使用任何真實帳號或密碼。</h1>
  </header>
  <!-- error message -->
  <?php if ($_GET["errCode"]) { ?>
    <div class="error_msg">
      <h2><?php echo errMsg($_GET["errCode"]); ?></h2>
    </div>
  <?php } ?>
  <main class="board">
    <section class="board__form">
      <div class="stateful__btns">
        <a href="index.php" class="stateful__btn-home">Back</a>
        <span class="stateful__user">Hello, <?php echo $user["nickname"]; ?></span>
        <a href="./handles/handle_logout.php" class="stateful__btn-logout">Logout</a>
      </div>
      <h3>Message Board</h3>
      <form action="handle_update_comment.php" method="POST" class="form__area">
        <label for="comment">Edit Comment</label>
        <textarea name="comment" id="comment" cols="30" rows="10" class="form__content" placeholder="Your message..."><?php echo $row["comment"]; ?></textarea>
        <input type="hidden" name="id" value="<?php echo $row["id"]; ?>">
        <input type="submit" value="Update" class="form__btn">
      </form>
    </section>
  </main>
</body>
</html>