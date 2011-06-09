MyApp.game = (function(){
  var board;
  var veryBasicBoard = function(){
    var result = [];
    result.getBoardValues = function(){
      return boardValues;
    }
    return result;
  };

  board = MyApp.board(veryBasicBoard());

  var boardValues = { 
    0: {
        className: "hardwall",
        passable: false,
        bgPossition: "0px 0px"
      },
    1: {
        className: "softwall",
        passable: false,
        bgPossition: "0px 0px"
      },
    2: {
        className: "",
        passable: true,
        bgPossition: "0px 0px"
      },
    3:  {
        className: "bomb-goodie",
        passable: true,
        bgPossition: "0px 0px",
        goodieName: "Bombs"
      },
    4: {
        className: "range-goodie",
        passable: true,
        bgPossition: "0px 0px",
        goodieName: "Power"
      },
    5: {//blast_middle
        className: "blast",
        passable: true,
        bgPossition: "0px 0px"
      },
    6: {//blast_left_end
        className: "blast",
        passable: true,
        bgPossition: "0px -192px"
      },
    7: {//blast_up_end
        className: "blast",
        passable: true,
        bgPossition: "0px -96px"
      },
    8: {//blast_right_end
        className: "blast",
        passable: true,
        bgPossition: "0px -128px"
      },
    9: {//blast_down_end
        className: "blast",
        passable: true,
        bgPossition: "0px -160px"
      },
    10: {//blast_top_down
        className: "blast",
        passable: true,
        bgPossition: "0px -32px"
      },
    11: {//blast_left_right
        className: "blast",
        passable: true,
        bgPossition: "0px -64px"
      }
  };
  
  board.getDescriptionForType = function(typeNr){
    return board.getBoardValues()[typeNr];
  };
  board.getDescription = function(coords, possibleY){
    var x = coords, y = possibleY;
    if (typeof coords === "object"){
      x = coords[0];
      y = coords[1];
    }
    return board.getDescriptionForType(board[x][y]);
  };


  MyApp.utils.addCallback("keydown", MyApp.io.keyDown);
  MyApp.utils.addCallback("keyup", MyApp.io.keyUp);
}());