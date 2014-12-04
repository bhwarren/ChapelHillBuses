var url_base = "http://wwwp.cs.unc.edu/Courses/comp426-f14/alexjp/a8/server-side";

$(document).ready(function () { 
		$('#admin').hide();

		function routeDisplay(route, stop, direction, arrival1, arrival2){
				this.route=route;
				this.stop=stop;
				this.direction=direction;
				this.arrival1=arrival1;
				this.arrival2=arrival2;
		}   
		var result1 = new routeDisplay("A","Student Union","To family practice", "13 minutes", "37 minutes");
		var result2 = new routeDisplay("NS","Sitterson","To family practice", "3 minutes", "47 minutes");
		var result3 = new routeDisplay("RU","Spencer Dorm","To Student Union", "5 minutes", "28 minutes");
		var result4 = new routeDisplay("U","Student Union","To Franklin Street", "15 minutes", "48 minutes");

	var results = [result1,result2,result3, result4];
  
		function admin_panel(e){
				e.preventDefault();
				$('#admin').show();

		}
		$('#admin_button').click(admin_panel);
		$('#close').click(function(e){
				$('#admin').hide();
		});
		$('input[value="Submit"]').click(function(e){
				var input = $('#new_route').val();
				
				if(input.length>2){
						alert("Bus codes can only be one or two characters.");
				}
				else if($.trim(input).length===0){
						alert("please enter a route");
				}
				else{
						//send ajax tdo php
						$.post(url_base+"/route.php", 
							   {code: input},
							   function(){alert("Route creation success.");}                                
						);
				}
				
		});


	// select_bus();
	$(document).on('change', 'div#select_by_r_and_s > p > select.stop_select', select_bus); 
	$(document).on('change', 'div#select_by_r_and_s > p > select.route_select', select_bus); 

	  
		
		function generate_route_html(route_Display){
				return "<p class=\"route_display\">"+route_Display.route+ "<br>"+route_Display.stop+"<br>"+
							route_Display.direction+"<br>"+route_Display.arrival1+
							"<br>"+route_Display.arrival2+"</p>";
		}
	
	function select_bus(e) {
		var cur_stop = $("div#select_by_r_and_s > p > select.stop_select :selected").text();
				var cur_route=$("div#select_by_r_and_s > p > select.route_select :selected").text();

		$("#results").empty();

		$.ajax(url_base + "/time.php/" + cur_route + "/" + cur_stop,
			   {type: "GET",
				dataType: "json",
				success: function (tlist, textStatus, jqXHR) {
					var time_remaining_arr = [];
					var time_substring = [];
					var time_display = [];
					var output = [];

					var arrivalHour;
					var arrivalMin;
					var arrivalSec;

					var currentDate;
					var currentHour;
					var currentMin;
					var currentSec;

					var remainHour;
					var remainMin;
					var remainSec;

					var hour;
					var min;
					var sec;

					var count;
					for (var i = 0; i < tlist.times.length; i++) {
						time_remaining_arr[i] = time_remaining(tlist.times[i]);
					}

					count = 0;

					for (i = 0; i < time_remaining_arr.length; i++) {

						time_substring = time_remaining_arr[i].split(":");
						hour = parseInt(time_substring[0]);
						min = parseInt(time_substring[1]);
						sec = parseInt(time_substring[2]);

						if ((hour >= 0) && (min >= 0) && (sec >= 0)) {
							time_display[count] = time_remaining_arr[i];
							count += 1;
							if(count > 2) {break;}
						}
					}

					if(time_display.length < 1) {
						$("#results").append("No results <br>");
					} else {
						for(i = 0; i < time_display.length; i++) {
							output = time_display[i].split(":");
							$("#results").append(output[0] + " hours " + output[1] +
							" minutes " + output[2] + " seconds <br>");
						}
					}
				}

			});
		// for(var i=0; i<results.length; i++){
		// 	//have to keep the ifs separate, otherwise doesn't work ????
		// 	if(cur_stop == results[i].stop ){
		// 		if( cur_route == results[i].route || cur_route == "All Buses"){
		// 			$("#results").append(generate_route_html(results[i]));
		// 		}
		// 	}
		// }		
	}

	var time_remaining = function(timeStr) {
		time_substring = timeStr.split(":");
		arrivalHour = parseInt(time_substring[0], 10);
		arrivalMin = parseInt(time_substring[1], 10);
		arrivalSec = parseInt(time_substring[2], 10);

		currentDate = new Date();
		currentHour = currentDate.getHours();
		currentMin = currentDate.getMinutes();
		currentSec = currentDate.getSeconds();

		remainHour = arrivalHour - currentHour;

		remainMin = arrivalMin - currentMin;

		remainSec = arrivalSec - currentSec;

		if(remainSec < 0) {
			remainSec = 60 + remainSec;
			remainMin = remainMin - 1;
		}

		if(remainMin < 0) {
			remainMin = 60 + remainMin;
			remainHour = remainHour - 1;
			if(remainMin < 0) {
				remainMin = 60 + remainMin;
				remainHour = remainHour - 1;
			}	
		}
		return (remainHour + ":" + remainMin + ":" + remainSec);
	};

});