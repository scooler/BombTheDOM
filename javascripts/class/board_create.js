(function(){ 
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



  var boardValues = [ 
    { //0
      className: "hardwall",
      passable: false
    },
    { //1
      className: "softwall",
      passable: false
    },
    { //2 (empty)
      className: "",
      passable: true
    },
    { //3
      className: "bomb",
      passable: true
    },
    { //4
      className: "range",
      passable: true
    }
  ];

  var getClassNameForCords = function(x,y){
    return boardValues[board[x][y]].className;
  };

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
        tdElem.className = getClassNameForCords(j, i);
        trElem.appendChild(tdElem);
      }
      board.appendChild(trElem);
    }
  };

  var isPassable = function(coords){
    return boardValues[ board[ coords[0] ][ coords[1] ] ].passable;
  };
  
  //4 corners collision detection
  var canMoveTo = function(topLeft, topRight, bottomLeft, bottomRight){
    return isPassable(topLeft) && isPassable(topRight) && isPassable(bottomLeft) && isPassable(bottomRight);
  };
  MyApp.board.canMoveTo = canMoveTo;
  MyApp.utils.addOnLoad(createBoardDOM);
}());