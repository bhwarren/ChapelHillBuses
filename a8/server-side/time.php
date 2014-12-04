<?php

require_once('orm/RouteStopTimes.php');

$path_components = explode('/', $_SERVER['PATH_INFO']);

if ($_SERVER['REQUEST_METHOD'] == "GET") {
	if ((count($path_components) >= 3) && ($path_components[1] != "" && $path_components[2] != "")) {
		$route_code = ($path_components[1]);
		$stop_name = ($path_components[2]);

		// Look up object via ORM
		$route_stop = RouteStopTimes::findByNames($route_code, $stop_name);

		if ($route_stop == null) {
			// Route not found.
			header("HTTP/1.0 404 Not Found");
			print("Route " . $route_code . " and Stop " . $stop_name . " combination not found.");
			exit();
		}

		// Generate JSON encoding as response
		header("Content-type: application/json");
		print($route_stop->getJSON());
		exit();
	}

	// If here, none of the above applied and URL could
	// not be interpreted with respect to RESTful conventions.

	header("HTTP/1.0 400 Bad Request");
	print("Did not understand URL");
}
?>