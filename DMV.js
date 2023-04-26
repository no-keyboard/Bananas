// ==UserScript==
// @name         CT DMV
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://nqa3.nemoqappointment.com/Booking/Booking/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=stackoverflow.com
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    const dateQueryString = '\\34 \\/24\\/2023';
    // const dateQueryString = '\\35 \\/19\\/2023';

    if(document.querySelector("#SectionId")) {
        document.querySelector("#SectionId").value = 232;
    }

    if(!document.querySelector("#" + dateQueryString) && document.querySelector("h1").innerText == "Select time") {
        setTimeout(() => {
            console.log('Checking!');
            document.querySelector('input[name="TimeSearchFirstAvailableButton"]').click();
        }, 1500);
    } else if(document.querySelector("#" + dateQueryString) && document.querySelector("h1").innerText == "Select time" && document.querySelector('td[headers="' + dateQueryString + '"]').querySelector('div > div[data-function="timeTableCell"]')) {
        console.log('Found!');
        const nextAppt = document.querySelector('td[headers="' + dateQueryString + '"]').querySelector('div > div[data-function="timeTableCell"]');
        nextAppt.addEventListener("click", () => {
            console.log("Added event listener");
        });

        nextAppt.click();

        document.querySelector("#booking-next").click();
    }

    if(document.querySelector("h1").innerText == "Personal data") {
        console.log('Input name');
        // setTimeout(() => {
            document.querySelector("#Customers_0__BookingFieldValues_0__Value").value = '';
            document.querySelector("#Customers_0__BookingFieldValues_1__Value").value = '';
            document.querySelector("#Main > form > div.btn-toolbar > input").click();
        // }, 1500);
    }

    if(document.querySelector("#EmailAddress")) {
        console.log('Input contact');
        // setTimeout(() => {
            document.querySelector("#EmailAddress").value = '';
            document.querySelector("#ConfirmEmailAddress").value = '';
            document.querySelector("#PhoneNumber").value = '';
            document.querySelector("#ConfirmPhoneNumber").value = '';
            document.querySelector("#SelectedContacts_0__IsSelected").checked = true;
            document.querySelector("#SelectedContacts_3__IsSelected").checked = true;
            document.querySelector("#Main > form > div.btn-toolbar > input").click();
        // }, 1500);
    }

    if(document.querySelector("h1").innerText == "Confirm booking" && !document.querySelector("div.alert-error")) {
        document.querySelector("#Main > form > div:nth-child(2) > input").click();
    }
})();
