//load images
MyApp = {};


MyApp.params = function(){
  var boardWidth = 20;
  var boardHeight = 15;
  var boardDistance = 2;
  var goodiesSizeX = boardWidth-boardDistance*2;
  var goodiesSizeY = boardHeight-boardDistance*2;
  var boardGoodies = Math.floor((boardWidth-boardDistance)*(boardHeight-boardDistance)/5);
  return {
    boardWidth:     boardWidth,   //in 32px fields
    boardHeight:    boardHeight,  //in 32px fields
    boardDistance:  boardDistance,//in 32px fields of empty space between hardwall on side and softwall in middle
    goodiesSizeX:   goodiesSizeX, //where goodies can be held
    goodiesSizeY:   goodiesSizeY, //where goodies can be held
    boardGoodies:   boardGoodies, //how many goodies should be on board
    animationSpeed: 500,          // time in ms between animation frames
    playersNumer:   2,            //how many players there will be (for now not to change)
    tileSize:       32
  }
}();

MyApp.goodie = {
  "1": "bomb",
  "2": "range",
  // "3": "speed",
  // "4": "kick",
  length: 2
}
  
