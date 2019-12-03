// ==UserScript==
// @name         jira search
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://jira.*
// @grant        none
// ==/UserScript==

document.querySelector("#content > div.navigator-container > div.navigator-body > div > form > div.aui-group > div.aui-item.search-wrap > div.search-container > div.search-field-container > div > div.search-criteria > ul > li:nth-child(7) > button").addEventListener("click", function(event) {
	event.stopPropagation();
    document.querySelector("#content > div.navigator-container > div.navigator-body > div > header").prepend('test');
});

document.addEventListener("click", function(event) {
    console.log(event.target.value);
	if(event.target.id == 'issuetype-field') {
	    console.log(event.target.value);
	}
});
