const ROWS = 10;
const CELL_PER_ROW = 10;

$( document ).ready(function() {
    console.log('ready');
    setTurn();
    setGameTable();
    setDropZones();
    loadHeroes();
    loadEnemies();
    getTurn();
  });

  function setTurn(){
      turn = 0;
      const turnDiv = document.getElementById('turn');
      turnDiv.innerHTML = 'Turno: ' + turn;
  }

  function getTurn(){
      console.log(turn);
      return turn;
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    const cell = document.getElementById(ev.target.id);
    if(cell && cell.nodeName !== 'IMG' && cell.children.length === 0){
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }
  }

function setGameTable(){
    const gameTable = document.getElementById('gameTable');

    for(let i = 0; i < ROWS; i++){
        let tableRow = document.createElement("div");
        tableRow.classList.add('game_row');
        tableRow.id = 'row_'+i;
        for(let j = 0; j < CELL_PER_ROW; j++){
            let gameCell = document.createElement("div");
            gameCell.classList.add('game_cell');
            gameCell.id = 'row_'+i+'_cell_'+j;
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
        heroImg.src = "images/heroes/"+HEROES[i].url;

        heroHolder.appendChild(heroImg);
        gameDock.appendChild(heroHolder);        
    }

    const heroImgs = document.getElementsByClassName('hero_img');
    for(let i = 0; i < heroImgs.length; i++){
        heroImgs[i].addEventListener("dragstart", function(event){
            drag(event);
        });
    }
}

function loadEnemies(){
    /**
     * Los enemigos pueden spawnear en cualquier cell de las primeras
     * 5 lineas es decir [0-4]
     */
    for(let i = 0; i < ENEMIES.length; i++){
        const enemieCell = canEnemieSpawn();
        if(enemieCell){
            console.log(enemieCell.children);
            const enemieImg = document.createElement('img');
            enemieImg.classList.add('hero_img');
            enemieImg.id = ENEMIES[i].name;
            enemieImg.src = "images/enemies/" + ENEMIES[i].url;
    
            enemieCell.appendChild(enemieImg);
        }

    }
}

function canEnemieSpawn(){
    const row = getRandomInt(0,4);
    const cell = getRandomInt(0,9);
    console.log(row, cell);
    //comprobamos que no hay un enemigo ahi. 
    const enemieCell = document.getElementById('row_'+row+'_cell_'+cell);
    if(enemieCell.children.length > 0){
        canEnemieSpawn();
    }else{
        return enemieCell;
    }
  }

function startGame(){
    match();
}

function match(){
    disableTable();
    heroesMovement();
    //timeout = setTimeout(enableTable, 3000);
}

function disableTable(){
    const gameTable = document.getElementById('gameTable');
    gameTable.classList.add('disabled_game_table');
}
function enableTable(){
    const gameTable = document.getElementById('gameTable');
    gameTable.classList.remove('disabled_game_table');
}

function heroesMovement(){
    for(let i = 0; i < HEROES.length; i++){  
        const hero = document.getElementById(HEROES[i].name);
        const currentHeroImg = hero.cloneNode(true);
        if(hero.parentElement.classList.contains('game_cell')){
            console.log(HEROES[i]);
            const idParentElement = hero.parentElement.id;
            const parsedIdElement = idParentElement.split('_');
            console.log(idParentElement);
            console.log(parsedIdElement);
            //tenemos enemigos en nuestro rango linea recta??
            //tenemos enemigos en nuestro rango rango diagonal (aun fuera de alcance)

            //nos podemos mover verticalmente?
            //Movimiento vertical
            let nextRow = parseInt(parsedIdElement[1]) - 1;
            if(nextRow >= 0){
                parsedIdElement[1] = nextRow;
                const newPosition = document.getElementById(parsedIdElement.join('_'));
                newPosition.appendChild(currentHeroImg);
                hero.remove();
            }

        }

        if(i === (HEROES.length-1)){
            console.log('acabar');
            this.matchStarted = false;
        }
    }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
