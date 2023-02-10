let player1, player2, currentPlayer, winner;

const Gameboard = (function() {
    const Player = (name, icon) => {
        name = (() => {
            if (player1 == undefined && !name) {
                return "Player 1";
            } else if (player1 != undefined && !name) {
                return "Player 2";
            } else {
                return name;
            }
        })();
        let moves = [];

        return { name, icon, moves };
    };
    
    const determineWinner = () => {
        let moves = Array(currentPlayer.moves);
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
        winConditions.forEach((condition) => {
            if (condition.toString() == moves.toString()) {
                winner = currentPlayer;
            }
        });
    };

    const changePlayer = () => {
        const p1Score = document.querySelector('#p1Score')
        const p2Score = document.querySelector('#p2Score')
        if (currentPlayer == undefined) {
            currentPlayer = player1;
            p1Score.classList.toggle('highlight');
        } else if (currentPlayer == player1){
            currentPlayer = player2;
            p1Score.classList.toggle('highlight');
            p2Score.classList.toggle('highlight');
        } else if (currentPlayer == player2) {
            currentPlayer = player1;
            p2Score.classList.toggle('highlight');
            p1Score.classList.toggle('highlight')
        }
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
        document.querySelector("#p1Score").textContent = `${player1.name} : ${player1.icon}`;
        document.querySelector("#p2Score").textContent = `${player2.name} : ${player2.icon}`;
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
        }
    };

    return {
        assignPlayer,
        changePlayer,
        determineWinner
    };
})();

const DisplayController = (function() {

    const toggleHeader = (function() {
        document.querySelector(".gameSelect").classList.toggle('hidden');
    });

    const toggleInputs = (function() {
        document.querySelector(".input-con").classList.toggle('hidden');
    });

    const toggleGamespace = (function() {
        document.querySelector(".gameSpace").classList.toggle('hidden');
    });

    const inputIcon = (e) => {
        let movesMade = e.target.classList[1]
        if (e.target.innerHTML != '') {
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
        if (winner) {
            
        }
    }

    const addListeners = (function() {
        const tiles = document.querySelectorAll(".tile");
        const playBtn = document.querySelector(".playBtn");
        const submitBtn = document.querySelector('.submit');
        playBtn.addEventListener("click", function() {
            toggleHeader();
            toggleInputs();
        });

        const playAIBtn = document.querySelector(".playAIBtn");

        for (i = 0; i < tiles.length; i++) {
            tiles[i].addEventListener("click", function(e) {
                inputIcon(e);
            });
        };

        submitBtn.addEventListener('click', function(e) {
            Gameboard.assignPlayer();
            toggleInputs();
            toggleGamespace();
            addListeners();
            e.preventDefault();
        });
    });
    return {
        addListeners
    }
})();