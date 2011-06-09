MyApp.setupBoard = function(board){ 
  var boardShadow; 

  var updateBoardElem = function(boardElem, x, y){ //TODO somewhat similar function in board_bombs
    var desc = board.getDescription(x, y);
    boardElem.className = desc.className
    boardElem.style.backgroundPosition = desc.bgPossition;
  }

  var createBoardDOM = function(){
    var board = document.getElementById("board");
    var boardWidth = MyApp.params.boardWidth;
    var boardHeight = MyApp.params.boardHeight;
    var i,j;
    var trElem, tdElem;
    // var createElem = document.createElement;

    for (i = 0; i < boardHeight; i++){
      trElem = document.createElement("tr");
      for (j = 0; j < boardWidth; j++){
        tdElem = document.createElement("td");
        tdElem.id = j + "-" + i;
        updateBoardElem(tdElem, j, i);
        trElem.appendChild(tdElem);
      }
      board.appendChild(trElem);
    }
  };

//first do stupid total repaint - than make shadow table
  board.repaint = function(){
    var i, j;
    var boardWidth = MyApp.params.boardWidth;
    var boardHeight = MyApp.params.boardHeight;
    var currentTR = document.getElementById("board").firstChild, currentTD = currentTR.firstChild;
    for (i = 0; i < boardHeight; i++){
      for (j = 0; j < boardWidth; j++){
        updateBoardElem(currentTD, j, i);
        currentTD = currentTD.nextSibling;
      }
      currentTR = currentTR.nextSibling;
      if (currentTR !== null){
        currentTD = currentTR.firstChild;
      }
    }
  };

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
    //playersPosition[player] = [topLeft, topRight, bottomLeft, bottomRight];
    [topLeft, topRight, bottomLeft, bottomRight].each(handleMoving(player));
  }

  board.getElem = function(coords){//try if by id is faster - single access
    return document.getElementById("board").children[coords[1]].children[coords[0]];
  }
  board.moving = {}
  board.moving.canMoveTo = canMoveTo;
  board.moving.movingTo = movingTo;

  MyApp.boardBombs(board);
  MyApp.boardPlayers(board);
  MyApp.boardGoodies(board);

  MyApp.utils.addOnLoad(createBoardDOM);
};