MyApp.boardMovement = function(board){
  var isPassable = function(coords, possibleY){
    var x = coords, y = possibleY;
    if (typeof coords === "object"){
      x = coords[0];
      y = coords[1];
    }
    return board.getDescription(x, y).passable;
  };
  board.isPassable = isPassable;
  
  //4 corners collision detection
  var canMoveTo = function(topLeft, topRight, bottomLeft, bottomRight){ //maybe a 4-point new class :?
    return isPassable(topLeft) && isPassable(topRight) && isPassable(bottomLeft) && isPassable(bottomRight);
  };

  var handleMoving = function(player){
    return function(cords){      
      var desc = board.getDescription(cords);
      if ( desc.className === "blast" ){
        player.die();
      }else if (typeof desc.goodieName !== "undefined" ){
        board.goodiePicked(player, cords[0], cords[1]);
      }
    }
  };

  var movingTo = function(player, topLeft, topRight, bottomLeft, bottomRight){
    [topLeft, topRight, bottomLeft, bottomRight].each(handleMoving(player));
  }

  board.movement = {}
  board.movement.canMoveTo = canMoveTo;
  board.movement.movingTo = movingTo;
};