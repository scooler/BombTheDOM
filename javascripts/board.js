MyApp.board = (function(){
  var goodies = [];
  var createBoard = function(){
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
    };
  };

  //TODO maybe a separete class (if it grows any more)
  var getClassNameForCords = function(x,y){
    var boardWidth = MyApp.params.boardWidth;
    var boardHeight = MyApp.params.boardHeight;
    var boardDistance = MyApp.params.boardDistance;
    if (x === 0 || x === boardWidth-1 ){
      return "hardwall";
    }
    if (y === 0 || y === boardHeight-1){
      return "hardwall";
    }

    if (x>boardDistance-1 && x < boardWidth-boardDistance){
      if (y>boardDistance-1 && y < boardHeight-boardDistance){
        return "softwall"
      }
    }
    return "empty";
  };

  var generateGoodies = function(){
    var goodieNumber = MyApp.params.boardGoodies;
    var maxX = MyApp.params.boardWidth;
    var maxY = MyApp.params.boardHeight;

    var i = 0, x, y;
    while (i < goodieNumber){
      x = 
    }
  };

  MyApp.addOnLoad(createBoard);
  MyApp.addOnLoad(generateGoodies);
  return {
    isThereGoodie : function(x,y){
      return goodies[x][y] || 0;
    }
  };
})();