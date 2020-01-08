// ==UserScript==
// @name         amazon fake buy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.amazon.com/*
// @grant        none
// ==/UserScript==

const productContainer = document.getElementById('dp-container');
const productName = document.getElementById('productTitle').innerText;
const customerName = 'LoggedIn User';
const buyButton = document.getElementById('buy-now-button');

buyButton.addEventListener('click', event => {
	//disables default submit behavior
	event.preventDefault();
	//disables any popups that might come up after clicking buy
	event.stopPropagation();
	productContainer.prepend(populateNotification());
});

const populateNotification = element => {
	//create notification box
	let purchaseNotification = document.createElement('div');
	purchaseNotification.className = 'a-box a-alert a-alert-success';
	purchaseNotification.style.marginBottom = '20px';

	//create notification container
	let notificationContainer = document.createElement('div');
	notificationContainer.className = 'a-box-inner a-alert-container';
	purchaseNotification.append(notificationContainer);

	//add checkbox
	let checkbox = document.createElement('i');
	checkbox.className = 'a-icon a-icon-alert'
	notificationContainer.append(checkbox);

	//add notification content box
	let notificationContent = document.createElement('div');
	notificationContent.className = 'a-alert-content';
	notificationContainer.append(notificationContent);

	//create layout for content
	let row = document.createElement('div');
	row.className = 'a-row';
	notificationContent.append(row);
	let column = document.createElement('div');
	column.className = 'a-column a-span7';
	row.append(column);

	//column content. all the text goes in here
	let successHeader = document.createElement('h2');
	successHeader.className = 'a-color-success';
	successHeader.innerHTML = 'Thank you, your order has been placed.'
	column.append(successHeader);

	//text body
	let textBody = document.createElement('p');
	textBody.className = 'subHeadingAndMobileWidgetDisplay';
	textBody.innerHTML = 'Please check your email for order confirmation and detailed delivery information or visit Message Center to review your notifications.';
	column.append(textBody);

	//text body additional
	let textBodySpan = document.createElement('span');
	let textBodySpanPretext = document.createElement('span');
	textBodySpanPretext.className = 'a-color-attainable a-text-bold';
	textBodySpanPretext.innerHTML = 'New! ';
	textBodySpan.append(textBodySpanPretext);
	textBodySpan.innerHTML += 'Get shipment notifications on your mobile device with the free Amazon app.';
	textBody.append(document.createElement('br'));
	textBody.append(textBodySpan);

	//order details
	let orderDetailBody = document.createElement('h5');
	//orderDetailBody.style.paddingTop = '15px';
	orderDetailBody.innerHTML = 'Order Number: ';
	let orderNumber = document.createElement('span');
	orderNumber.innerHTML = rng(100, 200) + '-' + rng(111111, 9999999) + '-' + rng(111111, 9999999);
	orderDetailBody.append(orderNumber);
	column.append(orderDetailBody)

	//item list
	let itemList = document.createElement('ul');
	itemList.className = 'a-unordered-list a-vertical';
	itemList.append(createLineItem(productName, customerName));
	column.append(itemList);

	//review edit order link
	let spacing = document.createElement('div');
	spacing.className = 'a-section a-spacing-base a-spacing-top-base';
	column.append(spacing);
	let reviewContainer = document.createElement('div');
	reviewContainer.className = 'a-row';
	let reviewLink = document.createElement('a');
	reviewLink.className = 'a-link-emphasis';
	reviewLink.innerHTML = 'Review or edit your order';
	reviewContainer.append(reviewLink);
	column.append(reviewContainer);
	// let hrLine = document.createElement('hr');
	// hrLine.className = 'a-divider-normal';
	// column.append(hrLine);

	return purchaseNotification;
}

const rng = (min, max) => {
	return Math.floor((Math.random() * max) + min);
}

const deliveryDateGen = () => {
	const dateOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	};

	let date1 = new Date();
	let date2 = new Date().setDate(date1.getDate() + 2);

	return date1 + ' - ' + date2;
}
 
const createDeliveryDate = () => {	
	let estDeliveryHeader = document.createElement('span');
	estDeliveryHeader.className = 'a-text-bold';
	estDeliveryHeader.innerHTML = 'Estimated Delivery: ';
	let estDeliveryDate = document.createElement('span');
	estDeliveryDate.className = 'a-color-success a-text-bold';
	estDeliveryDate.innerHTML = deliveryDateGen();
	let deliveryDetail = document.createElement('div');
	deliveryDetail.append(estDeliveryHeader);
	deliveryDetail.append(estDeliveryDate);
	return deliveryDetail;
}

const createLineItem = (product, user) => {
	let lineItem = document.createElement('li');
	let lineItemDetail = document.createElement('span');
	lineItemDetail.className = 'a-list-item';

	//line item line 1
	let itemName = document.createElement('span');
	itemName.className = 'wrap-item-title';
	itemName.innerHTML = product;
	lineItemDetail.append(itemName);
	lineItemDetail.innerHTML += ' will be shipped to ';
	let recipient = document.createElement('span');
	let recipientName = document.createElement('a');
	recipientName.innerHTML = user;
	recipient.append(recipientName);
	let popoverIcon = document.createElement('i');
	popoverIcon.className = 'a-icon a-icon-popover';
	recipient.append(popoverIcon);
	lineItemDetail.append(recipient);
	lineItemDetail.innerHTML += ' by Amazon.com';
	lineItem.append(lineItemDetail);

	//line item line 2
	lineItem.append(document.createElement('br'));
	lineItem.append(createDeliveryDate());

	return lineItem;
}


