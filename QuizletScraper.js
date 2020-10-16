// ==UserScript==
// @name         quizlet scraper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://quizlet.com/*/*/
// @grant        none
// ==/UserScript==

(() => {
	const exportCards = () => {
        const cardList = document.querySelector("#setPageSetDetails > div.SetPage-setDetailsTermsWrapper > div > div:nth-child(2) > div > div > section > div > section");

		//create new array to store questions
		let csv = [];

		cardList.childNodes.forEach((card) => {
			try {
				//console.log(card);
				let question = card.querySelector("div.SetPageTerm-smallSide");
				let answer = card.querySelector("div.SetPageTerm-largeSide");

				//for some reason some questions are clickable
				if(question) {
					question = question.querySelector("span.TermText").innerHTML;
				} else {
					question = card.querySelectorAll("div.SetPageTerm-sideContent")[0].querySelector("span.TermText").innerHTML;
				}

				if(answer) {
					answer = answer.querySelector("span.TermText").innerHTML;
				} else {
					answer = card.querySelectorAll("div.SetPageTerm-sideContent")[1].querySelector("span.TermText").innerHTML;
				}

				//create temp object to collect values
				let questionSet = {};
				questionSet.question = question;
				// add commas between characters
				questionSet.answer = answer;
				csv.push(questionSet);
			} catch(err) {
				console.log(err, card);
			}
		});

		console.log(JSON.stringify(csv));
	}

	const exportBtn = document.createElement("button");
	exportBtn.innerHTML = "Export Cards";
	exportBtn.onclick = exportCards;
	document.body.prepend(exportBtn);
})();
