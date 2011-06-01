MyApp.player = function(startX, startY){
  var power = 1;
  var bombs = 1;

  var toAbsolute = function(x,y){
    var result = MyApp.board.toAbsolute(x,y);
    result[1] = result[1]-16; //player is 32x48 - taller than normal tiles
    return result;
  }

  var createPlayerElem = function(){
    var playerElem;
    playerAbsPosition = toAbsolute(startX, startY);
    playerElem = document.createElement("div");
    playerElem.className = "player"
    playerElem.style.left = playerAbsPosition[0];
    playerElem.style.top = playerAbsPosition[1];
    // playerElem.style.backgroundPosition = "0px 0px";
    document.body.insertBefore(playerElem, document.body.firstChild);    
  }();


  var findBoardElemYouAreOn = function(){
       //TODO       
  };


  MyApp.playerMovement();

  return {
    addBombs: function(){
      bombs++;
    },
    addPower: function(){
      power++;
    },
    layBomb: function(){
       //TODO   
    },

    getPower : function(){
      return power;
    }, 
    toAbsolute: toAbsolute


  }  
};