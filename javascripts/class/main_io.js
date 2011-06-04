MyApp.io = (function(){
  var players;
  var keyDownTimer, keyUpTimer;
  var keyDown = function(e){
    e = e || window.event;
    if (keyDownTimer){
      clearTimeout(keyDownTimer);
      keyDownTimer = undefined;
    }
    if (keyUpTimer){ // new keydown sends bogus keyup - dismiss it
      clearTimeout(keyUpTimer);
      keyUpTimer = undefined;
    }
    var reactToKeyDown = function(){    
        var keyMapping = MyApp.io.keyMap[e.keyCode];
        if ( typeof keyMapping === "object"){
          players[keyMapping.player][keyMapping.action]();
        }
        // console.log(e);
    };
    keyDownTimer = setTimeout(reactToKeyDown, 50);
    e.preventDefault();
    return false;
  };

  var keyUp = function(e){
    e = e || window.event;
    if (keyUpTimer){
      clearTimeout(keyUpTimer);
      keyUpTimer = undefined;
    }
    var reactToKeyUp = function(){    
        // console.log(e);        
        var keyMapping = MyApp.io.keyMap[e.keyCode];
        if ( typeof keyMapping === "object"){
          if (keyMapping.action.slice(0,4) === "move"){
            players[keyMapping.player].stop();
          }
        }
    };
    keyUpTimer = setTimeout(reactToKeyUp, 50);
    e.preventDefault();
    return false;
  };
  return {
    keyDown: keyDown,
    keyUp: keyUp,
    setPlayers: function(pls){
      players = pls;
    }
  };
}());

MyApp.io.keyMap = {
  37:{
    player: 0,
    action: "moveLeft"
  },
  38:{
    player: 0,
    action: "moveUp"
  },
  39:{
    player: 0,
    action: "moveRight"
  },
  40:{
    player: 0,
    action: "moveDown"
  },
  13:{
    player: 0,
    action: "layBomb"
  },

  65:{
    player: 1,
    action: "moveLeft"
  },
  87:{
    player: 1,
    action: "moveUp"
  },
  68:{
    player: 1,
    action: "moveRight"
  },
  83:{
    player: 1,
    action: "moveDown"
  },
  32:{
    player: 1,
    action: "layBomb"
  }
};