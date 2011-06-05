(function(){ 
  var board, bombs = {}; 
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
    },
    { //5
      className: "blast_middle",
      passable: true
    },
    { //6
      className: "blast_left_end",
      passable: true
    },
    { //7
      className: "blast_up_end",
      passable: true
    },
    { //8
      className: "blast_right_end",
      passable: true
    },
    { //9
      className: "blast_down_end",
      passable: true
    },
    { //10
      className: "blast_top_down",
      passable: true
    },
    { //11
      className: "blast_left_right",
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

//first do stupid total repaint - than make shadow table
  var repaintBoard = function(){
    
  };

  var isPassable = function(coords){
    return boardValues[ board[ coords[0] ][ coords[1] ] ].passable;
  };
  
  //4 corners collision detection
  var canMoveTo = function(topLeft, topRight, bottomLeft, bottomRight){
    return isPassable(topLeft) && isPassable(topRight) && isPassable(bottomLeft) && isPassable(bottomRight);
  };

//TODO refactor this somehow but all my tries were worse than this :(
  var bombBlowing = function(x, y, power, callback){
    var i, lastI;
    for (i = x; i <= x + power; i++){
      if (isPassable(i,y)){
        callback(i, y, 11);
        lastI = i;
      } else {
        blastHitWall(i, y);
        break;
      }
    }
    callback(lastI, y, 8);

    for (i = x-1; i >= x - power; i--){
      if (isPassable(i,y)){
        callback(i, y, 11);
        lastI = i;
      } else {
        blowHitWall(i, y);
        break;
      }
    }
    callback(lastI, y, 6);

    for (i = y+1; i <= y + power; i++){
      if (isPassable(x, i)){
        callback(x, i, 10);
        lastI = i;
      } else {
        blowHitWall(x, i);
        break;
      }
    }
    callback(lastI, y, 9);

    for (i = y-1; i >= y - power; i--){
      if (isPassable(x, i)){
        callback(x, i, 10);
        lastI = i;
      } else {
        blowHitWall(x, i);
        break;
      }
    }
    callback(lastI, y, 7);
  };
  var bombChaining = function(x, y){
    if (typeof bombs[[x,y]] === "object"){
      bombs[[x,y]].bum();
    }
  };
  var bombAction = function(xCenter, yCenter, power){
    var lastRight, lastLeft, lastUp,lastDown;
    bombBlowing(xCenter, yCenter, power, function(x, y, blastNr){
      board[x][y] = blastNr;
      bombChaining(x, y);
      //TODO bomb killing :P
    });
    repaintBoard();
  };

  var bombBumed = function(x, y, power){
    delete bombs[[x,y]];
    bombAction(x, y, power); //in this order so new animation override old onces when chaining
  };
  var bombSetup = function(bomb){
    bombs[bomb.getCords()] = bomb;
  };

  MyApp.board.canMoveTo = canMoveTo;
  MyApp.board.bombBumed = bombBumed;
  MyApp.utils.addOnLoad(createBoardDOM);
}());