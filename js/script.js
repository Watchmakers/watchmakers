var w = 400,
	h = 400;

var urlAPI = 'http://localhost:5000';
var series_time = []

var colorscale = d3.scale.category10();

//Legend titles
// var LegendOptions = ['Smartphone','Tablet'];

//Functions countries
function loadCountries(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", urlAPI  +"/Countries", false);
	xhr.send();

	return JSON.parse(xhr.responseText);
}

function addCountries(){
	countries = loadCountries();
	for(var i = 0 ; i < countries["Countries"].length ; i++){
		$('#countries').append($('<option>', {
			value: countries["Countries"][i],
			text: countries["Countries"][i]
		}));
	};
} 

function changeCountry(){
	var selectBox = document.getElementById("countries");
	var selectedValue = selectBox.options[selectBox.selectedIndex].value;
	//chart.series[0].data[i].update({name:sel[i].children[0].value , y: parseInt(sel[i].children[1].value)});
	//RadarChart
	alert(selectedValue);
}


//act
function actCheck(acti){
	alert(acti);
}

//Functions activities
function loadActivities(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", urlAPI  +"/Activities", false);
	xhr.send();

	return JSON.parse(xhr.responseText);
}

function addActivities(){
	activities = loadActivities();

	var activitiesDiv = document.getElementById('checkboxes')

	for(var i = 0 ; i < activities["Categories"].length ; i++){
		$('#checkboxes').append('<label for=' + activities["Categories"][i].replace(" ", "_") + ">" + "<input type='checkbox' id='" + activities["Categories"][i].replace(" ", "_") + "' onclick='actCheck("+ activities["Categories"][i].replace(" ", "_")+");' checked/>" + activities["Categories"][i] + "</label><br>");
	}

} 

//Data on start 
country = "France"
daysweek = "All days of the week" 
sex = "Males"
categories = "Home maintenance, Child care, Eating, Household and family care, Leisure and social and associative life, Personal care, Pet care, Shopping, Sleep, Sport, Transportations, Travel, Unspecified, Work / Study"

var urlAPI1 = urlAPI + '/PersonalData?country=' + country + '&daysweek=' + daysweek 
 + "&sex=" + sex + "&categories=" + categories;

var dtest1 = []
var dtest2 = []

var xhr = new XMLHttpRequest();
xhr.open("GET", urlAPI1, false);
xhr.send();

var data = JSON.parse(xhr.responseText);
if(data['Error']){}
else{

	for (var i = 0 ; i < data["Year2000"]['Categories'].length ; i++) {
		var category = data["Year2000"]['Categories'][i];
		var time_spent = data["Year2000"]['Time spent'][i];
		dtest1[i] = {axis:category, value:time_spent}
}
	for (var i = 0 ; i < data["Year2010"]['Categories'].length ; i++) {
		var category = data["Year2010"]['Categories'][i];
		var time_spent = data["Year2010"]['Time spent'][i];

		dtest2[i] = {axis:category, value:time_spent}
	}
}

var d = [
			dtest1
		];

var d2 = [
			dtest2
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