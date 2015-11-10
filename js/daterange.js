var GETURL ="api/history.php?",
    objs = [],
    hasDataObjs = [];

function reload_date_range() {
   showLoader (true);
   var start = $( "#start-picker" ).datepicker( "getDate" ).toISOString(),
       end = $( "#end-picker" ).datepicker( "getDate" ).toISOString(),
       getURL = GETURL;
   if (start) getURL += "&start="+start;
   if (end) getURL += "&end="+end;
   objs = [];
   hasDataObjs = [];
   $.getJSON(getURL, function(data) {
      checkData(data);
      toggleDisplays(objs, hasDataObjs);
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
   objs = [];
   hasDataObjs = [];
   $.getJSON(getURL, function(data) {
      checkData(data);
      toggleDisplays(objs, hasDataObjs);
      updateCharts(data, true);
      setup_winddirection(data);
      showLoader (false);
   })
}

// Checks if an object name is in either
// the hide or show lists, based on that
// the display is shown or hidden, and the
// message is hidden or shown.
function toggleDisplays(showList, hideList) {
   if(showObj(showList, hideList, "windspeed") &&
      showObj(showList, hideList, "windDir")) {
      $("#windspeed").show();
      $("#windspeedHide").hide();
   } else {
      $("#windspeed").hide();
      $("#windspeedHide").show();
   }

   if(showObj(showList, hideList, "windDir")) {
      $("#winddirection").show();
      $("#winddirectionHide").hide();
   } else {
      $("#winddirection").hide();
      $("#winddirectionHide").show();
   }  

   if(showObj(showList, hideList, "turbine") &&
      showObj(showList, hideList, "divert") &&
      showObj(showList, hideList, "solar")) {
      $("#energygenerated").show();
      $("#energygeneratedHide").hide();
   } else {
      $("#energygenerated").hide();
      $("#energygeneratedHide").show();
   }

   if(showObj(showList, hideList, "pyro")) {
      $("#solarirradiance").show();
      $("#solarirradianceHide").hide();
   } else {
      $("#solarirradiance").hide();
      $("#solarirradianceHide").show();
   }

   if(showObj(showList, hideList, "battery")) {
      $("#batterystatus").show();
      $("#batterystatusHide").hide();
   } else {
      $("#batterystatus").hide();
      $("#batterystatusHide").show();
   }
}

function showObj(hideArr, showArr, name) {
   if(hideArr.indexOf(name) > -1) {
      return false;
   } else if(showArr.indexOf(name) > -1) {
      return true;
   }
}

function checkData(data) {
   var dataObj;
   for (var prop in data) {
      dataObj = data[prop]; 
      if(iterateData(dataObj)){
	  hasDataObjs.push(prop)
      } else {
         objs.push(prop);
      }
   }
}

// Recursively iterates through
// an object and data it contains. Iterates
// through the data's "subobjects" until a
// nonzero array is found (returns true) otherwise
// returns false.
function iterateData(data) {
   var dataObj;
   for (var prop in data) {
      dataObj = data[prop];
      if (isNonzeroArray(dataObj)) {
         return true;
      } else if (!(Array.isArray(dataObj))) {
         return iterateData(data);
      }
   }
   return false;
}

// Checks if passed in data is an array, 
// non-zero, and is of length > 0.
// Returns if this statement is true
function isNonzeroArray(data) {
    return (Array.isArray(data) &&
	    (notEmpty(data)) &&
	    (data.length !== 0));
}

// Checks an array contains nonzero numbers
// Returns true if has nonzero numbers, otherwise
// returns false
function notEmpty(dataArray) {
   for (var item in dataArray) {
      if (dataArray[item] !== 0) { 
	return true;
      }
   }
   return false;
}

function showLoader (show) {
   if (show) {
      $("#followingBallsG").show();
      $("#winddirection").hide();
      windSpeed.showLoading();
      solarIrradiance.showLoading();
      batteryStatus.showLoading();
      energyGenerated.showLoading();
   } else {
      $("#followingBallsG").hide();
      $("#winddirection").show();
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

