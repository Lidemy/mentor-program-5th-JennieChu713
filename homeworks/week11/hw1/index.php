<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if ($_SESSION["username"]) {
    $username = $_SESSION["username"];
  }

  $sql = "SELECT " .
    "C.id AS id, " .
    "C.comment AS comment," .
    "C.created_at AS created_at, " .
    "U.username AS username, " .
    "U.nickname AS nickname " .
  "FROM jen713_wk11_msg_comments AS C " .
  "LEFT JOIN jen713_wk11_msg_users AS U " .
  "ON C.username = U.username " .
  "WHERE C.is_deleted IS NULL " .
  "ORDER BY C.id DESC";
  
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }
  
  $result = $stmt->get_result();

  $user = getUserByUsername($username);
  $auth_stmt = $conn->prepare("SELECT * FROM jen713_wk11_msg_auth WHERE username = ?");
  $auth_stmt->bind_param("s", $user["username"]);
  $auth_result= $auth_stmt->execute();

  if (!$auth_result) {
    die($conn->error);
  }
  $auth_result = $auth_stmt->get_result();
  $auth = $auth_result->fetch_assoc();
  $auth_prohibit = $auth["is_suspend"];
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
        <?php if (!$username) { ?>
          <a href="register.php" class="stateful__btn-register">Register</a>
          <a href="login.php" class="stateful__btn-login">Login</a>
        <?php } else { ?>
          <span class="stateful__user">Hello, <?php echo htmlEscape($username); ?></span>
          <a href="handle_logout.php" class="stateful__btn-logout">Logout</a>
        <?php } ?>
        <?php if ($username === "admin") { ?>
          <a href="admin.php" class="stateful__btn-admin__panel">Panel</a>
        <?php } ?>
      </div>
      <h3>Message Board</h3>
      <?php if ($username && !$auth_prohibit) { ?>
        <form action="handle_add_comment.php" method="POST" class="form__area">
          <label for="comment">Your Comment</label>
          <textarea name="comment" id="comment" cols="30" rows="10" class="form__content" placeholder="Your message..."></textarea>
          <input type="submit" value="Send" class="form__btn">
        </form>
        <?php } elseif ($auth_prohibit === 1) { ?>
          <h2 class="prohibit__msg">Messaging Forbidden</h2>
      <?php } else { ?>
        <h2 class="join__msg">Register or Login</h2>
      <?php } ?>
    </section>
    <section class="board__comments">
      <!-- comments -->
      <?php while ($row = $result->fetch_assoc()) { ?>
        <div class="comment__card">
          <div class="card__avatar">
            <img src="" alt="">
          </div>
          <div class="card__content">
            <div class="card__content-info">
              <div class="content-info__author"><?php echo htmlEscape($row["nickname"]); ?> @<?php echo htmlEscape($row["username"]); ?></div>
              <div class="content-info__timestamp"><?php echo $row["created_at"]; ?></div>
            </div>
            <div class="card__content-comment">
              <div class="content__comment">
                <?php echo htmlEscape($row["comment"]); ?>
              </div>
            <?php if ($username === $row["username"]) { ?>
            <div class="card__btns">
              <a href="update_comment.php?id=<?php echo $row["id"]; ?>" class="card__btn-update">更</a>
              <a href="handle_delete_comment.php?id=<?php echo $row["id"]; ?>" class="card__btn-delete">刪</a>
            </div>
            <?php } ?>
            </div>
          </div>
        </div>
      <?php } ?>
    </section>
  </main>
</body>
</html>