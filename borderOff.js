window.onload = function () {

    var stage = document.querySelector("#stage");

    var ctx = stage.getContext("2d");

    document.addEventListener("keydown", keyPush);

    var interval;

    function start() {
        interval = setInterval(game, 80);
    }

    start();

    const vel = 1;

    var vx = 0;
    var vy = 0;

    var px = 10;
    var py = 10;

    var tp = 20;

    var qp = 25;

    var ax = 15;
    var ay = 15;

    var trail = [];
    var tail = 5;

    var actualPontuation = document.querySelector("#actualPontuation");
    var maxPontuation = document.querySelector("#maxPontuation");

    function game() {

        //atualizando posição da cabeça da cobra:
        px += vx;
        py += vy;
        if (px < 0) {
            px = qp - 1;
        }
        if (px > qp - 1) {
            px = 0;
        }
        if (py < 0) {
            py = qp - 1;
        }
        if (py > qp - 1) {
            py = 0;
        }

        //retângulo referente à área de jogo/canvas:
        ctx.fillStyle = "black";
        ctx.rect(0, 0, stage.width, stage.height);
        ctx.fill();

        //tamanho e posição inicial da maçã
        ctx.fillStyle = "red";
        ctx.fillRect(ax * tp, ay * tp, tp, tp); //ao invés de colocar o
        //rect() e depois executar o preenchimento com o fill(), eu
        //já preenchi diretamente utilizando fillRect().

        //rastro da cobra
        ctx.fillStyle = "green";
        for (let i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);
            //definir que se a cabeça da cobra encontrar com o seu
            //rastro, o jogo acabará (dará game-over):
            if (trail[i].x == px && trail[i].y == py) {
                vx = 0;
                vy = 0;
                tail = 5;
                actualPontuation.innerText = 0;
            }
        }

        // alert("Game over" + "\n" + "your pontuation: " + tail)

        //fazendo com que o rastro da cobra se movimente junto com
        //a cabeça
        trail.push({ x: px, y: py, })

        //determinando que o rastro diminuirá caso se torne maior que 
        //a cauda
        while (trail.length > tail) {
            trail.shift();
        }

        //aumentando o tamanho da cauda conforme a cobra come as maçãs
        if (ax == px && ay == py) {
            tail++;
            //Alterando a posição da maçã de forma aleatória após a cobra 
            //come-la/passar por ela
            ax = Math.floor(Math.random() * qp);
            ay = Math.floor(Math.random() * qp);

            actualPontuation.innerText = tail - 5;

            if (tail - 5 >= maxPontuation.innerText) {
                maxPontuation.innerText = tail - 5;
            }
            else if (tail - 5 < maxPontuation.innerText) {
                maxPontuation.innerText = maxPontuation.innerText;
            }
            localStorage.setItem("saveData", maxPontuation.innerText);
        }
    }

    //usando if
    function keyPush(event) {

        var keyPressed = event.keyCode;

        if (keyPressed == 37) {
            if (vx == vel) {
                vx = vel;
                vy = 0;
            }
            else {
                vx = -vel;
                vy = 0;
            }
        }

        if (keyPressed == 39) {
            if (vx == -vel) {
                vx = -vel;
                vy = 0;
            }
            else {
                vx = vel;
                vy = 0;
            }
        }

        if (keyPressed == 38) {
            if (vy == vel) {
                vx = 0;
                vy = vel;
            }
            else {
                vx = 0;
                vy = -vel;
            }
        }

        if (keyPressed == 40) {
            if (vy == -vel) {
                vx = 0;
                vy = -vel;
            }
            else {
                vx = 0;
                vy = vel;
            }
        }
    }



    var slowest = document.querySelector("#slowest")
    var slow = document.querySelector("#slow")
    var normal = document.querySelector("#normal")
    var fast = document.querySelector("#fast")
    var fastest = document.querySelector("#fastest")

    slowest.addEventListener("click", function () {
        clearInterval(interval);
        interval = setInterval(game, 120);
        vx = 0;
        vy = 0;
        tail = 5;
        actualPontuation.innerText = 0;
        ax = Math.floor(Math.random() * qp);
        ay = Math.floor(Math.random() * qp);
    })

    slow.addEventListener("click", function () {
        clearInterval(interval);
        interval = setInterval(game, 100);
        vx = 0;
        vy = 0;
        tail = 5;
        actualPontuation.innerText = 0;
        ax = Math.floor(Math.random() * qp);
        ay = Math.floor(Math.random() * qp);
    })

    normal.addEventListener("click", function () {
        clearInterval(interval);
        interval = setInterval(game, 80);
        vx = 0;
        vy = 0;
        tail = 5;
        actualPontuation.innerText = 0;
        ax = Math.floor(Math.random() * qp);
        ay = Math.floor(Math.random() * qp);
    })

    fast.addEventListener("click", function () {
        clearInterval(interval);
        interval = setInterval(game, 60);
        vx = 0;
        vy = 0;
        tail = 5;
        actualPontuation.innerText = 0;
        ax = Math.floor(Math.random() * qp);
        ay = Math.floor(Math.random() * qp);
    })

    fastest.addEventListener("click", function () {
        clearInterval(interval);
        interval = setInterval(game, 40);
        vx = 0;
        vy = 0;
        tail = 5;
        actualPontuation.innerText = 0;
        ax = Math.floor(Math.random() * qp);
        ay = Math.floor(Math.random() * qp);
    })

}

var getData = localStorage.getItem("saveData");
maxPontuation.innerText = getData;
