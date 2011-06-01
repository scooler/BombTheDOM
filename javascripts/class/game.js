MyApp.game = function(){
  var players = [];
  var createPlayers = function(){
    var playersNumer = MyApp.params.playersNumer;
    var playersPossitions = MyApp.board.getPlayersStartPossition();
    var i;
    for (i=0 ; i<playersNumer; i++){
      players.push(MyApp.player(playersPossitions[i][0], playersPossitions[i][1]));
    }
  };
  MyApp.utils.addOnLoad(createPlayers);
  return {};
}();