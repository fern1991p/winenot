document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("winenot JS imported successfully!");
  },
  false
);

// FERNS

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
// to hide
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
// Path to my result.. testing:
const merlotButton = document.getElementById('merlot-btn')
const pinotnButton = document.getElementById('pinotn-btn')
const pinotgButton = document.getElementById('pinotg-btn')
const sauvButton = document.getElementById('sauv-btn')







let shuffledQuestions, currentQuestionIndex
let total = 0
//start 
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


wines =[
  {name:"merlot red wine", min: 750, max: 1000}, // total > 750
  {name:"pinot noir red wine", min: 500, max: 749}, //total > 500 && <749
  {name:"pinot grigio red wine", min: 250, max: 499}, // total > 250 && <499
  {name:"white sauvignon blanc", min: 0, max: 249}  // total < 249
]

// if you are reading my code.. There is no right or wrong, but its a points-based system.. 
// for every "correct": 250 points 
// for every "wrong": 0 points
// all 4 right questions = 1000 points -> merlot red wine
// 3 right questions: 750 points -> pinot noir red wine
// 2 right questions: 500 point -> pinot grigio white wine
// 1 ou 0 right question: 250 points -> white sauvignon blanc


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
//mybuttons and changing text
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
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

    //over here!!!
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
  console.log(total)
}
//this i wont have, clean this before break if removed
function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
// testing something... i works. keep it 

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