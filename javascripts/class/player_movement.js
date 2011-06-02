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

  var amIStuck = function(newPos, speed, setting){
    // some optimisation - 
    // if ( (32-(newPos % 32)) > speed && setting.property === "left"){
    //   return false;//no worries here
    // }
    // if ( (32-(newPos + 16)) % 32 > speed && setting.property === "top"){
    //   return false;
    // }

    if (setting.property === "left"){
      var x =  newPos;
      var y = parseInt(elem.style.top);
    }else{      
      var x =  parseInt(elem.style.left);
      var y = newPos;
    }
    return ! MyApp.board.canMoveTo(x, y);
  };

  var startMoving = function(setting){
    var speed = MyApp.params.movementSpeed;
    var moving = true, timerHandle;
    if (typeof elem.mover === "object"){
      mover.stopMovement();
    }
    var animation = function(){
      if (!moving){ return };
      var newPos = parseInt(elem.style[setting.property]) + (speed*setting.direction);
      if (amIStuck(newPos, speed, setting)){ return };
      elem.style[setting.property] = newPos+"px";
      timerHandle = setTimeout(animation, MyApp.params.animationSpeed);
    }
    animation();
    elem.mover = {
      stopMovement: function(){
        clearTimeout(timerHandle);
        moving = false;
      }
    };
    return elem.mover;
  }

  var move = function(direction){
    var movementSettings = settings[direction];
    MyApp.utils.changeBgPossitionY(elem, movementSettings.spritePos);
    animator = MyApp.utils.animate(elem, 8, true);
    mover = startMoving(movementSettings);
  };

  
  return {
    //All these functions are togle - you call it once on key down
    moveDown: function(){
      move("down");
      // console.log(elem);
      // console.log("moveDown()");
    },
    moveUp: function(){
      move("up");
      // console.log(elem);
      // console.log("moveUp()");
    },
    moveRight: function(){
      move("right");
      // console.log(elem);
      // console.log("moveRight()");
    },
    moveLeft: function(){
      move("left");
      // console.log(elem);
      // console.log("moveLeft()");
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
  }
}