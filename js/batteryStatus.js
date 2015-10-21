// Solar Irradiance JSON Chart by Bryan Smith
function setup_battery() {
		// Create the chart
		$('#batterystatus').highcharts('StockChart', {
         plotOptions : {
            line : {
               marker : {
                  enabled : false
               }
            }
         },
         chart: {
            width : 500,
            height : 300
         },
			rangeSelector : {
            enabled : true,
            selected : 0,
            buttons: [
               {
                  type: 'day',
                  count: 1,
                  text: '1d'
               }, {
                  type: 'month',
                  count: 1,
                  text: '1m'
               }, {
                  type: 'month',
                  count: 3,
                  text: '3m'
               }, {
                  type: 'year',
                  count: 1,
                  text: '1y'
               }, {
                  type: 'all',
                  text: 'all'
               }
            ]
         },
			title : {
				text : 'Battery Status'
			},
         xAxis : {
            type: 'datetime'
         },
         yAxis : {
            title: {
               text: 'Volts'
            }
         },
			series : [{
				name : 'batt volts',
            data : [[]],
				tooltip: {
					valueDecimals: 2,
               valueSuffix: ' v',
				}
			}]
		});
      batteryStatus = $('#batterystatus').highcharts();
}
