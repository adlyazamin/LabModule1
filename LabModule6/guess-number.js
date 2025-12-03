function playGame() {
    const randomNumber = Math.floor(Math.random() * 10) + 1;

    const userGuess = parseInt(prompt("Guess a number between 1 and 10:"), 10);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
        alert("Please enter a valid number between 1 and 10.");
        return;
    }

    if (userGuess === randomNumber) {
        alert("Good Work! You guessed it right.");
    }

    else {
        alert(`Not matched. The correct number was ${randomNumber}.`);
    }
}