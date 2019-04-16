"use strict"

function between(x1, y1, x2, y2, width, height) {
    if (x1 - 5 > x2 + width + 5 || x2 - 5 > x1 + width + 5)
        return false;
    if (y1 - 5 > y2 + height + 5 || y2 - 5 > y1 + height + 5)
        return false;
	return true;
}

//x1 y1 zone click
function center(x1, y1, x2, y2, width, height) {
	if ((x1 >= x2 && x1 <= x2 + width))
		if ((y1 >= y2 && y1 <= y2 + height))
			return true;
		return false;
}

function ft_display_explosion(x, y, img, ctx, width, height)
{
	for(let i = 0; i < nb_frame; i++){
		drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
	}
}

function explosion(x, y)
{
	const explo = document.getElementById('explosion');
	canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
	const explo_ctx = explo_ctx.getContext('2d');

	const explo_img = new Image();
	explo_img.onload = function (){
		ft_display_explosion(x, y, explo_img, explo_ctx, width, height);
	}
	explo_img = 'http://dgame-dev.de/templates/tutorial/0.6/images/explosion.png';
}

function ft_display(tab, ctx)
{
	tab.forEach(({x, y, file}) => ctx.drawImage(file, x, y, file.width, file.height));
}

function draw_prey() {
	const canvas = document.getElementById('canvas');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext('2d');

    //hunter spawn display
	const hunter = new Image();
	const img = new Image();
	const tab = [];
	hunter.onload = function () {
		img.onload = function () {
		img.height = hunter.height;
		img.width = hunter.width;
		for (let j = 0; j < 100; j++) {
				let x;
				let y;
				
				let guard = 0;
				do {
					x = Math.floor(Math.random() * (window.innerWidth - hunter.width - 10)) + 5;
					y = Math.floor(Math.random() * (window.innerHeight - hunter.height - 10)) + 5;
					guard++;
				} while(guard < 100 && tab.some((coord) => (between(x, y, coord.x, coord.y, hunter.width, hunter.height))))
				if (guard == 100)
					break ;
				console.log(x, y);
				tab.push({x, y, type: (j % 2) ? 'hunter' : 'prey', file : (j % 2) ? hunter : img}); // possible dutiliser le res du terneaire juste avant ?
			}
		ft_display(tab, ctx);
		};
		if (img.complete)
			img.onload();
	}
	hunter.src = 'https://mdn.mozillademos.org/files/5399/gallery_1.jpg';
	img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
	continu({canvas, ctx, hunter, img, tab});
}

function deal_click({event, canvas, ctx, hunter, prey, tab})
{
	console.log(tab);
	const clicked = tab.find(({ x, y }) => center(event.x, event.y, x, y, hunter.width, hunter.height));
	if (clicked)
	{
		console.log(clicked.type);
		tab.splice(tab.indexOf(clicked), 1);
		ctx.clearRect(clicked.x, clicked.y, clicked.file.width, clicked.file.height);
	}
}

function continu({canvas, ...data}) {
	canvas.addEventListener('click', (event) => {
		deal_click({canvas, ...data, event});
	}, false);
};

draw_prey();
