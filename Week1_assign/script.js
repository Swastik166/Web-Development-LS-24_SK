document.addEventListener('DOMContentLoaded', function() {
    const quizData = [
        {
            question: "Who holds the record for the most F1 World Championships?",
            answers: ["Ayrton Senna", "Max Verstappen", "Lewis Hamilton", "Michael Schumacher"],
            correct: 3
        },
        {
            question: "Which team has won the most Constructors' Championships?",
            answers: ["Ferrari", "McLaren", "Mercedes", "Red Bull"],
            correct: 0
        },
        {
            question: "In which year was the first F1 World Championship held?",
            answers: ["1945", "1950", "1960", "1970"],
            correct: 1
        },
        {
            question: "Who is the youngest F1 World Champion?",
            answers: ["Lewis Hamilton", "Sebastian Vettel", "Fernando Alonso", "Max Verstappen"],
            correct: 1
        },
        {
            question: "Which circuit is known as the 'Temple of Speed'?",
            answers: ["Silverstone", "Monaco", "Monza", "Spa-Francorchamps"],
            correct: 2
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    const questionEl = document.getElementById('question');
    const answersEl = document.getElementById('answers');
    const submitBtn = document.getElementById('submit');
    const resultEl = document.getElementById('result');

    function loadQuestion() {
        const question = quizData[currentQuestion];
        questionEl.textContent = question.question;

        answersEl.innerHTML = '';
        for (let i = 0; i < question.answers.length; i++) {
            const answerBtn = document.createElement('button');
            answerBtn.textContent = question.answers[i];
            answerBtn.addEventListener('click', () => selectAnswer(i));
            answersEl.appendChild(answerBtn);
        }

        submitBtn.style.display = 'none';
        resultEl.textContent = '';
    }

    function selectAnswer(index) {
        const buttons = answersEl.getElementsByTagName('button');
        for (let button of buttons) {
            button.classList.remove('selected');
        }
        buttons[index].classList.add('selected');
        submitBtn.style.display = 'block';
    }

    submitBtn.addEventListener('click', function() {
        const selectedButton = answersEl.querySelector('.selected');
        if (!selectedButton) return;

        const selectedAnswer = Array.from(answersEl.children).indexOf(selectedButton);
        if (selectedAnswer === quizData[currentQuestion].correct) {
            score++;
            resultEl.textContent = "Correct!";
        } else {
            resultEl.textContent = "Wrong. The correct answer was: " + quizData[currentQuestion].answers[quizData[currentQuestion].correct];
        }

        currentQuestion++;
        if (currentQuestion < quizData.length) {
            setTimeout(loadQuestion, 2000);
        } else {
            setTimeout(() => {
                questionEl.textContent = `Quiz completed! Your score: ${score}/${quizData.length}`;
                answersEl.innerHTML = '';
                submitBtn.style.display = 'none';
            }, 2000);
        }
    });



    loadQuestion();
    
});