//load images
MyApp = {};


MyApp.params = (function(){
  return {
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
  
