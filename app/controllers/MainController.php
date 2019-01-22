<?php

namespace app\controllers;

use app\models\Main;

class MainController extends AppController {

    // public $layout = 'main';

    public function indexAction() {
        $model = new Main;
        // $res = $model->query("CREATE TABLE ft_table (`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT, `login` VARCHAR(8) NOT NULL DEFAULT 'toto', `group` ENUM('staff', 'student', 'other') NOT NULL, `creation_date` DATE NOT NULL);");

        // $res = $model->query("INSERT INTO `ft_table` (`login`, `group`, `creation_date`) VALUES ('loki', 'staff', '2013-05-01'), ('scadoux', 'student', '2014-01-01'), ('chap', 'staff', '2011-04-27'), ('bambou', 'staff', '2014-03-01'), ('fantomet', 'staff', '2010-04-03')");
        $posts = $model->findAll();
        $post = $model->findOne('fantomet', 'login');
        $data = $model->findBySql("SELECT * FROM {$model->table} WHERE login LIKE ?", ['%lo%']);
        $data = $model->findLike("%lo%", 'login');
        // debug($posts);
        // debug($post);
        // debug($data);
        $title = 'PAGE_TITLE';
        $this->set(compact('title'));
    }
}