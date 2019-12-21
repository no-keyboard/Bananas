// ==UserScript==
// @name         better looking rennlist
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://rennlist.com/forums/*
// @grant        none
// ==/UserScript==

const sidebar = document.querySelector("#right-rail");
const main = document.querySelector("#main-content");
const notices = document.querySelector("#notices");
notices.remove();
sidebar.remove();
//main.style["width"] = "100%"; tampermonkey said this is better written with the dot
main.style.width = "100%";
