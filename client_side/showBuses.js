$(document).ready(function () { 
        function routeDisplay(route, stop, direction, arrival1, arrival2){
                this.route=route;
                this.stop=stop;
                this.direction=direction;
                this.arrival1=arrival1;
                this.arrival2=arrival2;
        }   
        var result1 = new routeDisplay("A","Longview","To family practice", "13 minutes", "37 minutes");
        var result2 = new routeDisplay("NS","MLK","To family practice", "3 minutes", "47 minutes");
        var result3 = new routeDisplay("RU","Spencer Dorm","Student Stores", "5 minutes", "28 minutes");


	$(document).on('change', 'div#select_by_r_and_s > p > select.route_select', function(e) {

		var cur_route=$("div#select_by_r_and_s > p > select.route_select :selected").text();
		if(cur_route==result1.route){
			$("#results").html(generate_route_html(result1));
		}
		if(cur_route==result2.route){
			$("#results").html(generate_route_html(result2));
		}
		if(cur_route==result3.route){
			$("#results").html(generate_route_html(result3));
		}
	});

        function generate_route_html(route_Display){
                return "<p class=\"route_display\">"+route_Display.route+ "<br>"+route_Display.stop+"<br>"+
route_Display.direction+"<br>"+route_Display.arrival1+"<br>"+route_Display.arrival2+"</p>";

        }   

})
