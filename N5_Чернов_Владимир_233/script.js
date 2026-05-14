const quiz = [
  {
    question: "Сколько будет 2+2?",
    options: [2, 3, 4, 5],
    correct: 4
  },
  {
    question: "Столица Франции?",
    options: ["Берлин", "Париж", "Рим"],
    correct: "Париж"
  },
  {
    question: "JS это?",
    options: ["Язык", "База данных", "ОС"],
    correct: "Язык"
  }
];

const container = document.getElementById('quiz-container');
const checkBtn = document.getElementById('check-btn');
const resultDiv = document.getElementById('result');

function renderQuiz() {
  quiz.forEach((item, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';

    const questionText = document.createElement('p');
    questionText.textContent = `${index + 1}. ${item.question}`;
    questionDiv.appendChild(questionText);

    item.options.forEach((option) => {
      const label = document.createElement('label');
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = `question${index}`;
      radio.value = option;
      label.appendChild(radio);
      label.appendChild(document.createTextNode(' ' + option));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement('br'));
    });

    container.appendChild(questionDiv);
  });
}

function checkAnswers() {
  let correctCount = 0;

  quiz.forEach((item, index) => {
    const selected = document.querySelector(`input[name="question${index}"]:checked`);
    if (selected && selected.value == item.correct) {
      correctCount++;
    }
  });

  resultDiv.textContent = `Вы ответили правильно на ${correctCount} из ${quiz.length} вопросов.`;
}

renderQuiz();
checkBtn.addEventListener('click', checkAnswers);