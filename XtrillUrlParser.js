// ==UserScript==
// @name         xtrill url parser
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.reddit.com/r/xTrill/*
// @grant        none
// ==/UserScript==

var contentBox = document.querySelector('[data-click-id=text] > div > p');
var post = contentBox.innerHTML;
var btn = document.createElement('button');

document.querySelector('[data-click-id=text] > div').append(btn);

if(post.includes(':')) {
	post = post.replace(':', '');
}

if(post.toLowerCase().includes('co /')) {
    post = post.replace('co /', 'co/');
}

if(post.toLowerCase().includes('dbree . co')) {
    post = post.replace('dbree . co', 'dbree.co');
}

if(post.toLowerCase().includes('we tl')) {
    post = post.replace('we tl', 'we.tl');
    post = post.replace('We tl', 'we.tl');
}

if(post.includes('tl t')) {
    post = post.replace('tl t', 'tl/t');
}

post = "https://" + post.replace(/ /g, '');

console.log('url parse: ' + post);

btn.innerHTML = post;
btn.onclick = function() {
	window.open(post);
	}

//document.querySelector('[data-click-id=text] > div > p').innerHTML = post.link(post);

