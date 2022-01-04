const ROWS = 5;
const CELL_PER_ROW = 5;
const HEROES =[
    {
        "name": "megaman",
        "url": "megaman.png"
    },
    {
        "name": "sonic",
        "url" : "sonic.png"
    }
]

$( document ).ready(function() {
    console.log('ready');
    setGameTable();
    setDropZones();
    loadHeroes();
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
        let tableRow = document.createElement("div");
        tableRow.classList.add('game_row');
        for(let j = 0; j < CELL_PER_ROW; j++){
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

function loadHeroes(){
    const gameDock = document.getElementById('gameDock');
    for(let i = 0; i < HEROES.length; i++){
        const heroHolder = document.createElement('div');
        heroHolder.classList.add('hero_holder');
        const heroImg = document.createElement('img');
        heroImg.classList.add('hero_img');
        heroImg.id = HEROES[i].name;
        heroImg.src = "images/"+HEROES[i].url;

        heroHolder.appendChild(heroImg);
        gameDock.appendChild(heroHolder);
        
        console.log(HEROES[i]);
    }

    const heroImgs = document.getElementsByClassName('hero_img');
    for(let i = 0; i < heroImgs.length; i++){
        heroImgs[i].addEventListener("dragstart", function(event){
            drag(event);
        });
    }
}