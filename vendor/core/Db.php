<?php

namespace vendor\core;

class Db {

    protected $pdo;
    protected static $instance;

    protected function __construct() {
		$db = require ROOT."/config/config_db.php";
		$options = [
			\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
			// \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC вывод только ассоциативного масс. (вывод только ассоц. ключей)
		];
		$this->pdo = new \PDO($db['dsn'], $db['user'], $db['pass'], $options);
		// $this->pdo = new \PDO($db['dsn'], $db['user'], $db['pass']); 
    }

    public static function instance() {
		if (self::$instance === NULL) {
			self::$instance = new self;
		}
		return self::$instance;
	}

	public function execute($sql) {
		$stmt = $this->pdo->prepare($sql);
		return $stmt->execute();
	}

	public function query($sql) {
		$stmt = $this->pdo->prepare($sql);
		$res = $stmt->execute();
		if ($res !== false) {
			return $stmt->fetchALL();
		}
		return [];
	}
}