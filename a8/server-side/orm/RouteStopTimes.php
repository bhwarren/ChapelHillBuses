<?php

class RouteStopTimes {
	private $times;

	public static function findByNames($rname, $sname) {
		$mysqli = new mysqli("classroom.cs.unc.edu", "bhwarren", "monkey", "bhwarrendb");

		$result = $mysqli->query("select distinct R.rid, S.sid, ST.arr_time
								  from a6_Route R, a6_RouteDirection RD, a6_RouteStop RS,
								  a6_RouteStopDirection RSD, a6_Stop S, a6_StopTime ST
								  where R.code='" . $rname  ."' and S.name='" . $sname . "' and R.rid=RS.rid
								  and S.sid=RS.sid and RS.rsid=RSD.rsid and RSD.rsdid=ST.rsdid;");
		$times = array();

		if ($result) {
			if ($result->num_rows == 0) {
				return null;
			} else {
				while ($next_row = $result->fetch_array()) {
					$times[] = $next_row['arr_time'];
				}
			}

			return new RouteStopTimes($times);
		}
		return null;
	}

	private function __construct($times) {
		$this->times = $times;
	}

	public function getJSON() {
		$json_obj = array('times' => $this->times);
		return json_encode($json_obj);
	}
}
?>