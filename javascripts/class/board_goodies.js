MyApp.boardGoodies = function(board){ 
  var goodies;
  var initiateGoodies = function(){
    var goodies = [], i;
    var boardWidth = MyApp.params.boardWidth;
    for (i = 0; i<boardWidth; i++){
      goodies.push([]);
    }
    return goodies;
  };

  //TODO implement some fairness - more than random
  var generateGoodies = function(){
    var goodies = initiateGoodies();
    var goodieNumber = MyApp.params.boardGoodies;
    var boardDistance = MyApp.params.boardDistance;
    var goodiesSizeX = MyApp.params.goodiesSizeX;
    var goodiesSizeY = MyApp.params.goodiesSizeY;

    var i = 0, x, y;
    while (i < goodieNumber){
      x = MyApp.utils.random(boardDistance, goodiesSizeX+boardDistance-1);
      y = MyApp.utils.random(boardDistance, goodiesSizeY+boardDistance-1);
      if (typeof goodies[x][y] === "undefined"){
        goodies[x][y] = MyApp.utils.random(3, 4); //TODO set it up so that it gets params from board
        i ++;
      }
    }
    return goodies;
  };
  var isThereGoodie = function(x,y){
    // var distance = MyApp.params.boardDistance;
    return goodies[x][y] || 2; // 
  };

  var goodieDestroyed = function(x, y){
    delete goodies[x][y]
  };
  var goodiePicked = function(player, x, y){
    var desc = board.getDescriptionForType(goodies[x][y]);
    player["add"+desc.goodieName]();
    goodieDestroyed(x, y);    
    board[x][y] = 2;
    board.repaint();
  };
  goodies = generateGoodies();
  
  board.isThereGoodie = isThereGoodie;
  board.goodiePicked = goodiePicked;
  board.goodieDestroyed = goodieDestroyed;
};