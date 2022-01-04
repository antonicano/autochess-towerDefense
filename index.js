const ROWS = 5;
const CELL_PER_ROW = 5;

$( document ).ready(function() {
    console.log('ready');
    setGameTable();
    setDropZones();
  });

  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

function setGameTable(){
    const gameTable = document.getElementById('gameTable');

    for(let i = 0; i < ROWS; i++){
        console.log('row');
        let tableRow = document.createElement("div");
        tableRow.classList.add('game_row');
        for(let j = 0; j < CELL_PER_ROW; j++){
            console.log('cell');
            let gameCell = document.createElement("div");
            gameCell.classList.add('game_cell');
            tableRow.appendChild(gameCell);
        }
        gameTable.appendChild(tableRow);
    }    
}

function setDropZones(){
    const gameCells = document.getElementsByClassName('game_cell');
    for(let i = 0; i < gameCells.length ; i++){
        gameCells[i].addEventListener("drop", function(event){
            drop(event);
        });

        gameCells[i].addEventListener("dragover", function(event){
            allowDrop(event);
        });
    }
    
}

function setDragZones(){

}