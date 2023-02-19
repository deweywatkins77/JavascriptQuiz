var highscoreCache = localStorage.getItem("highscoreCache")
var highscores = []
var containerEl = document.querySelector(".container")
var questionEl = document.querySelector('.question')
var startBtn = document.querySelector('#startBtn')
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

//parse saved scores to array if saved scores exist
if (highscoreCache != null){
    highscores = JSON.parse(highscoreCache)
}

function startQuiz(){
    //remove start button
    startBtn.remove()
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

// Event listner for answer clicks
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
    submitEl.setAttribute('value', 'Save Highscore')
    submitEl.setAttribute('id','submitEl')
    formEl.appendChild(txtInputEl)
    formEl.appendChild(submitEl)
    containerEl.appendChild(formEl)
    //save highscore event
    submitEl.addEventListener('click', function(event){
        event.preventDefault()
        //prep score for saving
        var userScore = {} 
        userScore.name = txtInputEl.value
        userScore.score = secondsLeft
        highscores.unshift(userScore)
        //save highscores to local cache
        localStorage.setItem('highscoreCache',JSON.stringify(highscores))
        //clear form
        formEl.remove()
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
        questionEl.textContent = 'YOU WON!'
        playAgain()
    }else{
        questionEl.textContent = "YOU LOST!"
        playAgain()
    }
}

function playAgain(){
        // change the button to restart script and set properties
        startBtn = document.createElement('button')
        startBtn.textContent = "PLAY AGAIN!"
        startBtn.setAttribute("style", "display:block")
        questionEl.appendChild(startBtn)
        startBtn.addEventListener('click', function(event){
            event.preventDefault
            init('y')
        })
}

function init(remove){
    /*
        start button had unexpected behavior if it was used repeatedly.
        set to create it here, and removed when the quiz starts.
        its also set to be created on play it again function.
        its only removed here if it already exists from the play it again function
    */
    if(remove == 'y'){
        startBtn.remove()
    }
    secondsLeft = 60
    questionindex = 0
    stopTimer = false
    questionEl.textContent = "Welcome to the Javascript Quiz. You have 60 seconds to complete the quiz. If you get a question wrong 5 seconds will be subtracted from the time remaining. Once you have completed the quiz the remaining time will be your score. Click the start button to begin."
    startBtn = document.createElement('button')
    startBtn.setAttribute("style", "display:block")
    startBtn.textContent = "START"
    questionEl.appendChild(startBtn)
    startBtn.addEventListener('click', function(event){
        event.preventDefault()
        startQuiz()
    })
    if (document.contains(document.getElementById('submitEl'))){
        document.getElementById('submitEl').remove()
    }
}

//initialize the page
init()