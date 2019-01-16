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

        <?=$content?>

        <!-- <?= debug(vendor\core\Db::$countSql)?>
        <?= debug(vendor\core\Db::$queries)?> -->

    </body>
</html>