(function(){ 
  var board, boardShadow; 
  //looks nice, but it isn't dynamic :(
  // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  // [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
  // [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
  // [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
  // [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
  // [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
  // [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
  // [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
  // [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
  // [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
  // [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
  // [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
  // [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
  // [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  // ];
  var initialBoard = function(x,y){
    var boardWidth = MyApp.params.boardWidth;
    var boardHeight = MyApp.params.boardHeight;
    var boardDistance = MyApp.params.boardDistance;

    if (x === 0 || x === boardWidth-1 ){
      return 0;
    }
    if (y === 0 || y === boardHeight-1){
      return 0;
    }


    if (x>boardDistance-1 && x < boardWidth-boardDistance){
      if (y>boardDistance-1 && y < boardHeight-boardDistance){
        return 1;
      }
    }
    return 2;
  };

  var initiateBoard = function(){
    var boardWidth = MyApp.params.boardWidth;
    var boardHeight = MyApp.params.boardHeight;
    var board = [];
    var i, j;

    for (i=0; i<boardWidth; i++){
      board.push([]);
      for (j=0; j<boardHeight; j++){
        board[i][j] = initialBoard(i, j);
      }
    }
    return board;
  };
  board = initiateBoard();



  var boardValues = { 
    0: {
        className: "hardwall",
        passable: false
      },
    1: {
        className: "softwall",
        passable: false,
        bgPossition: "0px 0px"
      },
    2: {
        className: "",
        passable: true
      },
    3:  {
        className: "bomb",
        passable: true
      },
    4: {
        className: "range",
        passable: true
      },
    5: {//blast_middle
        className: "blast",
        passable: true,
        bgPossition: "0px 0px"
      },
    6: {//blast_left_end
        className: "blast",
        passable: true,
        bgPossition: "0px -192px"
      },
    7: {//blast_up_end
        className: "blast",
        passable: true,
        bgPossition: "0px -96px"
      },
    8: {//blast_right_end
        className: "blast",
        passable: true,
        bgPossition: "0px -128px"
      },
    9: {//blast_down_end
        className: "blast",
        passable: true,
        bgPossition: "0px -160px"
      },
    10: {//blast_top_down
        className: "blast",
        passable: true,
        bgPossition: "0px -32px"
      },
    11: {//blast_left_right
        className: "blast",
        passable: true,
        bgPossition: "0px -64px"
      }
  };

  var updateBoardElem = function(boardElem, x, y){
    var desc = boardValues[board[x][y]];
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

    for (i=0; i<boardHeight; i++){
      trElem = document.createElement("tr");
      for (j=0; j<boardWidth; j++){
        tdElem=document.createElement("td");
        tdElem.id = j + "-" + i;
        updateBoardElem(tdElem, j, i);
        trElem.appendChild(tdElem);
      }
      board.appendChild(trElem);
    }
  };

//first do stupid total repaint - than make shadow table
  board.repaint = function(){
    var i,j;
    var boardWidth = MyApp.params.boardWidth;
    var boardHeight = MyApp.params.boardHeight;
    var currentTR = document.getElementById("board").firstChild, currentTD = currentTR.firstChild;
    for (i=0; i<boardHeight; i++){
      for (j=0; j<boardWidth; j++){
        updateBoardElem(currentTD, j, i);
        currentTD = currentTD.nextSibling;
      }
      currentTR = currentTR.nextSibling;
      if (currentTR !== null){
        currentTD = currentTR.firstChild;
      }
    }
  };

  var isPassable = function(coords){
    return boardValues[ board[ coords[0] ][ coords[1] ] ].passable;
  };
  board.isPassable = isPassable;
  
  //4 corners collision detection
  var canMoveTo = function(topLeft, topRight, bottomLeft, bottomRight){
    return isPassable(topLeft) && isPassable(topRight) && isPassable(bottomLeft) && isPassable(bottomRight);
  };

  board.getElem = function(coords){//try if by id is faster - single access
    return document.getElementById("board").children[coords[1]].children[coords[0]];
  }

  MyApp.boardBombs(board)

  MyApp.board.canMoveTo = canMoveTo;
  MyApp.utils.addOnLoad(createBoardDOM);
}());