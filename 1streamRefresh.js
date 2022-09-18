// ==UserScript==
// @name         1stream auto refresh
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://1stream.top/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=1stream.top
// @grant        none
// ==/UserScript==

(() => {
    'use strict';
    const container = document.querySelector("body");
    const mutationConfig = {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: false,
        characterDataOldValue: false
    };

    const onMutate = mutationsList => {
    	mutationsList.forEach(mutation => {
    		if(document.querySelector("div.player-error-screen")) {
    			console.log(mutation);
    			location.reload();
    		}

            if(document.querySelector("div.play-wrapper svg path") && getComputedStyle(document.querySelector("#video-player > div > div.container > div.spinner-three-bounce")).display == "none") {
            	console.log("play button found");

            	document.querySelector("#video-player > div > div.container > div.player-poster.clickable").dispatchEvent(new Event("click"));
            }
    	});
    }

	const observer = new MutationObserver(onMutate);
	observer.observe(container, mutationConfig);
})();
