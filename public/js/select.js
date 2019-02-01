var upload = document.getElementById("upload");
var camera = document.getElementById("camera");
var frames = document.getElementById('frames');
var tmpBlock = document.getElementById('saved-frames');
var width = 640;
var height = 480;
var res_img;
var select = '';
var zoom = 'fitted';
var preview = document.createElement('img');
preview.style.height = height;
preview.style.width = width;
preview.src = "/public/images/preview.png";


include("/public/js/dragndrop.js");
include("/public/js/scaleImage.js");

function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

var inputScale;
var inputFitted;
var inputSaveUpl;

upload.onclick = function () {

    select = 'upload';
    document.getElementById("select").className = 'invisible';
    var selectUpload = document.getElementById('select-upload');
    selectUpload.removeAttribute('class');

    var divFittedScale = document.getElementById('fitted-scale');
    var inputChoose = document.getElementById('fileToUpload');
    var canvas = document.getElementById('canvas-upload');
    inputScale = document.getElementById('scale');
    inputFitted = document.getElementById('fitted');
    var context = canvas.getContext('2d');
    inputSaveUpl = document.getElementById('save-upl');

    inputChoose.addEventListener('change', function (e) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var img = new Image();
            img.onload = function () {
                canvas.setAttribute("class", "droppable");
                inputSaveUpl.removeAttribute("class");
                frames.removeAttribute('class');
                context.clearRect(0, 0, canvas.width, canvas.height);
                if (!divFittedScale.getAttribute('class')) divFittedScale.setAttribute('class', 'invisible');
                var result = ScaleImage(img.width, img.height, width, height, true);
                context.drawImage(img, 0, 0, img.width, img.height, result.targetleft, result.targettop, result.width, result.height);
                if ((img.width % 4 !== 0) && (img.height % 3 !== 0)) {
                    divFittedScale.removeAttribute('class');
                    inputScale.onclick = function () {
                        zoom = 'scale';
                        var result = ScaleImage(img.width, img.height, width, height, false);
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(img, 0, 0, img.width, img.height, result.targetleft, result.targettop, result.width, result.height);
                    };

                    inputFitted.onclick = function () {
                        zoom = 'fitted';
                        var result = ScaleImage(img.width, img.height, width, height, true);
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(img, 0, 0, img.width, img.height, result.targetleft, result.targettop, result.width, result.height);
                    };
                }

                inputClear.onclick = function () {
                    for (var i = 0; i < tmpBlock.childNodes.length;) {
                        var child = tmpBlock.childNodes[i];
                        child.remove();
                    }
                    inputClear.setAttribute('class', 'invisible');
                    inputSaveUpl.disabled = true;
                    inputFitted.disabled = false;
                    inputScale.disabled = false;
                };

                inputSaveUpl.onclick = function () {
                    for (var i = 0; i < tmpBlock.childNodes.length;) {
                        var child = tmpBlock.childNodes[i];
                        var childCoords = getCoords(child);
                        var canvasCoords = getCoords(canvas);
                        context.drawImage(child, childCoords.left - canvasCoords.left, childCoords.top - canvasCoords.top, parseInt(child.style.width), parseInt(child.style.height));
                        child.remove();
                    }
                    res_img = convertCanvasToImage(canvas);

                    var xhr = new XMLHttpRequest();
                    var body = "image=" + res_img.src;
                    xhr.open("POST", '/gallery/save-image', true);
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.send(body);

                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            context.clearRect(0, 0, canvas.width, canvas.height);
                            canvas.setAttribute('class', 'invisible');
                            if (!inputFitted.getAttribute('class')) inputFitted.setAttribute('class', 'invisible');
                            if (!inputScale.getAttribute('class')) inputScale.setAttribute('class', 'invisible');
                            inputSaveUpl.setAttribute('class', 'invisible');
                            selectUpload.setAttribute('class', 'invisible');
                            document.getElementById("select").removeAttribute('class');
                            frames.setAttribute('class', 'invisible');
                            inputClear.setAttribute('class', 'invisible');
                            inputSaveUpl.disabled = true;
                            select = '';

                            document.getElementById('fileToUpload').remove();
                            var newInput = document.createElement('input');
                            newInput.type = "file";
                            newInput.name = "fileToUpload";
                            newInput.id = "fileToUpload";
                            selectUpload.appendChild(newInput);
                        }
                    };
                };
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
        }, false);
};




    // var xhr = new XMLHttpRequest();
    // var body = "view=upload";
    // xhr.open("POST", '/gallery/', true);
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.send(body);
    //
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //
    //         var label = document.createElement('label');
    //         label.innerHTML = "Image File: ";
    //
    //         var inputChoose = document.createElement('input');
    //         inputChoose.setAttribute("type", "file");
    //         inputChoose.setAttribute("name", "fileToUpload");
    //         inputChoose.setAttribute("id", "fileToUpload");
    //
    //         var canvas = document.createElement('canvas');
    //         canvas.setAttribute("class", "droppable");
    //         canvas.id = "droppable";
    //         canvas.width = width;
    //         canvas.height = height;
    //
    //         var context = canvas.getContext('2d');
    //
    //         inputChoose.addEventListener('change', function (e) {
    //
    //             context.clearRect(0, 0, canvas.width, canvas.height);
    //
    //             if (!divFittedScale.className) divFittedScale.setAttribute('class', 'invisible');
    //
    //             var reader = new FileReader();
    //             reader.onload = function (event) {
    //                 var img = new Image();
    //                 img.onload = function () {
    //
    //                     var result = ScaleImage(img.width, img.height, width, height, true);
    //                     context.drawImage(img, 0, 0, img.width, img.height, result.targetleft, result.targettop, result.width, result.height);
    //                     document.body.appendChild(canvas);
    //
    //
    //
    //                     if ((img.width % 4 !== 0) && (img.height % 3 !== 0)) {
    //                         document.body.appendChild(inputScale);
    //                         document.body.appendChild(inputFitted);
    //
    //                         inputScale.onclick = function () {
    //                             xhr = new XMLHttpRequest();
    //                             body = "canvas=scale ";
    //                             xhr.open("POST", '/gallery/', true);
    //                             xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //                             xhr.send(body);
    //                             zoom = 'scale';
    //                             xhr.onreadystatechange = function () {
    //                                 if (xhr.readyState === 4 && xhr.status === 200) {
    //                                     var result = ScaleImage(img.width, img.height, width, height, false);
    //                                     context.clearRect(0, 0, canvas.width, canvas.height);
    //                                     context.drawImage(img, 0, 0, img.width, img.height, result.targetleft, result.targettop, result.width, result.height);
    //                                 }
    //                             }
    //                         };
    //
    //                         inputFitted.onclick = function () {
    //                             xhr = new XMLHttpRequest();
    //                             body = "canvas=scale ";
    //                             xhr.open("POST", '/gallery/', true);
    //                             xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //                             xhr.send(body);
    //                             zoom = 'fitted';
    //                             xhr.onreadystatechange = function () {
    //                                 if (xhr.readyState === 4 && xhr.status === 200) {
    //                                     var result = ScaleImage(img.width, img.height, width, height, true);
    //                                     context.clearRect(0, 0, canvas.width, canvas.height);
    //                                     context.drawImage(img, 0, 0, img.width, img.height, result.targetleft, result.targettop, result.width, result.height);
    //                                 }
    //                             }
    //                         };
    //                     }
    //
    //                     inputClearFrames.onclick = function () {
    //                         if (zoom === 'fitted') {
    //                             context.clearRect(0, 0, canvas.width, canvas.height);
    //                             context.drawImage(img, 0, 0, img.width, img.height, result.targetleft, result.targettop, result.width, result.height);
    //                         } else if (zoom === 'scale') {
    //                             context.clearRect(0, 0, canvas.width, canvas.height);
    //                             context.drawImage(img, 0, 0, img.width, img.height, result.targetleft, result.targettop, result.width, result.height);
    //                         }
    //                         inputClearFrames.remove();
    //                         inputSave.disabled = true;
    //                         inputFitted.disabled = false;
    //                         inputScale.disabled = false;
    //                     };
    //
    //                     inputSave.onclick = function () {
    //
    //                         xhr = new XMLHttpRequest();
    //                         body = "zoom=" + zoom + "&image=" + res_img.src;
    //                         xhr.open("POST", '/gallery/save-image', true);
    //                         xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //                         xhr.send(body);
    //
    //                         xhr.onreadystatechange = function () {
    //                             if (xhr.readyState === 4 && xhr.status === 200) {
    //                                 context.clearRect(0, 0, canvas.width, canvas.height);
    //                                 canvas.remove();
    //                                 if (inputFitted) inputFitted.remove();
    //                                 if (inputScale) inputScale.remove();
    //                                 inputSave.remove();
    //                                 label.remove();
    //                                 inputChoose.remove();
    //                                 document.getElementById("select").removeAttribute('class');
    //                                 select = '';
    //                             }
    //                         };
    //                     };
    //                     document.body.appendChild(inputSave);
    //                 };
    //                 img.src = event.target.result;
    //             };
    //             reader.readAsDataURL(e.target.files[0]);
    //         }, false);
    // //
    // //         document.body.appendChild(label);
    // //         document.body.appendChild(inputChoose);
    // //     }
    // // };
// };

var inputSnap;
var inputSaveCam;

camera.onclick = function () {

    select = 'camera';
    document.getElementById("select").className = 'invisible';
    frames.removeAttribute('class');

    var selectCamera = document.getElementById('select-camera');
    selectCamera.removeAttribute('class');
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas-camera');
    var context = canvas.getContext('2d');
    context.drawImage(preview, 0, 0, width, height);
    inputSnap = document.getElementById('snap');
    inputSaveCam = document.getElementById('save-cam');
    inputSnap.disabled = true;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
            video.srcObject = stream;
            video.play();
        });
    }

    inputClear.onclick = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(preview, 0, 0, width, height);
        for (var i = 0; i < tmpBlock.childNodes.length;) {
            var child = tmpBlock.childNodes[i];
            child.remove();
        }
        inputClear.setAttribute('class', 'invisible');
        inputSnap.disabled = true;
        inputSaveCam.disabled = true;
    };

    inputSnap.onclick = function () {
        context.drawImage(video, 0, 0, width, height);
        for (var i = 0; i < tmpBlock.childNodes.length; i++) {
            var child = tmpBlock.childNodes[i];
            var childCoords = getCoords(child);
            var videoCoords = getCoords(video);
            context.drawImage(child, childCoords.left - videoCoords.left, childCoords.top - videoCoords.top, parseInt(child.style.width), parseInt(child.style.height));
        }
        res_img = convertCanvasToImage(canvas);
        inputSaveCam.disabled = false;
    };

    inputSaveCam.onclick = function () {
        if (res_img) {
            var xhr = new XMLHttpRequest();
            var body = "image=" + res_img.src;
            xhr.open("POST", '/gallery/save-image', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(body);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    video.pause();
                    video.srcObject.getTracks()[0].stop();
                    selectCamera.setAttribute('class', 'invisible');
                    frames.setAttribute('class', 'invisible');
                    inputClear.setAttribute('class', 'invisible');
                    document.getElementById("select").removeAttribute('class');
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    for (var i = 0; i < tmpBlock.childNodes.length;) {
                        var child = tmpBlock.childNodes[i];
                        child.remove();
                    }
                    select = '';
                    document.getElementById("select").removeAttribute('class');
                    inputSaveCam.disabled = true;

                    video.remove();
                    var newVideo = document.createElement('video');
                    newVideo.id = 'video';
                    newVideo.width = width;
                    newVideo.height = height;
                    newVideo.className = "droppable";
                    selectCamera.firstChild.nextSibling.appendChild(newVideo);
                }
            };
        }
    };
};

function convertCanvasToImage(canvas) {
    var new_image = new Image();
    new_image.src = canvas.toDataURL("image/png");
    return new_image;
}

    // var xhr = new XMLHttpRequest();
    // var body = "view=camera";
    // xhr.open("POST", '/gallery/save-image', true);
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.send(body);

    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4 && xhr.status === 200) {

    //     }
    // }



    // inputSnap.disabled = true;
    // document.getElementById("frames").removeAttribute('class');
    // document.getElementById("select").className = 'invisible';
    // select = 'camera';
    //
    // var tmpBlock = document.createElement('div');
    // tmpBlock.id = 'droppable';
    // document.body.appendChild(tmpBlock);
    //
    // var video = document.createElement('video');
    // video.setAttribute("width", width);
    // video.setAttribute("height", height);
    // video.setAttribute("class", "droppable");
    //
    // var canvas = document.createElement('canvas');
    // canvas.setAttribute("width", width);
    // canvas.setAttribute("height", height);
    //
    // var xhr = new XMLHttpRequest();
    // var body = "view=camera";
    // xhr.open("POST", '/gallery/save-image', true);
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.send(body);
    //
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //         var context = canvas.getContext('2d');
    //         context.drawImage(preview, 0, 0, width, height);
    //
    //         if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //             navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
    //                 video.srcObject = stream;
    //                 video.play();
    //             });
    //         }
    //
    //         inputSnap.onclick = function () {
    //             context.drawImage(video, 0, 0, width, height);
    //             for (var i = 0; i < tmpBlock.childNodes.length; i++) {
    //                 var child = tmpBlock.childNodes[i];
    //                 var childCoords = getCoords(child);
    //                 var videoCoords = getCoords(video);
    //                 context.drawImage(child, childCoords.left - videoCoords.left, childCoords.top - videoCoords.top, parseInt(child.style.width), parseInt(child.style.height));
    //             }
    //             res_img = convertCanvasToImage(canvas);
    //             if (tmpBlock.childNodes.length > 0) inputSave.disabled = false;
    //         };
    //
    //         inputClearFrames.onclick = function () {
    //             context.clearRect(0, 0, canvas.width, canvas.height);
    //             context.drawImage(preview, 0, 0, width, height);
    //             for (var i = 0; i < tmpBlock.childNodes.length; i++) {
    //                 var child = tmpBlock.childNodes[i];
    //                 child.remove();
    //             }
    //             inputClearFrames.remove();
    //             inputSave.disabled = true;
    //             inputFitted.disabled = false;
    //             inputScale.disabled = false;
    //         };
    //
    //         inputSave.onclick = function () {
    //             if (res_img) {
    //                 xhr = new XMLHttpRequest();
    //                 body = "image=" + res_img.src;
    //                 xhr.open("POST", '/gallery/save-image', true);
    //                 xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //                 xhr.send(body);
    //
    //                 xhr.onreadystatechange = function () {
    //                     if (xhr.readyState === 4 && xhr.status === 200) {
    //                         video.pause();
    //                         video.srcObject.getTracks()[0].stop();
    //                         context.clearRect(0, 0, canvas.width, canvas.height);
    //                         video.remove();
    //                         canvas.remove();
    //                         inputSnap.remove();
    //                         inputSave.remove();
    //                         tmpBlock.remove();
    //                         inputClearFrames.remove();
    //                         document.getElementById("select").removeAttribute('class');
    //                         select = '';
    //                         var p = document.createElement('p');
    //                         p.innerHTML = '$_SESSION[\'success\']';
    //                         document.body.appendChild(p);
    //                     }
    //                 };
    //             }
    //         };
    //         document.body.appendChild(video);
    //         document.body.appendChild(inputSnap);
    //         document.body.appendChild(canvas);
    //         document.body.appendChild(inputSave);
    //     }
    // };

