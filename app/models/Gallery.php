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

    public function saveImageToDB($user, $image) {
        $this->query("INSERT INTO `images` (`user_id`, `login`, `date`, `image`, `zoom`) VALUES ('{$user['user_id']}', '{$user['login']}', NOW(), '$image')");
    }

    public function getExtension($img) {

        $extension = str_replace( 'data:', '', stristr($_POST["image"], ';base64,', true));
        switch ($extension) {
            case 'image/jpeg':
                $extension = 'jpg';
                break;
            case 'image/png':
                $extension = 'png';
                break;
            case 'image/gif':
                $extension = 'gif';
                break;
            default :
                $_SESSION['error'] = 'Wrong format of file. Only JPG, JPEG, PNG & GIF files are allowed';
                die;
        }
        return $extension;
    }

    public function imageDecode($image, $extension) {
        $mime = '';
        switch ($extension) {
            case 'jpg':
                $mime = 'image/jpeg';
                break;
            case 'png':
                $mime = 'image/png';
                break;
            case 'gif':
                $mime = 'image/gif';
                break;

        }
        $result = str_replace('data:'. $mime .';base64,', '', $image);
        $result = str_replace(' ', '+', $result);
        $result = base64_decode($result);
        return $result;
    }

    public function saveToSession ($img, $name) {
        $_SESSION['user']['images'][] = $img;
        $_SESSION['user']['images'][] = $name;
        unset($_SESSION['user']['images'][array_search($img, $_SESSION['user']['images'])]);
        $_SESSION['user']['images'] = array_values($_SESSION['user']['images']);
    }
}