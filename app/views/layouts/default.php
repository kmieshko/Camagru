<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>DEFAULT | <?= $this->title ?></title>
    <link rel="stylesheet" type="text/css" href="/css/main.css">

    <!-- <style  type="text/css">
    body {
        background-color: #eee;
    }
    </style> -->
</head>
<body>

<?php require_once 'header.php'; ?>

<div>
    <video id="video" width="640" height="480" autoplay></video>
    <button id="snap">Snap Photo</button>
    <canvas id="canvas" width="640" height="480"></canvas>
    <form method="get" action="/gallery/save-image">
        <button id="save">Save Image</button>
    </form>
</div>

<script type="text/javascript">
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            // video.src = window.URL.createObjectURL(stream);
            // video.srcObject = stream;
            video.play();
            // document.getElementById('upload').style.display = 'inline';
        });
    }

    var image;

    document.getElementById("snap").addEventListener("click", function() {
        context.drawImage(video, 0, 0, 640, 480);
        image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    });

</script>


<?php if (isset($_SESSION['error'])): ?>
    <div>
        <?= $_SESSION['error'];
        unset($_SESSION['error']) ?>
    </div>
<?php endif; ?>

<?php if (isset($_SESSION['success'])): ?>
    <div>
        <?= $_SESSION['success'];
        unset($_SESSION['success']) ?>


    </div>
<?php endif; ?>

<?php debug($_SESSION); ?>

<?= $content ?>

<?php require_once 'footer.php'; ?>
<!--        --><? //= debug(vendor\core\Db::$countSql)?>
<!--        --><? //= debug(vendor\core\Db::$queries)?>

</body>
</html>