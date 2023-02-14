let player1, player2, currentPlayer, winner;
let moveVal = [];

const DomVariables = (function(){
    const gameSelect = document.querySelector(".gameSelect");
    const inputCon = document.querySelector(".input-con");
    const gameSpace = document.querySelector(".gameSpace");
    const p1Score = document.querySelector('#p1Score');
    const p2Score = document.querySelector('#p2Score');
    const playBtn = document.querySelector(".playBtn");
    const submitBtn = document.querySelector('.submit');
    const playAIBtn = document.querySelector(".playAIBtn");
    const restartBtn = document.querySelector('.restart');

    return {
        gameSpace,
        p1Score,
        p2Score,
        playBtn,
        submitBtn,
        playAIBtn,
        restartBtn,
        inputCon,
        gameSelect,
    }
})();

const Gameboard = (function() {
    const Player = (function(name, icon) {
        name = function() {
            (player1) ? thisName = player1.name : null;
            (player2) ? thatName = player2.name : null;
            if (name == '' || name == undefined) {
                if (!player1 || !thisName) {
                    name = "Player 1";
                    return name;
                } else if (!player2 || !thatName) {
                    name = "Player 2";
                    return name;
                };
            } else {
                return name;
            };
        }();
        const moves = [];

        return { name, icon, moves };
    });
    
    const determineWinner = () => {
        const tiles = document.querySelectorAll('.tile');
        const filledTile = [];
        const moves = currentPlayer.moves;
        const winConditions = [
                ["a0", "a1", "a2"],
                ["a3", "a4", "a5"],
                ["a6", "a7", "a8"],
                ["a0", "a3", "a6"],
                ["a1", "a4", "a7"],
                ["a2", "a5", "a8"],
                ["a0", "a4", "a8"],
                ["a2", "a4", "a6"]
            ];
        tiles.forEach((tile) => {
            if (tile.textContent != '') {
                filledTile.push(tile.classList[1]);
            };
            if (filledTile.length == 9) {
                DisplayController.setWinner();
            };
        });

        winConditions.forEach((condition) => {
            for (let i = 0; i < moves.length; i++) {
                if (condition.includes(moves[i])) {
                    moveVal.push(moves[i]);
                };
            };
            if (moveVal.toString() == condition.toString() 
                && 
                filledTile.length < 9) {
                winner = currentPlayer;
                DisplayController.setWinner();
            }
            moveVal = [];
        });
    };

    const changePlayer = () => {
        if (winner) {
            return;
        } else if (currentPlayer == undefined) {
            currentPlayer = player1;
        } else if (currentPlayer == player1){
            currentPlayer = player2;
            DomVariables.p1Score.classList.toggle('highlight');
            DomVariables.p2Score.classList.toggle('highlight');
        } else if (currentPlayer == player2) {
            currentPlayer = player1;
            DomVariables.p2Score.classList.toggle('highlight');
            DomVariables.p1Score.classList.toggle('highlight')
        } else {
            currentPlayer = player1;
        };
    };

    const assignPlayer = () => {
        const p1Name = document.querySelector('#p1Name').value;
        const p2Name = document.querySelector('#p2Name').value;
        player1 = Player(p1Name, 'X');
        player2 = Player(p2Name, 'O');
        changePlayer();
        generateBoard();
        setNameDisplay();
    };

    const setNameDisplay = () => {
        DomVariables.p1Score.textContent = `${player1.name} : ${player1.icon}`;
        DomVariables.p2Score.textContent = `${player2.name} : ${player2.icon}`;
    };

    const generateBoard = () => {
        let board = [];
        const playArea = document.querySelector(".grid");
        for (i = 0; i < 9; i++) {
            let cls = ['tile', `a${[i]}`];
            let box = document.createElement("div");
            box.classList.add(...cls);
            board.push(box);
            playArea.append(board[i]);
        };
        DisplayController.addGridListeners();
    };

    return {
        assignPlayer,
        changePlayer,
        determineWinner,
        Player,
    };
})();

const DisplayController = (function() {

    const toggleHeader = (function() {
        DomVariables.gameSelect.classList.toggle('hidden');
    });

    const toggleInputs = (function() {
        DomVariables.inputCon.classList.toggle('hidden');
    });

    const toggleGamespace = (function() {
        DomVariables.gameSpace.classList.toggle('hidden');
    });

    const inputIcon = (e) => {
        let movesMade = e.target.classList[1];
        if (e.target.innerHTML != '' || winner) {
            return;
        } else {
            e.target.innerHTML = currentPlayer.icon;
            currentPlayer.moves.push(movesMade);
            currentPlayer.moves.sort();
        };
        Gameboard.determineWinner();
        Gameboard.changePlayer();
    };

    const setWinner = () => {
        let newDiv = document.createElement('div');
        if (winner) {
            newDiv.classList = 'won';
            newDiv.innerHTML = `${winner.name} WINS!`;
            DomVariables.gameSpace.append(newDiv);
        } else {
            newDiv.classList = 'won';
            newDiv.innerHTML = "It's a draw!";
            DomVariables.gameSpace.append(newDiv);
        }
    };

    const reset = () => {
        if (p2Score.classList[0]) {
            p2Score.classList.toggle('highlight');
            p1Score.classList.toggle('highlight');
        };
        let deleteDiv = document.querySelector('.won');
        player1 = undefined;
        player2 = undefined;
        winner = undefined;
        currentPlayer = undefined;
        if (deleteDiv) {
            deleteDiv.remove();
        };
        delete(winner,currentPlayer);
        document.querySelector('.grid').innerHTML = '';
        toggleGamespace();
        toggleInputs();
    };

    const addListeners = (function() {
        DomVariables.playBtn.addEventListener("click", function() {
            toggleHeader();
            toggleInputs();
        });

        DomVariables.submitBtn.addEventListener('click', function(e) {
            Gameboard.assignPlayer();
            toggleInputs();
            toggleGamespace();
            addGridListeners();
            e.preventDefault();
        });

    });

    const addGridListeners = (function() {
        const tiles = document.querySelectorAll(".tile");
        
        tiles.forEach((tile) => {
            tile.addEventListener("click", function(e) {
                inputIcon(e);
            });
        });
    });

    return {
        addListeners,
        addGridListeners,
        setWinner,
        reset
    }
})();


/*const changePlayer = () => {
    if (winner) {
        return;
    } else if (currentPlayer == undefined) {
        currentPlayer = player1;
        DomVariables.p1Score.classList.toggle('highlight');
    } else if (currentPlayer == player1){
        currentPlayer = player2;
        DomVariables.p1Score.classList.toggle('highlight');
        DomVariables.p2Score.classList.toggle('highlight');
    } else if (currentPlayer == player2) {
        currentPlayer = player1;
        DomVariables.p2Score.classList.toggle('highlight');
        DomVariables.p1Score.classList.toggle('highlight')
    };
};*/
