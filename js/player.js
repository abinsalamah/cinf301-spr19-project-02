/*
* Abdullah and Hassan
*
*/


// player class
function newPlayer() {
    return {
        hand: []
    };
}


async function mulligan(player, cardIds) {
    player.hand = player.hand.filter((x, id) => !cardIds.includes(id));

    player.hand.forEach(x => x.selected = false);

    render();
    
    await delay(animationDelay);

    while (player.hand.length < 5) {
        await delay(animationDelay);
        dealCard(game.deck, player.hand);
        render();
    }
}