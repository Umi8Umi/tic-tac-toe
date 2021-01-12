document.addEventListener("DOMContentLoaded", function(event) {
    
    ///////////////////////////////////
    // SETUP
    //
    // const grid = [[ 0, 0, 0], 
    //               [ 0, 0, 0],  
    //               [ 0, 0, 0]];
    ///////////////////////////////////
    const newGame = document.getElementsByName('newGame')[0];
    newGame.style.display = "none";
    const currentTurn = document.getElementById("currentTurn");
    currentTurn.style.display = "none";
    var turn = 1;
    var M = 3;
    var N = 3;
    var btnID = 0;
    var gridContainer = document.getElementById("grid-container");
    for (var i = 0; i < M; i++) { 
      for (var j = 0; j < N; j++) {
        var btn = document.createElement("button");
        btn.setAttribute("name", "grid-btn");
        btn.id = btnID;
        btnID++;
        gridContainer.appendChild(btn);
      }
    }

    //////////////////////////////
    // player icon choosing flow
    /////////////////////////////
    var player1_icon = ""
    var player2_icon = ""
    const player1_div = document.getElementById("player1_div"); 
    const player2_div = document.getElementById("player2_div");
    const board = document.getElementById("grid-container");
    player2_div.style.display="none";
    board.style.display="none";
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");
    var index = -1;
    player1.addEventListener("click", function(){
        var radios = document.getElementsByName('player1_icon');
        for (var i = 0, length = radios.length; i < length; i++) {
          if (radios[i].checked) {
            index = i;
            player1_icon = radios[i].value;
            break;
          }
        }
        player2_div.style.display="flex"
        player1_div.style.display="none"
        if(index == 1)
            document.getElementsByName('player2_icon')[2].checked = true;
        document.getElementsByName('player2_icon')[index].disabled = true;
    }, false);
    player2.addEventListener("click", function(){
        board.style.display="inline-grid"
        player2_div.style.display="none"
        currentTurn.style.display="inline-block";
        currentTurn.src = player1_icon;
        var radios = document.getElementsByName('player2_icon');
        for (var i = 0, length = radios.length; i < length; i++) {
          if (radios[i].checked) {
            player2_icon = radios[i].value;
            break;
          }
        }
    }, false);
    
    //////////////////////////////
    // player moves
    /////////////////////////////
    const winCombo = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ]

    var results = "";
    var buttons = document.getElementsByName('grid-btn');
    for (var i = 0, len = buttons.length; i < len; i++) {
        buttons[i].addEventListener('click', function (){
            var move = document.createElement("img");
            move.setAttribute("width", "125px");
            if (turn%2 == 0) {
                move.setAttribute("src", player2_icon);
                this.appendChild(move);
                this.value = "p2"
                currentTurn.setAttribute("src", player1_icon);
            }
            else {
                move.setAttribute("src", player1_icon);
                this.appendChild(move);
                this.value = "p1"
                currentTurn.setAttribute("src", player2_icon);
            }
            this.disabled = true;
            turn++;
            var btns = document.getElementsByName('grid-btn');
            for (const combo of winCombo){
                const [a, b, c] = combo;
                var a_btn = document.getElementById(a);
                var b_btn = document.getElementById(b);
                var c_btn = document.getElementById(c);
                if (a_btn.value && b_btn.value && c_btn.value &&(a_btn.value === b_btn.value && a_btn.value === c_btn.value)){
                    a_btn.setAttribute("style", "background-color: #EEC5FF;");
                    b_btn.setAttribute("style", "background-color: #EEC5FF;");
                    c_btn.setAttribute("style", "background-color: #EEC5FF;");
                    for (var i = 0, len = btns.length; i < len; i++) {
                        btns[i].disabled = true;
                    }
                    if(a_btn.value === "p1")
                        document.getElementById("results").innerHTML = "Player 1 WON :)";
                    if(a_btn.value === "p2")
                        document.getElementById("results").innerHTML = "Player 2 WON :)";
                    newGame.style.display = "block";
                    results = "winner";
                    break;
                }
            }
            if(results === ""){
                var tieGame = 0;
                for (var i = 0, len = btns.length; i < len; i++) {
                    if(btns[i].value === "p1" || btns[i].value === "p2")
                        tieGame++;
                }
                if(tieGame === 9){
                    document.getElementById("results").innerHTML = "it's a tie !";
                    newGame.style.display = "block";
                }
            }
        }, false);
    }

    //////////////////////////////
    // New Game
    /////////////////////////////
    newGame.addEventListener('click', function (){
        location.reload();
    }, false);

}, false);