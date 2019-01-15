<?php

namespace app\controllers;

use app\models\Main;

class MainController extends AppController {

    // public $layout = 'main';

    public function indexAction() {
        $model = new Main;
        // $res = $model->query("CREATE TABLE ft_table (`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT, `login` VARCHAR(8) NOT NULL DEFAULT 'toto', `group` ENUM('staff', 'student', 'other') NOT NULL, `creation_date` DATE NOT NULL);");
        $posts = $model->findAll();
        var_dump($posts);
        $title = 'PAGE_TITLE';
        $this->set(compact('title'));
    }
}