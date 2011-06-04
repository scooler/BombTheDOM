MyApp.bomb = function(power, startX, startY, bumCallback){
  var bombElem;
  var animator; //TODO
  var bumed = false;

  var createBombElem = function(){
    var bombAbsPosition = MyApp.board.toAbsolute(startX, startY);
    var bombElem = document.createElement("div");
    bombElem.className = "bomb";
    bombElem.style.left = bombAbsPosition[0];
    bombElem.style.top = bombAbsPosition[1];
    bombElem.style.backgroundPosition = "0px 0px";
    document.body.insertBefore(bombElem, document.body.firstChild);    
    return bombElem;
  };
  bombElem = createBombElem();

  var bum = function(){
    if (!bumed){
      bumed = true;
      bombElem.parentNode.removeChild(bombElem);
      delete bombElem;
      bumCallback();
    }
  };
  setTimeout(bum, MyApp.params.bombTime);
  return {    
    bum: bum
  };
};