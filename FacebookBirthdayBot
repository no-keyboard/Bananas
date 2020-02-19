// ==UserScript==
// @name         facebook birthday bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.facebook.com/events/birthdays/
// @grant        none
// ==/UserScript==

const dateString = new Date();

const bdayMessage = `[${dateString}] MESSAGE=HAPPY_BIRTHDAY; RECIPIENT=`;

const getBirthdays = () => {
	let recentBirthdaysList = document.getElementsByClassName("_4-u2 _tzh _4-u8");
	//console.log(recentBirthdaysList[0]);
	let birthdayList = recentBirthdaysList[0].querySelector("div ul");
	//console.log(birthdayList);
	postMessage(birthdayList);
}

const nameFormatter = name => {
	let nameArray = name.split(" ", 2);
	let firstName = nameArray[0].toUpperCase();
	let lastName = nameArray[1].toUpperCase();
	return `${lastName}_${firstName}`;
}

const postMessage = bdayList => {
	bdayList.childNodes.forEach(friend => {
		let listItem = friend.querySelector("div > div > div > div > div > div:nth-child(2)");
		let friendName = listItem.querySelector("div._tzn > a").title;
		let textBox = listItem.querySelector("form > div > div > div > div > div.innerWrap > textarea");
		//console.log(textBox);
		let friendNameFormat = nameFormatter(friendName);
		let bdayPostMessage = `${bdayMessage}${friendNameFormat};`;
		textBox.value = bdayPostMessage;
		// enterKeypress = new KeyboardEvent("keydown", {
		// 	key: "enter"
		// });
		//console.log(bdayPostMessage);
	});
}

window.onload = () => {
	let startBtn = document.createElement("button");
	let recentBirthdaysHeader = document.getElementById("birthdays_today_card");
	startBtn.innerHTML = "do the thing";
	startBtn.onclick = getBirthdays;
	recentBirthdaysHeader.prepend(startBtn);
}
