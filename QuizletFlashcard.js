// ==UserScript==
// @name         quizlet flashcard parser
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://quizlet.com/*/flashcards
// @grant        none
// ==/UserScript==

(() => {
	const validationBox = document.createElement("textarea");
	validationBox.cols = 100;
	validationBox.rows = 10;
	let boxInserted = false;
	let fullQuestionSet = [];

	const container = document.querySelector("body");
	const mutationConfig = {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: false,
        characterDataOldValue: false
    };

    const cardParser = (textBody, answer) => {
    	let questionText;
    	let answers = [];
    	let answerLetters = ["a", "b", "c", "d", "e", "f"];
    	let correctAnswers = answer.split(",");
    	let parantheses = false;

    	if(textBody.includes("A.")) {
    		questionText = textBody.slice(0, textBody.indexOf("A."));
    	} else if(textBody.includes("a)")) {
    		questionText = textBody.slice(0, textBody.indexOf("a)"));
    		parantheses = true;
    	}

    	textBody = textBody.replace(questionText, "");
    	const question = questionText.trim();

    	let i = 0;

    	while(textBody.length > 1) {
    		let answerText;

    		if(!parantheses) {
    			answerText = textBody.slice(0, textBody.indexOf(`${answerLetters[i + 1].toUpperCase()}.`));
    		} else {
    			console.log(textBody.slice(0, textBody.indexOf(`${answerLetters[i + 1]})`)));
    			answerText = textBody.slice(0, textBody.indexOf(`${answerLetters[i + 1]})`));
    		}

    		console.log(answerText);
    		
    		let correct = false;

    		if(correctAnswers.includes(answerText.charAt(0).toLowerCase()) && correctAnswers.length > 0) {
    			correct = true;
    			delete correctAnswers[correctAnswers.indexOf(answer.charAt(0))];
    		}

    		textBody = textBody.replace(answerText, "");

    		answerText = answerText.substring(3).trim();

    		if(textBody.length === 1) {
    			answerText = answerText + textBody;
    		}

    		answers.push({
    			answer: answerText,
    			correct
    		});

    		i++;
    	}

    	return {question, answers};
    	//console.log(answers);
    }

    const onMutate = mutationsList => {
    	mutationsList.forEach(mutation => {
    		//console.log(mutation.target.className);

    		if(document.querySelector("div.CardsViewController") && !boxInserted) {
    			document.querySelector("div.CardsViewController").prepend(validationBox);
    			boxInserted = true;
    		}

			let card = document.querySelectorAll("div.CardsItemSide-cell");
			let textBody = card[0].querySelector("div").getAttribute("aria-label");
			let answers = card[1].querySelector("div").getAttribute("aria-label");
			let questionAndAnswer = cardParser(textBody, answers);
			validationBox.value = JSON.stringify(questionAndAnswer) + ",";
			fullQuestionSet.push(questionAndAnswer);
    	});
    }

    const observer = new MutationObserver(onMutate);
	observer.observe(container, mutationConfig);
})();
