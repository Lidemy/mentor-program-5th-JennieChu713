<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");
  
  $result = $conn->query("SELECT * FROM jen713_wk9_comments ORDER BY id DESC");
  if (!$result) {
    die($conn->error);
  }

  $username = NULL;
  if ($_SESSION["username"]) {
    $username = $_SESSION["username"];
  }
  $user_info = getUserByUsername($username);
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
      <h2>Message Board</h2>
      <!-- error message -->
      <?php if ($_GET["errCode"]) { ?>
        <div class="error-message">
          <h3><?php echo generateErrMsg($_GET["errCode"]); ?></h3>
        </div>
      <?php } ?>
      <div class="board__btns">
        <!-- buttons status -->
        <?php if (!$username) { ?>
          <div class="board__btns-register"><a href="register.php">Register</a></div>
          <div class="board__btns-login"><a href="login.php">Login</a></div>
        <?php } else { ?>
          <div class="board__login-message">Hello, <?php echo $user_info["nickname"]; ?></div>
          <div class="board__btns-logout"><a href="handle_logout.php">Logout</a></div>
        <?php } ?>
      </div>
    </div>
    <?php if ($username) { ?>
      <form action="handle_add_comment.php" method="POST" class="board__add-comment">
        <label for="comment">Your Comment</label>
        <textarea name="comment" id="comment" rows="10" placeholder="Leave a message..."></textarea>
        <input class="board__submit-btn" type="submit" value="SUBMIT">
      </form>
    <?php } else { ?>
      <h3 class="join-message">Please Login or Register</h3>
    <?php } ?>
    <hr/>
    <section class="board__show-comments">
      <!-- render data -->
      <?php while ($row = $result->fetch_assoc()) { ?>
        <div class="comment__card">
          <div class="comment_card-avatar">
            <img src="" alt="">
          </div>
          <div class="comment__card-info">
            <div class="info__status">
              <div class="status__nickname">
                <?php echo $row["nickname"]; ?>
              </div>
              <div class="status__timestamp">
                <?php echo $row["created_at"]; ?>
              </div>
            </div>
            <div class="info__content"><?php echo $row["comment"]; ?></div>
          </div>
        </div>
      <?php } ?>
    </section>
  </main>
</body>
</html>