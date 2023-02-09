let player1, player2, currentPlayer;

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
        return { name, icon };
    };

    const changePlayer = () => {
        (currentPlayer == player1) ? currentPlayer = player2 : currentPlayer = player1;
        
    };

    const assignPlayer = () => {
        const p1Name = document.querySelector('#p1Name').value;
        const p2Name = document.querySelector('#p2Name').value;
        player1 = Player(p1Name, 'X');
        player2 = Player(p2Name, 'O');
        currentPlayer = player1;
    };

    const showNameDisplay = () => {
        let p1Field = document.querySelector('#p1Score');
        console.log(p1Field);
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

    const inputIcon = (e) => {
        if (e.target.innerHTML != '') {
            return;
        } else {
            e.target.innerHTML = currentPlayer.icon;
        };
    };

    return {
        generateBoard,
        assignPlayer,
        inputIcon,
        changePlayer,
        showNameDisplay
    };
})();

const DisplayController = (function() {
    const toggleHeader = (function() {
        const gameSelect = document.getElementsByClassName("gameSelect");
        gameSelect[0].classList.toggle('hidden');
    });

    const toggleInputs = (function() {
        const inputCon = document.getElementsByClassName("input-con");
        inputCon[0].classList.toggle('hidden');
    });

    const toggleGamespace = (function() {
        const gameSpace = document.getElementsByClassName("gameSpace");
        gameSpace[0].classList.toggle('hidden');
    });

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
                Gameboard.inputIcon(e);
                Gameboard.changePlayer();
            });
        };

        submitBtn.addEventListener('click', function(e) {
            Gameboard.assignPlayer();
            toggleInputs();
            toggleGamespace();
            Gameboard.generateBoard();
            addListeners();
            e.preventDefault();
        });
    });
    return {
        addListeners
    }
})();