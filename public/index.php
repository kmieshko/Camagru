<?php

require '../vendor/core/router.php';
require '../vendor/libs/functions.php';

$query = $_SERVER['QUERY_STRING'];

Router::add('posts/add', ['controller' => 'Posts', 'action' => 'add']);
Router::add('posts/', ['controller' => 'Posts', 'action' => 'index']);
Router::add('', ['controller' => 'Main', 'action' => 'index']);

debug(Router::getRoutes());

if (Router::matchRoute($query)) {
    debug(Router::getRoute());
}
else {
    echo '404';
}