var GETURL ="api/history.php?";

function reload_date_range() {
   showLoader (true);
   var start = $( "#start-picker" ).datepicker( "getDate" ).toISOString();
   var end = $( "#end-picker" ).datepicker( "getDate" ).toISOString();
   var getURL = GETURL;
   if (start) getURL += "&start="+start;
   if (end) getURL += "&end="+end;
   $.getJSON(getURL, function(data) {
      updateCharts(data, false);
      updateWindRose(data);
      showLoader (false);
   });
}

function initial_date_range(start, end) {
   var getURL = GETURL;
   if (start) getURL += "&start="+start;
   if (end) getURL += "&end="+end;
   makeCharts();
   showLoader (true);
   $.getJSON(getURL, function(data) {
      updateCharts(data, true);
      setup_winddirection(data);
      showLoader (false);
   });
}

function showLoader (show) {
   if (show) {
      $('.followingBallsG').show();
      $('#winddirection').hide();
      windSpeed.showLoading();
      solarIrradiance.showLoading();
      batteryStatus.showLoading();
      energyGenerated.showLoading();
   } else {
      $('.followingBallsG').hide();
      $('#winddirection').show();
      windSpeed.hideLoading();
      solarIrradiance.hideLoading();
      batteryStatus.hideLoading();
      energyGenerated.hideLoading();
   }
}

function makeCharts () {
   setup_windspeed();
   setup_solar();
   setup_battery();
   setup_energygenerated();
}

function updateCharts (data, initial) {
   windSpeed.series[0].setData(data.windSpeed, true);
   solarIrradiance.series[0].setData(data.pyro, true);
   energyGenerated.series[0].setData(data.solar, true);
   energyGenerated.series[1].setData(data.turbine, true);
   energyGenerated.series[2].setData(data.turbine, true);
   batteryStatus.series[0].setData(data.battery, true);

   //We need data in the charts for auto-rangeing to work
   //on the initial load the chart had no data so we need 
   //to perform the following updates to make things look 
   //as intended
   if (initial) {
      windSpeed.series[1].update();
      solarIrradiance.series[1].update();
      batteryStatus.series[1].update();
      energyGenerated.xAxis[0].zoom();
      energyGenerated.series[0].update();
      energyGenerated.series[1].update();
      energyGenerated.series[2].update();
      energyGenerated.redraw();
   }
}

function updateWindRose(data) {
   tabulateWindRose(data.windDir);
   document.getElementById('freq').remove();
   windDirection.destroy();
   setup_winddirection(data);
}

