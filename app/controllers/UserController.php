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
            if (!$user->validate($data)) {
                $user->getErrors();
                redirect();
            }
            $user->save('users');
            $_SESSION['success'] = 'You have successfully registered';
            redirect();
            die;
        }

    }

    public function loginAction() {

    }

    public function logoutAction() {
        
    }
}