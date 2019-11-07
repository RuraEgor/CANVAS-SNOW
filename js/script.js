
const countEl = 2000;
let masElem = [];
let masImg = [];
let masPromis = [];
let bgMain;

countTypeEl = 50;
countTypeImg = 0;

let masUrlImg = [
	'img/kit.jpg',
	'img/serfing.jpg',
	'img/snow.png',
	'img/rwby.png',
	'img/snow.png'
];

let windW, windH;

window.onresize = function () {
	resize();
}

resize();

let canvas = document.getElementById('canvas');
canvas.setAttribute('width', windW);
canvas.setAttribute('height', windH);
let ctx = canvas.getContext('2d');

masUrlImg.forEach( x => { masPromis.push(loadImage(x)) });

Promise.all(masPromis).then( result => {
	
	masImg = result.map( zn => zn );
	bgMain = masImg.shift();
	const allTypeElImg = masImg.length / 2;
	let allTpElImgCn = 0;
	let trImgEl = 0;

	for (let i = 0; i < countEl; i++) {
		
		if (!(i == 0) && !(i % countTypeEl)) {
			trImgEl++
			if (trImgEl < allTypeElImg) {
				trImgEl++;
				allTpElImgCn += 2;
			} else {
				trImgEl = 0;
				allTpElImgCn = 0;
			}
		}
		
		let sizeEl = Math.random() * 70 + 30;
		let posX = Math.random() * (windW + 250) - 250;
		let posY = Math.random() * 700 - 750;
		let agle = Math.random() * 360;
		let agleSpeed = Math.random() * 0.5;
		let transX = Math.random() * 0.3 + 0.02;
		let transY = Math.random() * 0.5 + 0.5;
		
		masElem.push(new elemImgCanvas(
			masImg[allTpElImgCn],
			masImg[allTpElImgCn + 1],
			sizeEl,
			sizeEl,
			posX,
			posY,
			agle,
			agleSpeed,
			transX,
			transY
		));
	}

	if (ctx) animRotation();
});



let canvas_2 = document.getElementById('canvas_2');
canvas_2.setAttribute('width', windW);
canvas_2.setAttribute('height', windH);
let ctx_2 = canvas_2.getContext('2d');

function loadImage(src) {
	let img = new Image();
	img.src = src;
	return new Promise( (resolve, reject) => {
		img.onload = function () {
		resolve(img);
		
	}
});
}

function animRotation() {
	ctx.clearRect(0, 0, windW, windH);
	
	masElem.forEach( el => {
		ctx.translate(el.posX, el.posY);
		ctx.rotate(inRad(el.angle));
		ctx.drawImage(el.imgShape, -el.width/2, -el.height/2, el.width, el.height);
		
		ctx.rotate(inRad(-el.angle));
		ctx.translate(-el.posX, -el.posY);
		
		el.angle += el.speedAngle;
		
		if (el.posX - el.width > windW) {
			el.posX = Math.random() * windW;
			el.posY = -el.height/2;
		} else {
			el.posX += el.transX;
		}
		
		if (el.posY - el.height/2 > windH) {
			el.posY = -el.height/2;
		} else {
			el.posY += el.transY;
		}
	});
	
	ctx.globalCompositeOperation = 'source-in';
	// ctx.drawImage(masImg[0], 0, 0);
	bgCover(ctx, masImg[0]);
	ctx.globalCompositeOperation = 'source-over';
	
	
	// ctx_2.drawImage(bgMain, 0, 0);
	// bgCover(ctx_2, canvas);
	
	bgCover(ctx_2, bgMain);
	ctx_2.drawImage(canvas, 0, 0);
	
	requestAnimationFrame( animRotation );
}

function inRad(num) {
	return num * Math.PI / 180;
}

function elemImgCanvas(imgFon, imgShape, height, width, posX, posY, angle, speedAngle, transX, transY) {
	this.imgFon = imgFon;
	this.imgShape = imgShape;
	this.width = width;
	this.height = height;
	this.posX = posX;
	this.posY = posY;
	this.angle = angle;
	this.speedAngle = speedAngle;
	this.transX = transX;
	this.transY = transY;
}

function resize() {
	windW = window.innerWidth;
	windH = window.innerHeight;
}

function bgCover(cnv, img) {
	let typeScreen = windW / windH;
	let typeImg = img.width / img.height;
	let imgW, imgH, posX, posY;
	
	if (typeScreen >= 1) {
		if (typeImg < 1) {
			imgW = windH * typeImg;
			imgH = windH;
			posX = (imgW - windW) / 2;
			posY = 0;
		} else {
			imgW = windW;
			imgH = windW / typeImg;
			posX = 0;
			posY = (imgH - windH) / 2;
		}
	} else {
		if (typeImg >= 1) {
			imgW = windH * typeImg;
			imgH = windH;
			posX = (imgW - windW) / 2;
			posY = 0;
		} else {
			imgW = windW;
			imgH = windW / typeImg;
			posX = 0;
			posY = (imgH - windH) / 2;
		}
	}
	
	// debugger
	
	cnv.drawImage(img, -posX, -posY, imgW, imgH);
	// cnv.drawImage(img, 0, 0, imgW, imgH);
}
