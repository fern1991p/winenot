document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("winenot JS imported successfully!");
  },
  false
);
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const highlightElement = document.querySelector(".highlightQuiz")
const answerButtonsElement = document.getElementById('answer-buttons')
// Wine path
const merlotButton = document.getElementById('merlot-btn')
const pinotnButton = document.getElementById('pinotn-btn')
const pinotgButton = document.getElementById('pinotg-btn')
const sauvButton = document.getElementById('sauv-btn')

let shuffledQuestions, currentQuestionIndex
let total = 0

// Hi, my code works as in a point-based system. Each "correct" question worth 250 points,
// each "wrong" anwser worth 0 zero points. By the end, you total points will be compared in my quiz function
// and assign to a especic wine.

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function quiz(num){
   if (num > 750){
  console.log("Merlot Red")
  merlotButton.classList.remove('hide')
  }
  else if (num < 749 && num > 500){
  console.log("Pinot Noir")
  pinotnButton.classList.remove('hide')
  }
  else if (num < 499 && num > 250){
  console.log("Pinot Grigio")
  pinotgButton.classList.remove('hide')
  }
  else if (num < 249){
  console.log("White Sauvignon")
  sauvButton.classList.remove('hide')
  }
}

function startGame() {
  console.log("started")
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}
function showQuestion(question) {
  highlightElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    button.classList.add('button-2')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}
function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}
function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    quiz(total)
    console.log(" end / total is " + total)
    nextButton.classList.add('hide')
    startButton.innerText = 'Restart' 
    startButton.classList.add('hide')
  }

}
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    total += 100;
    element.classList.add('correct')
    
  } else {
    total += 0 ;
    element.classList.add('wrong')
  }
 
}
function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
const questions = [
  {
    question: 'What`s your favorite type of wine?',
    answers: [
      { text: 'Red', correct: true },
      { text: 'White', correct: false }
    ]
  },
  {
    question: 'How crazy you want this recommendation to be?',
    answers: [
      { text: 'Very!', correct: true},
      { text: 'No, keep it simple', correct: false }
    ]
  },
  {
    question: 'Do you like sparkling?',
    answers: [
      { text: 'Ew.. no!', correct: true},
      { text: 'YES!!!', correct: false},
    ]
  },
  {
    question: 'What`s your usual friday night?',
    answers: [
      { text: 'Going out', correct: true },
      { text: 'Stay in!', correct: false},
    ]
  }
]