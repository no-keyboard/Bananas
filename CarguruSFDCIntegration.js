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

// if(window.location.href.indexOf("https://www.cargurus.com/Cars/inventorylisting/") > -1 && window.location.href.indexOf("#listing=") === -1) {
// 	const listingSearch = document.querySelector("#cargurus-listing-search");

// 	const callback = function(mutationsList, observer) {
// 		for(let mutation of mutationsList) {
// 			console.log(mutation);
// 		}
// 	}

// 	const observer = new MutationObserver(callback);
// 	observer.observe(listingSearch, config);
// 	// const gt4Checkbox = document.querySelector("#TRIM_NAME-GT4");
// 	// gt4Checkbox.checked = true;
// }

if(window.location.href.indexOf("https://www.cargurus.com/Cars/inventorylisting/") > -1 && window.location.href.indexOf("#listing=") > -1) {
	const listingSearch = document.querySelector("#cargurus-listing-search");
	let sidebarButtons;
	let integrationBtn

	const sfdcPost = function(listingObj) {
		console.log("json to post", listingObj);
	}

	const addButton = function() {
		integrationBtn = sidebarButtons.querySelector("div").cloneNode(true);
		integrationBtn.querySelector("button > span").innerHTML = "Salesforce";
		integrationBtn.querySelector("button > span > svg").remove();
		let icon = document.createElement("span");
		icon.innerHTML = "&#9729;";
		integrationBtn.querySelector("button > span").appendChild(icon);
		//console.log(integrationBtn.querySelector("button > span > svg"));
		sidebarButtons.appendChild(integrationBtn);
	}

	const getListingSummaryVal = function(table, value) {
		let tableLabels = table.querySelectorAll("dt");
		let tableValues = table.querySelectorAll("dd");
		for(let i = 0; i < tableLabels.length; i++) {
			if(tableLabels[i].innerText.slice(0, -1) === value) {
				return tableValues[i];
			}
		}
	}

	const parseListing = function() {
		let listingSummary = listingSearch.querySelector("div._43PKvB > div._36TanG > div._24ffzL > div._5jSLnT > section > h2").parentNode.querySelector("dl");
		let listingInfo = new Object();
		listingInfo.name = listingSearch.querySelector("div._43PKvB > div._36TanG > div._24ffzL > div._3Wnbei > div:nth-child(3) > section > div:nth-child(1) > form > p > strong").innerText;
		listingInfo.price = getListingSummaryVal(listingSummary, "Dealer's Price").querySelector("strong").innerText.replace("$", "").replace(",", "");
		listingInfo.miles = getListingSummaryVal(listingSummary, "Mileage").innerText.replace(",", "").replace(" miles", "");
		listingInfo.color = getListingSummaryVal(listingSummary, "Exterior Color").innerText;
		listingInfo.vin = getListingSummaryVal(listingSummary, "VIN").innerText;
		listingInfo.trans = getListingSummaryVal(listingSummary, "Transmission").innerText;
		listingInfo.url = window.location.href;
		//todo get the listing's age
		listingInfo.postAge = null
		console.log("parsed listing", listingInfo);
		return listingInfo;
	}

	const callback = function(mutationsList, observer) {
		for(let mutation of mutationsList) {
			if(listingSearch.querySelector("div > div > div > div > div > button > span") !== null) {
				sidebarButtons = listingSearch.querySelector("div > div > div > div > div > button > span").parentNode.parentNode.parentNode;
				//console.log(sidebarButtons);
				observer.disconnect();
				break;
			}
		}

		addButton();
		let listingDetails = parseListing();
		sfdcPost(listingDetails);
	}

	const observer = new MutationObserver(callback);
	observer.observe(listingSearch, config);
}
