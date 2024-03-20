let arrayRun = [];
let indexRun = 0;
let widthText = 0;
const widthIcon = 60;
const widthRemove = widthIcon * 4;
let isReceive = false;
const timeReceive = 0.3
let timeTransition = 0.4



/*----------- WrapAnimation -----------*/
function appendWidthWrapAnimation() {
	const element = document.querySelector('.wrap-animation');
	element.style.width = `${widthText}px`;

}


/*----------- WrapText -----------*/
function addTransitonWrapText() {
	const element = document.querySelector('.wrap-text');
	element.style.transition = `all ${isReceive ? timeReceive : timeTransition}s`;
}

function removeTransitonWrapText() {
	const element = document.querySelector('.wrap-text');
	element.style.transition = '';
}

function appendWidthWrapText(width) {
	const element = document.querySelector('.wrap-text');
	element.style.width = `${width}px`;
}

function addListenerTransitionEndWrapText() {
	const element = document.querySelector('.wrap-text');
	element.addEventListener('transitionend', loadReceiveAnimation)
}

/*----------- TranslateText -----------*/
function addTransitionWrapTranslateText() {
	const element = document.querySelector('.wrap-translate-text');
	element.style.transition = `all ${isReceive ? timeReceive : timeTransition}s`;

}

function removeTransitionWrapTranslateText() {
	const element = document.querySelector('.wrap-translate-text');
	element.style.transition = '';
}

function addTranslateWrapTranslateText(translate) {
	const element = document.querySelector('.wrap-translate-text');
	element.style.transform = `translateX(${translate}px)`;
}

function appendScaleListItem(scale) {
	const element = document.querySelector('#introduce-us');
	for(let i= 0; i < element.children.length; i++) {
		const child = element.children[i];
		child.style.transition = `all 0.3s`
		child.style.transform = `scale(${scale})`;
	}
}

function transitionEndCircle() {
	loadAnimation();
	this.removeEventListener('transitionend', transitionEndCircle)
}

function beginCircle() {
	const element = document.querySelector('.cirlce');
	element.style.transition = 'transform 0.3s';
	element.style.transform = 'scale(1)';
	element.addEventListener('transitionend', transitionEndCircle)
}

function transitionend() {
	this.removeEventListener('transitionend', transitionend)
}

function loadAnimation() {
	addTransitonWrapText();
	addTransitionWrapTranslateText();
	appendWidthWrapText(widthText - widthIcon)
	addTranslateWrapTranslateText(0)
	appendScaleListItem(1)
	addListenerTransitionEndWrapText()
}

function run(text) {
	removeTransitionWrapTranslateText();
	removeTransitonWrapText();
	appendScaleListItem(1)
	const arrayText = text.split("").map(t => `<span>${t}</span>`).join("");
	const elementListText = document.getElementById('introduce-us');
	elementListText.innerHTML = arrayText;
	const {width} = elementListText.getBoundingClientRect();
	if(widthText) {
		timeTransition = ((width + widthIcon + 10) / widthText) * timeTransition;
	}
	widthText = width + widthIcon + 10;
	appendWidthWrapAnimation();
	appendWidthWrapText(0)
	addTranslateWrapTranslateText(30)
	appendScaleListItem(0.9)
}

function loadReceiveAnimation(event) {
	if(this !== event.target) return;
	if(!isReceive) {
		setTimeout(() => {
			addTransitonWrapText();
			appendWidthWrapText(0)
			addTranslateWrapTranslateText(30)
			appendScaleListItem(0.95)
		}, 1200)
	}
	else {
		this.removeEventListener('transitionend', loadReceiveAnimation);
		indexRun += 1;
		if(indexRun > arrayRun.length - 1) {
			indexRun = 0;
		}
		run(arrayRun[indexRun])
		setTimeout(() => {
			loadAnimation();
		}, 500)
	}
	isReceive = !isReceive;
}

function initTextArray(textArray) {
	arrayRun = textArray;
}
