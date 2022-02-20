

const gameBoard = (function () {

    let boardState = [0,1,2,3,4,5,6,7,8];

    return {boardState}
})();
// Gameboard object stores gameboard as an array.
// We only need one so its gotta be a module


const playerController = (function () {
    
    const playerList = []
    
    const prepareGame = function (player1NameInput,player1Figure,player2NameInput) {

        let player1 = playerFactory(player1NameInput,player1Figure);
        playerList.push(player1);

        let player2Figure;
        
        if (player1Figure == "X") {
            player2Figure = "O"
        } else {
            player2Figure = "X"
        }

        let player2 = playerFactory(player2NameInput,player2Figure);
        playerList.push(player2);

        displayController.displayBoard();
    }


    const collectPlayerData = function () {
        let player1NameInput = window.prompt("Player 1, enter your name: ");

        let player2NameInput = window.prompt("Player 2, enter your name: ");

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

        const main = document.querySelector("main");
        main.appendChild(figureSelectionWindow);
    };

    const playerFactory = function (playerName, playerFigure) {
        return {playerName, playerFigure}
    }
        // `${playerList[0].playerName} is playing as player 1 and has chosen ${playerList[0].player1Figure}.`

    return {collectPlayerData, prepareGame, playerList}

})();


const displayController = (function () {

    let currentPlayer;
    let winner;

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

            cells.forEach(cell => {cell.removeEventListener('click',updateBoardState)} )
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
            if (winner == playerController.playerList[0]) {
                winner = playerController.playerList[0]
            } else {
                winner = playerController.playerList[1]
            }

            if (playerController.playerList.includes(winner)) {
                alert(`The Winner is ${winner.playerName} !`)
                return winner;
            }
        }

        if (winner == undefined) {
            let drawTest = board.filter(element => element != "O" && element != "X");
            if (drawTest.length == 0) {
                winner = "nobody"
                alert("It's a draw!")
                return winner;
            }
        }
    }




    function displayBoard () {
        
        const main = document.querySelector("main");
        
        while (main.firstChild) {
            main.firstChild.remove()
        }
            
        let boardContainer = document.createElement('div');
        boardContainer.classList.add('board-container');
        main.appendChild(boardContainer);
        
        let index = 0;

        gameBoard.boardState.forEach( function(element) {
            let boardCell = document.createElement('div');
            boardCell.classList.add('board-cell');
            boardCell.dataset.index = index;
            index++;
            boardContainer.appendChild(boardCell);
            if (element == "X") {
                boardCell.textContent = "X"
            } else if (element == "O") {
                boardCell.textContent = "O"
            }
            if (!(["X","O"].includes(element)))
            boardCell.addEventListener('click',updateBoardState)
            })


    }
    
    return {displayBoard, currentPlayer}
    })();


    playerController.collectPlayerData();

// module used to control the flow of the game