//create board
//load images
//

MyApp = (function(){
  var onLoadHandlers = [];
  window.onload = function(){
    var i;
    for (i = 0; i<onLoadHandlers.length; i++){
      if (typeof onLoadHandlers[i]=== "function"){
        onLoadHandlers[i]();
      }
    }
  }
  return {
    addOnLoad: function(handler){
      onLoadHandlers.push(handler);
    }
  }
})();

MyApp.params = {
  boardWidth:    20,
  boardHeight:   15,
  boardDistance: 2,
  boardGoodies:  Math.floor((20-2)*(15-2)/5)
};

