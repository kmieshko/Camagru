/**
 * составной объект для хранения информации о переносе:
 * {
 *   elem - элемент, на котором была зажата мышь
 *   avatar - аватар
 *   downX/downY - координаты окна, на которых был mousedown
 *   shiftX/shiftY - относительный сдвиг курсора от угла элемента
 * }
 */
var dragObject = {};
var clone = {};
var h;

document.onmousedown = function (event) {
    if (event.which !== 1) return;
    var element = event.target.closest('.draggable');
    if (element) {
        h = element.clientHeight;
        dragObject.element = element;
        dragObject.downX = event.pageX;
        dragObject.downY = event.pageY;
        // dragObject.element.style.width = dragObject.element.naturalWidth + 'px'; ////////////// скачет после масштабирования фрейма с классом драгбл
        // dragObject.element.style.height = dragObject.element.naturalHeight + 'px';
        dragObject.element.style.width = dragObject.element.clientWidth + 'px';
        dragObject.element.style.height = dragObject.element.clientHeight + 'px';
    }
};

function createAvatar() {
    var avatar = dragObject.element;
    var old = {
        parent: avatar.parentNode,
        nextSibling: avatar.nextSibling,
        position: 'relative',
        left: avatar.left || '',
        top: avatar.top || '',
        zIndex: avatar.zIndex || ''
    };
    avatar.rollback = function () {
        dragObject.avatar = document.getElementById("frames").appendChild(dragObject.avatar);
        avatar.style.position = old.position;
        avatar.style.left = old.left;
        avatar.style.top = old.top;
        avatar.style.zIndex = old.zIndex;
        avatar.style.width = avatar.naturalWidth + 'px';
        avatar.style.height = avatar.naturalHeight + 'px';
    };
    return avatar;
}

function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

function startDrag() {
    var avatar = dragObject.avatar;
    document.body.appendChild(avatar);
    avatar.style.zIndex = 9999;
    avatar.style.position = 'absolute';
}

document.onmousemove = function (event) {
    if (!dragObject.element) return;
    if (!dragObject.avatar) {
        dragObject.avatar = createAvatar();
        if (!dragObject.avatar) {
            dragObject = {};
            return;
        }
        var coords = getCoords(dragObject.avatar);
        dragObject.shiftX = dragObject.downX - coords.left;
        dragObject.shiftY = dragObject.downY - coords.top;
        startDrag();
    }
    dragObject.avatar.style.left = event.pageX - dragObject.shiftX + 'px';
    dragObject.avatar.style.top = event.pageY - dragObject.shiftY + 'px';
    dragObject.avatar.ondragstart = function () {
        return false;
    };
};

function findDroppable(event) {
    dragObject.avatar.hidden = true;
    var elem = document.elementFromPoint(event.clientX, event.clientY);
    dragObject.avatar.hidden = false;
    if (elem == null) return null;
    return elem.closest('.droppable');
}

var imagesNotDraggable;
var imagesDraggable;
var i = 0;

function checkCanvasLimits(dropElem, dragObject) {
    var dropElemCoords = getCoords(dropElem);
    var imgLeft = parseFloat(dragObject.avatar.style.left);
    var imgTop = parseFloat(dragObject.avatar.style.top);
    var canvLeft = parseFloat(dropElemCoords.left);
    var canvTop = parseFloat(dropElemCoords.top);
    if ((imgTop > canvTop && (imgTop + dragObject.avatar.clientHeight) < (canvTop + height)) &&
        (imgLeft > canvLeft && (imgLeft + dragObject.avatar.clientWidth) < (canvLeft + width))) {
        return true;
    }
    return false;
}

document.onmouseup = function (event) {
    imagesDraggable = document.getElementById('frames').getElementsByClassName('draggable');
    imagesNotDraggable = document.getElementById('frames').getElementsByClassName('not-draggable');
    if (dragObject.avatar) {
        var dropElem = findDroppable(event);
        if (!dropElem || !checkCanvasLimits(dropElem, dragObject)) {
            dragObject.avatar.rollback();
            for (i = 0; i < imagesNotDraggable.length;) {
                imagesNotDraggable.item(i).setAttribute("class", "draggable");
            }
            frameButtons.setAttribute('class', 'invisible');
            if (document.getElementsByClassName('saved-frames').length > 0) {
                inputSnap.disabled = false;
                inputSave.disabled = false;
            }
        } else {
            for (i = 0; i < imagesDraggable.length;) {
                imagesDraggable.item(i).setAttribute("class", "not-draggable");
            }
            if (document.getElementsByClassName('draggable').length > 0) {
                frameButtons.removeAttribute('class');
                if (select == 'camera') inputSnap.disabled = true;
            }
        }
        clone = Object.assign({}, dragObject);
        dragObject = {};
    }
};
var frameButtons = document.getElementById('frame-buttons');
var inputSaveFrame = document.getElementById('save-frame');
var inputScalePlus = document.getElementById('scale-plus');
var inputScaleMinus = document.getElementById('scale-minus');
var inputClear = document.getElementById('clear');

inputScalePlus.onclick = function () {
    var el = document.querySelector(".draggable");
    var w = el.offsetWidth + 5;
    var h = el.offsetHeight + 5;
    if (w < width / 2 || h < height / 2)
    {
        el.style.width = w + "px";
        el.style.height = h + "px";
    }
};

inputScaleMinus.onclick = function () {
    var el = document.querySelector(".draggable");
    var w = el.offsetWidth - 5;
    var h = el.offsetHeight - 5;
    if (w > 20 || h > 20)
    {
        el.style.width = w + "px";
        el.style.height = h + "px";
    }
};

inputSaveFrame.onclick = function () {

    if (select == 'camera') {
        res_img = convertCanvasToImage(document.createElement('canvas'));
        inputSnap.disabled = false;
    }
    else if (select == 'upload') {
        inputFitted.disabled = true;
        inputScale.disabled = true;
        inputSaveUpl.disabled = false;
    }
    clone.element.removeAttribute('class');
    document.getElementById('saved-frames').appendChild(clone.element);
    frameButtons.setAttribute('class', 'invisible');
    inputClear.removeAttribute('class');
    imagesNotDraggable = document.getElementById('frames').getElementsByClassName('not-draggable');
    for (i = 0; i < imagesNotDraggable.length;) {
        imagesNotDraggable.item(i).setAttribute("class", "draggable");
    }
    var img = document.createElement('img');
    img = document.getElementById("frames").appendChild(img);
    img.src = (clone.element).getAttribute("src");
    img.setAttribute("class", 'draggable');
};


    // inputSnap.disabled = false;
    // inputScaleMinus.remove();
    // inputScalePlus.remove();
    // if (select == 'upload') {
    //     inputSave.disabled = false;
    //     inputClear.removeAttribute('class');
    //     inputScale.disabled = true;
    //     inputFitted.disabled = true;
    //     var canvas = document.getElementById('droppable');
    //     var context = canvas.getContext('2d');
    //     var canvasCoords = getCoords(canvas);
    //     var cloneCoords = getCoords(clone.element);
    //     context.drawImage(clone.element, cloneCoords.left - canvasCoords.left, cloneCoords.top - canvasCoords.top, parseInt(clone.element.style.width), parseInt(clone.element.style.height));
    //     canvas.appendChild(clone.element);
    //     res_img = convertCanvasToImage(canvas);
    // } else if (select == 'camera') {
    //     inputClear.removeAttribute('class');
    //     document.getElementById('droppable').appendChild(clone.element);
    //     res_img = convertCanvasToImage(document.createElement('canvas'));
    // }
    // clone.element.removeAttribute('class');
    // var element = document.getElementsByClassName('draggable');
    // element.item(0).removeAttribute('class');
    // imagesNotDraggable = document.getElementById('frames').getElementsByClassName('not-draggable');
    // for (i = 0; i < imagesNotDraggable.length;) {
    //     imagesNotDraggable.item(i).setAttribute("class", "draggable");
    // }
    // inputSaveFrame.remove();
    // var img = document.createElement('img');
    // img = document.getElementById("frames").appendChild(img);
    // img.src = (clone.element).getAttribute("src");
    // img.setAttribute("class", 'draggable');


