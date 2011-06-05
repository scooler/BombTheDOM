MyApp.player = function(startX, startY){
  var power = 3;
  var availableBombs = 3;
  var playerElem;

  var toAbsolute = function(x,y){
    var result = MyApp.board.toAbsolute(x,y);
    result[1] = result[1]-16; //player is 32x48 - taller than normal tiles
    return result;
  };

  var createPlayerElem = function(){
    var playerAbsPosition = toAbsolute(startX, startY);
    var playerElem = document.createElement("div");
    playerElem.className = "player";
    playerElem.style.left = playerAbsPosition[0];
    playerElem.style.top = playerAbsPosition[1];
    playerElem.style.backgroundPosition = "0px 0px";
    document.body.insertBefore(playerElem, document.body.firstChild); 
    return playerElem;   
  };
  playerElem = createPlayerElem();
  var movement = MyApp.playerMovement(playerElem);

  var layBomb = function(){
    var x,y, bomb;
    [x,y] = movement.fromAbsolute(parseInt(playerElem.style.left, 10)+16, parseInt(playerElem.style.top, 10)+16);
    if (availableBombs > 0 && MyApp.board.canLayBombOn(x, y)){
      availableBombs --;
      bomb = MyApp.bomb(x ,y, function(){
        availableBombs++;
        MyApp.board.bombBumed(x, y, power);
      });
      MyApp.board.bombSetup(bomb);
    }
  };

  return {
    addBombs: function(){
      availableBombs++;
    },
    addPower: function(){
      power++;
    },
    layBomb : layBomb,
    toAbsolute: toAbsolute,

    movement: movement,
    moveUp: movement.moveUp,
    moveDown: movement.moveDown,
    moveLeft: movement.moveLeft,
    moveRight: movement.moveRight,
    stop: movement.stop
  };
};