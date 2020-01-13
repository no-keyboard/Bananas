const move = (event) => {
	console.log(event);
	//event.style.marginTop = rng();
}

const rng = () => {
	return Math.random() * 300;
}

window.onload = () => {
	const newBtn = document.querySelector("#hotlist > table > tbody > tr > td.pbButton > input");
	newBtn.addEventListener('mouseover', () => {
		console.log(this);
		move(this);
	});
}
