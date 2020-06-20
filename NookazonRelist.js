// ==UserScript==
// @name         nookazon quick relist
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://nookazon.com/*
// @grant        none
// ==/UserScript==

///////CONFIGURATION/////////
const LISTINGS_AUTO_REFRESH = false;
const DEBUG = false;
/////////////////////////////

const container = document.querySelector('body');
const mutationConfig = {attributes: false,
                        childList: true,
                        subtree: true,
                        characterData: false,
                        characterDataOldValue: false };
const currentUrl = new URL(window.location.href);
const path = currentUrl.pathname;
const urlParams = new URLSearchParams(currentUrl.search);

const observer = new MutationObserver(onMutate = mutationsList => {
	mutationsList.forEach(mutation => {
		
		//for the profile listing page
		if(path.indexOf("listings") > -1) {
			let listingTable = document.querySelector(".listing-table");
			let relistAllBtn = document.getElementById("relistAllBtn");

			if(listingTable && !relistAllBtn) {
				let listings = document.querySelectorAll(".listing-content");
				let listingUrls = [];

				observer.disconnect();

				listings.forEach(listing => {
					// console.log(listing);
					let listingInfoContainer = listing.querySelector("div.listing-item-link > div > a");
					let listingPriceContainer = listing.querySelector("div.listing-item-link > div.listing-product-info > div div div div div");
					let listingUrl = listingInfoContainer.href;
					let addParams = new URLSearchParams();
					let listingImg = listingInfoContainer.querySelector(".listing-img-container > img").src.replace("https://cdn.nookazon.com/housewares/", "").replace(".png", "").replace("https://cdn.nookazon.com/miscellaneous/", "");
					//console.log(listingImg);
					let actionBtns = listing.querySelectorAll(".listing-action-bar > .listing-btn-container");
					//console.log(removeBtn);
					let relistBtn = document.createElement("button");
					let relistBtnContainer = document.createElement("div");
					//let urlAppend = `${listingUrl}?autolist&${listingImg}`;
					let listingName = listing.querySelector("div > div > div .listing-product-info > div .listing-name").innerText;

					relistBtnContainer.classList.add("listing-btn-container");

					//url param assembly
					addParams.append("autolist", "true");

					//color
					addParams.append("variant_id", listingImg);

					//is the listing a diy recipe?
					if(listingName.indexOf("DIY Recipe") > -1) {
						addParams.append("diy", "true");
					} else {
						//if it's not a diy, get the quantity of the list item
						let listingQty = listingName.substring(0, listingName.indexOf("X"));
						
						if(listingQty > 1) {
							addParams.append("qty", listingQty.trim());
						}
					}

					//pricing
					if(listingPriceContainer) {
						let acceptedOfferTypes = listingPriceContainer.childNodes;

						acceptedOfferTypes.forEach(type => {
							if(type.tagName === "IMG" && type.alt === "bells") {
								addParams.append("bells", "true");
							}

							if(type.tagName === "IMG" && type.alt === "nmt") {
								addParams.append("nmt", "true");
							}

							if(type.tagName === "A" && type.href.indexOf("wishlist")) {
								addParams.append("wishlist", "true");
							}
						});
					} else {
						addParams.append("free", "true");
					}


					relistBtn.innerHTML = "Relist";
					relistBtn.classList.add("btn-alt");
					//relistBtn.style.marginLeft = "5px";
					relistBtn.id = "customRelistBtn";
					relistBtn.onclick = () => {
						window.open(`${listingUrl}?${addParams.toString()}`, "_blank");
						relistBtn.disabled = true;

						for(let i=0; i<actionBtns.length; i++) {
							if(actionBtns[i].innerText === "Remove") {
								//console.log(actionBtns[i]);

								if(!DEBUG) {
									//click the remove button
									actionBtns[i].firstChild.click();

									if(LISTINGS_AUTO_REFRESH) {
										setTimeout(() => {
											location.reload();
										}, 200);
									}
								}

								break;
							}
						}
					}

					//console.log(listing.childNodes[1].childNodes.length);
					if(listing.childNodes[1].childNodes.length === 2) {
						relistBtnContainer.append(relistBtn);
						listing.childNodes[1].append(relistBtnContainer);
					}
				});
			
			relistAllBtn = document.createElement("button");
			relistAllBtn.id = "relistAllBtn";
			relistAllBtn.innerText = "Relist All";
			relistAllBtn.onclick = () => {
				let allRelistButtons = listingTable.querySelectorAll('#customRelistBtn');
				//console.log(allRelistButtons);
				relistAllBtn.disabled = true;

				allRelistButtons.forEach(btn => {
					setTimeout(() => {
						btn.click();
					}, 500);
				});
			}

			listingTable.prepend(relistAllBtn);
			}
		}

		//for the product page
		if(urlParams.has("autolist") && path.indexOf("product") > -1) {
			let productActionBar = document.querySelector(".product-action-bar");

			if(productActionBar) {
				let listingBtn = productActionBar.firstChild.firstChild;
				listingBtn.click();

				let variantImg = urlParams.get("variant_id");
				let variantSection = document.querySelector(".product-variants");

				if(variantSection) {
					let variants = variantSection.childNodes;

					for (let i=0; i<variants.length; i++) {
						variantUrl = variants[i].firstChild.src;
						//console.log(variants[i].firstChild.src);;
						if(variantUrl.indexOf(variantImg) > -1) {
							variants[i].click();
							break;
						}
					}
				}

				if(urlParams.has("diy")) {
					let diyCheck = document.querySelector(".create-listing-diy input");
					diyCheck.click();
				}

				if(urlParams.has("qty")) {
					let qtyInput = document.querySelector("div.create-listing > div.create-listing-section > input.product-input");
					setTimeout(() => {
						//workaround to trigger react.js setting of value in input field
						let nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
						nativeInputValueSetter.call(qtyInput, urlParams.get("qty"));
						let evt = new Event('input', {bubbles: true});
						qtyInput.dispatchEvent(evt);
					}, 1);
				}

				const createListingBtn = document.querySelector(".create-listing-btn");

				if(!urlParams.has("free")) {
					let pricingChecks = document.querySelectorAll(".product-pricing-option");

					for (let i=0; i<pricingChecks.length; i++) {
						if(pricingChecks[i].innerText === "Ask for Offers") {
							pricingChecks[i].firstChild.click();
							pricingChecks = document.querySelectorAll(".product-pricing-option");
							break;
						}
					}

					for (let i=0; i<pricingChecks.length; i++) {
						if(pricingChecks[i].innerText === "NMT" && urlParams.has("nmt")) {
							pricingChecks[i].firstChild.click();
						} else if(pricingChecks[i].innerText === "Bells" && urlParams.has("bells")) {
							pricingChecks[i].firstChild.click();
						} else if(pricingChecks[i].innerText === "Wishlist Items" && urlParams.has("wishlist")) {
							pricingChecks[i].firstChild.click();
						}
					}
				}

				if(!DEBUG) {
					createListingBtn.click();
				}

				setTimeout(() => {
					if(!DEBUG) {
						window.close();
					}
				}, 200);
			}
		}
	});
});

observer.observe(container, mutationConfig);

