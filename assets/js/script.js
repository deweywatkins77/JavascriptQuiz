var highscore = localStorage.getItem("highscore")
var highscores = []
var containerEL = document.querySelector(".container")
var questionEl = document.querySelector('.question p')
var answersEl = document.querySelector('.answers ul')
var statusEl = document.querySelector('.question-status p')
var timerEl = document.querySelector('.timercontainer p')
var startBtn = document.getElementById('startBtn')
var secondsLeft = 60
var questionindex = 0
var stopTimer = false

var q0 = {
    question:'JavaScript is a ___ -side programming language.',
    1:'Client',
    2:'Server',
    3:'Both',
    4:'None',
    correct:'Both'
}
var q1 = {
    question:'Which of the following will write the message “Hello World!” in an alert box?',
    1:'alertBox(“Hello World!”);',
    2:'alert(Hello World!);',
    3:'msgAlert(“Hello World!”);',
    4:'alert(“Hello World!”);',
    correct:'alert(“Hello World!”);'
}

var questionsArray = [q0, q1]
console.log(questionsArray)

//parse saved scores to array if saved scores exist
if (highscore != null){
    highscores = JSON.parse(highscore)
}

function startQuiz(){
    //hide display button
    startBtn.setAttribute("style", "display:none")
    /*
        Due to slight time delay need to display time left before starting.
        This will also give user time to start reading the first question 
        before timer starts
    */
    timerEl.textContent = "Seconds Remaining: " + secondsLeft
    // display first question and start quiz timer
    nextquestion()
    var timerInterval = setInterval(function() {
        if(secondsLeft === 0 || stopTimer === true) {
          // Stops execution of action at set interval
          clearInterval(timerInterval);
          //time run out and user lost
          if(secondsLeft == 0){
            quitQuiz("lost")
          }
        }else{
            timerEl.textContent = "Seconds Remaining: " + secondsLeft
            secondsLeft--
        }
      }, 1000);
}

function nextquestion(){
    if (questionindex < questionsArray.length){
        //clear previous info
        clearDisplay()
        questionEl.textContent = questionsArray[questionindex].question
        // i is starting at one cause the first answer does as well
        for(i=1; i < 5; i++){
            var li = document.createElement("li")
            li.setAttribute('data-value', questionsArray[questionindex][i])
            li.setAttribute('data-answer', questionsArray[questionindex].correct)
            li.textContent = questionsArray[questionindex][i]
            answersEl.appendChild(li)
        }
        questionindex++
    }else{
        //user finished quiz with time to spare and won
        quitQuiz("won")
    }
}

// Event listner for Li clicks
answersEl.addEventListener('click', function(event){
    clickedLi = event.target
    checkAnswer(clickedLi.dataset.value, clickedLi.dataset.answer)
})


function checkAnswer(value, answer){
    if (value == answer){
        statusEl.textContent = "Correct Answer"
    }else{
        statusEl.textContent = "Incorrect Answer"
        //subtract time for incorrect answer but dont go below 0
        if (secondsLeft < 6){
            secondsLeft = 0
        }else{
            secondsLeft = secondsLeft - 5
        }
    }
    nextquestion()
}

//Clear answers, questions, timer, and question status from screen
function clearDisplay(){
    answersEl.textContent = ''
    questionEl.textContent = ''
    statusEl.textContent = ''
}

function clearTimer(){
    timerEl.textContent = ''
}

// Create form for highscore entry and display it
function highScoreEntry(){
    formEl = document.createElement('form')
    txtInputEl = document.createElement('input')
    txtInputEl.setAttribute('type', 'text')
    submitEl = document.createElement('input')
    submitEl.setAttribute('type', 'submit')
    formEl.appendChild(txtInputEl)
    formEl.appendChild(submitEl)
    containerEL.appendChild(formEl)
    submitEl.addEventListener('click', function(event){
        event.preventDefault()
        var userScore = {} 
        userScore.name = txtInputEl.value
        userScore.score = secondsLeft
        highscores.unshift(userScore)
        //clear form
        containerEL.remove(formEl)
        // reload default message and start button incase user wants to play again
        init()
    })
}
function quitQuiz(x){
    // stop the timer
    stopTimer = true
    //Clear answers, questions, timer, and question status from screen
    clearDisplay()
    clearTimer()
    if (x == "won"){
        highScoreEntry()
    }
}

function init(){
    secondsLeft = 60
    questionindex = 0
    stopTimer = false
    questionEl.textContent = "Welcome to the Javascript Quiz. You have 60 seconds to complete the quiz. If you get a question wrong 5 seconds will be subtracted from the time remaining. Once you have completed the quiz the remaining time will be your score. Click the start button to begin."
    startBtn.setAttribute("style", "display:default")
}

//initialize the page
init()