const Gameboard = (function() {  
    const Player = () => {

    }

    const generateBoard = () => {
        let board = []
        const playArea = document.querySelector(".grid")
        for (i = 0; i < 9; i++) {
            let cls = ['tile', `a${[i]}`]
            let box = document.createElement("div")
            box.classList.add(...cls)
            board.push(box)
            playArea.append(board[i])
        }
    };
    return {
        generateBoard
    }
})();

const DisplayController = (function() {
    const hideHeader = (function() {
        document.querySelector('.gameSelect').classList.toggle('hidden')
    })
    const addListeners = (function() {
        const tiles = document.querySelectorAll(".tile")
        const playBtn = document.querySelector(".playBtn")
        playBtn.addEventListener("click", function() {
            hideHeader()
            Gameboard.generateBoard()
            addListeners()
        })
        const playAIBtn = document.querySelector(".playAIBtn")
        for (i = 0; i < tiles.length; i++) {
            tiles[i].addEventListener("click", function() {
                this.innerHTML = "X"
            })
        }
    });
    return {
        addListeners
    }
})();