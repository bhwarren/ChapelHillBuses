<?php

require_once('orm/Route.php');

$path_components = explode('/', $_SERVER['PATH_INFO']);

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  // GET means either instance look up, index generation, or deletion

  // Following matches instance URL in form
  // /route.php/<rid>

	if ((count($path_components) >= 2) && ($path_components[1] != "")) {
		// Interpret <rid> as integer
		$route_id = intval($path_components[1]);

		// Look up object via ORM
		$route = Route::findByID($route_id);

		if ($route == null) {
			// Route not found.
			header("HTTP/1.0 404 Not Found");
			print("Route id: " . $route_id . " not found.");
			exit();
		}

		// Check to see if deleting
		if (isset($_REQUEST['delete'])) {
			$route->delete();
			header("Content-type: application/json");
			print(json_encode(true));
			exit();
	    } 

		// Normal lookup.
		// Generate JSON encoding as response
		header("Content-type: application/json");
		print($route->getJSON());
		exit();
	}

	// ID not specified, then must be asking for index
	header("Content-type: application/json");
	print(json_encode(Route::getAllIDs()));
	exit();

} else if ($_SERVER['REQUEST_METHOD'] == "POST") {
	// Either creating or updating
	// Following matches /route.php/<rid> form
	if ((count($path_components) >= 2) && ($path_components[1] != "")) {

		//Interpret <rid> as integer and look up via ORM
		$route_id = intval($path_components[1]);
		$route = Route::findByID($route_id);

		if ($route == null) {
			// Route not found.
			header("HTTP/1.0 404 Not Found");
			print("Route id: " . $route_id . " not found while attempting update.");
			exit();
		}

	// Validate values
		$new_code = false;
		if (isset($_REQUEST['code'])) {
			$new_code = trim($_REQUEST['code']);
			if ($new_code == "") {
				header("HTTP/1.0 400 Bad Request");
				print("Bad code");
				exit();
			}
		}

		// Update via ORM
		if ($new_code) {
			$route->setCode($new_code);
		}

		// Return JSON encoding of updated Route
		header("Content-type: application/json");
		print($route->getJSON());
		exit();
	} else {

		// Creating a new Route item

		// Validate values
		if (!isset($_REQUEST['code'])) {
			header("HTTP/1.0 400 Bad Request");
			print("Missing code");
			exit();
		}
    
	    $code = trim($_REQUEST['code']);
	    if ($code == "") {
	    	header("HTTP/1.0 400 Bad Request");
	    	print("Bad code");
	    	exit();
	    }

		// Create new Route via ORM
		$new_route = Route::create($code);

		// Report if failed
		if ($new_route == null) {
			header("HTTP/1.0 500 Server Error");
			print("Server couldn't create new Route.");
			exit();
		}
	    
		//Generate JSON encoding of new Route
		header("Content-type: application/json");
		print($new_route->getJSON());
		exit();
	}
}

// If here, none of the above applied and URL could
// not be interpreted with respect to RESTful conventions.

header("HTTP/1.0 400 Bad Request");
print("Did not understand URL");

?>