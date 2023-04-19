// ==UserScript==
// @name         Scraping POC
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.reddit.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    setTimeout(() => {
    	let csvContent = "data:text/csv;charset=utf-8,";
	    const elements = document.querySelectorAll('div[data-testid="post-container"]');

	    elements.forEach(element => {
	    	const postTitle = element.querySelector("h3").innerText;
	    	console.log(postTitle);
	    	const postSubreddit = element.querySelector('a[data-click-id="subreddit"]');

	    	if(postSubreddit) {
	    		console.log(postSubreddit.text);
	    		csvContent += postTitle + "," + postSubreddit.text + "\r\n"; 
	    	}
	    });

	    let encodedUri = encodeURI(csvContent);
		window.open(encodedUri);
	}, 2000);

	
})();
