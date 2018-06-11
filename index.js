
"use strict";

let questionIndex = 0;
let quizScore = 0;

const QUESTIONS = [
	{
	 question: "Who is the best drummer of all time?", 
	 choices: ["RuPaul", "Ringo Starr", "That guy from the Black Keys", "John Bonham"], 
	 answer: "John Bonham"
	},

	{
	 question: "What is the best instrument of all time?", 
	 choices: ["Guitar", "Bass", "Keyboard", "Drums"], 
	 answer: "Drums"
	},

	{
	 question: "What is the best band of all time?", 
	 choices: ["My Morning Jacket", "Led Zeppelin", "Local Natives", "Tie, they're all great"], 
	 answer: "Tie, they're all great"
	},

	{
	 question: "Which instrument is the foundation of all music?", 
	 choices: ["Ukelele", "Saxophone", "Trombone", "Drums"], 
	 answer: "Drums"
	},

	{
	 question: "What would music be without drums?", 
	 choices: ["Awesome", "Way better than with drums", "So cool", "Absolutely nothing"], 
	 answer: "Absolutely nothing"
	},

	{
	 question: "Which band member typically is considered 'the glue'?", 
	 choices: ["Singer", "Roadie", "Guitarist", "Drummer"], 
	 answer: "Drummer"
	},
	
	{
	 question: "Which band member is usually/always the coolest, most attractive, and generally more awesome?",
	 choices: ["Singer", "Bassist", "Guitarist", "Drummer"], 
	 answer: "Drummer"
	},

	{
	 question: "Which band member usually gets the least amount of credit but is actually the best/coolest?", 
	 choices: ["Manager", "Merch guy", "Bookie", "Drummer"], 
	 answer: "Drummer"
	},

	{
	 question: "What are the things called that drummers hold in their hands?", 
	 choices: ["Strings", "Picks", "Rods", "Sticks"], 
	 answer: "Sticks"
	},

	{
	 question: "What is the part of the drum that you hit with a stick called?",
	 choices: ["The top part", "Snare", "Bass drum", "Heads"], 
	 answer: "Heads"
	}
];



function startQuiz() {
	//1. when you click on the start quiz button, it should clear the HTML of the start page (in the <div> container)
	//2. USE replace() or replaceWith()
	//3. call renderQuestion()?
	console.log("startQuiz() ran");
	$("#startPage button").on("click", function() {
		$("#startPage").hide();
		$("#questionsContainer").show();
		$("#displayScoreQuestionBox").show();
		renderQuestion();
		renderChoices();
		$("#displayCurrentScore").html(`<h3>Score: ${quizScore}</h3>`)
	});
		
}



function renderQuestion() {
	//1. When called - renderQuestion will display the HTML of the current question
	console.log("renderQuestion() ran");
	$("#displayCurrentQuestion").html(`<h1 id="currentQuestion">${QUESTIONS[questionIndex].question}</h1>`);
	$("#displayQuestionIndex").html(`<h3 id="questionPosition">Question number ${questionIndex+1} of 10</h3>`);

}
//




function renderChoices() {
	console.log("renderChoices() ran");
	$("#displayChoiceSelectors").html(`<form id="quizForm" action="" method="post"> <fieldset name="drumQuizChoices">
						<legend>Please select one: </legend><ul>
						<li><input name="choices" id="choiceA" type="radio" value="${QUESTIONS[questionIndex].choices[0]}" required><label for="choiceA">${QUESTIONS[questionIndex].choices[0]}</label></input></li>
						<li><input name="choices" id="choiceB" type="radio" value="${QUESTIONS[questionIndex].choices[1]}" required><label for="choiceB">${QUESTIONS[questionIndex].choices[1]}</label></input></li>
						<li><input name="choices" id="choiceC" type="radio" value="${QUESTIONS[questionIndex].choices[2]}" required><label for="choiceC">${QUESTIONS[questionIndex].choices[2]}</label></input></li>
						<li><input name="choices" id="choiceD" type="radio" value="${QUESTIONS[questionIndex].choices[3]}" required><label for="choiceD">${QUESTIONS[questionIndex].choices[3]}</label></input></li>
						</ul>
						<button type="submit" class="buttons" id="submitAnswer">Submit Answer</button>
					</fieldset>
				</form>`)
}



function renderNextQuestion() {
	console.log("renderNextQuestion() ran");
	//make sure there's an option selected - if not, display 
		$("#nextQuestionButton").on("click", function() {
			//checkAnswer() to validate and see if button.checked = true;
			$("#displayChoiceSelectors").show();
			$("#displayFeedback").empty();
			$("#nextQuestionButton").hide();
			questionIndex++;
			if (questionIndex <= 9) {
				renderQuestion();
				renderChoices();
			} else {
				console.log("quiz end")
				renderFinalResults();
			}
	});
}



function checkAnswer() {
	console.log("checkAnswer() ran");

	$("#displayChoiceSelectors").on("submit", function(event) {
		event.preventDefault();
		$("#displayChoiceSelectors").hide();
		// $("#displayScoreQuestionBox").hide();
		let userChoice = $("input[name=choices]:checked").val();
		let correctAnswer = QUESTIONS[questionIndex].answer;
		if (userChoice === correctAnswer) {
			renderFeedbackCorrect();
			console.log("CORRECT");
		} else {
			renderFeedbackIncorrect();
			console.log("INCORRECT")
		}
	});
}




function renderFeedbackCorrect() {
	console.log("renderFeedbackCorrect() ran");
	updateScore();
	$("#displayFeedback").html(`<strong>${QUESTIONS[questionIndex].answer} is CORRECT!</strong>`);
	$("#nextQuestionButton").show();
	$("#displayCurrentScore").html(`<h3>Score: ${quizScore}</h3>`);
}



function renderFeedbackIncorrect() {
	console.log("renderFeedbackIncorrect() ran")
	$("#displayFeedback").html(`<strong>INCORRECT.</strong> The correct answer is ${QUESTIONS[questionIndex].answer}!`);
	// $("#displayChoiceSelectors").hide();
	$("#nextQuestionButton").show();
	//this will display the HTML explaining that answer is incorrect

}



function renderFinalResults() {
	//this will display the HTML of the final results page
	$("#resultsPage").show()
	$("#questionsContainer").hide();
	$("#currentQuestion").hide();
	$("#displayScoreQuestionBox").hide();
	$("#resultsScore").prepend(`Hmmm... not bad. let's see how you did...<br><br><p>You got <strong>${quizScore}</strong> out of 10 questions correct</p><br><br>`);
}



function updateScore() {
	console.log("updateScore() ran");
	quizScore++;
}



// function resetQuiz() {
// 	location.reload();
// }

function resetQuiz() {
	questionIndex = 0;
	quizScore = 0;
	startQuiz();
	$("#resultsScore").empty();
}

function handleRestartQuiz() {
	console.log("handleRestartQuiz() ran");
	$("#restartButton").on("click", function(event) {
		event.preventDefault();
		resetQuiz();
		$("#startPage").show();
		$("#resultsPage").hide();
	});
}



function handleQuiz() {
	console.log("handleQuiz ran");
	startQuiz();
	checkAnswer();
	renderNextQuestion();
	handleRestartQuiz();
	
}



$(handleQuiz);


// declarative programming - vs imperative programming 
// - check out the shopping list STORE
// factory function
// rubber ducking - 


















/* 

//Scratch Notes

NEED to make sure:
- section things in HTML
- accessibility 
- Ids -



/* Array/object requirements:
1. Need an array to hold the contents of 10 questions.
2. Main question, 4 separate answers
*/


/*
	new Question("Who is the best drummer of all time?", ["RuPaul", "Ringo Starr", "That guy from the Black Keys", "John Bonham"], "John Bonham"),
	new Question("What is the best instrument of all time?", ["Guitar", "Bass", "Keyboard", "Drums"], "Drums"),
	new Question("What is the best band of all time?", ["My Morning Jacket", "Led Zeppelin", "Local Natives", "Tie, they're all great"], "Tie, they're all great"),
	new Question("Which instrument is the foundation of all music?", ["Ukelele", "Saxophone", "Trombone", "Drums"], "Drums"),
	new Question("What would music be without drums?", ["Awesome", "Way better than with drums", "So cool", "Absolutely nothing"], "Absolutely nothing"),
	new Question("Which band member typically is considered 'the glue'?", ["Singer", "Roadie", "Guitarist", "Drummer"], "Drummer"),
	new Question("Which band member is usually/always the coolest, most attractive, and generally more awesome?", ["Singer", "Bassist", "Guitarist", "Drummer"], "Drummer"),
	new Question("Which band member usually gets the least amount of credit but is actually the best/coolest?", ["Manager", "Merch guy", "Bookie", "Drummer"], "Drummer"),
	new Question("What are the things called that drummers hold in their hands?", ["Strings", "Picks", "Rods", "Sticks"], "Sticks"),
	new Question("What is the part of the drum that you hit with a stick called?", ["The top part", "Snare", "Bass drum", "Heads"], "Heads")
*/





/*
Question 1 - Who is the best drummer of all time?
 a: RuPaul
 b: Ringo Starr
 c: That guy from the Black Keys
 d: John Bonham

 Question 2 - What is the best instrument of all time?
 a: Guitar
 b: Bass
 c: Keyboard
 d: Drums

 Question 3 - What is the best band of all time?
 a: My Morning Jacket
 b: Led Zeppelin
 c: Local Natives
 d: Tie, they're all great

 Question 4 - Which instrument is the foundation of all music?
 a: Ukelele
 b: Saxophone
 c: Trombone
 d: Drums

 Question 5 - What would music be without drums?
 a: Awesome
 b: Way better than with drums
 c: So cool
 d: Absolutely nothing

 Question 6 - Which band member typically is considered 'the glue'?
 a: Singer
 b: Roadie
 c: Guitarist
 d: Drummer

 Question 7 - Which band member is usually/always the coolest, most attractice, and generally more awesome?
 a: Singer
 b: Bassist
 c: Guitarist
 d: Drummer

 Question 8 - Which band member usually gets the least amount of credit but is actually the best?
 a: Manager
 b: Merch guy
 c: Bookie
 d: Drummer


 Question 9 - What are the things called that drummers hold in their hands?
 a: Strings
 b: Picks
 c: Rods
 d: Sticks

 Question 10 - What is the part of the drum that you hit with a stick called?
 a: The top part
 b: Snare
 c: Bass drum
 d: Heads

*/








