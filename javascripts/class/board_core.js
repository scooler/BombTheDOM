MyApp.board = (function(){
  var board;
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
        passable: false,
        bgPossition: "0px 0px"
      },
    1: {
        className: "softwall",
        passable: false,
        bgPossition: "0px 0px"
      },
    2: {
        className: "",
        passable: true,
        bgPossition: "0px 0px"
      },
    3:  {
        className: "bomb-goodie",
        passable: true,
        bgPossition: "0px 0px",
        goodieName: "Bombs"
      },
    4: {
        className: "range-goodie",
        passable: true,
        bgPossition: "0px 0px",
        goodieName: "Power"
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
  board.getDescriptionForType = function(typeNr){
    return boardValues[typeNr];
  };
  board.getDescription = function(coords, possibleY){
    var x = coords, y = possibleY;
    if (typeof coords === "object"){
      x = coords[0];
      y = coords[1];
    }
    return board.getDescriptionForType(board[x][y]);
  };

}());