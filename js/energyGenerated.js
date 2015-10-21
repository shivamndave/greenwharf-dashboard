// Energy Generated JSON Stacked Line Chart by Bryan Smith
function setup_energygenerated() {
    $('#energygenerated').highcharts('StockChart', {
        colors: ['#00B2EE', '#33FF33', '#FF0000'],
        chart: {
            type : 'area',
            width : 500,
            height : 374
        },
        rangeSelector : {
            enabled: true,
            selected : 0,
            buttons: [
               {
                  type: 'day',
                  count: 1,
                  text: '1d'
               },    {
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
            text : 'Energy Generated'
        },
        yAxis : {
            title: {
               text : "Watts"
            }
        },
        legend : {
            enabled : true
        },
        series : [{
                name : 'Solar',
                data : [[]],
                tooltip: {
                    valueDecimals: 2,
                    valueSuffix: ' watts'
                }
            }, {
				name : 'Turbine',
                data : [[]],
				tooltip: {
                    valueDecimals: 2,
                    valueSuffix: ' watts'
				}
            }, {
                name : 'Divert-Load',
                data : [[]],
                tooltip: {
                    valueDecimals: 2,
                    valueSuffix: ' watts'
                }
			}],
            plotOptions : {
                series : {
                    stacking : "normal"
                },
            }
    });
    energyGenerated = $('#energygenerated').highcharts();
}
