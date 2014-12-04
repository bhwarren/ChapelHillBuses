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
                        alert("Please Enter a string no more than 2 characters");
                }
                else if($.trim(input).length===0){
                        alert("please enter a route");
                }
                else{
                        //send ajax tdo php
                        $.post("http://wwwp.cs.unc.edu/Courses/comp426-f14/alexjp/a8/server-side/route.php/", 
                               {code: input},
                               function(){alert("success sending request to make new route");}                                
                        );
                }
                
        });


	select_bus();
	$(document).on('change', 'div#select_by_r_and_s > p > select.stop_select', select_bus); 
	$(document).on('change', 'div#select_by_r_and_s > p > select.route_select', select_bus); 

      
        
        function generate_route_html(route_Display){
                return "<p class=\"route_display\">"+route_Display.route+ "<br>"+route_Display.stop+"<br>"+
route_Display.direction+"<br>"+route_Display.arrival1+"<br>"+route_Display.arrival2+"</p>";

        }
        
	function select_bus(e) {
		var cur_stop = $("div#select_by_r_and_s > p > select.stop_select :selected").text();
                var cur_route=$("div#select_by_r_and_s > p > select.route_select :selected").text();

		$("#results").html("");
		for(var i=0; i<results.length; i++){
			//have to keep the ifs separate, otherwise doesn't work ????
			if(cur_stop == results[i].stop ){
				if( cur_route == results[i].route || cur_route == "All Buses"){
					$("#results").append(generate_route_html(results[i]));
				}
			}
		}		
        }	

});
