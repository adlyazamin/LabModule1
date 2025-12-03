const questions = [
    {question: "What is 9 + 10?", options: ["21", "19", "20", "None"], correct: 1},
    {question: "What is 5 * 2?", options: ["7", "10", "20", "5"], correct: 1},
    {question: "What is 19 - 4?", options: ["15", "23", "10", "16"], correct: 0},
    {question: "What is 20 / 4?", options: ["4", "16", "5", "2"], correct: 2},
    {question: "What is 5 + 10 / 2?", options: ["15", "7.5", "7", "10"], correct: 3}
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswerIndex = null;
let timeLeft = 30;
let timerId = null;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const currentQuestionElement = document.getElementById('current');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next');

window.onload = function() {
    questionElement.textContent = "Math Quiz";
    feedbackElement.textContent = "Click 'Start Quiz' to start!";
    nextButton.textContent = "Start Quiz";
};

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }
    
    timeLeft = 30;
    timerElement.textContent = timeLeft;

    if (timerId) {
        clearInterval(timerId);
    }

    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;

    optionsElement.innerHTML = '';

    currentQuestion.options.forEach(function(option, index) {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        
        optionDiv.onclick = function() {
            document.querySelectorAll('.option').forEach(function(opt) {
                opt.classList.remove('selected');
            });

            optionDiv.classList.add('selected');
            selectedAnswerIndex = index;
            nextButton.disabled = false;

            clearInterval(timerId);
        };
        
        optionsElement.appendChild(optionDiv);
    });

    currentQuestionElement.textContent = currentQuestionIndex + 1;

    feedbackElement.textContent = 'Select an answer';
    feedbackElement.style.color = 'black';
    nextButton.disabled = true;
    nextButton.textContent = 'Next Question';
    selectedAnswerIndex = null;

    startTimer();
}

function startTimer() {
    timerId = setInterval(function() {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timerId);
            feedbackElement.textContent = "Time's up!";
            feedbackElement.style.color = 'red';
            nextButton.disabled = false;
        }
    }, 1000);
}

function checkAnswerAndContinue() {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswerIndex === currentQuestion.correct) {
        score++;
        scoreElement.textContent = score;
        feedbackElement.textContent = 'Correct!';
        feedbackElement.style.color = 'green';
    } else {
        feedbackElement.textContent = `Wrong! Correct: ${currentQuestion.options[currentQuestion.correct]}`;
        feedbackElement.style.color = 'red';
    }

    setTimeout(function() {
        currentQuestionIndex++;
        showQuestion();
    }, 1000);
}

function endQuiz() {
    clearInterval(timerId);
    questionElement.textContent = `Quiz Complete!`;
    optionsElement.innerHTML = `<div style="padding: 20px; font-size: 18px;">Your score: ${score}/${questions.length}</div>`;
    feedbackElement.textContent = 'Refresh page to play again';
    nextButton.style.display = 'none';
}

nextButton.onclick = function() {
    if (nextButton.textContent === 'Start Quiz') {
        shuffleQuestions();
        showQuestion();
    } else {
        checkAnswerAndContinue();
    }
};