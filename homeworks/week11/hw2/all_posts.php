<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");
  
  $username = NULL;
  if ($_SESSION["username"]) {
    $username = $_SESSION["username"];
  }

  $sql = "SELECT " .
    "P.id AS id, " .
    "P.title AS title, " .
    "P.post AS post, " .
    "P.created_at AS created_at, " .
    "C.category_name AS category " .
  "FROM jen713_wk11_blog_posts AS P " .
  "INNER JOIN jen713_wk11_blog_categories AS C " .
  "ON C.id = P.category_id " .
  "WHERE P.is_deleted IS NULL " .
  "ORDER BY P.id DESC ";

  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();

  if(!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();
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
          <?php if (!$username) { ?>
            <!-- <a class="navbar__register" href="register.php">註冊</a> -->
            <a class="navbar__login" href="login.php">登入</a>
          <?php } else { ?>
            <a class="navbar__create-post" href="new_post.php">新增文章</a>
            <a class="navbar__logut" href="handle_logout.php">登出</a>
            <a class="navbar__admin" href="admin.php">後台</a>
          <?php } ?>
        </div>
      </div>
    </nav>
    <header class="head__banner">
      <h1 class="banner__title">存放技術之地 - 全部文章</h1>
      <h4 class="banner__sub-title">Welcome to my blog</h4>
    </header>
    <main class="posts__list">
      <?php while ($row = $result->fetch_assoc()) { ?>
        <section class="posts__card" id="no-line">
          <div class="card__post-title">
            <div class="post-title"><a href="show_post.php?id=<?php echo $row["id"]; ?>"><?php echo htmlEscape($row["title"]); ?></a></div>
            <div class="post__timestamp"><?php echo $row["created_at"]; ?></div>
            <div class="post__timestamp"><?php echo $row["category"]; ?></div>
          </div>
        </section>
      <?php } ?>
    </main>
    <footer class="footer__license">
      <div class="license__copyright">Copyright &copy; 2020 Who's Blog All Reserved.</div>
    </footer>
  </body>
</html>