MyApp.bomb = function(startX, startY, bumCallback){
  var bombElem;
  var animator;
  var bumed = false;

  var createBombElem = function(){
    var bombAbsPosition = MyApp.utils.toAbsolute(startX, startY);
    var bombElem = document.createElement("div");
    bombElem.className = "bomb";
    bombElem.style.left = bombAbsPosition[0];
    bombElem.style.top = bombAbsPosition[1];
    bombElem.style.backgroundPosition = "0px 0px";
    document.body.insertBefore(bombElem, document.body.firstChild);    
    return bombElem;
  };

  bombElem = createBombElem();
  animator = MyApp.utils.animate(bombElem, 4, true);

  var bum = function(){
    if (!bumed){
      bumed = true;
      animator.stopAnimation();
      bombElem.parentNode.removeChild(bombElem);
      bumCallback();
    }
  };
  setTimeout(bum, MyApp.params.bombTime);
  return {    
    bum: bum,
    getCords: function(){
      return [startX, startY];
    }

  };
};