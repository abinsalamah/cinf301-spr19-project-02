const cardTypes = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "jack",
    "queen",
    "king",
    "ace"
];

const cardColors = [
    "clubs",
    "diamonds",
    "hearts",
    "spades"
];

// file name of the card back image
const cardBackName = "card_back";

// Re-fill deck with all cards and shuffle
function getShuffledDeck() {
    let deck = [];

    for (let i = 0; i < cardColors.length; i++) {
        for (let j = 0; j < cardTypes.length; j++) {
            deck.push({
                color: cardColors[i],
                type: cardTypes[j],
                visible: false,
                selected: false
            });
        }
    }

    return shuffle(deck);
}

// Returns a numeric value of a players hand. Can be used to compare who won.
function rankCards(cards) {
    // Royal flush
    let c = cardColors.map(x => cards.filter(y =>
        (y.type == "ace" ||
        y.type == "king" ||
        y.type == "queen" ||
        y.type == "jack" ||
        y.type == "10") &&
        y.color == x));

    if (c.find(x => x.length == 5) != undefined) {
        return 1000;
    }

    // Straight Flush
    c = cards
    .map(x => {
            return {
                card: x,
                value: cardTypes.indexOf(x.type)
            }
        })
        .sort((first, second) => first.value - second.value);

    let lastValue = -1;
    let consecutiveCards = 0;

    for (let i = 0; i < c.length; i++) {
        x = c[i];

        if (lastValue + 1 == x.value) {
            consecutiveCards++;
        }
        else {
            consecutiveCards = 1;
        }

        if  (consecutiveCards == 5) {
            let road = c.slice(i - 4, i + 1);
            
            if (road.length == 5 && road.length === road.filter(x => x.type === road[0].type).length) {
                return 900;
            }
        }
    }

    // Alternative straight flush
    c = cardColors.map(x => cards
        .filter(y =>
            (y.type == "ace" ||
            y.type == "2" ||
            y.type == "3" ||
            y.type == "4" ||
            y.type == "5") &&
            y.color == x));

    if (c.find(x => x.length == 5) != undefined) {
        return 900;
    }

    // Four of a kind
    if (cardTypes
        .map(x => cards.filter(y => y.type == x).length)
        .find(x => x == 4) != undefined)
    {
        return 800;
    }

    // Full house
    let typeCount = cardTypes.map(x => cards.filter(y => y.type == x).length);

    if (typeCount.find(x => x == 2) != undefined &&
        typeCount.find(x => x == 3) != undefined)
    {
        return 700;
    }

    // Flush
    cardsByColor = cardColors.map(x => cards.filter(y => y.color == x));

    let flush = cardsByColor.find(x => x.length >= 5);

    if (flush != undefined) {
        // Highest card increases value of the flush
        let maxValue = max(flush.map(x => cardTypes.indexOf(x.type)));
            
        return 600 + maxValue;
    }

    // Straight
    c = cards
        .map(x => {
            return {
                card: x,
                value: cardTypes.indexOf(x.type)
            }
        })
        .sort((first, second) => first.value - second.value);

    lastValue = -1;
    consecutiveCards = 0;

    for (let i = 0; i < c.length; i++) {
        x = c[i];

        if (lastValue + 1 == x.value) {
            consecutiveCards++;
        }
        else {
            consecutiveCards = 1;
        }

        if  (consecutiveCards == 5) {
            let road = c.slice(i - 4, i + 1);

            return 500 + (max(road.map(x => cardTypes.indexOf(x.type))));
        }
    }

    // Alternative straight
    c = cards.filter(x =>
        x.type == "ace" ||
        x.type == "2" ||
        x.type == "3" ||
        x.type == "4" ||
        x.type == "5");

    if (c.length >= 5 &&
        c.find(x => x.type == "ace") != undefined &&
        c.find(x => x.type == "2") != undefined &&
        c.find(x => x.type == "3") != undefined &&
        c.find(x => x.type == "4") != undefined &&
        c.find(x => x.type == "5") != undefined) {
        return 500 + 12;
    }

    // Three of a kind
    let toak = cardTypes
        .map(x => cards.filter(y => y.type == x))
        .find(x => x.length == 3);

    if (toak != undefined)
    {
        return 400 + max(toak.map(x => cardTypes.indexOf(x.type)));
    }

    // Two pair & pair
    let pairs = cardTypes
        .map(x => cards.filter(y => y.type == x))
        .filter(x => x.length == 2);

    let highestPairValue = max(pairs.map(x => max(x.map(y => cardTypes.indexOf(y.type)))));

    if (pairs.length >= 2) {
        // Add highest pair value
        return 300 + highestPairValue;
    }

    if (pairs.length == 1) {
        // Add highest pair value
        return 200 + highestPairValue;
    }

    // High card
    return max(cards.map(x => cardTypes.indexOf(x.type)));
}