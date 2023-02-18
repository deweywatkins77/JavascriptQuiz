var highscore = localStorage.getItem("highscore")
var questionPTag = document.querySelector('.question p')
var answersUlTag = document.querySelector('.answers ul')
var timerEl = document.querySelector('.timercontainer p')
var secondsLeft = 60

var q0 = {
    question:'JavaScript is a ___ -side programming language.',
    ans1:'Client',
    ans2:'Server',
    ans3:'Both',
    ans4:'None',
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
    var timerInterval = setInterval(function() {
        timerEl.textContent = "Seconds Remaining: " + secondsLeft
        if(secondsLeft === 0) {
          // Stops execution of action at set interval
          clearInterval(timerInterval);
          // Calls function to create and append image
        }
        secondsLeft--
      }, 1000);
}