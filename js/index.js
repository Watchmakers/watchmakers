var window_width = screen.width;
var window_height = screen.height;

var clock_size = Math.min(window_width, window_height) * 0.6
var clock_percentage = (clock_size * 100)/ window_width
var margin_clock = (((100 - clock_percentage) / 2) * window_width) / 100


var radians = 0.0174532925, 
	clockRadius = clock_size/2, //Change from 200
	margin = 0,
	width = (clockRadius+margin)*2,
    height = (clockRadius+margin)*2,
    hourHandLength = 2*clockRadius/3,
    minuteHandLength = clockRadius,
    secondHandLength = clockRadius-12,
    secondHandBalance = 30,
    secondTickStart = clockRadius;
    secondTickLength = -10,
    hourTickStart = clockRadius,
    hourTickLength = -18
    secondLabelRadius = clockRadius + 16;
    secondLabelYOffset = 5
    hourLabelRadius = clockRadius - 40
    hourLabelYOffset = 7;




var glob_time=180;



var hoursRange=[ 0.        ,  0.01666667,  0.03333333,  0.05      ,  0.06666667,
        0.08333333,  0.1       ,  0.11666667,  0.13333333,  0.15      ,
        0.16666667,  0.18333333,  0.2       ,  0.21666667,  0.23333333,
        0.25      ,  0.26666667,  0.28333333,  0.3       ,  0.31666667,
        0.33333333,  0.35      ,  0.36666667,  0.38333333,  0.4       ,
        0.41666667,  0.43333333,  0.45      ,  0.46666667,  0.48333333,
        0.5       ,  0.51666667,  0.53333333,  0.55      ,  0.56666667,
        0.58333333,  0.6       ,  0.61666667,  0.63333333,  0.65      ,
        0.66666667,  0.68333333,  0.7       ,  0.71666667,  0.73333333,
        0.75      ,  0.76666667,  0.78333333,  0.8       ,  0.81666667,
        0.83333333,  0.85      ,  0.86666667,  0.88333333,  0.9       ,
        0.91666667,  0.93333333,  0.95      ,  0.96666667,  0.98333333,
        1.        ,  1.01666667,  1.03333333,  1.05      ,  1.06666667,
        1.08333333,  1.1       ,  1.11666667,  1.13333333,  1.15      ,
        1.16666667,  1.18333333,  1.2       ,  1.21666667,  1.23333333,
        1.25      ,  1.26666667,  1.28333333,  1.3       ,  1.31666667,
        1.33333333,  1.35      ,  1.36666667,  1.38333333,  1.4       ,
        1.41666667,  1.43333333,  1.45      ,  1.46666667,  1.48333333,
        1.5       ,  1.51666667,  1.53333333,  1.55      ,  1.56666667,
        1.58333333,  1.6       ,  1.61666667,  1.63333333,  1.65      ,
        1.66666667,  1.68333333,  1.7       ,  1.71666667,  1.73333333,
        1.75      ,  1.76666667,  1.78333333,  1.8       ,  1.81666667,
        1.83333333,  1.85      ,  1.86666667,  1.88333333,  1.9       ,
        1.91666667,  1.93333333,  1.95      ,  1.96666667,  1.98333333,
        2.        ,  2.01666667,  2.03333333,  2.05      ,  2.06666667,
        2.08333333,  2.1       ,  2.11666667,  2.13333333,  2.15      ,
        2.16666667,  2.18333333,  2.2       ,  2.21666667,  2.23333333,
        2.25      ,  2.26666667,  2.28333333,  2.3       ,  2.31666667,
        2.33333333,  2.35      ,  2.36666667,  2.38333333,  2.4       ,
        2.41666667,  2.43333333,  2.45      ,  2.46666667,  2.48333333,
        2.5       ,  2.51666667,  2.53333333,  2.55      ,  2.56666667,
        2.58333333,  2.6       ,  2.61666667,  2.63333333,  2.65      ,
        2.66666667,  2.68333333,  2.7       ,  2.71666667,  2.73333333,
        2.75      ,  2.76666667,  2.78333333,  2.8       ,  2.81666667,
        2.83333333,  2.85      ,  2.86666667,  2.88333333,  2.9       ,
        2.91666667,  2.93333333,  2.95      ,  2.96666667,  2.98333333,
        3.        ,  3.01666667,  3.03333333,  3.05      ,  3.06666667,
        3.08333333,  3.1       ,  3.11666667,  3.13333333,  3.15      ,
        3.16666667,  3.18333333,  3.2       ,  3.21666667,  3.23333333,
        3.25      ,  3.26666667,  3.28333333,  3.3       ,  3.31666667,
        3.33333333,  3.35      ,  3.36666667,  3.38333333,  3.4       ,
        3.41666667,  3.43333333,  3.45      ,  3.46666667,  3.48333333,
        3.5       ,  3.51666667,  3.53333333,  3.55      ,  3.56666667,
        3.58333333,  3.6       ,  3.61666667,  3.63333333,  3.65      ,
        3.66666667,  3.68333333,  3.7       ,  3.71666667,  3.73333333,
        3.75      ,  3.76666667,  3.78333333,  3.8       ,  3.81666667,
        3.83333333,  3.85      ,  3.86666667,  3.88333333,  3.9       ,
        3.91666667,  3.93333333,  3.95      ,  3.96666667,  3.98333333,
        4.        ,  4.01666667,  4.03333333,  4.05      ,  4.06666667,
        4.08333333,  4.1       ,  4.11666667,  4.13333333,  4.15      ,
        4.16666667,  4.18333333,  4.2       ,  4.21666667,  4.23333333,
        4.25      ,  4.26666667,  4.28333333,  4.3       ,  4.31666667,
        4.33333333,  4.35      ,  4.36666667,  4.38333333,  4.4       ,
        4.41666667,  4.43333333,  4.45      ,  4.46666667,  4.48333333,
        4.5       ,  4.51666667,  4.53333333,  4.55      ,  4.56666667,
        4.58333333,  4.6       ,  4.61666667,  4.63333333,  4.65      ,
        4.66666667,  4.68333333,  4.7       ,  4.71666667,  4.73333333,
        4.75      ,  4.76666667,  4.78333333,  4.8       ,  4.81666667,
        4.83333333,  4.85      ,  4.86666667,  4.88333333,  4.9       ,
        4.91666667,  4.93333333,  4.95      ,  4.96666667,  4.98333333,
        5.        ,  5.01666667,  5.03333333,  5.05      ,  5.06666667,
        5.08333333,  5.1       ,  5.11666667,  5.13333333,  5.15      ,
        5.16666667,  5.18333333,  5.2       ,  5.21666667,  5.23333333,
        5.25      ,  5.26666667,  5.28333333,  5.3       ,  5.31666667,
        5.33333333,  5.35      ,  5.36666667,  5.38333333,  5.4       ,
        5.41666667,  5.43333333,  5.45      ,  5.46666667,  5.48333333,
        5.5       ,  5.51666667,  5.53333333,  5.55      ,  5.56666667,
        5.58333333,  5.6       ,  5.61666667,  5.63333333,  5.65      ,
        5.66666667,  5.68333333,  5.7       ,  5.71666667,  5.73333333,
        5.75      ,  5.76666667,  5.78333333,  5.8       ,  5.81666667,
        5.83333333,  5.85      ,  5.86666667,  5.88333333,  5.9       ,
        5.91666667,  5.93333333,  5.95      ,  5.96666667,  5.98333333,
        6.        ,  6.01666667,  6.03333333,  6.05      ,  6.06666667,
        6.08333333,  6.1       ,  6.11666667,  6.13333333,  6.15      ,
        6.16666667,  6.18333333,  6.2       ,  6.21666667,  6.23333333,
        6.25      ,  6.26666667,  6.28333333,  6.3       ,  6.31666667,
        6.33333333,  6.35      ,  6.36666667,  6.38333333,  6.4       ,
        6.41666667,  6.43333333,  6.45      ,  6.46666667,  6.48333333,
        6.5       ,  6.51666667,  6.53333333,  6.55      ,  6.56666667,
        6.58333333,  6.6       ,  6.61666667,  6.63333333,  6.65      ,
        6.66666667,  6.68333333,  6.7       ,  6.71666667,  6.73333333,
        6.75      ,  6.76666667,  6.78333333,  6.8       ,  6.81666667,
        6.83333333,  6.85      ,  6.86666667,  6.88333333,  6.9       ,
        6.91666667,  6.93333333,  6.95      ,  6.96666667,  6.98333333,
        7.        ,  7.01666667,  7.03333333,  7.05      ,  7.06666667,
        7.08333333,  7.1       ,  7.11666667,  7.13333333,  7.15      ,
        7.16666667,  7.18333333,  7.2       ,  7.21666667,  7.23333333,
        7.25      ,  7.26666667,  7.28333333,  7.3       ,  7.31666667,
        7.33333333,  7.35      ,  7.36666667,  7.38333333,  7.4       ,
        7.41666667,  7.43333333,  7.45      ,  7.46666667,  7.48333333,
        7.5       ,  7.51666667,  7.53333333,  7.55      ,  7.56666667,
        7.58333333,  7.6       ,  7.61666667,  7.63333333,  7.65      ,
        7.66666667,  7.68333333,  7.7       ,  7.71666667,  7.73333333,
        7.75      ,  7.76666667,  7.78333333,  7.8       ,  7.81666667,
        7.83333333,  7.85      ,  7.86666667,  7.88333333,  7.9       ,
        7.91666667,  7.93333333,  7.95      ,  7.96666667,  7.98333333,
        8.        ,  8.01666667,  8.03333333,  8.05      ,  8.06666667,
        8.08333333,  8.1       ,  8.11666667,  8.13333333,  8.15      ,
        8.16666667,  8.18333333,  8.2       ,  8.21666667,  8.23333333,
        8.25      ,  8.26666667,  8.28333333,  8.3       ,  8.31666667,
        8.33333333,  8.35      ,  8.36666667,  8.38333333,  8.4       ,
        8.41666667,  8.43333333,  8.45      ,  8.46666667,  8.48333333,
        8.5       ,  8.51666667,  8.53333333,  8.55      ,  8.56666667,
        8.58333333,  8.6       ,  8.61666667,  8.63333333,  8.65      ,
        8.66666667,  8.68333333,  8.7       ,  8.71666667,  8.73333333,
        8.75      ,  8.76666667,  8.78333333,  8.8       ,  8.81666667,
        8.83333333,  8.85      ,  8.86666667,  8.88333333,  8.9       ,
        8.91666667,  8.93333333,  8.95      ,  8.96666667,  8.98333333,
        9.        ,  9.01666667,  9.03333333,  9.05      ,  9.06666667,
        9.08333333,  9.1       ,  9.11666667,  9.13333333,  9.15      ,
        9.16666667,  9.18333333,  9.2       ,  9.21666667,  9.23333333,
        9.25      ,  9.26666667,  9.28333333,  9.3       ,  9.31666667,
        9.33333333,  9.35      ,  9.36666667,  9.38333333,  9.4       ,
        9.41666667,  9.43333333,  9.45      ,  9.46666667,  9.48333333,
        9.5       ,  9.51666667,  9.53333333,  9.55      ,  9.56666667,
        9.58333333,  9.6       ,  9.61666667,  9.63333333,  9.65      ,
        9.66666667,  9.68333333,  9.7       ,  9.71666667,  9.73333333,
        9.75      ,  9.76666667,  9.78333333,  9.8       ,  9.81666667,
        9.83333333,  9.85      ,  9.86666667,  9.88333333,  9.9       ,
        9.91666667,  9.93333333,  9.95      ,  9.96666667,  9.98333333,
       10.        , 10.01666667, 10.03333333, 10.05      , 10.06666667,
       10.08333333, 10.1       , 10.11666667, 10.13333333, 10.15      ,
       10.16666667, 10.18333333, 10.2       , 10.21666667, 10.23333333,
       10.25      , 10.26666667, 10.28333333, 10.3       , 10.31666667,
       10.33333333, 10.35      , 10.36666667, 10.38333333, 10.4       ,
       10.41666667, 10.43333333, 10.45      , 10.46666667, 10.48333333,
       10.5       , 10.51666667, 10.53333333, 10.55      , 10.56666667,
       10.58333333, 10.6       , 10.61666667, 10.63333333, 10.65      ,
       10.66666667, 10.68333333, 10.7       , 10.71666667, 10.73333333,
       10.75      , 10.76666667, 10.78333333, 10.8       , 10.81666667,
       10.83333333, 10.85      , 10.86666667, 10.88333333, 10.9       ,
       10.91666667, 10.93333333, 10.95      , 10.96666667, 10.98333333,
       11.        , 11.01666667, 11.03333333, 11.05      , 11.06666667,
       11.08333333, 11.1       , 11.11666667, 11.13333333, 11.15      ,
       11.16666667, 11.18333333, 11.2       , 11.21666667, 11.23333333,
       11.25      , 11.26666667, 11.28333333, 11.3       , 11.31666667,
       11.33333333, 11.35      , 11.36666667, 11.38333333, 11.4       ,
       11.41666667, 11.43333333, 11.45      , 11.46666667, 11.48333333,
       11.5       , 11.51666667, 11.53333333, 11.55      , 11.56666667,
       11.58333333, 11.6       , 11.61666667, 11.63333333, 11.65      ,
       11.66666667, 11.68333333, 11.7       , 11.71666667, 11.73333333,
       11.75      , 11.76666667, 11.78333333, 11.8       , 11.81666667,
       11.83333333, 11.85      , 11.86666667, 11.88333333, 11.9       ,
       11.91666667, 11.93333333, 11.95      , 11.96666667, 11.98333333];
var minutesRange=[];

/*for(var i=0;i<331;i++){
  hoursRange.push(i); 
}*/

for(var j=0; j<60;j++){
  minutesRange.push(j); 
}



var hourScale = d3.scale.linear()
	.range([0,330])
	.domain([0,11]);

var minuteScale = secondScale = d3.scale.linear()
	.range([0,354])
	.domain([0,59]);

var handData = [
	{
		type:'hour',
		value:0,
		length:-hourHandLength,
		scale:hourScale
	},
	{
		type:'minute',
		value:0,
		length:-minuteHandLength,
		scale:minuteScale
	},
	{
		type:'second',
		value:0,
		length:-secondHandLength,
		scale:secondScale,
		balance:secondHandBalance
	}
];

function drawClock(){ //create all the clock elements
	updateData();	//draw them in the correct starting position
	var svg = d3.select("#container")
		.append("svg")
	    .attr("width", clock_size)
	    .attr("height", clock_size)
        .attr("left", margin_clock);

	var face = svg.append('g')
		.attr('id','clock-face')
		.attr('transform','translate(' + (clockRadius + margin) + ',' + (clockRadius + margin) + ')');

	//add marks for seconds
	face.selectAll('.second-tick')
		.data(d3.range(0,60)).enter()
			.append('line')
			.attr('class', 'second-tick')
			.attr('x1',0)
			.attr('x2',0)
			.attr('y1',secondTickStart)
			.attr('y2',secondTickStart + secondTickLength)
			.attr('transform',function(d){
				return 'rotate(' + secondScale(d) + ')';
			});
	//and labels

	face.selectAll('.second-label')
		.data(d3.range(5,61,5))
			.enter()
			.append('text')
			.attr('class', 'second-label')
			.attr('text-anchor','middle')
			.attr('x',function(d){
				return secondLabelRadius*Math.sin(secondScale(d)*radians);
			})
			.attr('y',function(d){
				return -secondLabelRadius*Math.cos(secondScale(d)*radians) + secondLabelYOffset;
			})
			.text(function(d){
				return d;
			});

	//... and hours
	face.selectAll('.hour-tick')
		.data(d3.range(0,12)).enter()
			.append('line')
			.attr('class', 'hour-tick')
			.attr('x1',0)
			.attr('x2',0)
			.attr('y1',hourTickStart)
			.attr('y2',hourTickStart + hourTickLength)
			.attr('transform',function(d){
				return 'rotate(' + hourScale(d) + ')';
			});

	face.selectAll('.hour-label')
		.data(d3.range(3,13,3))
			.enter()
			.append('text')
			.attr('class', 'hour-label')
			.attr('text-anchor','middle')
			.attr('x',function(d){
				return hourLabelRadius*Math.sin(hourScale(d)*radians);
			})
			.attr('y',function(d){
				return -hourLabelRadius*Math.cos(hourScale(d)*radians) + hourLabelYOffset;
			})
			.text(function(d){
				return d;
			});


	var hands = face.append('g').attr('id','clock-hands');

	face.append('g').attr('id','face-overlay')
		.append('circle').attr('class','hands-cover')
			.attr('x',0)
			.attr('y',0)
			.attr('r',clockRadius/20);

	hands.selectAll('line')
		.data(handData)
			.enter()
			.append('line')
			.attr('class', function(d){
				return d.type + '-hand';
			})
			.attr('x1',0)
			.attr('y1',function(d){
				return d.balance ? d.balance : 0;
			})
			.attr('x2',0)
			.attr('y2',function(d){
				return d.length;
			})
			.attr('transform',function(d){
				return 'rotate('+ d.scale(d.value) +')';
			});
}

function moveHands(){
	d3.select('#clock-hands').selectAll('line')
	.data(handData)
		.transition()
		.attr('transform',function(d){
			return 'rotate('+ d.scale(d.value) +')';
		});
}

function updateData(){
	var t = new Date();

	handData[0].value = hoursRange[glob_time%720] ;
	handData[1].value = minutesRange[glob_time%60];

	//handData[0].value = (t.getHours() % 12) + t.getMinutes()/60 ;
	//handData[1].value = t.getMinutes();
	handData[2].value = t.getSeconds();
	glob_time+=1;
}

drawClock();

setInterval(function(){
	updateData();
	moveHands();
}, 50);

d3.select(self.frameElement).style("height", height + "px");