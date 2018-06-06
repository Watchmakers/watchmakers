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
		ctx.beginPath();
		ctx.arc(0, 0,radius ,0 , 2 * Math.PI,"black");
		ctx.fillStyle = "white";
		ctx.fill();
		
		// Draw the categories
		
		//Number of categories
		var n = 15;
		for(var i=0;i<n;++i){
			var cy = radius*Math.cos(i*((24*Math.PI)/180));
			var cx = radius*Math.sin(i*((24*Math.PI)/180));
			ctx.beginPath();
			ctx.arc(cx, -cy,10,0 , 2 * Math.PI);
			ctx.fillStyle = "blue";
			ctx.fill();
		}
	}	
	
})

