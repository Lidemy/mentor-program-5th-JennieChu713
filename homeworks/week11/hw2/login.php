<?php
  require_once("utils.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Who's Blog</title>
  <link rel="stylesheet" href="https://meyerweb.com/eric/tools/css/reset/reset.css">
  <link rel="stylesheet" href="index.css">
</head>
<body class="debug">
  <nav class="navbar">
    <div class="wrapper">
      <div class="navbar__left-content">
        <a  class="navbar__logo" href="index.php">Who's Blog</a>
        <a class="navbar__all-posts" href="all_posts.php">文章列表</a>
        <a class="navbar__catagory" href="">分類專區</a>
        <a class="navbar__about" href="">關於我</a>
      </div>
      <div class="navbar__right-content">
        <!-- <a class="navbar__register" href="register.php">註冊</a> -->
      </div>
    </div>
  </nav>
  <header class="head__banner">
    <h1 class="banner__title">存放技術之地</h1>
    <h4 class="banner__sub-title">Welcome to my blog</h4>
    <?php if ($_GET["errCode"]) { ?>
    <div class="error__msg">
      <h2><?php echo errMsg($_GET["errCode"]); ?></h2>
    </div>
    <?php } ?>
  </header>
  <main>
    <section class="login__form">
      <h3>登入</h3>
      <form action="handle_login.php" method="POST">
        <label for="user">Username</label>
        <input id="username" name="username" type="text">
        <label for="password">Password</label>
        <input id="password" name="password" type="password">
        <input type="submit" value="登入">
    </form>
    </section>
  </main>
  <footer class="footer__license">
    <div class="license__copyright">Copyright &copy; 2020 Who's Blog All Reserved.</div>
  </footer>
</body>
</html>