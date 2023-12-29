// update the hangman image when guessed wrong //
function updateHangmanImage() {
    const hangmanImg = document.getElementById('hangman-img');
    hangmanImg.src = hangmanImages[wrongGuesses];
}

// event listener for when the DOM content is fully loaded //
document.addEventListener('DOMContentLoaded', function () {
    const words = [
        { word: 'mouth', hint: 'Something you want your GIRLFRIEND to close most of the time!' },
        { word: 'oxygen', hint: 'Something you go out and get when getting yelled at by GIRLFRIEND.' },
    ];

    // store the selected word, guessed word, and wrong guesses //
    let selectedWord, guessedWord, wrongGuesses;

    const hangmanImages = [ 
        'images/hangman-0.svg',
        'images/hangman-1.svg',
        'images/hangman-2.svg',
        'images/hangman-3.svg',
        'images/hangman-4.svg',
        'images/hangman-5.svg',
        'images/hangman-6.svg',
    ];

    const qwertyLayout = [
        'qwertyuiop',
        'asdfghjkl',
        'zxcvbnm',
    ];

    // DOM elements //
    const hangmanContainer = document.getElementById('hangman-container');
    const hangmanImage = document.getElementById('hangman-image');
    const wordDisplay = document.getElementById('word-display');
    const keyboard = document.getElementById('keyboard');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset-button');
    const hintText = document.getElementById('hint-text');
    const guessesText = document.getElementById('guesses-text');
    const maxGuesses = 6;

    // to start the game //
    function startGame() {
        // selecting random word //
        selectedWord = words[Math.floor(Math.random() * words.length)];
        guessedWord = Array(selectedWord.word.length).fill('_');
        wrongGuesses = 0;

        // updating display //
        updateHangmanImage();
        updateWordDisplay();
        createKeyboard();
        displayHint();

        // reset messages and hide the reset button //
        message.textContent = '';
        resetButton.style.display = 'none';

        // guesses remaining display //
        updateGuessesRemaining();
    }

    // update the hangman image when making wrong guesses //
    function updateHangmanImage() {
        hangmanImage.style.backgroundImage = `url('${hangmanImages[wrongGuesses]}')`;
    }

    // update the word display guessed letters //
    function updateWordDisplay() {
        wordDisplay.textContent = guessedWord.join(' ');
    }

    // function to create the keyboard buttons //
    function createKeyboard() {
        keyboard.innerHTML = '';
        qwertyLayout.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('keyboard-row');
            for (let letter of row) {
                const button = document.createElement('button');
                button.textContent = letter;
                button.addEventListener('click', handleGuess);
                rowDiv.appendChild(button);
            }
            keyboard.appendChild(rowDiv);
        });
    }

    // handle a guessed letter //
    function handleGuess(event) {
        const guessedLetter = event.target.textContent.toLowerCase();
        if (selectedWord.word.includes(guessedLetter)) {
            // update guessedWord with the correctly guessed letter //
            for (let i = 0; i < selectedWord.word.length; i++) {
                if (selectedWord.word[i] === guessedLetter) {
                    guessedWord[i] = guessedLetter;
                }
            }
            // check if the word is fully guessed //
            if (!guessedWord.includes('_')) {
                gameWon();
            }
        } else {
            // incrementing wrongGuesses and updating hangman image //
            wrongGuesses++;
            updateHangmanImage();
            // check if the maximum number of wrong guesses is reached //
            if (wrongGuesses === maxGuesses) {
                gameOver();
            }
        }

        // disable the clicked button and updating word display and guesses remaining //
        event.target.disabled = true;
        updateWordDisplay();
        updateGuessesRemaining();
    }

    // handle the game won scenario //
    function gameWon() {
        message.textContent = 'Congratulations! You guessed the word!';
        endGame();
    }

    // handle the game over scenario //
    function gameOver() {
        message.textContent = `Sorry! The correct word was "${selectedWord.word}".`;
        endGame();
    }

    // handle the end of the game //
    function endGame() {
        disableKeyboard();
        resetButton.style.display = 'block';
    }

    // disabling all keyboard buttons //
    function disableKeyboard() {
        keyboard.querySelectorAll('button').forEach(button => {
            button.disabled = true;
        });
    }

    // displaying the hint //
    function displayHint() {
        hintText.textContent = `Hint: ${selectedWord.hint}`;
    }

    // updating the display of remaining guesses //
    function updateGuessesRemaining() {
        guessesText.textContent = `Guesses remaining: ${maxGuesses - wrongGuesses}`;
    }

    // event listener for the reset button //
    resetButton.addEventListener('click', startGame);

    // start the game when the page loads //
    startGame();
});
