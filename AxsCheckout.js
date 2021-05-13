// ==UserScript==
// @name         axs to checkout
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://tix.axs.com/*
// @icon         https://www.google.com/s2/favicons?domain=axs.com
// @grant        none
// ==/UserScript==

(function() {
	const container = document.querySelector("body");
	const mutationConfig = {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: false,
        characterDataOldValue: false
    };
    let ticketLimit;
    let addQtyBtn;
    let purchaseQty = 1;
    let findTicketsClicked = false;

    const onMutate = mutationsList => {
    	mutationsList.forEach(mutation => {
            let element = mutation.target;
            //console.log(element);

            if(document.querySelector("div.module__title--subtitle") && !ticketLimit) {
            	ticketLimit = document.querySelector("div.module__title--subtitle").innerText.substr(0,1);
            	console.log(`Ticket limit set to ${ticketLimit}`);
            }

            if(document.querySelector("button.number-selector-fancy__plus") && !addQtyBtn) {
            	addQtyBtn = document.querySelector("button.number-selector-fancy__plus");
            }

            if(addQtyBtn && !addQtyBtn.disabled) {
            	addQtyBtn.click();
            	purchaseQty++;
            }

            if(addQtyBtn && addQtyBtn.disabled && !findTicketsClicked) {
            	document.querySelector("#tickets-search").click();
            	findTicketsClicked = true;
            }
        });
    }

    // let pageButtons = document.querySelector("div.number-selector-fancy").querySelectorAll("button");
    // for(let btn of pageButtons) {
    //     console.log(btn);
    //     if(btn.classList.includes("number-selector-fancy__plus")) {
    //        btn.click();
    //        }
    // }

	const observer = new MutationObserver(onMutate);
	observer.observe(container, mutationConfig);
})();
