var JogoDaVelha = function() {
    var canvas = document.getElementById("tabuleiro");
    var ctx = canvas.getContext("2d");
    var isX = true;
    var numRound = 0;
    var jogo = new Array();

    this.start = function() {
        for (i=0;i<3;i++) {
            jogo[i] = new Array();
            for (j=0; j< 3; j++) {
                jogo[i][j]=0;
            }
        }

        clear();
        drawBoard();

        canvas.addEventListener("mousedown", onclick, false);
    };

    this.restart = function() {
        clear();
        this.start();
    };

    var clear = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.removeEventListener("mousedown", onclick, false);
    }

    var onclick = function(e) {
        let x = e.clientX;
        let y = e.clientY;
        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;

        let pos = getArea(x, y);
        if (jogo[pos[0]][pos[1]] == 0) {
            numRound++;
            var posDraw = posToDraw(pos);
            if (isX) {
                jogo[pos[0]][pos[1]] = 1;
                drawX(posDraw[0], posDraw[1]);
                isX = false;
            } else {
                jogo[pos[0]][pos[1]] = 2;
                drawCircle(posDraw[0], posDraw[1]);
                isX = true;
            }

            if (hasWinner(jogo)) {
                alert("There is a winner");
            } else if (numRound == 9) {
                alert("The game ends");
            }
        }
    }

    var drawBoard = function() {
        ctx.save();

        ctx.beginPath();
        ctx.moveTo(canvas.width/3, 0);
        ctx.lineTo(canvas.width/3, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvas.width/3*2, 0);
        ctx.lineTo(canvas.width/3*2, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvas.width/3*2, 0);
        ctx.moveTo(0, canvas.height/3);
        ctx.lineTo(canvas.width, canvas.height/3);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, canvas.height/3*2);
        ctx.lineTo(canvas.width, canvas.height/3*2);
        ctx.stroke();

        ctx.restore();
    };
    
    var drawX = function(x, y) {
        ctx.save();

        ctx.beginPath();
        ctx.moveTo(x - 20, y - 20);
        ctx.lineTo(x + 20, y + 20);
        ctx.moveTo(x + 20, y - 20);
        ctx.lineTo(x - 20, y + 20);
        ctx.closePath();

        ctx.lineWidth = 15;
        ctx.strokeStyle = '#ff0000';
        ctx.stroke();

        ctx.restore();
    }

    var drawCircle = function(x, y) {
        ctx.save();

        ctx.beginPath();
        ctx.arc(x,y,20,0,2*Math.PI);
        ctx.closePath();

        ctx.lineWidth = 15;
        ctx.strokeStyle = '#000';
        ctx.stroke();

        ctx.restore();
    }

    function hasWinner(jogo) {
        if ( (jogo[0][0] == jogo[0][1] && jogo[0][1] == jogo[0][2] && jogo[0][0] != 0)
        || (jogo[1][0] == jogo[1][1] && jogo[1][1] == jogo[1][2] && jogo[1][0] != 0)
        || (jogo[2][0] == jogo[2][1] && jogo[2][1] == jogo[2][2] && jogo[2][0] != 0)
        || (jogo[0][0] == jogo[1][0] && jogo[1][0] == jogo[2][0] && jogo[0][0] != 0)
        || (jogo[0][1] == jogo[1][1] && jogo[1][1] == jogo[2][1] && jogo[0][1] != 0)
        || (jogo[0][2] == jogo[1][2] && jogo[1][2] == jogo[2][2] && jogo[0][2] != 0)
        || (jogo[0][0] == jogo[1][1] && jogo[1][1] == jogo[2][2] && jogo[0][0] != 0)
        || (jogo[2][0] == jogo[1][1] && jogo[1][1] == jogo[0][2] && jogo[2][0] != 0)
        ) {
            return true;
        }

        return false;
    }

    function posToDraw(pos) {
        var posDraw = [];

        posDraw[0] = canvas.width / 3 / 2;
        if (pos[0] == 1) {
            posDraw[0] = 3 * posDraw[0];
        } else if (pos[0] == 2) {
            posDraw[0] = 5 * posDraw[0];
        }

        posDraw[1] = canvas.height / 3 / 2;
        if (pos[1] == 1) {
            posDraw[1] = 3 * posDraw[1];
        } else if (pos[1] == 2) {
            posDraw[1] = 5 * posDraw[1];
        }

        return posDraw;
    }

    function getArea(x, y) {
        let pos = [];
        if (x < canvas.width/3) {
            pos[0] = 0;
        } else if (x < canvas.width/3*2) {
            pos[0] = 1;
        } else if (x < canvas.width) {
            pos[0] = 2;
        }

        if (y < canvas.height/3) {
            pos[1] = 0;
        } else if (y < canvas.height/3*2) {
            pos[1] = 1;
        } else if (y < canvas.height) {
            pos[1] = 2;
        }

        return pos;
    }
}
