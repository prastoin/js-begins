"use strict";

window.addEventListener('load', () => {
	const canvas = document.getElementById('canvas');
	const explo_img = new Image();
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	explo_img.src = 'http://dgame-dev.de/templates/tutorial/0.6/images/explosion.png';
	const data = {
		ctx: canvas.getContext('2d'),
		canvas,
		tab: [],
		explo_img,

	};
	explo_img.onload = () => {
		draw_prey(data);
		register_events(data);
	};
});

function on_data(x1, y1)
{
	if (x1 <= 505 && y1 <= 505)
		return (false);
	return (true);
}

function draw_prey(data)
{
	const { ctx, canvas } = data;
	const hunter = new Image();
	const img = new Image();

	hunter.src = 'https://mdn.mozillademos.org/files/5399/gallery_1.jpg';
	img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
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
				} while (guard < 100 && data.tab.some((coord) => (between(x, y, coord.x, coord.y, hunter.width, hunter.height))))
				if (guard >= 100)
					break ;
				img.animate = false;
				if (!(x <= 505 && y <= 505))
					data.tab.push({x, y, type: (j % 2) ? 'hunter' : 'prey', file : (j % 2) ? hunter : img, animated: false }); // possible dutiliser le res du terneaire juste avant ?
			}
			ft_display(data.tab, ctx);
		};
/*		if (img.complete)//merci david ?
			img.onload();*/
	}
	console.log(data.tab);
}

function ft_display(tab, ctx)
{
	tab.forEach(({x, y, file}) => {
			ctx.drawImage(file, x, y, file.width, file.height)
	});
}

/*function draw_sprite(img, i, j, x, y, width, height, explo_ctx, t_width, t_height)
{
	console.log("ca sprite severe !");
	if (i != 0 && j != 0)
		explo_ctx.clearRect(x, y, t_width, t_height);
	explo_ctx.drawImage(img, width + (i * width), height + (j * height), width, height, x, y, t_width, t_height);
}*/

function draw_end({ ctx, canvas: { width, height} })
{
	const img_anim = new Image();
	img_anim.src = 'https://i.ytimg.com/vi/BtQkQQecQSw/maxresdefault.jpg';
	img_anim.onload = () => {
		ctx.drawImage(img_anim, 0, 0, width, height);
		ctx.textAlign = 'center';
		ctx.font = '70px arial black';
		ctx.fillText("EXPLOSIOOOON", width / 2, height / 2);
	}
}

function animate_end(data, img)
{
	data.tab.splice(data.tab.indexOf(img), 1);
	if (data.tab.length == 0)
		draw_end(data);
}

function ft_display_explosion(img, data)
{
	const { explo_img, ctx } = data;
	const {x, y, file: {width: t_width, height: t_height}} = img;

	let i = 0;
	let j = 0;
	let intervalID = setInterval(() => {
		if (i == 8)
		{
			j++;
			i = 0;
		}
		if (j == 6)
		{
			clearInterval(intervalID);
			animate_end(data, img);
			return ;
		}
		if (i != 0 && j != 0)
			ctx.clearRect(x, y, t_width, t_height);
		console.log("ca sprite severe");
		ctx.drawImage(explo_img, (i * 256), (j * 256), 256, 256, x, y, t_width, t_height);
		i++;
	}, 30)
}

function between(x1, y1, x2, y2, width, height) {
	if (x1 - 5 > x2 + width + 5 || x2 - 5 > x1 + width + 5)
        return false;
    if (y1 - 5 > y2 + height + 5 || y2 - 5 > y1 + height + 5)
        return false;
	return (true);
}

//x1 y1 zone click
function center(x1, y1, x2, y2, width, height) {
	if ((x1 >= x2 && x1 <= x2 + width))
		if ((y1 >= y2 && y1 <= y2 + height))
			return true;
		return false;
}

function deal_click({ x: click_x, y: click_y }, data)
{
	const { tab, ctx } = data;
	const clicked = tab.find(({ x, y, file}) => center(click_x, click_y, x, y, file.width, file.height));
	if (clicked && !clicked.animated)
	{
		clicked.animated = true;
		console.log(clicked.type);
		ft_display_explosion(clicked, data);
		ctx.clearRect(clicked.x, clicked.y, clicked.file.width, clicked.file.height);
		console.log("click", data.tab);
	}
}

function register_events(data)
{
	data.canvas.addEventListener('click', (event) => deal_click(event, data));
}
