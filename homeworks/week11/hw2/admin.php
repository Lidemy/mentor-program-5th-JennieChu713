<?php
  session_start();
  require_once("conn.php");
  
  $username = NULL;
  if ($_SESSION["username"]) {
    $username = $_SESSION["username"];
  }
  if (!$username) {
    header("Location: index.php");
  }

  $stmt = $conn->prepare("SELECT * FROM jen713_wk11_blog_posts WHERE is_deleted IS NULL ORDER BY id DESC");
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
        <a class="navbar__admin" href="index.php">前台</a>
          <a class="navbar__create-post" href="new_post.php">新增文章</a>
          <a class="navbar__logut" href="handle_logout.php">登出</a>
        </div>
      </div>
    </nav>
    <header class="head__banner">
      <h1 class="banner__title">存放技術之地：後台</h1>
      <h4 class="banner__sub-title">Welcome to my blog</h4>
    </header>
    <main class="posts__list">
      <?php while ($row = $result->fetch_assoc()) { ?>
        <section class="posts__card" id="no-line">
          <div class="card__post-title">
            <div class="post-title"><a href="show_post.php?id=<?php echo $row["id"]; ?>"><?php echo $row["title"]; ?></a></div>
            <div class="post__timestamp move-back"><?php echo $row["created_at"]; ?></div>
            <div class="post__btns">
              <a href="edit_post.php?id=<?php echo $row["id"]; ?>" class="post__edit-btn">編輯</a>
              <a href="handle_delete_post.php?id=<?php echo $row["id"]; ?>" class="post__delete-btn">刪除</a>
            </div>
          </div>
        </section>
      <?php } ?>
    </main>
    <footer class="footer__license">
      <div class="license__copyright">Copyright &copy; 2020 Who's Blog All Reserved.</div>
    </footer>
  </body>
</html>