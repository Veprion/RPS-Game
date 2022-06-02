let level = 1;
let match = 1;
let upgraderPhase = false;
let endgame = false;
let outcome = 0;

let opt = ["rock", "paper", "scissors"];

let R = {
    move: "",
    count: 0
};

let P = {
    "rock": 0,
    "paper": 0,
    "scissors": 0
};

let C = {
    "rock": 0,
    "paper": 0,
    "scissors": 0
};

const rock = document.getElementById("b0");
const paper = document.getElementById("b1");
const scissors = document.getElementById("b2");
const newGame = document.getElementById("newgame");
const battleF = document.getElementById("p0");

rock.addEventListener("click", () => play("rock"));
paper.addEventListener("click", () => play("paper"));
scissors.addEventListener("click", () => play("scissors"));
newGame.addEventListener("click", () => setNewGame());

function play(pgMove) {
    debugger
    if (endgame) return;
    if (pgMove == R.move && R.count == 3) return;
    let pcMove = opt[Math.floor(Math.random()*3)];
    if (upgraderPhase) {
        P[pgMove]++;
        switch (pgMove) {
            case "rock":
                document.getElementById("pr").value = P[pgMove];
                break;
            case "paper": 
                document.getElementById("pp").value = P[pgMove];
                break;
            case "scissors": 
                document.getElementById("ps").value = P[pgMove];
                break;
        }
        upgraderPhase = !upgraderPhase;
        return;
    } else {
        vs(pgMove, P[pgMove], pcMove, C[pcMove]);
        setImag(pgMove, pcMove);
        switch(outcome) {
            case 0:
                if (level == 4 && match == 1) {
                   if (P["rock"] != 0 && P["paper"] != 0 && P["scissors"] != 0) 
                        setEndGame(true);
                    else
                        setEndGame(false);
                    return; 
                }
                upgraderPhase = !upgraderPhase;
                break;
            case 1: 
                if (level == 4 && match == 1) { 
                    if (P["rock"] != 0 && P["paper"] != 0 && P["scissors"] != 0) 
                        setEndGame(true);
                    else
                        setEndGame(false);
                    return; 
                }
                break;
            case 2: 
                setEndGame(false);
                return;
        }
    }
    updateGUI();
    match++;
    if (match == 4) {
        match = 1;
        level++;
        C["rock"]++;
        C["paper"]++;
        C["scissors"]++;
    }
    if (pgMove == R.move) 
        R.count++;
    else {
        R.move = pgMove;
        R.count = 1;
    }
}

function vs(pgMove, pv, pcMove, cv) {
    if (pgMove == pcMove) {
        //skip
    } else if ((pgMove == "rock" && pcMove == "scissors") || (pgMove == "paper" && pcMove == "rock") || (pgMove == "scissors" && pcMove == "paper")) {
        pv++;
    } else { cv++ };

    if (pv > cv)
        outcome = 0;
    else if (pv == cv)
        outcome = 1;
    else 
        outcome = 2;
}

function setImag(pgMove, pcMove) {
    if (pgMove == "rock" && pcMove == "rock" && outcome == 0) battleF.src = "img/rvr-w.png";
    if (pgMove == "rock" && pcMove == "rock" && outcome == 1) battleF.src = "img/rvr-t.png";
    if (pgMove == "rock" && pcMove == "rock" && outcome == 2) battleF.src = "img/rvr-l.png";

    if (pgMove == "rock" && pcMove == "paper" && outcome == 0) battleF.src = "img/rvp-w.png";
    if (pgMove == "rock" && pcMove == "paper" && outcome == 1) battleF.src = "img/rvp-t.png";
    if (pgMove == "rock" && pcMove == "paper" && outcome == 2) battleF.src = "img/rvp-l.png";

    if (pgMove == "rock" && pcMove == "scissors" && outcome == 0) battleF.src = "img/rvs-w.png";
    if (pgMove == "rock" && pcMove == "scissors" && outcome == 1) battleF.src = "img/rvs-t.png";
    if (pgMove == "rock" && pcMove == "scissors" && outcome == 2) battleF.src = "img/rvs-l.png";

    if (pgMove == "paper" && pcMove == "rock" && outcome == 0) battleF.src = "img/pvr-w.png";
    if (pgMove == "paper" && pcMove == "rock" && outcome == 1) battleF.src = "img/pvr-t.png";
    if (pgMove == "paper" && pcMove == "rock" && outcome == 2) battleF.src = "img/pvr-l.png";

    if (pgMove == "paper" && pcMove == "paper" && outcome == 0) battleF.src = "img/pvp-w.png";
    if (pgMove == "paper" && pcMove == "paper" && outcome == 1) battleF.src = "img/pvp-t.png";
    if (pgMove == "paper" && pcMove == "paper" && outcome == 2) battleF.src = "img/pvp-l.png";

    if (pgMove == "paper" && pcMove == "scissors" && outcome == 0) battleF.src = "img/pvs-w.png";
    if (pgMove == "paper" && pcMove == "scissors" && outcome == 1) battleF.src = "img/pvs-t.png";
    if (pgMove == "paper" && pcMove == "scissors" && outcome == 2) battleF.src = "img/pvs-l.png";

    if (pgMove == "scissors" && pcMove == "rock" && outcome == 0) battleF.src = "img/svr-w.png";
    if (pgMove == "scissors" && pcMove == "rock" && outcome == 1) battleF.src = "img/svr-t.png";
    if (pgMove == "scissors" && pcMove == "rock" && outcome == 2) battleF.src = "img/svr-l.png";

    if (pgMove == "scissors" && pcMove == "paper" && outcome == 0) battleF.src = "img/svp-w.png";
    if (pgMove == "scissors" && pcMove == "paper" && outcome == 1) battleF.src = "img/svp-t.png";
    if (pgMove == "scissors" && pcMove == "paper" && outcome == 2) battleF.src = "img/svp-l.png";

    if (pgMove == "scissors" && pcMove == "scissors" && outcome == 0) battleF.src = "img/svs-w.png";
    if (pgMove == "scissors" && pcMove == "scissors" && outcome == 1) battleF.src = "img/svs-t.png";
    if (pgMove == "scissors" && pcMove == "scissors" && outcome == 2) battleF.src = "img/svs-l.png";
}

function setEndGame(victory) {
    const message = victory ? "You Win" : "You Lose"; 
    endgame = true;
    newGame.innerHTML = message + "<br />-^-v-^-<br />NewGame";
    updateGUI();
    return;
}

function setNewGame() {
    if (!endgame) return;
    battleF.src = "img/start.png";
    level = 1;
    match = 1;
    upgraderPhase = false;
    endgame = false;
    outcome = 0;
    P["rock"] = 0;
    P["paper"] = 0;
    P["scissors"] = 0;
    C["rock"] = 0;
    C["paper"] = 0;
    C["scissors"] = 0;
    newGame.innerHTML = "RPS-Game";
    updateGUI();
}

function updateGUI() {
    document.getElementById("lvl").value = "Level " + level;
    document.getElementById("mtc").value = "Match " + match;
    document.getElementById("pr").value = P["rock"];
    document.getElementById("pp").value = P["paper"];
    document.getElementById("ps").value = P["scissors"];
    document.getElementById("cr").value = C["rock"];
    document.getElementById("cp").value = C["paper"];
    document.getElementById("cs").value = C["scissors"];
}