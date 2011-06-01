MyApp.player = function(elem){
  var power = 1;
  var bombs = 1;
  var moving = false;

  var findBoardElemYouAreOn = function(){
       //TODO   
    
  };

  var toAbsolute = function(x,y){
    var result = MyApp.board.toAbsolute(x,y);
    result[1] = result[1]-16; //player is 32x48 - taller than normal tiles
    return result;
  }
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
    //All these functions are togle - you call it once on keyd down
    moveDown: function(){
       //TODO   
      
    },
    moveUp: function(){
       //TODO   
      
    },
    moveRight: function(){
       //TODO   
      
    },
    moveLeft: function(){
       //TODO   
      
    },
    stop: function(){
       //TODO   
      
    },
    getPower : function(){
      return power;
    }
  }  
};