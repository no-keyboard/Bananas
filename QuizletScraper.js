// ==UserScript==
// @name         quizlet scraper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://quizlet.com/*/*/
// @grant        none
// ==/UserScript==

const cardList = document.querySelector("#SetPageTarget > div > div.SetPage-setDetails > div.SetPage-setDetailsTermsWrapper > div > div > section > div > section");

const exportCards = () => {
	//create new array to store questions
	let csv = [];

	cardList.childNodes.forEach((card, i) => {
		let divChildSelect = i + 1;
		let question = card.querySelector("div:nth-child(" + divChildSelect + ") > div > div > div.SetPageTerm-contentWrapper > div > div.SetPageTerm-side.SetPageTerm-largeSide > div > span > span");

		//for some reason some questions are clickable
		if(question == null) {
			question = document.querySelector("div:nth-child(" + divChildSelect + ") > div > div > div.SetPageTerm-contentWrapper > div > div.SetPageTerm-side.SetPageTerm-largeSide > div > a > span").innerHTML;
		} else {
			question = question.innerHTML;
		}
				   
		let answer = card.querySelector("div:nth-child(" + divChildSelect + ") > div > div > div.SetPageTerm-contentWrapper > div > div.SetPageTerm-side.SetPageTerm-smallSide > div > a > span").innerHTML;
		
		//create temp object to collect values
		let questionSet = {};
		questionSet.question = question;
		// add commas between characters
		questionSet.answer = answer.split("").join(",");
		csv.push(questionSet);

		// console.log("question #: ", divChildSelect);
		// console.log(question);
		// console.log("answer: ", answer);
	});

	console.log("object", JSON.stringify(csv));
}

const exportBtn = document.createElement("button");
exportBtn.innerHTML = "Export Cards";
exportBtn.onclick = exportCards;
document.body.prepend(exportBtn);
