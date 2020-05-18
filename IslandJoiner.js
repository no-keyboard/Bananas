// ==UserScript==
// @name         ac island join
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  this is hella nerdy
// @author       You
// @match        
// @grant        none
// ==/UserScript==

const playerName = '';
const container = document.querySelector('body');
const mutationConfig = {attributes: false,
                        childList: true,
                        subtree: true,
                        characterData: false,
                        characterDataOldValue: false };
let joinOpenBtnPressed = false;
let joined = false;
let finish = false;

onMutate = mutationsList => {
	mutationsList.forEach(mutation => {
		if(!joinOpenBtnPressed) {
			let joinOpenBtn = findButton('Join this queue');
			
			if(joinOpenBtn) {
				setTimeout(() => {
                    			joinOpenBtn.click();
                    			joinOpenBtnPressed = true;
                		}, 500);
			}
		}

		if(joinOpenBtnPressed && !joined) {
			let joinQueueBtn = findButton('Join');
			let nameInput = document.querySelector('input');

			if(nameInput) {
				let evt = new Event('input');
				nameInput.value = playerName;
				nameInput.dispatchEvent(evt);

				//click join button
				joinQueueBtn.click();
				joined = true;
			}
		}

		if(joined && !finish) {
			let closeBtn = findButton('Cancel');

			if(closeBtn) {
				closeBtn.click();
				finish = true;
				observer.disconnect();
			}
		}
	});
}

findButton = label => {
	btnSet = document.querySelectorAll('button');

	for(btn of btnSet) {
		if(btn.innerText === label) {
			return btn;
		}
	}
}

const observer = new MutationObserver(onMutate);
observer.observe(container, mutationConfig);
