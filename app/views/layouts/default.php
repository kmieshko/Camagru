<!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <title>DEFAULT | <?=$this->title?></title>
        <link rel="stylesheet" type="text/css" href="/css/main.css">
        
        <!-- <style  type="text/css">
        body {
            background-color: #eee;
        }
        </style> -->
    </head>
    <body >

        <h1>Hello, world!</h1>

        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/user/signup">Signup</a></li>
            <li><a href="/user/login">Login</a></li>
            <li><a href="/user/logout">Logout</a></li>
        </ul>

        <?php if (isset($_SESSION['error'])): ?>
            <div>
                <?=$_SESSION['error']; unset($_SESSION['error'])?>
            </div>
        <?php endif; ?>

        <?php if (isset($_SESSION['success'])): ?>
            <div>
                <?=$_SESSION['success']; unset($_SESSION['success'])?>


            </div>
        <?php endif; ?>

        <?=$content?>

<!--        --><?//= debug(vendor\core\Db::$countSql)?>
<!--        --><?//= debug(vendor\core\Db::$queries)?>

    </body>
</html>