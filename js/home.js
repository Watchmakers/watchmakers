$(document).ready(function clock(argument) {

	colorArray = [[255, 0, 0], [255, 102, 102], [255, 128, 0], [255, 255, 0], [255, 255, 55], [128, 255, 0], [0, 255, 0], [0, 255, 128],
					[0, 255, 255], [0, 128, 255], [0, 76, 153], [0, 0, 255], [128, 0, 255], [255, 0, 255], [255, 0, 128],
				]

	var canvas = document.getElementsByClassName("canvas");

	for(var i = 0 ; i < canvas.length ; i++){
		var ctx = canvas[i].getContext("2d");
		var radius = canvas[i].height / 2;
		ctx.translate(radius, radius);
		radius = radius * 0.90
		drawClock();
	}

	function drawClock() {
		//Number of categories
		var n = 15;

		ctx.beginPath();
		ctx.arc(0, 0, radius, 0, 2 * Math.PI, "black");
		ctx.fillStyle = "white";
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.fill();
		
		// Draw the categories
		
		for(var i = 0; i < n; ++i){
			var cy = radius * Math.cos(i * (((360 / n) * Math.PI) / 180));
			var cx = radius * Math.sin(i * (((360 / n) * Math.PI) / 180));
			ctx.beginPath();
			ctx.arc(cx, -cy, 10, 0, 2 * Math.PI);
			ctx.fillStyle = 'rgb(' + colorArray[i][0] + ', ' + colorArray[i][1] + ', ' + colorArray[i][2] + ')';
			ctx.fill();
		}
	}	
	
})



