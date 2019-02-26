/*
* Abdullah and Hassan
*
*/

// poker js.


// The amount of delay used to visualize dealing the cards
const animationDelay = 200;

document.addEventListener("DOMContentLoaded", function() {
    initGame();
});

// The current game state
var game = null;

// Creates a new game object
function newGame() {
    return {
        deck: [],
        players: [],
        stage: 0,
        turn: 0
    };
}

// Call to initialize the game.
async function initGame() {
    game = newGame();

    game.players.push(newPlayer());
    game.players.push(newPlayer());

    render();
}

// Starts a new round, resetting all cards, the stage count and dealing 5 new ones to each player
async function initRound() {
    // Get new deck
    game.deck = getShuffledDeck();

    // Reset UI
    document.getElementById('instructions').removeAttribute('style');

    document.getElementById('displayAB').innerText = "Round 1";

    document.getElementById('button-1').setAttribute('disabled', 'disabled');
    document.getElementById('button-2').setAttribute('disabled', 'disabled');
    document.getElementById('start').setAttribute('disabled', 'disabled');

    // Reset game state
    for (var id in game.players) {
        game.players[id].hand.length = 0;
    }

    game.turn = 0;
    game.stage = 0;

    // Deal cards
    for (var id in game.players) {
        while (game.players[id].hand.length < 5) {
            await delay(animationDelay);
            dealCard(game.deck, game.players[id].hand);
            render();
        }
    }

    render();

    // Enable controls to start playing
    document.getElementById('start').removeAttribute('disabled');
    document.getElementById('button-1').removeAttribute('disabled');
}

// Puts top card of the deck into given array
function dealCard(deck, cardContainer) {
    cardContainer.push(deck.pop());
}

// Discards all selected cards for new cards and passes the turn to the next player
// Also ends the game if the third stage has been reached (aka each player had 3 chances
// to mulligan).
async function playerNext(playerId) {
    document.getElementById('button-1').setAttribute('disabled', 'disabled');
    document.getElementById('button-2').setAttribute('disabled', 'disabled');

    // Replace the selected cards with new ones
    await mulligan(game.players[playerId], game.players[playerId].hand.filter(x => x.selected).map(x => game.players[playerId].hand.indexOf(x)));

    // Pass turn and increase stage count by one if every player had their turn
    game.turn += 1;

    if (game.turn === game.players.length) {
        game.stage += 1;
        game.turn -= game.players.length;
    }

    // End game if stage is 3
    if (game.stage === 3) {
        var scores = game.players.map(x => rankCards(x.hand));

        let highScores = scores.filter(x => x == max(scores));
        
        var rankingName = "High Card";

        if (highScores[0] === 1000)    rankingName = "Royal Flush";
        else if (highScores[0] >= 900) rankingName = "Straight Flush";
        else if (highScores[0] >= 800) rankingName = "Four of a Kind";
        else if (highScores[0] >= 700) rankingName = "Full House";
        else if (highScores[0] >= 600) rankingName = "Flush";
        else if (highScores[0] >= 500) rankingName = "Straight";
        else if (highScores[0] >= 400) rankingName = "Three of a Kind";
        else if (highScores[0] >= 300) rankingName = "Two Pair";
        else if (highScores[0] >= 200) rankingName = "Pair";

        if (highScores.length == 2) {
            document.getElementById('displayAB').innerText = "Draw! " + rankingName + "!";
        }
        else {
            if (max(scores) === scores[0]) {
                document.getElementById('displayAB').innerText = document.getElementById('name-1').value + " wins! " + rankingName + "!";
            }
            else {
                document.getElementById('displayAB').innerText = document.getElementById('name-2').value + " wins! " + rankingName + "!";
            }
        }

        return;
    }
    else {
        document.getElementById('displayAB').innerText = "Round " + (game.stage + 1);
    }

    render();
    
    document.getElementById('button-' + (game.turn + 1)).removeAttribute('disabled');
}