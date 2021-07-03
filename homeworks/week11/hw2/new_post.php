<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if ($_SESSION["username"]) {
    $username = $_SESSION["username"];
  }
  if (!$username) {
    header("Location: index.php");
  }

  $stmt = $conn->prepare("SELECT * FROM jen713_wk11_blog_categories");
  $result = $stmt->execute();
  
  if (!$result) {
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
  <script src="https://cdn.ckeditor.com/ckeditor5/28.0.0/classic/ckeditor.js"></script>
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
        <a class="navbar__create-post" href="new_post.php">新增文章</a>
        <a class="navbar__logut" href="handle_logout.php">登出</a>
        <a class="navbar__admin" href="admin.php">後台</a>
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
  <main class="posts__list">
    <section class="post__form">
      <h3>文章編輯</h3>
      <form action="handle_new_post.php" method="POST">
        <label for="title">文章標題</label>
        <input id="title" name="title" type="text">
        <label for="category">文章類別</label>
        <select id="category" name="category">
          <option value="" disabled selected></option>
          <?php while ($row = $result->fetch_assoc()) { ?>
            <option value="<?php echo $row["id"]; ?>"><?php echo $row["category_name"]; ?></option>
          <?php } ?>
        </select>
        <textarea name="content" id="editor">
        </textarea>
        <p><input type="submit" value="Submit"></p>
    </form>
    </section>
  </main>
  <footer class="footer__license">
    <div class="license__copyright">Copyright &copy; 2020 Who's Blog All Reserved.</div>
  </footer>
  <script>
        ClassicEditor
            .create( document.querySelector( '#editor' ) )
            .catch( error => {
                console.error( error );
            } );
    </script>
</body>
</html>