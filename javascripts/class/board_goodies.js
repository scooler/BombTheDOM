MyApp.boardGoodies = function(board){ 
  var goodies;
  var initiateGoodies = function(){
    var goodies = [], i;
    for (i = 0; i<board.length; i++){
      goodies.push([]);
    }
    return goodies;
  };

  //TODO implement some fairness - more than random
  var generateGoodies = function(){
    var goodies = initiateGoodies();
    var goodiesNumber = board.goodiesNumber;

    var i = 0, x, y;
    while (i < goodiesNumber){
      x = MyApp.utils.random(0, board.length-1);
      y = MyApp.utils.random(0, board[0].length-1); //TODO figure out to use less magic numbers
      if (typeof goodies[x][y] === "undefined" && board[x][y] == 1){
        goodies[x][y] = MyApp.utils.random(3, 4); //TODO set it up so that it gets params from board
        i ++;
      }
    }
    return goodies;
  };
  var isThereGoodie = function(x,y){
    return goodies[x][y] || 2; 
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