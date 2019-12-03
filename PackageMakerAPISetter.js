// ==UserScript==
// @name         package maker api ver setter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://workbench.developerforce.com/metadataDescribeAndList.php*
// @grant        none
// ==/UserScript==

var xml;

setTimeout(function() {
    xml = document.querySelector("#xmlResult");
    //console.log(xml.innerHTML);
    document.querySelector("#selectText").onclick = function() {
    	xml.innerHTML = xml.innerHTML.replace("version&gt;34.0", "version&gt;46.0");
        xml.focus();
    	xml.select();
    };
    //xml.onclick = function() { xml.innerHTML = xml.innerHTML.replace("version&gt;34.0", "version&gt;46.0"); };
}, 2000);

// function test() {
//     console.log("test");
//     xml.innerHTML = xml.innerHTML.replace("version&gt;34.0", "version&gt;46.0");
// }

// setTimeout(function() {
// 	document.addEventListener("click", function(event) {
//     console.log(event.target);

// 	if(event.target.id == 'issuetype-field') {
// 	    //console.log(event.target.value);
// 	}
// 	});
// }, 2000);

