// ==UserScript==
// @name         workbench for lazy people
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://workbench.developerforce.com/*
// @grant        none
// ==/UserScript==

const key = event => {
	return event.code;
}

if(window.location.href === "https://workbench.developerforce.com/login.php") {
	let keyPressed;
	document.querySelector("#oauth_env").value = 'test.salesforce.com';
	document.querySelector("#termsAccepted").checked = true;
	document.addEventListener('keydown', event => {
		keyPressed = key(event);
	});

	setTimeout(() => {
		if(keyPressed !== "ControlLeft") {
			document.querySelector("#loginBtn").click();
		} 
	}, 500); 
} else {
	var loggedInLink = document.querySelector("#myUserInfo > a");
	var hoverText = String(loggedInLink.onmouseover);
	var instance = hoverText.substring(
						hoverText.lastIndexOf("<br/>Instance:") + 15,
						hoverText.lastIndexOf("<br/>Org Id:")
						);
	loggedInLink.innerHTML = "FYI, YOU'RE LOGGED IN HERE: " + instance.bold();
	loggedInLink.style.color = "#ff0000";
	loggedInLink.style.fontSize = "large";

	setInterval(function() {
		loggedInLink.style.opacity = (loggedInLink.style.opacity == '100' ? '0' : '100');
	}, 600);
}

if(window.location.href.indexOf("https://workbench.developerforce.com/metadataDescribeAndList.php") > -1) {
	const container = document.querySelector('body');
	const mutationConfig = {
					attributes: false,
					childList: true,
					subtree: true,
					characterData: false,
					characterDataOldValue: false
	};

	var onChange = function(mutationsList) {
		for(var i = 0; i < mutationsList.length; i++) {
			if(mutationsList[i].target.id === 'xmlResult') {
				let xml = mutationsList[i].target;
				if(xml.innerHTML.includes("version&gt;34.0")) {
					//console.log(xml.innerHTML);
					xml.innerHTML = xml.innerHTML.replace("version&gt;34.0", "version&gt;46.0");
				}
			}
		}
	}

	var observer = new MutationObserver(onChange);
	observer.observe(container, mutationConfig);
}
