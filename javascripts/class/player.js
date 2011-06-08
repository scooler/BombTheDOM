MyApp.player = function(startX, startY, number){
  var power = 3;
  var availableBombs = 3;
  var movement;
  var playerElem;
  var sortOfThis = {
    addBombs: function(){
      availableBombs++;
    },
    addPower: function(){
      power++;
    },
    die: function(){
      sortOfThis.stop();
      playerElem.parentNode.removeChild(playerElem); 
    },
    getNumber: function(){
      return number;
    }
  };
  var toAbsolute = function(x,y){
    var result = MyApp.utils.toAbsolute(x,y);
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
  movement = MyApp.playerMovement(playerElem, sortOfThis);
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

  sortOfThis.layBomb = layBomb;
  sortOfThis.toAbsolute = toAbsolute;
  sortOfThis.movement = movement;
  sortOfThis.moveUp = movement.moveUp;
  sortOfThis.moveDown = movement.moveDown;
  sortOfThis.moveLeft = movement.moveLeft;
  sortOfThis.moveRight = movement.moveRight;
  sortOfThis.stop = movement.stop;
  return sortOfThis;
};