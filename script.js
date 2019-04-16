"use strict"

function draw_sprite(img, i, j, x, y, width, height, explo_ctx, t_width, t_height)
{
	console.log("ca sprite severe !");
	if (i != 0 && j != 0)
		explo_ctx.clearRect(x, y, t_width, t_height);
	explo_ctx.drawImage(img, width + (i * width), height + (j * height), width, height, x, y, t_width, t_height);
}
