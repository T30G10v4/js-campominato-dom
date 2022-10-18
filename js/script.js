const squareGrid = document.querySelector(".square-grid");

const squares = document.getElementsByClassName("square");

const goButton = document.getElementById("start");

const difficulty = document.getElementById("difficulty");

const numberOfBombs = 16;

let arrayBombs = [];

let trys = 0;

let onGame = true;

goButton.addEventListener("click", function() {

    squareGrid.innerHTML = "";
    onGame = true;
    arrayBombs = [];
    trys = 0;

    makeArrayBomb(numberOfBombs, parseInt(difficulty.value));
    
    if (difficulty.value === "100") {

        makeGrid(squareGrid, 10);

    } else if (difficulty.value === "81") {

        makeGrid(squareGrid, 9);

    } else if (difficulty.value === "49") {

        makeGrid(squareGrid, 7);

    }

});

/**
 * Description Funzione che costruisce la griglia di numeri
 * @param {any} HTMLElement , Elemento HTML all'interno del quale deve essere costruita la griglia
 * @param {number} squaresNumber , Numero di elementi in una riga (10, 9, 7)
 * @returns {void}
 */
function makeGrid (HTMLElement, squaresNumber) {

    squaresIterations = squaresNumber * squaresNumber;

    for (let i = 1; i<=squaresIterations; i++) {

        const square = document.createElement("div");
        square.innerHTML = i;
        squareDynamicClass = "square"+squaresNumber.toString();
        square.classList.add("square", squareDynamicClass, "flex-row-center-center");
        square.addEventListener("click", onSquareClick);        
        HTMLElement.append(square);

    }
}

function onSquareClick() {

   
    
    if(arrayBombs.includes(parseInt(this.innerHTML))) {

        
        if(onGame) {
            this.classList.add("bg-red");
            onGame = false;
           
        }    

    }
    
    if (onGame) {

        if (this.classList.length<4) {

            this.classList.add("bg-azure");
            trys++; 
        }
        
    } else {

        for(let i = 1; i <= parseInt(difficulty.value); i++) {

            const squareValue = squares[i-1].innerHTML;

            console.log(squareValue);

            if (arrayBombs.includes(parseInt(squareValue))) {

                squares[i-1].classList.add("bg-red");

            }


        }

    }
    

}

function makeArrayBomb(bombs, limit) {

    while (arrayBombs.length<bombs) {

        const bomb = getRndInteger(1, limit);

        if (arrayBombs.includes(bomb)) {

            continue;

        } else {

            arrayBombs.push(bomb);

        }

    }

}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }