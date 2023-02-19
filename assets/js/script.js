var highscore = localStorage.getItem("highscore")
var questionEl = document.querySelector('.question p')
var answersEl = document.querySelector('.answers ul')
var statusEl = document.querySelector('.question-status p')
var timerEl = document.querySelector('.timercontainer p')
var startBtn = document.getElementById('startBtn')
var secondsLeft = 30
var questionindex = 0

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
        timerEl.textContent = "Seconds Remaining: " + secondsLeft
        if(secondsLeft === 0) {
          // Stops execution of action at set interval
          clearInterval(timerInterval);
          //time run out and user lost
          quitQuiz("lost")
        }
        secondsLeft--
      }, 1000);
}

function nextquestion(){
    if (questionindex < questionsArray.length){
        //clear answers if they exist
        clearAnswers()
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

function clearAnswers(){
    for (i=0; i < answersEl.childElementCount; i++){
        answersEl.textContent = ''
    }

}

function quitQuiz(x){
    console.log(x)
}