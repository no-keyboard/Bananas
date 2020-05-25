// ==UserScript==
// @name         nookazon quick relist
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://nookazon.com/*
// @grant        none
// ==/UserScript==

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
					
					relistBtn.innerHTML = "Relist";
					relistBtn.classList.add("btn-alt");
					relistBtn.onclick = () => {
						window.open(urlAppend, "_blank");
						for(let i=0; i<actionBtns.length; i++) {
							if(actionBtns[i].innerText === "Remove") {
								console.log(actionBtns[i]);
								actionBtns[i].firstChild.click();
								break;
							}
						}
					}
					listing.childNodes[1].append(relistBtn);
					
					listingUrls.push(urlAppend);
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

				listingTable.prepend(relistAllBtn);
			}
		}

		if(window.location.href.indexOf("?autolist") > -1) {
			let productActionBar = document.querySelector(".product-action-bar")

			if(productActionBar) {
				let listingBtn = productActionBar.firstChild.firstChild;
				let evt = new Event('change', { bubbles: true });
				//console.log(listingBtn.firstChild);
				listingBtn.click();
				let diyCheck = document.querySelector(".create-listing-diy input");
				let pricingChecks = document.querySelectorAll(".product-pricing-option");
				let createListingBtn = document.querySelector(".create-listing-btn");

				diyCheck.click();
				
				//console.log(pricingChecks);
				for (let i=0; i<pricingChecks.length; i++) {
					if(pricingChecks[i].innerText === "Ask for Offers") {
						pricingChecks[i].firstChild.click();
						pricingChecks = document.querySelectorAll(".product-pricing-option");
						break;
					}
				}

				for (let i=0; i<pricingChecks.length; i++) {
					if(pricingChecks[i].innerText === "NMT") {
						pricingChecks[i].firstChild.click();
						break;
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

