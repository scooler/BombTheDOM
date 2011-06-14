MyApp.boardPlayers = function(board){
  var players = [];

  var boardPlayersPossitions = function(){
    var boardWidth = board.length;
    var boardHeight = board[0].length;
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

  board.findPlayer = function(x, y){
    var result = []
    var i, j, cords;
    console.log(players);
    for (i = 0; i < players.length; i++){
      console.log(players[i]);

      cords = players[i].getPossition();
      for (j = 0; j < cords.length; j++){
        if (x === cords[j][0] && y === cords[j][1]){
          result.push(players[i]); //TODO maybe remove duplicates - players can die more than once now :D
        }
      }
    }
    return result;
  }


  var createPlayers = function(){
    var playersNumer = MyApp.params.playersNumer;
    var playersPossitions = board.getPlayersStartPossition();
    var i;
    for (i=0 ; i<playersNumer; i++){
      players.push(MyApp.player(playersPossitions[i][0], playersPossitions[i][1], i, board.bomb, board.moving));
    }
    // TODO maybe I should add board, with apropriate method
    MyApp.io.setPlayers(players);
  };
  MyApp.utils.addOnLoad(createPlayers);

  board.getPlayersStartPossition = getPlayersStartPossition;
  
};