#!/usr/sbin/python2

from bs4 import BeautifulSoup
import urllib

routes = ["a-route","ccx-route","cl-route","D-route","F-route","hs-route","ns-route"]

side_by_side = ["cm-route","cpx-route","cw-route","G-route","hu-route","j-route","jfx-route","n-route","nu-route","s-route","v-route"]

#"special-route"
special_routes = ["ru-route","t-route","u-route"]

for route in routes:
	route_n=route.split('-')[0]
	url='http://www.townofchapelhill.org/town-hall/departments-services/transit/routes-schedules/all-routes-schedules/'+route
	html = urllib.urlopen(url).read()
	soup = BeautifulSoup(html)

	print "INSERT INTO a6_Route (code) VALUES (\""+route_n+"\");"


	tables = soup.find_all('table',class_='tableDataBlue')

	for table in tables:
		directions = table.select('tbody > tr:nth-of-type(1) > th')
		#print directions
	
		stops = dict()
		times = dict()
		for di in directions:
			dire = di.text
			print "INSERT INTO a6_RouteDirection (rid,direction) VALUES ((SELECT rid from a6_Route where code=\""+route_n+"\" limit 1),\""+dire+"\");"
			
			stops[di]=table.select('tbody > tr:nth-of-type(2) > th')
			#print stops[di]
			for stop in stops[di]:
				print "INSERT INTO a6_Stop (name) VALUES (\""+stop.text.encode('ascii','ignore')+"\");"
				print "INSERT INTO a6_RouteStop (rid,sid) VALUES ((SELECT rid from a6_Route where code=\""+route_n+"\" limit 1),(select sid from a6_Stop where name=\""+stop.text.encode('ascii','ignore')+"\" limit 1));"
				print "INSERT INTO a6_RouteStopDirection (rsid,rdid) VALUES ((SELECT rsid from a6_RouteStop where rid=(SELECT rid from a6_Route where code=\""+route_n+"\" limit 1) and sid=(SELECT sid from a6_Stop where name=\""+stop.text.encode('ascii','ignore')+"\" limit 1) limit 1), (SELECT rdid from a6_RouteDirection where rid=(SELECT rid from a6_Route where code=\""+route_n+"\" limit 1) and direction=\""+dire+"\" limit 1));"
		i = 1
		for di in directions:
			#print di
			dire = di.text
			for stop in stops[di]:
				all_col = table.select('tbody > tr > td:nth-of-type('+str(i)+')')
				#all_col = [s for s in all_col if s.parent.parent.select('tr:nth-of-type(2) > th')[i-1]==stop]
				times[stop]=[a.text for a in all_col]
			#	print stop.text.encode('ascii','ignore')
			#	print times[stop]
				for time in times[stop]:
					#if time and int(time.split(':')[0]) < 11 and ('p' in time):
					#	time = str(int(time.split(':')[0])+12)+':'+time.split(':')[1].split('p')[0]
					print "INSERT INTO a6_StopTime (rsdid,arr_time) VALUES ((SELECT rsdid from a6_RouteStopDirection where rsid=(SELECT rsid from a6_RouteStop where rid=(SELECT rid from a6_Route where code=\""+route_n+"\" limit 1) and sid=(SELECT sid from a6_Stop where name=\""+stop.text.encode('ascii','ignore')+"\" limit 1) limit 1) and rdid=(SELECT rdid from a6_RouteDirection where rid=(SELECT rid from a6_Route where code=\""+route_n+"\" limit 1) and direction=\""+dire+"\" limit 1) limit 1),\""+time+"\");"
				i+=1
			i=1
	
	#print "=========================== FINISHED ROUTE "+ route + "=====================================\n\n\n\n"
	quit()
