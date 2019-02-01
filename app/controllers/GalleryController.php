<?php

namespace app\controllers;

use app\models\Gallery;

class GalleryController extends AppController
{
    public function indexAction()
    {
        $this->view = 'gallery';
    }

    public function saveImageAction()
    {
        if (isset($_POST["image"])) {
            $gObj = new Gallery();
            $extension = $gObj->getExtension($_POST["image"]);
            $img = $gObj->imageDecode($_POST["image"], $extension);
            $name = uniqid() . '.' . $extension;
            $path = ROOT . '/public/images/' . $name;
            if ($img === false) {
                $_SESSION['error'] = 'base64_decode failed';
            } else {
                file_put_contents($path, $img);
                $gObj->saveToSession($img, $name);
                $gObj->saveImageToDB($_SESSION['user'], $name);
                $_SESSION['success'] = 'Your image successfully added to the gallery';
            }
        } else {
            $_SESSION['error'] = 'Didn\'t match data URI with image data';
        }
        $this->view = 'gallery';
    }

    public function deleteImage()
    {
        debug(__METHOD__);

    }

    public function commentImage()
    {
        debug(__METHOD__);

    }

    public function likeImageAction()
    {
        debug(__METHOD__);

    }

    public static function thumb($file)
    {
        $path = 'images/small/';
        $path_big = 'images/big/';
        $size = getimagesize($file);
        $name = basename($file);
        debug($size);
        debug($name);

        $coefficient = 150 / $size[0];
        switch (strtolower($size['mime'])) {
//            case 'image/png':
//                $img = imagecreatefrompng($file);
//                $tmp = imagecreatetruecolor($size[0], $size[1]);
//                imagecopy($tmp, $img, 0, 0, 0, 0, $size[0], $size[1]);
//                header('Content-Type: image/png');
//                imagepng($tmp, $path . $name, 9);
//                imagedestroy($tmp);
//                break;
            case 'image/jpeg':
                $img = imagecreatefromjpeg($file);

//                imagejpeg($tmp, $path . $name);
//                imagedestroy($tmp);
                break;
            default :
                echo "Wrong format of file!";
                die();
        }
        if ($size[0] > 150) {
            $th_width = 150;
            $th_height = floor($size[1] * $coefficient);
//            $thumb = imagecreatetruecolor($th_width, $th_height);
//            imagecopyresampled($thumb, $img, 0, 0, 0, 0, $th_width, $th_height, $size[0], $size[1]);
        }
        if ($size[1] > 100) {
            $th_height = 100;
            $th_width = floor($size[0] * $coefficient);
//            $thumb = imagecreatetruecolor($th_width, $th_height);
        }
        $thumb = imagecreatetruecolor($th_width, $th_height);
        imagecopyresampled($thumb, $img, 0, 0, 0, 0, $th_width, $th_height, $size[0], $size[1]);
        imagejpeg($thumb, $path . $name);
    }
}
