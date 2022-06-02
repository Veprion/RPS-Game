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
const specPR = document.getElementById("pr");
const specPP = document.getElementById("pp");
const specPS = document.getElementById("ps");
const specCR = document.getElementById("cr");
const specCP = document.getElementById("cp");
const specCS = document.getElementById("cs");
const pcs = document.getElementById("pcs");
const lvl = document.getElementById("lvl");
const mtc = document.getElementById("mtc");


rock.addEventListener("click", () => play("rock"));
paper.addEventListener("click", () => play("paper"));
scissors.addEventListener("click", () => play("scissors"));
newGame.addEventListener("click", () => setNewGame());

function play(pgMove) {
    if (endgame) return;
    if (!upgraderPhase && pgMove == R.move && R.count == 3) return;
    if (!upgraderPhase && match == 1 && level != 1)
        pcs.innerHTML = "PC Spec";
    let pcMove = opt[Math.floor(Math.random()*3)];
    if (upgraderPhase) {
        P[pgMove]++;
        switch (pgMove) {
            case "rock":
                specPR.value = P[pgMove];
                break;
            case "paper": 
                specPP.value = P[pgMove];
                break;
            case "scissors": 
                specPS.value = P[pgMove];
                break;
        }
        upgraderPhase = !upgraderPhase;
        setSpec();
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
                setSpec();
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
        if (level == 4) {
            lvl.value = "FINAL";
            mtc.value = "MATCH";
        }
        C["rock"]++;
        C["paper"]++;
        C["scissors"]++;
        pcs.innerHTML = "PC Spec<br />(+1 All Next Turn)";
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

function setSpec() {
    if (upgraderPhase) {
        specPR.style.backgroundColor = "aqua";
        specPP.style.backgroundColor = "aqua";
        specPS.style.backgroundColor = "aqua";
        specPR.style.color = "red";
        specPP.style.color = "red";
        specPS.style.color = "red";
    } else {
        specPR.style.backgroundColor = "black";
        specPP.style.backgroundColor = "black";
        specPS.style.backgroundColor = "black";
        specPR.style.color = "aqua";
        specPP.style.color = "aqua";
        specPS.style.color = "aqua";
    }
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
    R.move = "";
    R.count = 0;
    P["rock"] = 0;
    P["paper"] = 0;
    P["scissors"] = 0;
    C["rock"] = 0;
    C["paper"] = 0;
    C["scissors"] = 0;
    lvl.value = "Level 1";
    mtc.value = "Match 1";
    newGame.innerHTML = "RPS-Game";
    updateGUI();
}

function updateGUI() {
    if (lvl.value != "FINAL")
        lvl.value = "Level " + level;
    if (mtc.value != "MATCH")
        mtc.value = "Match " + match;
    specPR.value = P["rock"];
    specPP.value = P["paper"];
    specPS.value = P["scissors"];
    specCR.value = C["rock"];
    specCP.value = C["paper"];
    specCS.value = C["scissors"];
}