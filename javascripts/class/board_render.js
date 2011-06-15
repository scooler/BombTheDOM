MyApp.renderBoard = function(board){ 
  var boardShadow; 

  var updateBoardElem = function(boardElem, x, y){ //TODO somewhat similar function in board_bombs
    var desc = board.getDescription(x, y);
    boardElem.className = desc.className
    boardElem.style.backgroundPosition = desc.bgPossition;
  }

  var createBoardDOM = function(){
    var boardElem = document.getElementById("board");
    var boardWidth = board.length;
    var boardHeight = board[0].length;
    var i,j;
    var trElem, tdElem;
    // var createElem = document.createElement;

    for (i = 0; i < boardHeight; i++){
      trElem = document.createElement("tr");
      for (j = 0; j < boardWidth; j++){
        tdElem = document.createElement("td");
        tdElem.id = j + "-" + i;
        updateBoardElem(tdElem, j, i);
        trElem.appendChild(tdElem);
      }
      boardElem.appendChild(trElem);
    }
  };

//first do stupid total repaint - than make shadow table
  board.repaint = function(){
    var i, j;
    var boardWidth = board.length;
    var boardHeight = board[0].length;
    var currentTR = document.getElementById("board").firstChild, currentTD = currentTR.firstChild;
    for (i = 0; i < boardHeight; i++){
      for (j = 0; j < boardWidth; j++){
        updateBoardElem(currentTD, j, i);
        currentTD = currentTD.nextSibling;
      }
      currentTR = currentTR.nextSibling;
      if (currentTR !== null){
        currentTD = currentTR.firstChild;
      }
    }
  };

  board.getElem = function(coords){//try if by id is faster - single access
    return document.getElementById("board").children[coords[1]].children[coords[0]];
  }

  MyApp.utils.addOnLoad(createBoardDOM);
};