MyApp.board = (function(){
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
  };



  return {
    getPlayersStartPossition: getPlayersStartPossition,
    toAbsolute : toAbsolute
  }
})();