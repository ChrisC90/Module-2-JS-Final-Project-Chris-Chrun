document.addEventListener('DOMContentLoaded', function () {
    const words = [
        { word: 'mouth', hint: 'Something you want your GIRLFRIEND to close most of the time!' },
        { word: 'oxygen', hint: 'Something you go out and get when getting yelled at by GIRLFRIEND.' },
    ];

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

    const hangmanContainer = document.getElementById('hangman-container');
    const hangmanImage = document.getElementById('hangman-image');
    const wordDisplay = document.getElementById('word-display');
    const keyboard = document.getElementById('keyboard');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset-button');
    const hintText = document.getElementById('hint-text');
    const guessesText = document.getElementById('guesses-text');
    const maxGuesses = 6;

    function startGame() {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        guessedWord = Array(selectedWord.word.length).fill('_');
        wrongGuesses = 0;

        updateHangmanImage();
        updateWordDisplay();
        createKeyboard();
        displayHint();

        message.textContent = '';
        resetButton.style.display = 'none';
        updateGuessesRemaining();
    }

    function updateHangmanImage() {
        hangmanImage.style.backgroundImage = `url('${hangmanImages[wrongGuesses]}')`;
    }

    function updateWordDisplay() {
        wordDisplay.textContent = guessedWord.join(' ');
    }

    function createKeyboard() {
        keyboard.innerHTML = '';
        // Create buttons for QWERTY layout
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

    function handleGuess(event) {
        const guessedLetter = event.target.textContent.toLowerCase();
        if (selectedWord.word.includes(guessedLetter)) {
            for (let i = 0; i < selectedWord.word.length; i++) {
                if (selectedWord.word[i] === guessedLetter) {
                    guessedWord[i] = guessedLetter;
                }
            }
            if (!guessedWord.includes('_')) {
                gameWon();
            }
        } else {
            wrongGuesses++;
            updateHangmanImage();
            if (wrongGuesses === maxGuesses) {
                gameOver();
            }
        }

        event.target.disabled = true;
        updateWordDisplay();
        updateGuessesRemaining();
    }

    function gameWon() {
        message.textContent = 'Congratulations! You guessed the word!';
        endGame();
    }

    function gameOver() {
        message.textContent = `Sorry! The correct word was "${selectedWord.word}".`;
        endGame();
    }

    function endGame() {
        disableKeyboard();
        resetButton.style.display = 'block';
    }

    function disableKeyboard() {
        keyboard.querySelectorAll('button').forEach(button => {
            button.disabled = true;
        });
    }

    function displayHint() {
        hintText.textContent = `Hint: ${selectedWord.hint}`;
    }

    function updateGuessesRemaining() {
        guessesText.textContent = `Guesses remaining: ${maxGuesses - wrongGuesses}`;
    }

    resetButton.addEventListener('click', startGame);

    startGame();
});
