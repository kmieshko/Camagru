<?php

namespace app\controllers;

use app\models\Gallery;

class GalleryController extends AppController
{
    public function saveImageAction($image = '') {
//        $gObj = new Gallery();
//        $gObj->save($image);
    }

    public function deleteImageAction() {
        debug(__METHOD__);

    }

    public function commentImageAction() {
        debug(__METHOD__);

    }

    public function likeImageAction() {
        debug(__METHOD__);

    }
}
