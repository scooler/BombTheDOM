MyApp.playerMovement = function(elem, sortOfThis, boardMoving){  
  var animator, mover;
  var settings = {
    left: {
      spritePos: "-144px",
      property: "left",
      direction: -1
    },
    up: {
      spritePos: "0px",
      property: "top",
      direction: -1
    },
    right: {
      spritePos: "-48px",
      property: "left",
      direction: 1
    },
    down: {
      spritePos: "-96px",
      property: "top",
      direction: 1
    }
  };

  var getNewCoords = function(newPos, setting){
    var x,y;
    if (setting.property === "left"){
      x =  newPos;
      y = parseInt(elem.style.top, 10);
    }else{      
      x =  parseInt(elem.style.left, 10);
      y = newPos;
    }
    return [x,y];
  };

  var movingTo = function(newPos, setting){
    var topLeft, topRight, bottomLeft, bottomRight;
    [topLeft, topRight, bottomLeft, bottomRight] = sortOfThis.getAllCorners(getNewCoords(newPos, setting));


    if (! boardMoving.canMoveTo(topLeft, topRight, bottomLeft, bottomRight)){
      return true;
    }
    boardMoving.movingTo(sortOfThis, topLeft, topRight, bottomLeft, bottomRight); //TODO find a way around it
  };

  var startMoving = function(setting){
    var shift = MyApp.params.movementShift;
    var moving = true, timerHandle;
    if (typeof elem.mover === "object"){ 
      mover.stopMovement();
    }
    var animation = function(){
      if (!moving){ return; };
      var newPos = parseInt(elem.style[setting.property], 10) + (shift*setting.direction);
      if (movingTo(newPos, setting)){ return; };
      elem.style[setting.property] = newPos+"px";
      timerHandle = setTimeout(animation, MyApp.params.movementSpeed);
    };
    animation();
    elem.mover = {
      stopMovement: function(){
        clearTimeout(timerHandle);
        moving = false;
      }
    };
    return elem.mover;
  };

  var move = function(direction){
  // console.log(elem);
  // console.log("move(" + direction + "");
    var movementSettings = settings[direction];
    MyApp.utils.changeBgPossitionY(elem, movementSettings.spritePos);
    animator = MyApp.utils.animate(elem, 8, true);
    mover = startMoving(movementSettings);
  };
  
    //All these functions are togle - you call it once on key down
  sortOfThis.moveDown = function(){
    move("down");
  };
  sortOfThis.moveUp = function(){
    move("up");
  };
  sortOfThis.moveRight = function(){
    move("right");
  };
  sortOfThis.moveLeft = function(){
    move("left");
  };
  sortOfThis.stop = function(){
    if (typeof animator === "object"){
      animator.stopAnimation();
    }
    if (typeof mover === "object"){
      mover.stopMovement();
    }
    // console.log(elem);
    // console.log("stop()");
  };
};