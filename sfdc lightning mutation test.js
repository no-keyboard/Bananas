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
			var modalBody = element.querySelector('.modal-body');

			//using the console to drill down to where the fields are. it's saying to go into the modal body and get me the first div and within that, the first article, and within that, the first div with that class, etc.
			var modalPageLayout = modalBody.querySelector('div > article > div.test-id__record-layout-container.riseTransitionEnabled > div');

			//console.log(mutation.target.querySelector('.modal-header.slds-modal__header'));
            //console.log(mutation.target.querySelector('.modal-header'));
			//console.log(element.className);
            //console.log(element.children);
            //console.log(mutation.target.querySelector('.modal-body'));

            //see what page layout sections are available
            console.log(modalPageLayout.children);

            //selecting the section within the page layout
            console.log(modalPageLayout.querySelector('div'));

		}
	});
};

var observer = new MutationObserver(onMutate);
observer.observe(container, mutationConfig);
