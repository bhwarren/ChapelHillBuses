$(document).ready(function () { 
        function routeDisplay(route, stop, direction, arrival1, arrival2){
                this.route=route;
                this.stop=stop;
                this.direction=direction;
                this.arrival1=arrival1;
                this.arrival2=arrival2;
        }   
        var result1 = new routeDisplay("A","Longview","To family practice", "13 minutes", "37 minutes");
        $("#results").append(generate_route_html(result1));

        function generate_route_html(route_Display){
                return "<p class=\"route_display\">"+route_Display.route+ "<br>"+route_Display.stop+"<br>"+
route_Display.direction+"<br>"+route_Display.arrival1+"<br>"+route_Display.arrival2+"</p>";

        }   

})
