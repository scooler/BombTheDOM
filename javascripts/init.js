//load images
MyApp = {};


MyApp.params = (function(){
  var boardWidth = 20;
  var boardHeight = 15;
  var boardDistance = 2;
  var goodiesSizeX = boardWidth-boardDistance*2;
  var goodiesSizeY = boardHeight-boardDistance*2;
  var boardGoodies = Math.floor((boardWidth-boardDistance)*(boardHeight-boardDistance)/5);
  return {
    boardWidth:         boardWidth,   //in 32px fields
    boardHeight:        boardHeight,  //in 32px fields
    boardDistance:      boardDistance,//in 32px fields of empty space between hardwall on side and softwall in middle
    goodiesSizeX:       goodiesSizeX, //where goodies can be held
    goodiesSizeY:       goodiesSizeY, //where goodies can be held
    boardGoodies:       boardGoodies, //how many goodies should be on board
    animationSpeed:     100,          // time in ms between animation frames
    playersNumer:       2,            //how many players there will be (for now not to change)
    tileSize:           32,           //how big the board element is (should use it more :P)
    playerHeight:       48,           //how hight is the player (for collision detection)
    movementSpeed:      50,           // how often you move
    movementShift:      3,            //how much player moves for every <movementSpeed>ms
    collisionSoftness:  4,            //px that I let slide during collision detection (so that stuff won't be so hard)
    bombTime:           3000          //how much time in ms befor bomb blows (or bums ;P)
  };
}());

MyApp.goodie = {
  "3": "bomb",
  "4": "range",
  // "3": "speed",
  // "4": "kick",
  length: 2,
  first: 3
};
  
