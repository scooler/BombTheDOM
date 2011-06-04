MyApp.bomb = function(power, startX, startY){
  var bombElem;
  var animator; //TODO

  var createBombElem = function(){
    var bombAbsPosition = MyApp.board.toAbsolute(startX, startY);
    var bombElem = document.createElement("div");
    bombElem.className = "bomb";
    bombElem.style.left = bombAbsPosition[0];
    bombElem.style.top = bombAbsPosition[1];
    bombElem.style.backgroundPosition = "0px 0px";
    document.body.insertBefore(bombElem, document.body.firstChild);    
  };
  bombElem = createBombElem();

  return {    
  };
};