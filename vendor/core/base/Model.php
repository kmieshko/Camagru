<?php

namespace vendor\core\base;

use vendor\core\Db;

abstract class Model {

    protected $pdo;
    protected $table;
    protected $pk = 'id';
    public $attributes = [];
    public $errors = [
        'login' => [],
        'password' => [],
        'email' => []
    ];

    public function __construct() {
        $this->pdo = Db::instance();
    }

    public function query($sql) {
        return $this->pdo->execute($sql);
    }

    public function findAll() {
        $sql = "SELECT * FROM {$this->table}";
        return $this->pdo->query($sql);
    }

    public function findOne($id, $field = '') {
        $field = $field ?: $this->pk;
        $sql = "SELECT * FROM {$this->table} WHERE $field = ? LIMIT 1";
        return $this->pdo->query($sql, [$id]);
    }

    public function findBySql($sql, $params = []) {
        return $this->pdo->query($sql, $params);
    }

    public function findLike($str, $field, $table = '') {
        $table = $table ?: $this->table;
        $sql = "SELECT * FROM $table WHERE $field LIKE ?";
        return $this->pdo->query($sql, ['%'.$str.'%']);
    }

    public function load($data) {
        foreach($this->attributes as $name => $value) {
            if (isset($data[$name])) {
                $this->attributes[$name] = $data[$name];
            }
        }
    }

    private function checkEmail($email) {
        if (!$email) {
            $this->errors['email'] = array_merge($this->errors['email'], array('Email is required'));
        }
        if (!preg_match("/^([a-zA-Z0-9\-.]+)(\@){1}([a-zA-Z0-9\-.]+)$/", $email)) {
            $this->errors['email'] = array_merge($this->errors['email'], array('Email contains not significant characters'));
        }
        if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            $this->errors['email'] = array_merge($this->errors['email'], array('Email is not a valid address'));
        }
    }

    private function checkLogin($login) {
        if (!$login) {
            $this->errors['login'] = array_merge($this->errors['login'], array('Login is required'));
        }
        if (!preg_match("/^[a-zA-Z0-9]+$/", $login)) {
            $this->errors['login'] = array_merge($this->errors['login'], array('Login contains only valid characters: a-Z, A-Z, 0-9'));
        }
        if (strlen($login) < MIN_LENGTH) {
           $this->errors['login'] = array_merge($this->errors['login'], array('Login must be at least '.MIN_LENGTH.' characters long'));
        }
        if (strlen($login) > MAX_LENGTH) {
             $this->errors['login'] = array_merge($this->errors['login'], array('Login must be not more than '.MAX_LENGTH.' characters'));
        }
        if (!preg_match("/[a-zA-Z]+/", $login)) {
            $this->errors['login'] = array_merge($this->errors['login'], array('Login must contains at least 1 alphabet character'));
        }
    }

    private function checkPassword($password) {
        if (!$password) {
            $this->errors['password'] = array_merge($this->errors['password'], array('Password is required'));
        }
        if (!preg_match("/^[a-zA-Z0-9!#-\.$]+$/", $password)) {
            $this->errors['password'] = array_merge($this->errors['password'], array('Password contains only valid characters: a-Z, A-Z, 0-9, !, #, -, ., $'));
        }
        if (strlen($password) < MIN_LENGTH) {
            $this->errors['password'] = array_merge($this->errors['password'], array('Password must be at least '.MIN_LENGTH.' characters long'));
        }
        if (strlen($password) > MAX_LENGTH) {
            $this->errors['password'] = array_merge($this->errors['password'], array('Password must be not more than '.MAX_LENGTH.' characters'));
        }
    }

    public function validate($data) {
        foreach ($data as $key => $value) {
            if ($key === 'login') {
                $this->checkLogin($data[$key]);
            }
            if ($key === 'email') {
                $this->checkEmail($data[$key]);
            }
            if ($key === 'password') {
                $this->checkPassword($data[$key]);
            }
        }
        if ($this->errors) {
            foreach ($this->errors as $error) {
                if ($error) {
                    return false;
                }
            }
        }
        return true;
    }

    public function getErrors() {
        $errors = '<ul>';
        foreach ($this->errors as $error) {
            foreach ($error as $item) {
                $errors .= "<li>$item</li>";
            }
        }
        $errors .= '</ul>';
        $_SESSION['error'] = $errors;
    }

    public function save($table) {
        $fields = '';
        $values = '';
        foreach ($this->attributes as $name => $value) {
            $fields .= '`'.$name.'`, ';
            $values .= '\''.$value.'\', ';
        }
        $fields = rtrim($fields, ', ');
        $values = rtrim($values, ', ');
        $this->query("INSERT INTO $table ($fields) VALUES ($values)");
    }
}