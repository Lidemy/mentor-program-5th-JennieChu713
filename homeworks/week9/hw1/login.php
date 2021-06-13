<?php
  require_once("utils.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message Board</title>
  <link rel="stylesheet" href="https://meyerweb.com/eric/tools/css/reset/reset.css">
  <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="index.css">
</head>
<body class="debug">
  <header class="warning">
    <h1>Caution: 本網站為練習用網站，故忽略資安實作部分，請勿使用真實的帳號密碼！</h1>
  </header>
  <main class="board">
    <div class="board__comment-title">
      <h2>Login</h2>  
      <?php if ($_GET["errCode"]) { ?>
        <div class="error-message">
          <h3><?php echo generateErrMsg($_GET["errCode"]); ?></h3>
        </div>
      <?php } ?>
      <div class="board__btns">
      <div class="board__btns-back"><a href="index.php">Back to Message Board</a></div>
      <div class="board__btns-register"><a href="register.php">Register</a></div>
    </div>
  </div>
    <form action="handle_login.php" method="POST" class="board__add-comment">
      <label for="username">Username：</label>
      <input type="text" id="username" name="username" placeholder="Your username"/>
      <label for="password">Password：</label>
      <input type="password" id="password" name="password" placeholder="Your password"/>
      <input class="board__submit-btn" type="submit" value="SUBMIT">
    </form>
  </main>
</body>
</html>