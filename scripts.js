let player1, player2;

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

        return { name, icon }
    };

    const assignPlayer = () => {
        const p1Name = document.querySelector('#p1Name').value
        const p2Name = document.querySelector('#p2Name').value
        player1 = Player(p1Name, 'X')
        player2 = Player(p2Name, 'O')
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
        e.target.innerHTML = currentPlayer.icon
    };

    return {
        generateBoard,
        assignPlayer,
        player1,
        player2
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

    const setNameDisplay = (function() {
        document.querySelector('.p1Score').textContent = `${player1.name} : ${player1.icon}`;
        document.querySelector('.p2Score').textContent = `${player2.name} : ${player2.icon}`;
    })

    const addListeners = (function() {
        const tiles = document.querySelectorAll(".tile");
        const playBtn = document.querySelector(".playBtn");
        const submitBtn = document.querySelector('.submit');
        playBtn.addEventListener("click", function() {
            toggleHeader();
            toggleInputs();
        })

        const playAIBtn = document.querySelector(".playAIBtn");

        for (i = 0; i < tiles.length; i++) {
            tiles[i].addEventListener("click", function() {
                this.innerHTML = "X";
            })
        }

        submitBtn.addEventListener('click', function(e) {
            Gameboard.assignPlayer();
            toggleInputs();
            toggleGamespace();
            Gameboard.generateBoard();
            setNameDisplay();
            addListeners();
            e.preventDefault();
        })
    });


    return {
        addListeners
    }
})();