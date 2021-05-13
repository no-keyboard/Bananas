// ==UserScript==
// @name         axs get tickets
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.axs.com/events/*
// @icon         https://www.google.com/s2/favicons?domain=axs.com
// @grant        none
// ==/UserScript==

(() => {
	let pageBtns = document.querySelectorAll("a");
	for(btn of pageBtns) {
		console.log(btn.innerText);

		if(btn.innerText.trim().includes("GET TICKETS")) {
			console.log("button found");
			btn.click();
			break;
		}
	}
})();
