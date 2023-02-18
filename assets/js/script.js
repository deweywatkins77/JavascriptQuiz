var highscore = localStorage.getItem("highscore")
var questionPTag = document.querySelector('.question p')
var answersUlTag = document.querySelector('.answers ul')
var timerEl = document.querySelector('.timercontainer p')
var startBtn = document.getElementById('startBtn')
var secondsLeft = 5
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
    ans1:'alertBox(“Hello World!”);',
    ans2:'alert(Hello World!);',
    ans3:'msgAlert(“Hello World!”);',
    ans4:'alert(“Hello World!”);',
    correct:'alert(“Hello World!”);'
}

var questionsArray = [q0,q1]

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
    if (questionindex < questionsArray.length -1){
        questionPTag.textContent = questionsArray[questionindex].question
        // i is starting at one cause the fist answer does as well
        for(i=1;i < 5; i++){
            var li = document.createElement("li")
            li.textContent = questionsArray[questionindex][i]
            answersUlTag.appendChild(li)
        }
    }else{
        //user finished quiz with time to spare and won
        quitQuiz("won")
    }
    questionindex++
}


function quitQuiz(x){
    console.log(x)
}

console.log()