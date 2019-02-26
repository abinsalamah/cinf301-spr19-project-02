/*
* Abdullah and Hassan
*
*/


// ui : Contains UI functions to control the game

// Updates the displayed data
function render() {
    // Draw players
    for (let i = 0; i < game.players.length; i++) {
        document.getElementById('player-' + (i + 1)).classList.remove('playerTurn');

        let player = document.getElementById('hand-' + (i + 1));

        while (player.firstChild) {
            player.removeChild(player.firstChild);
        }
        
        game.players[i].hand.forEach((x, id) => addCardImage(player, x, i, id));
    }

    document.getElementById('player-' + (game.turn + 1)).classList.add('playerTurn');
}

// Appends a child <img> tag to the given element displaying a card
function addCardImage(element, cardObject, playerId = -1, cardNumber = -1) {
    let img = document.createElement('img');

    let cardName = "card_back";

    if (cardObject != null && cardObject != undefined && cardObject.visible) {
        cardName = cardObject.type + "_of_" + cardObject.color;
    }

    img.setAttribute('src', 'img/cards/' + cardName + '.png');
    img.classList.add('card');

    if (game.players[playerId].hand[cardNumber].selected) {
        img.classList.add('cardSelected');
    }

    if (playerId >= 0) {
        img.setAttribute('onmouseenter', 'cardMouseEnter(' + playerId + ', ' + cardNumber + ')');
        img.setAttribute('onmouseleave', 'cardMouseLeave(' + playerId + ', ' + cardNumber + ')');
        img.setAttribute('onclick', 'cardClicked(' + playerId + ', ' + cardNumber + ')');
    }

    element.appendChild(img);
}

function cardClicked(playerId, cardNumber) {
    if (game.turn != playerId) return;

    game.players[playerId].hand[cardNumber].selected = !game.players[playerId].hand[cardNumber].selected;

    render();
}

// Reveals the player card when the user hovers it.
function cardMouseEnter(playerId, cardNumber) {
    if (game.players[playerId].hand[cardNumber].visible) {
        return;
    }

    game.players[playerId].hand[cardNumber].visible = true;
    render();
}

// Hides the player card when the user leaves it.
function cardMouseLeave(playerId, cardNumber) {
    if (!game.players[playerId].hand[cardNumber].visible) {
        return;
    }

    game.players[playerId].hand[cardNumber].visible = false;
    render();
}