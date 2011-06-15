MyApp.game = (function(){
  var board = MyApp.initiateBoard();

  MyApp.boardDescriptions(board);
  MyApp.boardMovement(board);
  MyApp.boardBombs(board);
  MyApp.boardPlayers(board);
  MyApp.boardGoodies(board);
  MyApp.renderBoard(board);

  MyApp.utils.addCallback("keydown", MyApp.io.keyDown);
  MyApp.utils.addCallback("keyup", MyApp.io.keyUp);
}());