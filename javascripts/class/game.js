MyApp.game = function(){
  var players = [];
  var createPlayers = function(){
    var playersNumer = MyApp.params.playersNumer;
    var playersPossitions = MyApp.board.getPlayersStartPossition();
    var playerAbsPosition;

    var i;
    var playerElem;
    for (i=0 ; i<playersNumer; i++){
      playerAbsPosition = MyApp.utils.playerToAbsolute(playersPossitions[i][0], playersPossitions[i][1]);
      playerElem = document.createElement("div");
      playerElem.className = "player"
      playerElem.style.left = playerAbsPosition[0];
      playerElem.style.top = playerAbsPosition[1];
      document.body.insertBefore(playerElem, document.body.firstChild);
      players.push(MyApp.player(playerElem));
    }
  };
  MyApp.addOnLoad(createPlayers);
  return {};
}();