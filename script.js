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

function draw_sprite(img, i, j, x, y, width, height, explo_ctx, t_width, t_height)
{
	console.log("ca sprite severe !");
	if (i != 0 && j != 0)
		explo_ctx.clearRect(x, y, t_width, t_height);
	explo_ctx.drawImage(img, width + (i * width), height + (j * height), width, height, x, y, t_width, t_height);
}

function ft_display_explosion(x, y, img, explo_ctx, width, height, col, line, t_width, t_height)
{
	let i = 0;
	let j = 0;

	let intervalID = setInterval(() => {
		if (i == col - 1)
		{
			j++;
			i = 0;
		}
		draw_sprite(img, i, j, x, y, width, height, explo_ctx, t_width, t_height)
		i++;
		if (j == line - 1)
			clearInterval(intervalID)
	}, 30)
}

function explosion(x, y, width, height, ctx)
{
	const explo_img = new Image();
	explo_img.onload = function (){
		ft_display_explosion(x, y, explo_img, explo_ctx, 256, 256, 8, 6, width, height);
	}
	explo_img.src = 'http://dgame-dev.de/templates/tutorial/0.6/images/explosion.png';
}

function ft_display(tab, ctx)
{
	tab.forEach(({x, y, file}) => ctx.drawImage(file, x, y, file.width, file.height));
}

draw_prey();
