<?php

namespace app\controllers;

use app\models\User;
use vendor\core\base\View;

class UserController extends AppController {

    public function signupAction() {
        if(!empty($_POST)) {
            $user = new User();
            $data = $_POST;
            $user->load($data);
            if ($user->validate($data)) {
                echo 'OK';
            }
            else {
                echo 'NO';
            }
            die;
        }
    }

    public function loginAction() {

    }

    public function logoutAction() {
        
    }
}