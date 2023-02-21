var highscoreCache = localStorage.getItem("highscoreCache")
var timerEl = document.querySelector('.timercontainer p')
var viewHighScores = document.querySelector('.timercontainer a')
var containerEl = document.querySelector(".qcontainer")
var questionEl = document.querySelector('.question')
var answersEl = document.querySelector('.answers ul')
var statusEl = document.querySelector('.question-status p')
var txtInputEl
var submitEl
var highscores = []
//parse saved scores to array if saved scores exist
if (highscoreCache != null){
    highscores = JSON.parse(highscoreCache)
}

//Display highscores
viewHighScores.addEventListener('click', function(event){
    event.preventDefault()
    if (highscores.length > 0){
       var highScoreString = ""
        highscores.forEach(element => highScoreString = highScoreString + "\n" + element.name + ": " + element.score)
    }else{
        highScoreString = "\nNO HIGH SCORES YET"
    }
    window.alert("TOP 10 High Scores!\n" + highScoreString)
})

//add questions,answers, and correct answer for each question to questions array
var questionsArray = [
    {question:'JavaScript is a ___ -side programming language.',
    1:'Client',
    2:'Server',
    3:'Both',
    4:'None',
    correct:'Both'
    },
    {question:'Which of the following will write the message “Hello World!” in an alert box?',
    1:'alertBox(“Hello World!”);',
    2:'alert(Hello World!);',
    3:'msgAlert(“Hello World!”);',
    4:'alert(“Hello World!”);',
    correct:'alert(“Hello World!”);'
    },
    {question: "How do you find the minimum of x and y using JavaScript?",
    1:"min(x,y);",
    2:"Math.min(x,y)",
    3:"Math.min(xy)",
    4:"min(xy);",
    correct:"Math.min(x,y)"
    },
    {question:"If the value of x is 40, then what is the output of the following program?\n(x % 10 == 0)? console.log(“Divisible by 10”) : console.log(“Not divisible by 10”);",
    1:"ReferenceError",
    2:"Divisible by 10",
    3:"Not divisible by 10",
    4:"None of the above",
    correct:"Divisible by 10"
    },
    {question:"Which JavaScript label catches all the values, except for the ones specified?",
    1:"catch",
    2:"label",
    3:"try",
    4:"default",
    correct:"default"
    },
    {question:"Which are the correct “if” statements to execute certain code if “x” is equal to 2?",
    1:"if(x 2)",
    2:"if(x = 2)",
    3:"if(x == 2)",
    4:"if(x != 2)",
    correct:"if(x == 2)"
    },
    {question:"What will the code return?\nBoolean(3 < 7)",
    1:"true",
    2:"false",
    3:"NaN",
    4:"SyntaxError",
    correct:"true"
    },
    {question:"What is the output of the following code in the console?\nvar x = 0;\nfunction fun(){\n ++x;\n this.x = x;\n return x;\n }\n var bar = new new fun;\n console.log(bar.x);",
    1:"ReferenceError",
    2:"undefined",
    3:"1",
    4:"TypeError",
    correct:"TypeError"
    }
]

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
    questionEl.setAttribute('class', 'question')
    questionEl.textContent = "Welcome to the Javascript Quiz. You have 60 seconds to complete the quiz. If you get a question wrong 5 seconds will be subtracted from the time remaining. Once you have completed the quiz the remaining time will be your score. Click the start button to begin."
    startBtn = document.createElement('button')
    startBtn.setAttribute("style", "display:block")
    startBtn.textContent = "START"
    containerEl.appendChild(startBtn)
    startBtn.addEventListener('click', function(event){
        event.preventDefault()
        startQuiz()
    })
    //Remove these elements incase user doesn't click on saving highscore button
    if (submitEl){
        submitEl.remove()
    }
    if (txtInputEl){
        txtInputEl.remove()
    }
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
        if(secondsLeft === 0 || stopTimer) {
          // Stops execution of action at set interval
          clearInterval(timerInterval);
          //time run out and user lost
          if(secondsLeft == 0){
            quitQuiz("lost")
          }
        }else{
            timerEl.textContent = "Seconds Remaining: " + secondsLeft--
        }
      }, 1000);
}

function nextquestion(){
    if (questionindex >= questionsArray.length && secondsLeft > 0){
        quitQuiz("won")
        return
    }
    //clear previous info
    clearDisplay()
    const question = questionsArray[questionindex]
    questionEl.textContent = question.question
    // i is starting at one because the first answer does as well
    for(let i=1; i < Object.keys(question).length-1; i++){
        var li = document.createElement("li")
        li.setAttribute('data-value', question[i])
        li.setAttribute('data-answer', question.correct)
        li.textContent = question[i]
        answersEl.appendChild(li)
    }
    //increment question index to advance to next question
    questionindex++
    
}

// Event listner for answer clicks
answersEl.addEventListener('click', function(event){
    /*
    using tag name here, cause with out it, you can click on the ul between the li items and it will bypass
    the question
    */
    if (event.target.tagName == "LI"){
        console.log("yes")
        const {value, answer} = event.target.dataset
        const isCorrect = value == answer;
        statusEl.textContent = `Previous Answer was ${isCorrect ? 'CORRECT' : 'INCORRECT'}`;
        secondsLeft = Math.max(secondsLeft - (isCorrect ? 0 : 5), 0);
        nextquestion();
    }
})

function quitQuiz(x){
    // stop the timer
    stopTimer = true
    //Clear answers, questions, timer, and question status from screen
    clearDisplay()
    clearStatus()
    clearTimer()
    if (x == "won"){
        highScoreEntry()
        questionEl.setAttribute('class', 'question big')
        questionEl.textContent = 'YOU WON!\nYou scored: ' + secondsLeft
    }else{
        questionEl.setAttribute('class', 'question big')
        questionEl.textContent = "YOU LOST!"
    }
    playAgain()
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

/* 
    Create form for highscore entry and display it
    submit and input have ID added so they can be removed by init if user 
    doesn't click on the save highscore button
*/
function highScoreEntry(){
    formEl = document.createElement('form')
    txtInputEl = document.createElement('input')
    txtInputEl.setAttribute('type', 'text')
    txtInputEl.setAttribute('id', 'txtInputEl')
    txtInputEl.setAttribute('placeholder', 'Enter Your Name')
    submitEl = document.createElement('input')
    submitEl.setAttribute('type', 'submit')
    submitEl.setAttribute('value', 'Save Highscore')
    submitEl.setAttribute('id', 'submitEl')
    formEl.appendChild(txtInputEl)
    formEl.appendChild(submitEl)
    containerEl.appendChild(formEl)
    submitEl.addEventListener('click', function (event) {
        event.preventDefault()
        var userScore = {}
        userScore.name = txtInputEl.value
        userScore.score = secondsLeft
        // Only save highscore if score is in the top 10
        if (highscores.length > 9) {
            if (userScore.score > highscores[highscores.length-1].score){
                highscores.pop()
                highscores.unshift(userScore)
            }else{
                window.alert("Sorry your Highscore did make the TOP 10. Try Again!") 
            }
        }else{
            highscores.unshift(userScore)
        }
        //remove form after click, sort and save highscores
        highscores.sort((a, b) => b.score - a.score)
        localStorage.setItem('highscoreCache', JSON.stringify(highscores))
        formEl.remove()
    })
}

//Clear answers, questions, timer, and question status from screen
function clearDisplay(){
    answersEl.textContent = ''
    questionEl.textContent = ''
}

function clearStatus(){
    statusEl.textContent = ""
}

function clearTimer(){
    timerEl.textContent = ''
}

//initialize the page
init()