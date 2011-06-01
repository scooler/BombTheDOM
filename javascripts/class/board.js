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
        if (isThereGoodie(x, y)){ //soon to be gone - don't get heart atack (but still ugly)
          if (isThereGoodie(x, y) === 1){
            return "bomb";
          }
          return "range";
        }
        return "softwall"
      }
    }
    return "empty";
  };

  var initiateGoodies = function(){
    var goodiesSizeX = MyApp.params.goodiesSizeX, i;
    for (i = 0; i<goodiesSizeX; i++){
      goodies.push([]);
    }
  };


//TODO implement some fairness - more than random
  var generateGoodies = function(){
    initiateGoodies();
    var goodieNumber = MyApp.params.boardGoodies;
    var boardDistance = MyApp.params.boardDistance;
    var goodiesSizeX = MyApp.params.goodiesSizeX;
    var goodiesSizeY = MyApp.params.goodiesSizeY;

    var i = 0, x, y, goodieGenerated;
    while (i < goodieNumber){
      x = MyApp.utils.random(0, goodiesSizeX);
      y = MyApp.utils.random(0, goodiesSizeY);
      if (typeof goodies[x][y] === "undefined"){
        goodies[x][y] = MyApp.utils.random(1, MyApp.goodie.length);
        i ++;
      };
    }
  }();

  var isThereGoodie = function(x,y){
    var distance = MyApp.params.boardDistance;
    return goodies[x-distance][y-distance] || 0;
  };
  var boardPlayersPossitions = function(){
    var boardWidth = MyApp.params.boardWidth;
    var boardHeight = MyApp.params.boardHeight;
    var minX = 1, minY = 1, maxX = boardWidth-2, maxY = boardHeight-2;
    return [[minX, minY], [maxX, maxY], [minX, maxY], [maxX, minY]];
  };

  var getPlayersStartPossition = function(){
    var playersNumer = MyApp.params.playersNumer;
    var i, result = [], playersPossitions = boardPlayersPossitions();
    for (i = 0; i<playersNumer; i++){
      result.push(playersPossitions.shift());
    }
    return result;
  };
  var toAbsolute = function(x,y){
    var tileSize = MyApp.params.tileSize;
    return [x*tileSize, y*tileSize];
  }

  MyApp.utils.addOnLoad(createBoard);
  return {
    isThereGoodie : isThereGoodie,
    goodies: goodies,
    getPlayersStartPossition: getPlayersStartPossition,
    toAbsolute : toAbsolute,
    canMoveTo: function(x,y){}
  };
})();