MyApp.io = function(){
  var keyDownTimer, keyUpTimer;
  var keyDown = function(e){
    e = e || window.event;
    if (keyDownTimer){
      clearTimeout(keyDownTimer);
      keyDownTimer = undefined;
    }
    var reactToKeyDown = function(){    
        console.log(e);
    }
    keyDownTimer = setTimeout(reactToKeyDown, 50);
  };

  var keyUp = function(e){
    e = e || window.event;
    if (keyUpTimer){
      clearTimeout(keyUpTimer);
      keyUpTimer = undefined;
    }
    var reactToKeyUp = function(){    
        console.log(e);
    }
    keyUpTimer = setTimeout(reactToKeyUp, 50);
  };
  return {
    keyDown: keyDown,
    keyUp: keyUp
  }
}();