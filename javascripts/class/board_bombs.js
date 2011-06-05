MyApp.boardBombs = function(board){ //TODO maybe pass just an object with method, not board itself
  var bombs = {}, bombsToBlow = [], coordsForAnimation = [];
  var blastHitWall = function(x, y){
    
  };
//TODO refactor this somehow but all my tries were worse than this :(
  var bombBlowing = function(x, y, power, onBlast){
    var i, lastI;
    for (i = x; i <= x + power; i++){
      if (board.isPassable([i,y])){
        onBlast(i, y, 11);
        lastI = i;
      } else {
        blastHitWall(i, y);
        break;
      }
    }
    onBlast(lastI, y, 8);
    lastI = undefined;

    for (i = x-1; i >= x - power; i--){
      if (board.isPassable([i,y])){
        onBlast(i, y, 11);
        lastI = i;
      } else {
        blastHitWall(i, y);
        break;
      }
    }
    if (typeof lastI === "number"){
      onBlast(lastI, y, 6);
      lastI = undefined;
    }

    for (i = y+1; i <= y + power; i++){
      if (board.isPassable([x, i])){
        onBlast(x, i, 10);
        lastI = i;
      } else {
        blastHitWall(x, i);
        break;
      }
    }
    if (typeof lastI === "number"){
      onBlast(x, lastI, 9);
      lastI = undefined;
    }

    for (i = y-1; i >= y - power; i--){
      if (board.isPassable([x, i])){
        onBlast(x, i, 10);
        lastI = i;
      } else {
        blastHitWall(x, i);
        break;
      }
    }
    if (typeof lastI === "number"){
      onBlast(x, lastI, 7);
    }
  };
  var bombChainingCollect = function(x, y){
    if (typeof bombs[[x, y]] === "object"){
      bombsToBlow.push(bombs[[x, y]]);
      delete bombs[[x, y]];
    }
  };
  var bombChainingExplode = function(){
    bombsToBlow.each(function(bomb){ bomb.bum(); });
    bombsToBlow = [];
  };
  var bombAction = function(xCenter, yCenter, power){
    var lastRight, lastLeft, lastUp,lastDown;
    bombBlowing(xCenter, yCenter, power, function(x, y, blastTypeNr){
      board[x][y] = blastTypeNr;
      bombChainingCollect(x, y);
      coordsForAnimation.push([x,y]);
      //TODO bomb killing :P
    });
    board[xCenter][yCenter] = 5;
  };
  var onBlastEnd = function(elem){
    var elemCords = elem.id.split("-");
    elem.className = "";
    board[ elemCords[0] ][ elemCords[1] ] = 2;
  };
  var animateBlast = function(){
    coordsForAnimation.each(function(cords){ 
      MyApp.utils.animate(board.getElem(cords), 4, false, onBlastEnd); 
    });
    coordsForAnimation = [];
  };

  var bombBumed = function(x, y, power){
    delete bombs[[x, y]];
    bombAction(x, y, power); 
    board.repaint();
    animateBlast();
    bombChainingExplode();
  };
  var bombSetup = function(bomb){
    bombs[bomb.getCords()] = bomb;
  };

  MyApp.board.bombBumed = bombBumed;
  MyApp.board.bombSetup = bombSetup;  
};