// ==UserScript==
// @name         dt tag copier
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You

// @grant        none
// ==/UserScript==

window.addEventListener('load', function () {
	const tagContainer = document.querySelector("#aui-page-panel-content-body > div > section > header > div.aui-group.aui-group-split > div.aui-item.commit-metadata-details > div.commit-extra.summary-panel > div.plugin-section-primary > div.plugin-item.tags.hide-more > div");
    //var branchName = document.querySelector("#aui-page-panel-content-body > div > section > header > div.aui-group.aui-group-split > div.aui-item.commit-metadata-details > div.commit-extra.summary-panel > div.plugin-section-primary > div.plugin-item.branch-info-details > a > span.label");
	const tag = document.querySelector("#aui-page-panel-content-body > div > section > header > div.aui-group.aui-group-split > div.aui-item.commit-metadata-details > div.commit-extra.summary-panel > div.plugin-section-primary > div.plugin-item.tags.hide-more > div > span > span > span > a");
	const tagBtn = document.querySelector("#aui-page-panel-content-body > div > section > header > div.aui-group.aui-group-split > div.aui-item.commit-metadata-details > div.commit-extra.summary-panel > div.plugin-section-primary > div.plugin-item.tags.hide-more > div > button.aui-button.create-new-tag-trigger.aui-alignment-target");

	function copyText(element) {
		//create a hidden input box to let us copy the value
		console.log('copytext element: ', element);
		var copyText = document.createElement('input');
		copyText.value = element.innerHTML;
		copyText.style = "position: absolute; left: -1000px; top: -1000px";
		document.body.appendChild(copyText);
		copyText.select();
		document.execCommand('copy');
		document.body.removeChild(copyText);
	}

	var copyBtnDt = document.createElement('button');
	copyBtnDt.innerHTML = 'Tag';
	copyBtnDt.className = tagBtn.className;
    //do this instead of onclick if passing params
	copyBtnDt.addEventListener('click', () => {
		copyText(tag);
	});

	tagContainer.appendChild(copyBtnDt);
	tagContainer.removeChild(tagBtn);

	//should do the mutation observer but too lazy lol
	var copyBtnBranch = document.createElement('button');
	copyBtnBranch.innerHTML = 'Branch';
	copyBtnBranch.className = tagBtn.className;
	copyBtnBranch.disabled = true;
	tagContainer.appendChild(copyBtnBranch)

	setTimeout(() => {
		const branchName = document.querySelector("#aui-page-panel-content-body > div > section > header > div.aui-group.aui-group-split > div.aui-item.commit-metadata-details > div.commit-extra.summary-panel > div.plugin-section-primary > div.plugin-item.branch-info-details > a > span.label");
		copyBtnBranch.disabled = false;
		copyBtnBranch.addEventListener('click', () => {
			copyText(branchName);
		});
	}, 5000);
});
