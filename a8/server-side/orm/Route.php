<?php
class Route {
	public $rid;
	public $code;

	public static function create($code) {
		$mysqli = new mysqli("classroom.cs.unc.edu", "bhwarren", "monkey", "bhwarrendb");

		$result = $mysqli->query("insert into a6_Route values (null, '" . $mysqli->real_escape_string($code) . "')");

		if ($result) {
			$rid = $mysqli->insert_id;
			return new Route($rid, $code);
		}
		return null;
	}

	public static function findByID($rid) {
		$mysqli = new mysqli("classroom.cs.unc.edu", "bhwarren", "monkey", "bhwarrendb");

		$result = $mysqli->query("select * from a6_Route where rid = " . $rid);
		if ($result) {
			if ($result->num_rows == 0) {
				return null;
			}

			$route_info = $result->fetch_array();

			return new Route(intval($route_info['rid']), $route_info['code']);
		}
		return null;
	}

	public static function getAllIDs() {
		$mysqli = new mysqli("classroom.cs.unc.edu", "bhwarren", "monkey", "bhwarrendb");

		$result = $mysqli->query("select rid from a6_Route");
		$rid_array = array();

		if ($result) {
			while ($next_row = $result->fetch_array()) {
				$rid_array[] = intval($next_row['rid']);
			}
		}
		return $rid_array;
	}

	private function __construct($rid, $code) {
		$this->rid = $rid;
		$this->code = $code;
	}

	public function getID() {
		return $this->rid;
	}

	public function getCode() {
		return $this->code;
	}

	public function setCode($code) {
		$this->code = $code;
		return $this->update();
	}

	private function update() {
		$mysqli = new mysqli("classroom.cs.unc.edu", "bhwarren", "monkey", "bhwarrendb");

		$result = $mysqli->query("update a6_Route set code='" . $mysqli->real_escape_string($this->code)
						. "' where rid=" . $this->rid);

		return $result;
	}

	public function delete() {
		$mysqli = new mysqli("classroom.cs.unc.edu", "bhwarren", "monkey", "bhwarrendb");
		$mysqli->query("delete from a6_Route where rid=" . $this->rid);
	}

	public function getJSON() {
		$json_obj = array('rid' => $this->rid, 'code' => $this->code);
		return json_encode($json_obj);
	}
}
?>