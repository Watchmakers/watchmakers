function buildPie(){

		/*
	Must add sleeping time

	var sleep = document.getElementById("sleep").value.split(":");
	var wakeup = document.getElementById("wakeup").value.split(":");
	
	
	alert(sleep[0] +" "+sleep[1]);
	alert(wakeup[0]+" "+wakeup[1]);
	hours=0
	minutes=0

	if(sleep[0]<24) hours=(24-sleep[0])+wakeup[0];
*/

	var sel = document.getElementsByClassName("selectActivityClass");
	var len = sel.length;
	var data=[];
	for (i=0; i<len; i++){
		data.push({name:sel[i].children[0].value , y: parseInt(sel[i].children[1].value)})
	}


	document.getElementsByClassName("highcharts-container")[0].remove();

	// Make monochrome colors
	var pieColors = (function () {
	    var colors = [],
	        base = Highcharts.getOptions().colors[0],
	        i;

	    for (i = 0; i < len; i += 1) {
	        // Start out with a darkened base color (negative brighten), and end
	        // up with a much brighter color
	        colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
	    }
	    return colors;
	}());

	// Build the chart
	Highcharts.chart('container', {
	    chart: {
	        plotBackgroundColor: null,
	        plotBorderWidth: null,
	        plotShadow: false,
	        type: 'pie'
	    },
	    title: {
	        text: 'Browser market shares at a specific website, 2014'
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
	        data: data
	    }]
	});
	

}