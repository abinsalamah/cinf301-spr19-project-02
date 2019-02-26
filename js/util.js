/*
* Abdullah and Hassan
*
*/


// Helper method to delay some tasks
// refers to  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

async function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}

// Shuffles an array randomly
function shuffle(arr) {
    let shuffled = [];

    while (arr.length > 0) {
        shuffled.push(arr.splice(getRandomInt(arr.length - 1), 1)[0]);
    }

    return shuffled;
}

// Gets the max value from a number array
function max(array) {
    if (array.length == 0) return 0;

    return array.reduce((a, v) => Math.max(a, v));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}