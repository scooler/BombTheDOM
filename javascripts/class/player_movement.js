MyApp.playerMovement = function(elem, sortOfThis){  
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

  var fromAbsolute = function(absX, absY){
    var x = Math.floor(absX/32);
    var y = Math.floor((absY+16)/32);
    return [x,y];
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

  var getAllCorners = function(possibleX, possibleY){
    var x = possibleX,y = possibleY;
    if (typeof possibleX === "object"){
      x = possibleX[0];
      y = possibleX[1];
    }
    var softness = MyApp.params.collisionSoftness;
    var shift = MyApp.params.tileSize - softness;

    var topLeft = fromAbsolute(x + softness, y + softness);
    var topRight = fromAbsolute(x + shift, y + softness);
    var bottomLeft = fromAbsolute(x + softness, y + shift);
    var bottomRight = fromAbsolute(x + shift, y + shift);
    return [topLeft, topRight, bottomLeft, bottomRight];
  };

  var movingTo = function(newPos, setting){
    var topLeft, topRight, bottomLeft, bottomRight;
    [topLeft, topRight, bottomLeft, bottomRight] = getAllCorners(getNewCoords(newPos, setting));


    if (! MyApp.board.canMoveTo(topLeft, topRight, bottomLeft, bottomRight)){
      return true;
    }
    MyApp.board.movingTo(sortOfThis, topLeft, topRight, bottomLeft, bottomRight); //TODO find a way around it
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

  // var fieldsImOn = function(){
  //   var y = parseInt(elem.style.top, 10);
  //   var x =  parseInt(elem.style.left, 10);
  //   return getAllCorners(x, y)
  // }
  
  return {
    //All these functions are togle - you call it once on key down
    moveDown: function(){
      move("down");
    },
    moveUp: function(){
      move("up");
    },
    moveRight: function(){
      move("right");
    },
    moveLeft: function(){
      move("left");
    },
    stop: function(){
      if (typeof animator === "object"){
        animator.stopAnimation();
      }
      if (typeof mover === "object"){
        mover.stopMovement();
      }
      // console.log(elem);
      // console.log("stop()");
    },
    fromAbsolute: fromAbsolute
    // fieldsImOn: fieldsImOn
  };
};