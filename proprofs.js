// ==UserScript==
// @name         proprofs scraper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.proprofs.com/quiz-school/*
// @grant        none
// ==/UserScript==

(() => {
    let questionSet = [];
    let i = 0;
    const questionCount = document.querySelector("#question_area > div.qs_show_wrap > span").innerText.split("/")[1].trim();
    const alphabet = ["a", "b", "c", "d", "e"];
    const getQuestion = () => {
    	setTimeout(() => {
	    	let questionText = document.querySelector("#m_question_desc").innerText;
	    	let answerBox = document.querySelector(".answer_boxes");
	    	let nextQuestionBtn = document.querySelector("span[title='Next Question']");
	    	let answerSet = [];
	    	let j = 0;

	    	for(let answer of answerBox.querySelectorAll(".quiz_tablediv")) {
	    		let answerText = answer.querySelector(".text_style").innerText
	    			.replace("A. ", "")
	    			.replace("B. ", "")
	    			.replace("C. ", "")
	    			.replace("D. ", "")
	    			.replace("E. ", "");
	    		
	    		answerSet.push(`${alphabet[j]}. ${answerText}`);
	    		
	    		j++;
	    	}

	    	questionSet.push({
	    		question: questionText,
	    		answers: answerSet,
	    		correct: ""
	    	});

	    	if(i < questionCount) {
	    		nextQuestionBtn.click();
	    		getQuestion();
	    		i++;
	    	} else {
	    		console.log(JSON.stringify(questionSet));
	    	}
	    }, 1000);
    }

    const startBtn = document.createElement("button");
    startBtn.innerText = "Start!";
    startBtn.onclick = () => {
    	console.log("Starting!");
    	getQuestion();
    };
    document.querySelector("body").prepend(startBtn);
})();
