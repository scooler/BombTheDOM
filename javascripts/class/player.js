MyApp.player = function(startX, startY){
  var power = 1;
  var availableBombs = 1;
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
    if (availableBombs > 0){
      var x,y;
      [x,y] = movement.fromAbsolute(parseInt(playerElem.style.left, 10)+16, parseInt(playerElem.style.top, 10)+16);
      MyApp.bomb(power, x ,y, function(){
        availableBombs++;
      });
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