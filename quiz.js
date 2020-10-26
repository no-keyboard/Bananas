require('dotenv').config();
const pg = require('pg');
const cs = process.env.DATABASE.replace('<USER>', process.env.USER).replace('<PASSWORD>', process.env.PASSWORD);
const client = new pg.Client(cs);
const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let questionSet = [];
let i = 1;
let countCorrect = 0;
let countWrong = 0;

init = async () => {
	try {
		client.connect();
		const res = await client.query(`SELECT * FROM question`);
		questionSet = res.rows;
	} catch(err) {
		console.error(err);
	}
}

nextQuestion = async () => {
	let answers = [];
	let correct = [];
	const alpha = ['a', 'b', 'c', 'd', 'e'];
	const questionIndex = Math.floor(Math.random() * 100);
	const currentQuestion = questionSet[questionIndex];

	console.log(`${i}. ${currentQuestion.question}`);

	try {
		const res = await client.query(`SELECT * FROM answer WHERE related_to = ${currentQuestion.id}`);
		answers = res.rows;
		//console.log(answers);
	} catch(err) {
		console.error(err);
	}

	answers.forEach((answer, i) => {
		let prefix = alpha[i];
		console.log(`${prefix}. ${answer.answer_text}`);
		if(answer.correct) {
			correct.push(prefix);
		}
	});

	//console.log(`correct answers: ${correct.join(",")}`);

	rl.question(`${correct.length} answer(s): `, inputAnswers => {
		if(inputAnswers === correct.join(",")) {
			countCorrect++;
			console.log(`✅ \n`);
		} else {
			countWrong++;
			console.log(`❌ ${correct} \n`);
		}

		if(questionSet.length > 1) {
			questionSet.splice(questionIndex, 1);
			console.log(`Remaining: ${questionSet.length} | Correct: ${countCorrect} (${(countCorrect / i) * 100}%) \n`);
			i++;
			nextQuestion();
		} else {
			console.log('Practice exam completed!');
			console.log(`Correct: ${countCorrect}`);
			console.log(`Wrong: ${countWrong}`);
		}
	});
}

logWrongAnswer = (question, correctAnswers) => {
	//asdf
}

(async () => {
	await init();
	await console.log(`${questionSet.length} questions loaded! \n`);
	await nextQuestion();
})();

