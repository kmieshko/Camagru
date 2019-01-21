<?php
/**
 * Created by PhpStorm.
 * User: kmieshko
 * Date: 1/21/19
 * Time: 3:22 PM
 */

namespace app\models;

use vendor\core\base\Model;

class Gallery extends Model
{

    public function save($image = '') {
        if (!file_exists(ROOT.'/images')) {
            mkdir(ROOT.'/images');
        }
        file_put_contents(ROOT.'/images', $image);
    }
}