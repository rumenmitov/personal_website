let isFirstCard = true;
let currentCard = {
    card: "",
    location: ""
};
let points = 0;
let attempts = 0;

window.onload = function() {
    const field = document.getElementById("field");
    const makeCards = generateCards(field);
    const places = randomizeCards();
    setField(makeCards, places);
}

function generateCards(field) {
    for ( let i = 1; i < 7; i++ ) {
        if ( i === 1 ) {
            const row1 = document.createElement("tr");
            row1.setAttribute("id", "row1");
            field.appendChild(row1);

            const cell = document.createElement("td");
            cell.setAttribute("id", i);
            row1.appendChild(cell);
        } else if ( i === 4 ) {
            const row2 = document.createElement("tr");
            row2.setAttribute("id", "row2");
            field.appendChild(row2);

            const cell = document.createElement("td");
            cell.setAttribute("id", i);
            row2.appendChild(cell);
        } else if ( i < 4 ) {
            const cell = document.createElement("td");
            cell.setAttribute("id", i);
            row1.appendChild(cell);
        } else {
            const cell = document.createElement("td");
            cell.setAttribute("id", i);
            row2.appendChild(cell);
        }
    }

    const cells = [
        document.getElementById("1"),
        document.getElementById("2"),
        document.getElementById("3"),
        document.getElementById("4"),
        document.getElementById("5"),
        document.getElementById("6")
    ];

    return cells;
}

function randomizeCards() {
    const cards = [ "knight", "knight", "princess", "princess", 
                    "dragon", "dragon" ];
    const places = [];

    let count = 6;
    for ( let i = 0; i < 6; i++) {
        let rand = function() { return Math.floor(Math.random() * count); };
        const getRandomNumber = rand();
        places[i] = cards[getRandomNumber];
        cards.splice(getRandomNumber, 1);
        count-=1;
    }
    console.log(places);
    return places;
}

function setField(makeCards, places) {
    for ( let i = 0; i < makeCards.length; i++ ) {
        makeCards[i].addEventListener("click", function() {
            makeCards[i].setAttribute("class", places[i]);

            if (isFirstCard) {
                currentCard.card = places[i];
                currentCard.location = makeCards[i];
                console.log(currentCard.location);
                isFirstCard = false;
            } else {

                if (currentCard.card !== places[i]) {
                    setTimeout(hide, 1000, makeCards[i], currentCard.location);
                } else {
                    points += 1;
                }
                currentCard.card = "";
                currentCard.location = "";
                attempts +=1;
                isFirstCard = true;

                if (points === 3) {
                    const result = document.getElementById("result");
                    result.style.display = "block";
                    result.innerHTML = "Congrats! You scored: " + 
                    Math.floor((points/attempts)*100) + " points!<br>Now go and celebrate by clicking the button below!";

                    const button = document.createElement("button");
                    button.innerText = "Celebrate!"
                    button.setAttribute("id", "celebrateButton");
                    result.appendChild(button);

                    const celebrateButton = document.getElementById("celebrateButton");
                    celebrateButton.addEventListener("click", function() {
                        location.href = "youWin.html";
                    }, false);
                    
                }
            }
        }, false);
    }

    function hide(card, previous) {
        card.setAttribute("class", "unknown");
        console.log(previous);
        previous.setAttribute("class", "unknown");
    }
}

