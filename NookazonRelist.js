// ==UserScript==
// @name         nookazon quick relist
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://nookazon.com/*
// @grant        none
// ==/UserScript==

///////CONFIGURATION/////////
const ACCEPT_NMT = true;
const ACCEPT_BELLS = true;
const ACCEPT_WISHLIST = true;
/////////////////////////////

const container = document.querySelector('body');
const mutationConfig = {attributes: false,
                        childList: true,
                        subtree: true,
                        characterData: false,
                        characterDataOldValue: false };

const observer = new MutationObserver(onMutate = mutationsList => {
	mutationsList.forEach(mutation => {
		if(window.location.href.indexOf("/listings") > -1) {
			let listingTable = document.querySelector(".listing-table");
			let relistAllBtn = document.getElementById("relistAllBtn");

			if(listingTable && !relistAllBtn) {
				let listings = document.querySelectorAll(".listing-content");
				let listingUrls = [];

				observer.disconnect();

				listings.forEach(listing => {
					let listingUrl = listing.childNodes[0].firstElementChild.href;
					//console.log(listing);
					let actionBtns = listing.querySelectorAll(".listing-action-bar > .listing-btn-container");
					//console.log(removeBtn);
					let relistBtn = document.createElement("button");
					let urlAppend = `${listingUrl}?autolist`;
					let diyFlag = false;
					let listingName = listing.querySelector("div > div > div .listing-product-info > div .listing-name").innerText;

					if(listingName.indexOf("DIY Recipe") > -1) {
						diyFlag = true;
						urlAppend = urlAppend.concat("&diy");
					}
					
					relistBtn.innerHTML = "Relist";
					relistBtn.classList.add("btn-alt");
					relistBtn.id = "relistBtn"
					relistBtn.onclick = () => {
						window.open(urlAppend, "_blank");
						for(let i=0; i<actionBtns.length; i++) {
							if(actionBtns[i].innerText === "Remove") {
								console.log(actionBtns[i]);
								//click the remove button
								actionBtns[i].firstChild.click();
								break;
							}
						}
					}

					//console.log(listing.childNodes[1].childNodes.length);
					if(listing.childNodes[1].childNodes.length === 2) {
						listing.childNodes[1].append(relistBtn);
					}
					
					listingUrls.push({
						url: urlAppend,
						diy: diyFlag});
				});

				//console.log(listingUrls);

				relistAllBtn = document.createElement("button");
				relistAllBtn.innerHTML = "Relist All";
				relistAllBtn.id = "relistAllBtn";
				relistAllBtn.onclick = () => {
					listingUrls.forEach(url => {
						let iframe = document.createElement("iframe");
						iframe.setAttribute("src", url);
						iframe.style.width = "1000px";
						iframe.style.height = "1000px";
						document.body.appendChild(iframe);
					});
				}

				//listingTable.prepend(relistAllBtn);
			}
		}

		if(window.location.href.indexOf("?autolist") > -1) {
			let productActionBar = document.querySelector(".product-action-bar");

			if(productActionBar) {
				let listingBtn = productActionBar.firstChild.firstChild;
				listingBtn.click();

				if(window.location.href.indexOf("&diy") > -1) {
					let diyCheck = document.querySelector(".create-listing-diy input");
					diyCheck.click();
				}
				let pricingChecks = document.querySelectorAll(".product-pricing-option");
				let createListingBtn = document.querySelector(".create-listing-btn");
				
				//console.log(pricingChecks);
				for (let i=0; i<pricingChecks.length; i++) {
					if(pricingChecks[i].innerText === "Ask for Offers") {
						pricingChecks[i].firstChild.click();
						pricingChecks = document.querySelectorAll(".product-pricing-option");
						break;
					}
				}

				for (let i=0; i<pricingChecks.length; i++) {
					if(pricingChecks[i].innerText === "NMT" && ACCEPT_NMT) {
						pricingChecks[i].firstChild.click();
					} else if(pricingChecks[i].innerText === "Bells" && ACCEPT_BELLS) {
						pricingChecks[i].firstChild.click();
					} else if(pricingChecks[i].innerText === "Wishlist Items" && ACCEPT_WISHLIST) {
						pricingChecks[i].firstChild.click();
					}
				}

				createListingBtn.click();
				
				setTimeout(() => {
					window.close();
				}, 200);
			}
		}
	})
});

observer.observe(container, mutationConfig);

