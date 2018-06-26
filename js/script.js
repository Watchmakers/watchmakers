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

// function addCountries(){
// 	countries = loadCountries();
// 	for(var i = 0 ; i < countries["Countries"].length ; i++){
// 		$('#countries').append($('<option>', {
// 			value: countries["Countries"][i],
// 			text: countries["Countries"][i]
// 		}));
// 	};
// } 

function addCountries(){
	countries = loadCountries();
	for(var i = 0 ; i < countries["Countries"].length ; i++){
		if (countries["Countries"][i] == "Europe"){
			$('#countries').append($('<option>', {
			value: countries["Countries"][i],
			text: countries["Countries"][i],
			selected:"selected"
		}));
			}
		else{
		$('#countries').append($('<option>', {
			value: countries["Countries"][i],
			text: countries["Countries"][i]
		}));
		}
	};
}

function changeCountry(){
	var selectBox = document.getElementById("countries");
	var selectedValue = selectBox.options[selectBox.selectedIndex].value;
	//chart.series[0].data[i].update({name:sel[i].children[0].value , y: parseInt(sel[i].children[1].value)});
	//RadarChart
	// alert(selectedValue);
}


//act
function actCheck(acti){

	if(acti.id != "All_Activities"){
		document.getElementById("All_Activities").checked = false
	}
	else{
		checked = document.getElementById("All_Activities").checked
		if(checked){
			document.getElementById("All_Activities").checked = true
			checkboxes = document.getElementById("checkboxes")
			for(var i = 0; i < checkboxes.childElementCount ; i++){
				checkboxes.children[i].children[0].checked = true
				i++
			}
		}
		else{
			checkboxes = document.getElementById("checkboxes")
			for(var i = 0; i < checkboxes.childElementCount ; i++){
				checkboxes.children[i].children[0].checked = false
				i++
			}
		}
	}
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
		$('#checkboxes').append('<label for=' + activities["Categories"][i].replace(" ", "_") + ">" + "<input type='checkbox' id='" + activities["Categories"][i].replace(" ", "_") + "' onclick='actCheck("+ activities["Categories"][i].replace(" ", "_")+"); update()' checked/>" + activities["Categories"][i] + "</label><br>");
	}

} 

//Data on start 
country = "France"
daysweek = "All days of the week" 
sex = "Males"
categories = "Home maintenance, Child care, Eating, Household, Leisure, Personal care, Pet care, Shopping, Sleep, Sport, Transportations, Travel, Unspecified, Work / Study"

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


function update(){
	var gender_dict = {"Both":"Total", "Male":"Males","Female":"Females"}
	var days_dict = {"Alldays":"All days of the week", "Weekdays":"Monday to Friday","Weekend":"Saturday to Sunday"}
	
	day = days_dict[document.getElementsByClassName("active")[0].innerHTML.replace(/\s+/g,"")];
	gender = gender_dict[document.getElementsByClassName("active")[1].innerHTML.replace(/\s+/g,"")];
	
	var selectBox = document.getElementById("countries");
	var country = selectBox.options[selectBox.selectedIndex].value;
	
	var activities = ""
	var categories;
	var checkboxes = document.getElementsByTagName("input");
	if (checkboxes[0].checked){
		categories = "Home maintenance, Child care, Eating, Household, Leisure, Personal care, Pet care, Shopping, Sleep, Sport, Transportations, Travel, Unspecified, Work / Study";
	}
	else{
		for(var i=1;i<checkboxes.length;++i){
			
			if (checkboxes[i].checked){
				activities = activities + checkboxes[i].id + ", ";
			}
		}
		categories = activities.slice(0,-2);

	}
	var urlapi = urlAPI + '/PersonalData?country=' + country + '&daysweek=' + day 
	 + "&sex=" + gender + "&categories=" + categories;

	var updated1 = []
	var updated2 = []
	var xhr = new XMLHttpRequest();
	xhr.open("GET", urlapi, false);
	xhr.send();

	var updated_data = JSON.parse(xhr.responseText);
	if(updated_data['Error']){}
	else{

		for (var i = 0 ; i < updated_data["Year2000"]['Categories'].length ; i++) {
			var category = updated_data["Year2000"]['Categories'][i];
			var time_spent = updated_data["Year2000"]['Time spent'][i];
			updated1[i] = {axis:category, value:time_spent}
	}
		for (var i = 0 ; i < updated_data["Year2010"]['Categories'].length ; i++) {
			var category = updated_data["Year2010"]['Categories'][i];
			var time_spent = updated_data["Year2010"]['Time spent'][i];

			updated2[i] = {axis:category, value:time_spent}
		}
	}

	var d_updated1 = [
				updated1
			];

	var d_updated2 = [
				updated2
			];

	console.log(d_updated1)
	
	RadarChart.draw("#chart1", d_updated1, mycfg);
	RadarChart.draw("#chart2", d_updated2, mycfg);
}
