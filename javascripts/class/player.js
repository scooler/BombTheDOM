MyApp.player = function(startX, startY, number, boardBomb, boardMoving){
  var power = 3;
  var availableBombs = 3;
  var dead = false;
  var movement;
  var playerElem;
  var fromAbsolute = function(absX, absY){
    var x = Math.floor(absX/32); //TODO use params
    var y = Math.floor((absY+16)/32);
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

  var getPossition = function(){
    var left = parseInt(playerElem.style.left);
    var top = parseInt(playerElem.style.top);
    return getAllCorners(left, top);
  };

  var sortOfThis = {
    addBombs: function(){
      availableBombs++;
    },
    addPower: function(){
      power++;
    },
    die: function(){
      if (!dead){
        dead = true;
        sortOfThis.stop();
        playerElem.parentNode.removeChild(playerElem); 
      }
    },
    getNumber: function(){
      return number;
    },
    fromAbsolute: fromAbsolute,
    getPossition: getPossition,
    getAllCorners: getAllCorners,
    toAbsolute: function(x,y){
      var result = MyApp.utils.toAbsolute(x,y);
      result[1] = result[1]-16; //player is 32x48 - taller than normal tiles
      return result;
    }
  };


  var createPlayerElem = function(){
    var playerAbsPosition = sortOfThis.toAbsolute(startX, startY);
    var playerElem = document.createElement("div");
    playerElem.className = "player";
    playerElem.style.left = playerAbsPosition[0];
    playerElem.style.top = playerAbsPosition[1];
    playerElem.style.backgroundPosition = "0px 0px";
    document.body.insertBefore(playerElem, document.body.firstChild); 
    return playerElem;   
  };
  playerElem = createPlayerElem();
  var layBomb = function(){
    var bomb, cords = sortOfThis.fromAbsolute(parseInt(playerElem.style.left, 10)+16, parseInt(playerElem.style.top, 10)+16);
    var x = cords[0], y = cords[1];
    if (availableBombs > 0 && boardBomb.canLayOn(x, y) && !dead){
      availableBombs --;
      bomb = MyApp.bomb(x ,y, function(){
        availableBombs++;
        boardBomb.bumed(x, y, power);
      });
      boardBomb.setup(bomb);
    }
  };
  MyApp.playerMovement(playerElem, sortOfThis, boardMoving);

  sortOfThis.layBomb = layBomb;
  return sortOfThis;
};