// ==UserScript==
// @name         sfdc lightning mutation test
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://language-dev-ed.lightning.force.com/lightning/*
// @grant        none
// ==/UserScript==

const container = document.querySelector('html body.desktop div.desktop.container.forceStyle.oneOne.lafStandardLayoutContainer.lafAppLayoutHost.forceAccess');

// const container = document.querySelector('html body.desktop div.desktop.container.forceStyle.oneOne.lafStandardLayoutContainer.lafAppLayoutHost.forceAccess div.DESKTOP.uiContainerManager');

const mutationConfig = { attributes: false, childList: true, subtree: true, characterData: false,
    characterDataOldValue: false };

var onMutate = function(mutationsList) {
	mutationsList.forEach(mutation => {
		if(mutation.target.className === 'modal-container slds-modal__container') {
			var element = mutation.target;
			console.log(mutation.target.querySelector(div.));
			console.log(element.className);

		}
	});
};

var observer = new MutationObserver(onMutate);
observer.observe(container, mutationConfig);
