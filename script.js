"use strict"

function between(x1, y1, x2, y2, width, height) {
    if (x1 - 5 > x2 + width + 5 || x2 - 5 > x1 + width + 5 && y1 - 5 > y2 + height + 5 && y2 - 5 > y1 + height + 5)
        return false;
	return true;
}

function _in(x1, y1, x2, y2, width, height) {
    if (x1 - 5 > x2 + width + 5 && x2 - 5 > x1 + width + 5)
        return false;
    if (y1 - 5 > y2 + height + 5 && y2 - 5 > y1 + height + 5)
        return false;
	return true;
}

function draw_prey() {
	const canvas = document.getElementById('canvas')
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext('2d')

    //hunter spawn display
    const hunter = new Image();
    const img = new Image();
    const tab_hunter = [];
    const tab_prey = [];
	const tab = [];
	hunter.onload = function () {
	img.onload = function () {
		for (let j = 0; j < 100; j++) {
				let x;
				let y;
				
				do {
					x = Math.floor(Math.random() * (window.innerWidth - img.width - 10)) + 5;
					y = Math.floor(Math.random() * (window.innerHeight - img.height - 10)) + 5;
				} while(tab.some((coord) => (between(x, y, coord.x, coord.y, hunter.width, hunter.height))))
				console.log(x, y);
				tab.push({x, y});
				(j % 2) == 0 ? ctx.drawImage(img, x, y, hunter.width, hunter.height) : ctx.drawImage(hunter, x, y, hunter.width, hunter.height);
				(j % 2) == 0 ? tab_prey.push({ x, y }) : tab_hunter.push({x, y});
			}
			console.log(tab)
		};
	}
	hunter.src = 'https://mdn.mozillademos.org/files/5399/gallery_1.jpg';
	img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
	continu(canvas, ctx, hunter, img, tab);
}

function deal_click(event, canvas, ctx, hunter, prey, tab)
{
	let i = 0;
	console.log(tab.length);
	while (i < tab.length)
	{
		if (!_in(event.x, event.y, tab[i].x, tab[i].y, hunter.width, hunter.height))
			console.log("JE CLIQUE BIEN SUR QQLS CHOSE");
		else
			console.log("NOTHING");
		i++;
	}
	console.log("coucou");
}

function continu(canvas, ctx, hunter, prey, tab) {
	canvas.addEventListener('click', (event) => {
		deal_click(event, canvas, ctx, hunter, prey, tab)
	}, false);
};

draw_prey();