MyApp.playerMovement = function(elem){  
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

  var amIStuck = function(newPos, setting){
    var x,y;
    // some optimisation - needs also to look at softness
    // if ( (32-(newPos % 32)) > shift && setting.property === "left"){
    //   return false;//no worries here
    // }
    // if ( (32-(newPos + 16)) % 32 > shift && setting.property === "top"){
    //   return false;
    // }
    if (setting.property === "left"){
      x =  newPos;
      y = parseInt(elem.style.top, 10);
    }else{      
      x =  parseInt(elem.style.left, 10);
      y = newPos;
    }
    return ! MyApp.board.canMoveTo(x, y);
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
      if (amIStuck(newPos, setting)){ return; };
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
    }
  };
};