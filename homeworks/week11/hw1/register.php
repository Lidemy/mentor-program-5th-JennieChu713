<?php
  require_once("utils.php");
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
        <a href="login.php" class="stateful__btn-login">Login</a>  
      </div>
      <h3>Register</h3>
      <form action="handle_register.php" method="POST" class="form__area">
        <label for="username">Username:</label>
        <input type="text" name="username" id="username">
        <label for="nickname">Nickname:</label>
        <input type="text" name="nickname" id="nickname">
        <label for="password">Password:</label>
        <input type="password" name="password" id="password">
        <input type="submit" value="Register" class="form__btn">
      </form>
    </section>
  </main>
</body>
</html>