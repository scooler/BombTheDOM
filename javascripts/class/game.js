MyApp.game = (function(){
  var players = [];
  var createPlayers = function(){
    var playersNumer = MyApp.params.playersNumer;
    var playersPossitions = MyApp.board.getPlayersStartPossition();
    var i;
    for (i=0 ; i<playersNumer; i++){
      players.push(MyApp.player(playersPossitions[i][0], playersPossitions[i][1], i));
    }
    MyApp.io.setPlayers(players);
  };
  MyApp.utils.addOnLoad(createPlayers);

  MyApp.utils.addCallback("keydown", MyApp.io.keyDown);
  MyApp.utils.addCallback("keyup", MyApp.io.keyUp);

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
  
  var veryBasicBoard = function(){
    var result = [];
    result.getBoardValues = function(){
      return boardValues;
    }
    return result;
  };

  var board = MyApp.board(veryBasicBoard());
  // return {};
}());