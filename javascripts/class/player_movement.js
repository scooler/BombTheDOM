MyApp.playerMovement = function(elem){  
  var moving = false;
  var animator;

  var settings = {
    left: {
      spritePos: "-144px"
    },
    up: {
      spritePos: "0px"
    },
    right: {
      spritePos: "-48px"
    },
    down: {
      spritePos: "-96px"
    }
  };


  var startMovement = function(direction){
    var movementSettings = settings[direction];
    MyApp.utils.changeBgPossitionY(elem, movementSettings.spritePos);
    animator = MyApp.utils.animate(elem, 8, true);
  };

  
  return {
    //All these functions are togle - you call it once on key down
    moveDown: function(){
      startMovement("down");
      //TODO   
      // console.log(elem);
      // console.log("moveDown()");
    },
    moveUp: function(){
      startMovement("up");
      //TODO   
      // console.log(elem);
      // console.log("moveUp()");
    },
    moveRight: function(){
      startMovement("right");
      //TODO   
      // console.log(elem);
      // console.log("moveRight()");
    },
    moveLeft: function(){
      startMovement("left");
      //TODO   
      // console.log(elem);
      // console.log("moveLeft()");
    },
    stop: function(){
      if (typeof animator === "object"){
        animator.stopAnimation();
      }
      // console.log(elem);
      // console.log("stop()");
    }
  }
}