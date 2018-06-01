$(document).ready(function clock(argument) {
	var canvas = document.getElementsByClassName("canvas");
	for(var i = 0 ; i < canvas.length ; i++){
		var ctx = canvas[i].getContext("2d");
		var radius = canvas[i].height / 2;
		ctx.translate(radius, radius);
		radius = radius * 0.90
		drawClock();
	}

	function drawClock() {
		ctx.arc(0, 0,radius ,0 , 2 * Math.PI);
		ctx.fillStyle = "white";
		ctx.fill();
	}	
})

