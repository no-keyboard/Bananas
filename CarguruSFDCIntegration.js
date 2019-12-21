// ==UserScript==
// @name         cargurus sfdc scraper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.cargurus.com/*
// @grant        none
// ==/UserScript==

const config = {
		attributes: true,
		childList: true,
		subtree: true
	};

if(window.location.href === "https://www.cargurus.com/") {
	const make = document.querySelector("#carPickerUsed_makerSelect");
	const makeVals = make.options;
	const model = document.querySelector("#carPickerUsed_modelSelect");
	const zip = document.querySelector("#dealFinderZipUsedId_dealFinderForm");
	const zipValue = '11214'
	var modelVals;

	var makeIndex;
	var modelIndex;

	//console.log('dropdown vals', make.options);
	for(let i = 0; i < makeVals.length; i++) {
		if(makeVals[i].text === "Porsche") {
			//console.log('value id: ', makeVals[i].value);
			makeIndex = makeVals[i].value;
			break;
		}
	}

	make.value = makeIndex;
	//simulate selecting a pickval so that the next picklist loads
	var evt = document.createEvent("HTMLEvents");
	//p1: type, p2: bubbles up?, p3: cancelable
	evt.initEvent("change", false, true);
	//take the event i just created and run it against the make picklist
	make.dispatchEvent(evt);
	//console.log(make.value);

	const callback = function(mutationsList, observer) {
		for(let mutation of mutationsList) {
			// console.log(mutation);
			// console.log(mutation.target.options.length);
			modelVals = mutation.target.options;
			if(mutation.target.options.length > 1) {
				break;
			}
		}

		for(let i = 0; i < makeVals.length; i++) {
			if(modelVals[i].text === "Cayman") {
				//console.log('value id: ', modelVals[i].value);
				modelIndex = modelVals[i].value;
				break;
			}
		}

		model.value = modelIndex;
		observer.disconnect();
	}

	//must be after callback defined
	const observer = new MutationObserver(callback);
	observer.observe(model, config);

	zip.value = zipValue;
}

if(window.location.href.indexOf("https://www.cargurus.com/Cars/inventorylisting/") > -1 && window.location.href.indexOf("#listing=") === -1) {
	const listingSearch = document.querySelector("#cargurus-listing-search");

	const callback = function(mutationsList, observer) {
		for(let mutation of mutationsList) {
			console.log(mutation);
		}
	}

	const observer = new MutationObserver(callback);
	observer.observe(listingSearch, config);
	// const gt4Checkbox = document.querySelector("#TRIM_NAME-GT4");
	// gt4Checkbox.checked = true;
}

if(window.location.href.indexOf("https://www.cargurus.com/Cars/inventorylisting/") > -1 && window.location.href.indexOf("#listing=") > -1) {
	
}
