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

var whatField = "Language";
var fieldSet;

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
            //console.log(modalPageLayout.children);

            //selecting the section within the page layout
            var modalPageSection = modalPageLayout.children[0];
            //console.log(modalPageSection);

            //fields in page section
            var fields = modalPageSection.querySelector('div > div > div > div > div').children;
            //console.log(fields);

            for(let i = 0; i < fields.length; i++) {
            	let field = fields[i].querySelector('div > div > div > div > div > div > div > div > div > div');

            	if(field.querySelector('span').innerText === whatField) {
                    console.log(field);
                    fieldSet = field;
                }
            }

            // fields.forEach((field, index) => {
            // 	console.log(field);
            // });

            //field label and field
            // var labelAndField = fields[1].querySelector('div > div > div > div > div > div > div > div > div > div');
            // console.log(labelAndField);

            //console.log(labelAndField.querySelector('span[class*=label]'));
            // console.log(labelAndField.querySelector('span[innerText=Language]'));
		}
	});
};

var observer = new MutationObserver(onMutate);
observer.observe(container, mutationConfig);
