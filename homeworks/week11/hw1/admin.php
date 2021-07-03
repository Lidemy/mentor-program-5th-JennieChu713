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
    "C.is_deleted AS is_deleted, " .
    "U.username AS username, " .
    "U.nickname AS nickname " .
  "FROM jen713_wk11_msg_comments AS C " .
  "LEFT JOIN jen713_wk11_msg_users AS U " .
  "ON C.username = U.username " .
  "ORDER BY C.id DESC";
  
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }
  
  $result = $stmt->get_result();
  
  $white_sql = "SELECT " .
    "A.is_suspend AS is_suspend, " .
    "A.id AS id, " .
    "U.username AS username, " .
    "U.nickname AS nickname " .
  "FROM jen713_wk11_msg_auth AS A " .
  "LEFT JOIN jen713_wk11_msg_users AS U " .
  "ON A.username = U.username " .
  "WHERE A.is_suspend IS NULL AND A.username != 'admin'";

  $white_stmt = $conn->prepare($white_sql);
  $white_result = $white_stmt->execute();
  if (!$white_result) {
    die($conn->error);
  }
  $white_result = $white_stmt->get_result();

  $black_sql = "SELECT " .
    "A.is_suspend AS is_suspend, " .
    "A.id AS id, " .
    "U.username AS username, " .
    "U.nickname AS nickname " .
  "FROM jen713_wk11_msg_auth AS A " .
  "LEFT JOIN jen713_wk11_msg_users AS U " .
  "ON A.username = U.username " .
  "WHERE A.is_suspend=1";

  $black_stmt = $conn->prepare($black_sql);
  $black_result = $black_stmt->execute();
  if (!$black_result) {
    die($conn->error);
  }
  $black_result = $black_stmt->get_result();

  if ($username !== "admin") {
    header("Location: index.php");
  }
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
  <main class="board">
    <section class="board__form">
      <div class="stateful__btns admin-board">
        <a href="index.php" class="stateful__btn-home">Message Board</a>
        <span class="stateful__user">Hello, <?php echo $username; ?></span>
        <a href="handle_logout.php" class="stateful__btn-logout">Logout</a>
      </div>
    </section>
    <h4 class="board__admin-auth-title">Authority Control Panel</h4>
    <section class="users__auth-list">
      <div class="users__list-white">
        <h4>White List</h4>
        <?php while ($white = $white_result->fetch_assoc()) { ?>
          <div class="users__list-control">
            <div class="list-control__user">
              <div class="user__username"><?php echo htmlEscape($white["username"]); ?></div>
              <div class="user__nickname"><?php echo htmlEscape($white["nickname"]); ?></div>
            </div>
            <div class="list-control__auth">
              <a href="handle_suspend.php?id=<?php echo $white["id"]; ?>" class="auth__suspend">停權</a>
            </div>
          </div>
        <?php } ?>
      </div>
      <div class="users__list-black">
        <h4>Black List</h4>
        <?php while ($black = $black_result->fetch_assoc()) { ?>
        <div class="users__list-control">
          <div class="list-control__user">
            <div class="user__username"><?php echo htmlEscape($black["username"]); ?></div>
            <div class="user__nickname"><?php echo htmlEscape($black["nickname"]); ?></div>
          </div>
          <div class="list-control__auth">
            <a href="handle_unsuspend.php?id=<?php echo $black["id"]; ?>" class="auth__unsuspend">恢復</a>
          </div>
        </div>
        <?php } ?>
      </div>
    </section>
    <section class="board__comments">
    <h4>All Comments</h4>
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
            <div class="card__btns">
            <?php if (!$row["is_deleted"]) { ?>  
              <a href="update_comment.php?id=<?php echo $row["id"]; ?>" class="card__btn-update">更</a>
              <a href="handle_delete_comment.php?id=<?php echo $row["id"]; ?>" class="card__btn-delete">刪</a>
            <?php } else { ?>
              <a href="handle_recover_comment.php?id=<?php echo $row["id"]; ?>" class="card__btn-restore">復</a>
            <?php } ?>
          </div>
            </div>
          </div>
        </div>
      <?php } ?>
    </section>
  </main>
</body>
</html>