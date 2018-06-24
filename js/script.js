var w = 400,
	h = 400;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = ['Smartphone','Tablet'];

//Data
var d = [
		  [
			{axis:"Personal care", value:1.4142},
			{axis:"Sleep", value:2.8284},
			{axis:"Eating", value:1},
			{axis:"Sport",value:0.7071},
			{axis:"Home maintenance",value:0.7071},
			{axis:"Pet care",value:0.44},
			{axis:"Child care",value:1.4142},
			{axis:"Shopping",value:0.44},
			{axis:"Leisure, social and associative life",value:1},
			{axis:"Household and family care",value:1.4142},
			{axis:"Work / Study",value:2.8284},
			{axis:"Travel",value:0.44},
			{axis:"Transportations",value:1.22},
			{axis:"Unspecified",value:0.23},
			// ],[
			// {axis:"Email",value:0.48},
			// {axis:"Social Networks",value:0.41},
			// {axis:"Internet Banking",value:0.27},
			// {axis:"News Sportsites",value:0.28},
			// {axis:"Search Engine",value:0.46},
			// {axis:"View Shopping sites",value:0.29},
			// {axis:"Paying Online",value:0.11},
			// {axis:"Buy Online",value:0.14},
			// {axis:"Stream Music",value:0.05},
			// {axis:"Online Gaming",value:0.19},
			// {axis:"Navigation",value:0.14},
			// {axis:"App connected to TV program",value:0.06},
			// {axis:"Offline Gaming",value:0.24},
			// {axis:"Photo Video",value:0.17},
			// {axis:"Reading",value:0.15},
			]
		];

var d2 = [
		  [
			{axis:"Personal care", value:1.8},
			{axis:"Sleep", value:2},
			{axis:"Eating", value:0.8},
			{axis:"Sport",value:1.4142},
			{axis:"Home maintenance",value:1.22},
			{axis:"Pet care",value:0.23},
			{axis:"Child care",value:1.4142},
			{axis:"Shopping",value:1},
			{axis:"Leisure, social and associative life",value:0.23},
			{axis:"Household and family care",value:0.8},
			{axis:"Work / Study",value:1},
			{axis:"Travel",value:0.23},
			{axis:"Transportations",value:1.4142},
			{axis:"Unspecified",value:0},
			// ],[
			// {axis:"Email",value:0.48},
			// {axis:"Social Networks",value:0.41},
			// {axis:"Internet Banking",value:0.27},
			// {axis:"News Sportsites",value:0.28},
			// {axis:"Search Engine",value:0.46},
			// {axis:"View Shopping sites",value:0.29},
			// {axis:"Paying Online",value:0.11},
			// {axis:"Buy Online",value:0.14},
			// {axis:"Stream Music",value:0.05},
			// {axis:"Online Gaming",value:0.19},
			// {axis:"Navigation",value:0.14},
			// {axis:"App connected to TV program",value:0.06},
			// {axis:"Offline Gaming",value:0.24},
			// {axis:"Photo Video",value:0.17},
			// {axis:"Reading",value:0.15},
			]
		];

//Options for the Radar chart, other than default

var mycfg = {
  w: w,
  h: h,
  maxValue: 3,
  levels: 9,
  ExtraWidthX: 200
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw("#chart1", d, mycfg);
RadarChart.draw("#chart2", d2, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#body')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)

//Create the title for the legend
var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)') 
	.attr("x", w - 70)
	.attr("y", 10)
	.attr("font-size", "12px")
	.attr("fill", "#404040")
	.text("What % of owners use a specific service in a week");
		
//Initiate Legend	
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)') 
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;	