var urlAPI = 'http://localhost:5000';
var dtest1 = [];


function loadActivities(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", urlAPI  +"/Activities", false);
	xhr.send();

	return JSON.parse(xhr.responseText);
}

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

function createCountryChart(){
	country = document.getElementById('countries').value
	checkedSex = document.getElementsByClassName('switch-input')[0].checked

	if(checkedSex){
		sex = 'Males'
	}
	else{
		sex = 'Females'
	}

	day = document.getElementById('days').value
	week = ['Monday', 'Tuesday', "Wednesday", "Thursday", "Friday"].includes(day)

	if(week){
		daysweek = "Monday to Friday"
	}
	else{
		daysweek = "Saturday to Sunday"
	}

	categories = loadActivities()
	categories = categories["Categories"].join(', ')

	var urlAPI1 = urlAPI + '/PersonalData?country=' + country + '&daysweek=' + daysweek 
 	+ "&sex=" + sex + "&categories=" + categories;

 	var xhr = new XMLHttpRequest();
	xhr.open("GET", urlAPI1, false);
	xhr.send();

	var data = JSON.parse(xhr.responseText);

	if(data['Error']){
		console.log("Error loading data")
	}
	else{

		for (var i = 0 ; i < data["Year2010"]['Categories'].length ; i++) {
			var category = data["Year2010"]['Categories'][i];
			var participationTime = data["Year2010"]['Participation time'][i];
			dtest1[i] = {name:category, y:participationTime}
		}		
	}

	container = document.getElementsByClassName("container")
	div = document.createElement('div')
	div.setAttribute("class", "col-md-6")
	div.setAttribute("id", "container2")
	container[0].appendChild(div);

	// Make monochrome colors
	var pieColors = (function () {
    var colors = [],
        base = Highcharts.getOptions().colors[0],
        i;

    for (i = 0; i < 10; i += 1) {
        // Start out with a darkened base color (negative brighten), and end
        // up with a much brighter color
        colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
    }
    return colors;
	}());

	// Build the chart
	var chart = Highcharts.chart('container2', {
	    chart: {
	        plotBackgroundColor: null,
	        plotBorderWidth: null,
	        plotShadow: false,
	        type: 'pie'
	    },
	    title: {
	        text: "Your country's typical day"
	    },
	    tooltip: {
	        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	    },
	    plotOptions: {
	        pie: {
	            allowPointSelect: true,
	            cursor: 'pointer',
	            colors: pieColors,
	            dataLabels: {
	                enabled: true,
	                format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
	                distance: -50,
	                filter: {
	                    property: 'percentage',
	                    operator: '>',
	                    value: 4
	                }
	            }
	        }
	    },
	    series: [{
	        name: 'Share',
	        data: dtest1,
	    }]
	});

	document.getElementsByClassName('highcharts-credits')[1].innerHTML = "";

}



function clone(){
	var div = document.getElementById('graphPerso'),
    clone = div.cloneNode(true); 
	clone.id = "graphCountry";
	clone.children[2].style.display = "none"
	document.body.appendChild(clone);

	document.getElementsByClassName("content")[0].style.display = "none";

	document.getElementById("graphCountry").className += " col-md-6";

	createCountryChart() ;

	document.getElementById('previous').innerHTML = document.getElementById('previous').innerHTML.replace("Homepage", "Build Your Own Day")
	document.getElementById('previous').parentElement.href = "make_own_day.html"

}






