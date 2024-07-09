// Array of quiz questions
const questions = [
    {
        question: "What does DOM stand for?",
        options: ["Document Object Model", "Document Oriented Model", "Data Object Model", "Digital Ordinance Model"],
        answer: "Document Object Model"
    },
    {
        question: "Which keyword is used to declare variables in JavaScript?",
        options: ["var", "let", "const", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "What is the output of 3 + '3' in JavaScript?",
        options: ["6", "'33'", "33", "undefined"],
        answer: "'33'"
    },
    {
        question: "Which built-in method calls a function for each element in the array?",
        options: [".forEach()", ".loop()", ".each()", ".every()"],
        answer: ".forEach()"
    },
    {
        question: "How do you round the number 7.25, to the nearest integer?",
        options: ["Math.rnd(7.25)", "rnd(7.25)", "Math.round(7.25)", "round(7.25)"],
        answer: "Math.round(7.25)"
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        options: ["onmouseclick", "onmouseover", "onclick", "onchange"],
        answer: "onclick"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<javascript>", "<js>", "<script>", "<scripting>"],
        answer: "<script>"
    },
    {
        question: "How can you add a comment in JavaScript?",
        options: ["<!--This is a comment-->", "'This is a comment", "//This is a comment", "/*This is a comment*/"],
        answer: "//This is a comment"
    },
    {
        question: "What is the correct way to write an if statement in JavaScript?",
        options: ["if i == 5 then", "if i = 5", "if i = 5 then", "if (i == 5)"],
        answer: "if (i == 5)"
    },
    {
        question: "How do you declare a JavaScript variable?",
        options: ["variable carName;", "v carName;", "var carName;", "declare carName;"],
        answer: "var carName;"
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        options: ["*", "-", "=", "+"],
        answer: "="
    },
    {
        question: "What will the following code output: console.log(typeof [1, 2, 3]);",
        options: ["number", "object", "array", "undefined"],
        answer: "object"
    },
    {
        question: "Which method returns the length of a string?",
        options: [".size()", ".length()", ".index()", ".count()"],
        answer: ".length()"
    },
    {
        question: "Which built-in method reverses the order of the elements of an array?",
        options: [".reverse()", ".sort()", ".changeOrder(order)", ".modifyOrder()"],
        answer: ".reverse()"
    },
    {
        question: "What is the correct JavaScript syntax for opening a new window called 'myWindow'?",
        options: ["window.open('http://www.example.com', 'myWindow');", "new Window('http://www.example.com', 'myWindow');", "open.window('http://www.example.com', 'myWindow');", "open('http://www.example.com', 'myWindow');"],
        answer: "window.open('http://www.example.com', 'myWindow');"
    },
    {
        question: "How do you find the number with the highest value of x and y?",
        options: ["Math.max(x, y)", "Math.ceil(x, y)", "ceil(x, y)", "top(x, y)"],
        answer: "Math.max(x, y)"
    },
    {
        question: "Which function is used to parse a string to integer in JavaScript?",
        options: ["parseInt()", "parseInteger()", "String.toInteger()", "strToInt()"],
        answer: "parseInt()"
    },
    {
        question: "What does the method Array.prototype.map() do?",
        options: ["Applies a function to each element in the array and returns a new array", "Sorts the elements of an array", "Filters elements in an array based on a condition", "Checks if all elements in an array pass a test"],
        answer: "Applies a function to each element in the array and returns a new array"
    },
    {
        question: "Which keyword is used to exit from a loop in JavaScript?",
        options: ["break", "return", "continue", "exit"],
        answer: "break"
    }
];


let currentQuestionIndex = 0;
let score = 0;
let timer; // 


const quizContainer = document.getElementById('quiz');
const nextButton = document.getElementById('next-btn');
const resultsContainer = document.getElementById('results');


function showQuestion() {
    const question = questions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1; // Calculate question number

    const answers = question.options.map((option, index) => `
        <label>
            <input type="radio" name="question${currentQuestionIndex}" value="${option}">
            ${option}
        </label>
    `).join('');

    quizContainer.innerHTML = `
        <div class="question">Question ${questionNumber}: ${question.question}</div>
        <div class="answers">${answers}</div>
    `;

    nextButton.style.display = 'block';

    
    startTimer();
}


function startTimer() {
    let timeLeft = 60; 
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timer); 
            showNextQuestion(); 
        }
    }, 1000); 
}


function showNextQuestion() {
    clearInterval(timer); 

    const selectedAnswer = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
    if (!selectedAnswer) {
        
        Swal.fire({
            title: "No Answer Selected",
            text: "Please select an answer before time runs out.",
            icon: "error",
            confirmButtonText: "Okay"
        });
        return;
    }

    const isCorrect = selectedAnswer.value === questions[currentQuestionIndex].answer;
    if (isCorrect) score++;

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}


function showResults() {
    const pass = score >= 15; 
    const resultMessage = `${pass ? 'Pass' : 'Fail'}: You got ${score} out of ${questions.length} correct.`;
    resultsContainer.innerHTML = resultMessage;

    
    Swal.fire( {

    
        title: pass ? "Congratulations!" : "Sorry!",
        text: pass ? "You Passed!" : "You did not pass.",
        icon: pass ? "success" : "error",
        confirmButtonText: "Okay"
    });
}

nextButton.addEventListener('click', showNextQuestion);

showQuestion();
