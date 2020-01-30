// ==UserScript==
// @name         runaway
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://language-dev-ed.my.salesforce.com/*
// @grant        none
// ==/UserScript==

const move = (event) => {
    let button = event.target;
    //console.log(button);
    button.style.marginTop = rng();
    button.style.marginLeft = rng();
    //console.log('margin', button.style.marginTop);
}

const rng = () => {
	return Math.random() * 300 + "px";
}

window.onload = () => {
	const newBtn = document.querySelector("#hotlist > table > tbody > tr > td.pbButton > input");
    newBtn.style.position = "absolute";
	newBtn.addEventListener('mouseover', move);
}
