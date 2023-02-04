alert("If you need to see the instructions again press CTRL+Shift+I. Enjoy 🏀");

console.log("Welcome to my software for keeping track of basketball stats!");
console.log("First enter the names of the players and their jersey numbers into the table and click the 'Add Players' button.");
console.log("So now whenever a player does an action you write his jersey number, followed by a comma and the stat reference and click 'Submit'. The stats table will update by itself.");
console.log("For example, if number 4 got a steal you would write: 4,s. Repeat this proces for all the stats.");
console.log("Here is an exhaustive list of all the stat references:");
console.table({
    "assist": "a",
    "block": "b",
    "steal": "s",
    "rebound": "r",
    "turnover": "tov",
    "2 pointer missed": "2pt:0",
    "2 pointer made": "2pt:1",
    "3 pointer missed": "3pt:0",
    "3 pointer made": "3pt:1",
    "free-throw missed": "ft:0",
    "free-throw made": "ft:1"
});
console.log("To close these instructions press CTRL+Shift+I. Enjoy 🏀");

let table;
let playersTable;
let playersArray = [];
let addButton;
let inputDiv;
let inputStat;
let applyStat;
let finalResult;
let finishBtn;

let addPlayersLock = false;
let updateStatsLock = true;

Player.prototype.checkStat = function(stat) {
    let statArray = stat.split(":");
    let isSuccess;

    if (statArray[1] == 1) {
        isSuccess = true;
    } else {
        isSuccess = false;
    }

    if (statArray[0] == "2pt") {
        this.fga++;
        totals.fga++

        if (isSuccess) {
            this.fgm++;
            totals.fgm++
            this.points+=2;
            totals.points+=2;
        }
    } else if (statArray[0] == "3pt") {
        this._3fga++;
        totals._3fga++;

        if (isSuccess) {
            this._3fgm++;
            totals._3fgm++;
            this.points+=3;
            totals.points+=3;
        }
    } else if (statArray[0] == "ft") {
        this.fta++;
        totals.fta++;

        if (isSuccess) {
            this.ftm++;
            totals.ftm++;
            this.points++;
            totals.points++;
        }
    } else if (statArray[0] == "a") {
        this.assists++;
        totals.assists++;
    } else if (statArray[0] == "tov") {
        this.turnovers++;
        totals.turnovers++;
    } else if (statArray[0] == "s") {
        this.steals++;
        totals.steals++;
    } else if (statArray[0] == "b") {
        this.blocks++;
        totals.blocks++;
    } else if (statArray[0] == "r") {
        this.rebounds++;
        totals.rebounds++;
    }
};

Player.prototype.getFGPercent = function() {
    if (!this.fga) return 0;
    this.fgPercent = this.fgm / this.fga * 100;
    return;
}

Player.prototype.get3FGPercent = function() {
    if (!this._3fga) return 0;
    this._3fgPercent = this._3fgm / this._3fga * 100;
    return;
}

Player.prototype.getFTPercent = function() {
    if (!this.fta) return 0;
    this.ftPercent = this.ftm / this.fta * 100;
    return;
}

let johnDoe = {
    name: "Name",
    number: "Number",
    points: "Points",
    assists: "Assists",
    rebounds: "Rebounds",
    steals: "Steals",
    blocks: "Blocks",
    turnovers: "Turnovers",
    fgm: "FGM",
    fga: "FGA",
    fgPercent: "%FG",
    _3fgm: "3FGM",
    _3fga: "3FGA",
    _3fgPercent: "%3FG",
    ftm: "FTM",
    fta: "FTA",
    ftPercent: "%FT"
};
playersArray.push(johnDoe);

window.onload = () => {
    playersTable = document.querySelector("#playersTable").children[0];
    addButton = document.querySelector("#addButton");
    inputDiv = document.querySelector("#inputDiv");
    inputStat = document.querySelector("#inputStat");
    applyStat = document.querySelector("#applyStat");
    finalResult = document.querySelector("#finalResult");
    finishBtn = document.querySelector('#finishBtn');
    
    playersTable.parentElement.onkeypress = (event) => {
        if (event.keyCode === 13) addPlayers();
    };
    inputStat.onkeypress = (event) => {
        if (event.keyCode === 13) updateStats();
    };
    addButton.addEventListener("click", addPlayers);
    applyStat.addEventListener("click", updateStats);
    
    finishBtn.addEventListener('click', ()=>{
        updateStatsLock = true;
        addButton.style ='display:none;';

        let workbook = XLSX.utils.table_to_book(finalResult);
        let ws = workbook.Sheets['Sheet1'];
        XLSX.writeFile(workbook, 'gameStats.xlsb');
    });
};

function addPlayers() {
    if (!addPlayersLock) {
        for ( let i = 1; i < 17; i++) {
            if (!playersTable.children[i]) {
                addButton.remove();
                addPlayersLock = true;
                updateStatsLock = false;

                // ! totals should be a global variable, so that it can be changed when stats are updated

                totals = new Player("Totals", "");
                playersArray.push(totals);

                generateResults();
                break;
            }

            let getPlayer = playersTable.children[i];
            let getPlayerName;
            let getPlayerJersey;
            for ( let j = 0; j < 2; j++) {
                if (j === 0) {
                    getPlayerName = getPlayer.children[j].children[0].value;
                } else {
                    getPlayerJersey = getPlayer.children[j].children[0].value;
                }
            }

            let player = new Player(getPlayerName, getPlayerJersey);
            playersArray.push(player);
        }
    }
}

function updateStats() {
    if (!updateStatsLock) {
        let input = inputStat.value;
        inputStat.value = "";

        let inputArray = input.split(",")

        let targetPlayerNumber = inputArray[0];
        let stat = inputArray[1];

        for ( let index in playersArray) {
            if (playersArray[index].number != targetPlayerNumber) {
                continue;
            }

            playersArray[index].checkStat(stat);
        }

        generateResults();
    }
}

function generateResults() {
    if (document.querySelector("#resultTable")) document.querySelector("#resultTable").remove();

    let table = document.createElement("table");
    table.setAttribute("id", "resultTable");
    
    for ( let player in playersArray) {
        let row = document.createElement("tr");
        if (playersArray[player].name !== "Name") {
            playersArray[player].getFGPercent();
            playersArray[player].get3FGPercent();
            playersArray[player].getFTPercent();
        }
        for ( let stat in playersArray[player]) {
            if (playersArray[player][stat] === playersArray[player].checkStat || 
                playersArray[player][stat] === playersArray[player].getFGPercent ||
                playersArray[player][stat] === playersArray[player].get3FGPercent ||
                playersArray[player][stat] === playersArray[player].getFTPercent) continue;
            
            let cell = document.createElement("td");
            cell.innerHTML = playersArray[player][stat];

            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    finalResult.appendChild(table);
}

function Player(name, number) {
    this.name = name;
    this.number = number;
    this.points = 0;
    this.assists = 0;
    this.rebounds = 0;
    this.steals = 0;
    this.blocks = 0;
    this.turnovers = 0;
    this.fgm = 0;
    this.fga = 0;
    this.fgPercent = 0;
    this._3fgm = 0;
    this._3fga = 0;
    this._3fgPercent = 0;
    this.ftm = 0;
    this.fta = 0;
    this.ftPercent = 0;
};