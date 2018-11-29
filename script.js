var div = document.getElementById('container');

div.addEventListener('mousemove', handleMouseMove);
div.addEventListener('mousedown', handleMouseDown);
div.addEventListener('mouseup', handleMouseUp);
div.addEventListener('touchmove', handleTouchMove);
div.addEventListener('touchstart', handleTouchStart);
div.addEventListener('touchend', handleTouchEnd);

var graggableObject = null, 
    xy = {},
    zIndex = 0;

function handleTouchStart(event) {
    event.preventDefault();	
    zIndex++;
    graggableObject = event.target;
    graggableObject.style.zIndex = zIndex;  
    var touch = event.targetTouches[0];
    var s = graggableObject.getBoundingClientRect();
    xy.x = touch.pageX - s.left;
    xy.y = touch.pageY - s.top;
    xy.height = s.height;
    xy.width = s.width;	
}

function handleTouchMove(event) {
    event.preventDefault();	
    if (graggableObject) {
        var touch = event.targetTouches[0],
            newLeft = touch.pageX - xy.x,
            newTop = touch.pageY - xy.y;
        if (newTop < 0) {
            newTop = 0;
        } else if (newTop >= (div.clientHeight - xy.height)) {
            newTop = div.clientHeight - xy.height;
        }
        if (newLeft < 0) {
            newLeft = 0;
        } else if (newLeft >= (div.clientWidth - xy.width)) {
            newLeft = div.clientWidth - xy.width;
        }
        graggableObject.style.left = newLeft + 'px';
        graggableObject.style.top = newTop + 'px';
    }
}
function handleTouchEnd(event) {
    event.preventDefault();            
    graggableObject = null;  
    xy = {};
}

function handleMouseDown(e) {
    graggableObject = e.target;
    zIndex++;  
    graggableObject.style.zIndex = zIndex;
    graggableObject.style.cursor = 'move';
    var s = graggableObject.getBoundingClientRect();
    xy.top = s.top; 
    xy.left = s.left; 
    xy.mtop = e.clientY; 
    xy.mleft = e.clientX; 
    xy.height = s.height;
    xy.width = s.width;
}

function handleMouseUp(e) {            
    graggableObject.style.cursor = 'auto';
    graggableObject = null;  
    xy = {};
}

function handleMouseMove(e) {
    if (graggableObject) {
        var newTop = parseInt(xy.top) + (e.clientY - xy.mtop),
            newLeft = parseInt(xy.left) + (e.clientX - xy.mleft);
        if (newTop < 0) {
            newTop = 0;
        } else if (newTop >= (div.clientHeight - xy.height)) {
            newTop = div.clientHeight - xy.height;
        }
        if (newLeft < 0) {
            newLeft = 0;
        } else if (newLeft >= (div.clientWidth - xy.width)) {
            newLeft = div.clientWidth - xy.width;
        }

        graggableObject.style.top = newTop + 'px';    
        graggableObject.style.left = newLeft + 'px';
    }
}
