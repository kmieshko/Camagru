<?php

namespace app\controllers;

use app\models\Gallery;
use app\models\Main;

class MainController extends AppController
{

    // public $layout = 'main';

    public function indexAction()
    {
        $model = new Main;
        $model->query("CREATE TABLE IF NOT EXISTS users (`user_id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `login` VARCHAR(" . MAX_LENGTH . ") NOT NULL, `password` VARCHAR(255) NOT NULL, `email` VARCHAR(100) NOT NULL, `notifications` ENUM('yes', 'no'))");
//        CREATE TABLE users (`user_id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `login` VARCHAR(20) NOT NULL, `password` VARCHAR(255) NOT NULL, `email` VARCHAR(100) NOT NULL, `notifications` ENUM('yes', 'no'))
//        $res = $model->query("INSERT INTO users (login) VALUES (kmieshko)");
        // $res = $model->query("INSERT INTO `ft_table` (`login`, `group`, `creation_date`) VALUES ('loki', 'staff', '2013-05-01'), ('scadoux', 'student', '2014-01-01'), ('chap', 'staff', '2011-04-27'), ('bambou', 'staff', '2014-03-01'), ('fantomet', 'staff', '2010-04-03')");
//        $posts = $model->findAll();
//        $post = $model->findOne('kmieshko', 'login');
//        $data = $model->findBySql("SELECT * FROM `users` WHERE login LIKE ?", ['kmieshko']);
//        $data = $model->findLike("%lo%", 'login');
        // debug($posts);
//         debug($post);
        $title = 'PAGE_TITLE';
        $this->set(compact('title'));

        if ($_SESSION['user']) {
            $gObj = new Gallery();
        }
    }
}







