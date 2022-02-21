
const gameBoard = (function () {

    let boardState = [0,1,2,3,4,5,6,7,8];

    return {boardState}
})();


const playerController = (function () {
    
    const playerList = [];
    
    const prepareGame = function (player1NameInput,player1Figure,player2NameInput) {

        let player1 = playerFactory(player1NameInput,player1Figure);
        playerList[0] = player1;

        let player2Figure;
        
        if (player1Figure == "X") {
            player2Figure = "O"
        } else {
            player2Figure = "X"
        }

        let player2 = playerFactory(player2NameInput,player2Figure);
        playerList[1] = player2;

        displayController.displayBoard();
    }


    const collectPlayerData = function (player1NameInput,player2NameInput) {

        let figureSelectionWindow = document.createElement("div");
        figureSelectionWindow.classList.add("figure-selection-window");

        let figureSelectionMessage = document.createElement("div");
        figureSelectionMessage.textContent = `${player1NameInput}, choose your figure:`
        figureSelectionWindow.appendChild(figureSelectionMessage);

        let figureSelection = document.createElement("div");
        figureSelection.classList.add("figure-selection");
        figureSelectionWindow.appendChild(figureSelection);

        let xOption = document.createElement("div");
        xOption.textContent = "X";
        figureSelection.appendChild(xOption);
        xOption.addEventListener('click',function () {
            let player1Figure = this.textContent;
            prepareGame(player1NameInput,player1Figure,player2NameInput);
        });

        let oOption = document.createElement("div");
        oOption.textContent = "O";
        figureSelection.appendChild(oOption);
        oOption.addEventListener('click',function () {
            let player1Figure = this.textContent;
            prepareGame(player1NameInput,player1Figure,player2NameInput);
        });

        const fluidContainer = document.getElementById("fluidContainer");
        fluidContainer.appendChild(figureSelectionWindow);
    };

    const playerFactory = function (playerName, playerFigure) {
        return {playerName, playerFigure}
    }

    return {collectPlayerData, playerList}

})();


const displayController = (function () {

    let currentPlayer;
    let winner;

    const submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click",newGame);

    const newGameButton = document.getElementById("new-game-button");
    newGameButton.addEventListener("click", () => {
        const newGameForm = document.getElementById("new-game-form");

        if (newGameForm.style.display == "flex") {
            newGameForm.style.display = "none";
            newGameForm.reset();
        } else {
            newGameForm.style.display = "flex"
        }

        const fluidContainer = document.getElementById("fluidContainer");
        while (fluidContainer.firstChild) {
            fluidContainer.firstChild.remove()
        }
    });



    function currentPlayerSelector () {

        if (currentPlayer == playerController.playerList[0]) {
            currentPlayer = playerController.playerList[1]
        } else {
            currentPlayer = playerController.playerList[0]
        }
    }


    const updateBoardState = function () {

        let index = this.dataset.index;

        currentPlayerSelector();

        gameBoard.boardState[index] = currentPlayer.playerFigure;
        this.removeEventListener('click',updateBoardState);
        displayController.displayBoard();

        winChecker();

        if (winner != undefined) {
            let cells = document.getElementsByClassName("board-cell");

            cells = Array.from(cells);

            cells.forEach(cell => {cell.removeEventListener('click',updateBoardState)})
        }
    }



    const winChecker = function () {

        let board = gameBoard.boardState;

        if (board[0] == board[1] && board[1] == board[2]) {
            winner = board[0];
        } else if (board[3] == board[4] && board[4] == board[5]) {
            winner = board[3];
        } else if (board[6] == board[7] && board[7] == board[8]) {
            winner = board[6];


        } else if (board[0] == board[3] && board[3] == board[6]) {
            winner = board[0];
        } else if (board[1] == board[4] && board[4] == board[7]) {
            winner = board[1];
        } else if (board[2] == board[5] && board[5] == board[8]) {
            winner = board[2];


        } else if (board[0] == board[4] && board[4] == board[8]) {
            winner = board[0];
        } else if (board[2] == board[4] && board[4] == board[6]) {
            winner = board[2];
        }



        if (winner != undefined) {
            if (winner == playerController.playerList[0].playerFigure) {
                winner = playerController.playerList[0]
            } else {
                winner = playerController.playerList[1]
            }

            if (playerController.playerList.includes(winner)) {
                        
                const fluidContainer = document.getElementById("fluidContainer");
            
                while (fluidContainer.firstChild) {
                    fluidContainer.firstChild.remove()
                }

                const victoryMessage = document.createElement("div");
                victoryMessage.textContent = `${winner.playerName} is the winner!`
                victoryMessage.classList.add("result-message")
                
                fluidContainer.appendChild(victoryMessage)

            }
        }


        if (winner == undefined) {
            let drawTest = board.filter(element => element != "O" && element != "X");
            if (drawTest.length == 0) {
                const fluidContainer = document.getElementById("fluidContainer");
            
                while (fluidContainer.firstChild) {
                    fluidContainer.firstChild.remove()
                }

                const drawMessage = document.createElement("div");
                drawMessage.textContent = "It's a draw!"
                drawMessage.classList.add("result-message")
                
                fluidContainer.appendChild(drawMessage);
            }
        }
    }



    function displayBoard () {
        
        const fluidContainer = document.getElementById("fluidContainer");
        
        while (fluidContainer.firstChild) {
            fluidContainer.firstChild.remove()
        }
            
        let boardContainer = document.createElement('div');
        boardContainer.classList.add('board-container');
        fluidContainer.appendChild(boardContainer);
        
        let index = 0;

        gameBoard.boardState.forEach( function(element) {
            let boardCell = document.createElement('div');
            boardCell.classList.add('board-cell');
            boardCell.dataset.index = index;
            index++;
            boardContainer.appendChild(boardCell);
            if (element == "X") {
                boardCell.textContent = "X"
                boardCell.style.color = "#EF4444"
            } else if (element == "O") {
                boardCell.textContent = "O"
                boardCell.style.color = "#3B82F6"
            }
            if (!(["X","O"].includes(element)))
            boardCell.addEventListener('click',updateBoardState)
            })
    }

    

    function newGame () {

        gameBoard.boardState = [0,1,2,3,4,5,6,7,8];
        currentPlayer = undefined;
        winner = undefined;

        const fluidContainer = document.getElementById("fluidContainer");
    
        while (fluidContainer.firstChild) {
            fluidContainer.firstChild.remove()
        }

        const newGameForm = document.getElementById("new-game-form");
        newGameForm.style.display = "none"

        playerController.collectPlayerData(player1NameInput.value,player2NameInput.value);
        newGameForm.reset();

    }
    
    return {displayBoard}
    })();
