MyApp.boardPlayers = function(board){
  var players = [];

  var getPlayersStartPossition = function(playersNumer){
    var i, result = [], playersPossitions = board.possiblePlayersPossitions();
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
    var playersPossitions = getPlayersStartPossition(MyApp.params.playersNumer);
    var i;
    for (i=0 ; i<playersNumer; i++){
      players.push(MyApp.player(playersPossitions[i][0], playersPossitions[i][1], i, board.bomb, board.movement));
    }
    // TODO maybe I should add board, with apropriate method
    MyApp.io.setPlayers(players);
  };
  MyApp.utils.addOnLoad(createPlayers);

};