window.addEventListener('load', () => {
	const canvas = document.getElementById('canvas');
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	const data = {
		ctx: canvas.getContext('2d'),
		canvas,
		tab: []
	};
	draw_prey(data);
	register_events(data);
});

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
				} while(guard < 100 && tab.some((coord) => (between(x, y, coord.x, coord.y, hunter.width, hunter.height))))
				if (guard == 100)
					break ;
				tab.push({x, y, type: (j % 2) ? 'hunter' : 'prey', file : (j % 2) ? hunter : img}); // possible dutiliser le res du terneaire juste avant ?
			}
			ft_display(tab, ctx);
		};
		if (img.complete)
			img.onload();
	}
}

function deal_click({ x: click_x, y: click_y }, data)
{
	const { tab, ctx } = data;
	const clicked = tab.find(({ x, y, file}) => center(click_x, click_y, x, y, file.width, file.height));
	if (clicked)
	{
		console.log(clicked.type);
		data.tab.splice(tab.indexOf(clicked), 1);
		explosion(clicked, data);
		ctx.clearRect(clicked.x, clicked.y, clicked.file.width, clicked.file.height);
	}
}

function register_events(data)
{
	data.canvas.addEventListener('click', (event) => deal_click(event, data));
}
