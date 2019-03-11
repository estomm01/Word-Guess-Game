

var words = ["Thor", "Captain America", "Iron Man", "SpiderMan" ];

var maxNumGuesses = 8; 
var guessedLetters = []; 
var ansWordArr = []; // store the "_" and to be used to replace the word answer
var numGuessesRemaining = 0; 
var numWins = 0; 
var numLosses = 0; 
var isFinished = false; // when true, game can start again
var ansWord; 

function reset() {

    ansWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

    ansWordArr = [];

    for (var i = 0; i < ansWord.length; i++) {
        ansWordArr[i] = "_";
    }
    numGuessesRemaining = maxNumGuesses;
    guessedLetters = [];   

};

function updateScreen() {
    document.getElementById("wins").innerHTML = numWins;
    document.getElementById("losses").innerHTML = numLosses;
    document.getElementById("guessesRemaining").innerHTML = numGuessesRemaining;
    document.getElementById("characterWord").innerHTML = ansWordArr.join("");
    document.getElementById("guessedLetters").innerText = guessedLetters.join("");
};

function checkGuess(letter) {
    //if letter is not in guessedLetters array then push the letter to the array
    if (guessedLetters.indexOf(letter) === -1) {
        guessedLetters.push(letter);
        //if the letter isn't in the answer word then -1 the numGuessesRemaining
        if (ansWord.indexOf(letter) === -1) {
            numGuessesRemaining--;
    
        } else {
            for (var i = 0; i < ansWord.length; i++) {
                if (letter === ansWord[i]) {
                    ansWordArr[i] = letter;
                }
            }
        }
    }
};

function isWinner() {
    //if there are no more "_" in the ansWordArr then +1 to Wins and switch isFinished to true
    if (ansWordArr.indexOf("_") === -1) {
        numWins++;
        isFinished = true;

    }
};

function isLoser() {
    // if the numGuessesRemaining is 0 then -1 numLosses and switch isFinished to true
    if (numGuessesRemaining <= 0) {
        numLosses++;
        isFinished = true;
    }
};


document.onkeyup = function (event) {

    //if isFinished is true then restart the game to the initial setup 
    //and switch isFinished back to false
    if (isFinished) {
        reset();
        isFinished = false;
    } else {
        //check to see if only letters A-Z are pressed
        //functions are executed when user presses A-Z key
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            checkGuess(event.key.toUpperCase());
            updateScreen();
            isWinner();
            isLoser();
        }
    }
};

