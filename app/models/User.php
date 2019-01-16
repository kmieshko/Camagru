<?php

namespace app\models;

use vendor\core\base\Model;

class User extends Model {
    
    public $attributes = [
        'login' => '',
        'password' => '',
        'email' => ''
    ];

}