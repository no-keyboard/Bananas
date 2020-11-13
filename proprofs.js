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
    let i = 1;
    const questionCount = document.querySelector("#question_area > div.qs_show_wrap > span").innerText.split("/")[1].trim();
    const getQuestion = () => {
    	setTimeout(() => {
    		console.info(`Processing question ${i} of ${questionCount}`);

    		let submitBtn = document.querySelector("div.new_bottom_next_btn");
    		submitBtn.click();

	    	let questionText = document.querySelector("span.after_question") ? document.querySelector("span.after_question").innerText : document.querySelector("#m_question_desc").innerText;
	    	let answerBox = document.querySelector("div.answer_boxes");
	    	let answerSet = [];
	    	let notes = [];  		

	    	for(let answer of answerBox.querySelectorAll("div.quiz_tablediv")) {
	    		let answerText = answer.querySelector(".text_style").innerText
	    			.replace("A. ", "")
	    			.replace("B. ", "")
	    			.replace("C. ", "")
	    			.replace("D. ", "")
	    			.replace("E. ", "");
	    		let correct = false;

	    		if(answer.querySelector("span.succ1")) {
	    			correct = true;
	    		}
	    		
	    		answerSet.push({
	    			answer: answerText,
	    			correct
	    		});
	    	}

	    	if(parseInt(document.querySelector("p.quiz_takers_res").innerText) <= 70) {
	    		notes.push(document.querySelector("p.quiz_takers_res").innerText);
	    	}

	    	if(answerSet.length != 4 && answerSet.length != 5) {
	    		notes.push(`This question has ${answerSet.length} answers.`);
	    	}

	    	questionSet.push({
	    		question: questionText,
	    		answers: answerSet,
	    		notes
	    	});

	    	if(i <= questionCount) {
	    		getQuestion();
	    		i++;
	    	} else {
	    		console.log(JSON.stringify(questionSet));
	    	}
	    }, 1250);
    }

    const startBtn = document.createElement("button");
    startBtn.innerText = "Start!";
    startBtn.onclick = () => {
    	console.log("Starting!");
    	getQuestion();
    };
    document.querySelector("body").prepend(startBtn);
})();
