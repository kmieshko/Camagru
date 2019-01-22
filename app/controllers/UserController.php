<?php

namespace app\controllers;

class UserController extends AppController {

    public function signupAction() {
        if(!empty($_POST)) {
            debug($_POST);
            die;
        }
        else {
            print 123;
        }
    }

    public function loginAction() {

    }

    public function logoutAction() {
        
    }
}