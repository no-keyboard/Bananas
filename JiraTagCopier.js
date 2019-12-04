// ==UserScript==
// @name         dt tag copier
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://abcwebrepo.amerisourcebergen.com/projects/DAT/repos/client-gskpap/commits/*
// @grant        none
// ==/UserScript==

window.addEventListener('load', function () {
	var tagContainer = document.querySelector("#aui-page-panel-content-body > div > section > header > div.aui-group.aui-group-split > div.aui-item.commit-metadata-details > div.commit-extra.summary-panel > div.plugin-section-primary > div.plugin-item.tags.hide-more > div");
	var tag = document.querySelector("#aui-page-panel-content-body > div > section > header > div.aui-group.aui-group-split > div.aui-item.commit-metadata-details > div.commit-extra.summary-panel > div.plugin-section-primary > div.plugin-item.tags.hide-more > div > span > span > span > a");
	var tagBtn = document.querySelector("#aui-page-panel-content-body > div > section > header > div.aui-group.aui-group-split > div.aui-item.commit-metadata-details > div.commit-extra.summary-panel > div.plugin-section-primary > div.plugin-item.tags.hide-more > div > button.aui-button.create-new-tag-trigger.aui-alignment-target");

	function copyText(element) {
		//create a hidden input box to let us copy the value
		console.log(element);
		var copyText = document.createElement('input');
		copyText.value = element.innerHTML;
		copyText.style = "position: absolute; left: -1000px; top: -1000px";
		document.body.appendChild(copyText);
		copyText.select();
		document.execCommand('copy');
		document.body.removeChild(copyText);
	}

	// copyBtn.onclick = function() {
	// 	//create a hidden input box to let us copy the value
	// 	var copyText = document.createElement('input');
	// 	copyText.value = tag.innerHTML;
	// 	copyText.style = "position: absolute; left: -1000px; top: -1000px";
	// 	document.body.appendChild(copyText);
	// 	copyText.select();
	// 	document.execCommand('copy');
	// 	document.body.removeChild(copyText);
	// 	copyBtn.innerHTML = 'Copied DT!';
	// }

	var copyBtnDt = document.createElement('button');
	copyBtnDt.innerHTML = 'Copy Tag';
	copyBtnDt.className = tagBtn.className;
	copyBtnDt.onclick = "copyText(" + tag + ");";

	var copyBtnBranch = document.createElement('button');
	copyBtnBranch.innerHTML = 'Copy Branch';
	copyBtnBranch.className = tagBtn.className;
	copyBtnBranch.onclick = 'copyText';
	
	tagContainer.appendChild(copyBtnDt);
	tagContainer.appendChild(copyBtnBranch);
	tagContainer.removeChild(tagBtn);
});
