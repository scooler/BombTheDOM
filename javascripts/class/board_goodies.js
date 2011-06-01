(function(){ 
  var goodies, board;
  var initiateGoodies = function(){
    var goodies = [], i;
    var boardWidth = MyApp.params.boardWidth;
    for (i = 0; i<boardWidth; i++){
      goodies.push([]);
    }
    return goodies;
  };
  goodies = initiateGoodies();

  //TODO implement some fairness - more than random
  var generateGoodies = function(){
    initiateGoodies();
    var goodieNumber = MyApp.params.boardGoodies;
    var boardDistance = MyApp.params.boardDistance;
    var goodiesSizeX = MyApp.params.goodiesSizeX;
    var goodiesSizeY = MyApp.params.goodiesSizeY;

    var i = 0, x, y, goodieGenerated;
    while (i < goodieNumber){
      x = MyApp.utils.random(boardDistance, goodiesSizeX+boardDistance);
      y = MyApp.utils.random(boardDistance, goodiesSizeY+boardDistance);
      if (typeof goodies[x][y] === "undefined"){
        goodies[x][y] = MyApp.utils.random(1, MyApp.goodie.length);
        i ++;
      };
    }
  }();

  var isThereGoodie = function(x,y){
    // var distance = MyApp.params.boardDistance;
    return goodies[x][y] || 0;
  };

  MyApp.board.isThereGoodie = isThereGoodie;
})();