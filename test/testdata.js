
// this data uses flightstats.com
// the search is for  AA 434  321-Airbus A321


module.exports = {
 "request": {
  "airline": {
   "requestedCode": "AA",
   "fsCode": "AA"
  },
  "flight": {
   "requested": "102",
   "interpreted": "102"
  },
  "date": {
   "year": "2017",
   "month": "5",
   "day": "11",
   "interpreted": "2017-05-11"
  },
  "utc": {
   "requested": "false",
   "interpreted": false
  },
  "airport": {},
  "codeType": {},
  "extendedOptions": {},
  "url": "https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/AA/102/arr/2017/5/11"
 },
 "appendix": {
  "airlines": [
   {
    "fs": "AA",
    "iata": "AA",
    "icao": "AAL",
    "name": "American Airlines",
    "phoneNumber": "08457-567-567",
    "active": true
   },
   {
    "fs": "QF",
    "iata": "QF",
    "icao": "QFA",
    "name": "Qantas",
    "phoneNumber": "+61 2 9691 3636",
    "active": true
   },
   {
    "fs": "BA",
    "iata": "BA",
    "icao": "BAW",
    "name": "British Airways",
    "phoneNumber": "1-800-AIRWAYS",
    "active": true
   }
  ],
  "airports": [
   {
    "fs": "HNL",
    "iata": "HNL",
    "icao": "PHNL",
    "faa": "PHNL",
    "name": "Honolulu International Airport",
    "street1": "300 Rodgers Blvd., #12",
    "street2": "",
    "city": "Honolulu",
    "cityCode": "HNL",
    "stateCode": "HI",
    "postalCode": "96819",
    "countryCode": "US",
    "countryName": "United States",
    "regionName": "North America",
    "timeZoneRegionName": "Pacific/Honolulu",
    "weatherZone": "HIZ002",
    "localTime": "2017-05-11T12:20:51.531",
    "utcOffsetHours": -10,
    "latitude": 21.325833,
    "longitude": -157.921667,
    "elevationFeet": 13,
    "classification": 1,
    "active": true,
    "delayIndexUrl": "https://api.flightstats.com/flex/delayindex/rest/v1/json/airports/HNL?codeType=fs",
    "weatherUrl": "https://api.flightstats.com/flex/weather/rest/v1/json/all/HNL?codeType=fs"
   },
   {
    "fs": "DFW",
    "iata": "DFW",
    "icao": "KDFW",
    "faa": "DFW",
    "name": "Dallas/Fort Worth International Airport",
    "street1": "International Pkwy",
    "city": "Dallas",
    "cityCode": "DFW",
    "stateCode": "TX",
    "postalCode": "75261",
    "countryCode": "US",
    "countryName": "United States",
    "regionName": "North America",
    "timeZoneRegionName": "America/Chicago",
    "weatherZone": "TXZ119",
    "localTime": "2017-05-11T17:20:51.531",
    "utcOffsetHours": -5,
    "latitude": 32.897462,
    "longitude": -97.036128,
    "elevationFeet": 603,
    "classification": 1,
    "active": true,
    "delayIndexUrl": "https://api.flightstats.com/flex/delayindex/rest/v1/json/airports/DFW?codeType=fs",
    "weatherUrl": "https://api.flightstats.com/flex/weather/rest/v1/json/all/DFW?codeType=fs"
   }
  ],
  "equipments": [
   {
    "iata": "763",
    "name": "Boeing 767-300 Passenger",
    "turboProp": false,
    "jet": true,
    "widebody": true,
    "regional": false
   }
  ]
 },
 "flightStatuses": [
  {
   "flightId": 889390463,
   "carrierFsCode": "AA",
   "flightNumber": "102",
   "departureAirportFsCode": "HNL",
   "arrivalAirportFsCode": "DFW",
   "departureDate": {
    "dateLocal": "2017-05-10T20:10:00.000",
    "dateUtc": "2017-05-11T06:10:00.000Z"
   },
   "arrivalDate": {
    "dateLocal": "2017-05-11T08:47:00.000",
    "dateUtc": "2017-05-11T13:47:00.000Z"
   },
   "status": "L",
   "schedule": {
    "flightType": "J",
    "serviceClasses": "RJY",
    "restrictions": ""
   },
   "operationalTimes": {
    "publishedDeparture": {
     "dateLocal": "2017-05-10T20:10:00.000",
     "dateUtc": "2017-05-11T06:10:00.000Z"
    },
    "publishedArrival": {
     "dateLocal": "2017-05-11T08:47:00.000",
     "dateUtc": "2017-05-11T13:47:00.000Z"
    },
    "scheduledGateDeparture": {
     "dateLocal": "2017-05-10T20:10:00.000",
     "dateUtc": "2017-05-11T06:10:00.000Z"
    },
    "estimatedGateDeparture": {
     "dateLocal": "2017-05-10T20:09:00.000",
     "dateUtc": "2017-05-11T06:09:00.000Z"
    },
    "actualGateDeparture": {
     "dateLocal": "2017-05-10T20:09:00.000",
     "dateUtc": "2017-05-11T06:09:00.000Z"
    },
    "flightPlanPlannedDeparture": {
     "dateLocal": "2017-05-10T20:32:00.000",
     "dateUtc": "2017-05-11T06:32:00.000Z"
    },
    "estimatedRunwayDeparture": {
     "dateLocal": "2017-05-10T20:28:00.000",
     "dateUtc": "2017-05-11T06:28:00.000Z"
    },
    "actualRunwayDeparture": {
     "dateLocal": "2017-05-10T20:28:00.000",
     "dateUtc": "2017-05-11T06:28:00.000Z"
    },
    "scheduledGateArrival": {
     "dateLocal": "2017-05-11T08:47:00.000",
     "dateUtc": "2017-05-11T13:47:00.000Z"
    },
    "estimatedGateArrival": {
     "dateLocal": "2017-05-11T08:41:00.000",
     "dateUtc": "2017-05-11T13:41:00.000Z"
    },
    "actualGateArrival": {
     "dateLocal": "2017-05-11T08:41:00.000",
     "dateUtc": "2017-05-11T13:41:00.000Z"
    },
    "flightPlanPlannedArrival": {
     "dateLocal": "2017-05-11T08:32:00.000",
     "dateUtc": "2017-05-11T13:32:00.000Z"
    },
    "estimatedRunwayArrival": {
     "dateLocal": "2017-05-11T08:29:00.000",
     "dateUtc": "2017-05-11T13:29:00.000Z"
    },
    "actualRunwayArrival": {
     "dateLocal": "2017-05-11T08:29:00.000",
     "dateUtc": "2017-05-11T13:29:00.000Z"
    }
   },
   "codeshares": [
    {
     "fsCode": "BA",
     "flightNumber": "2372",
     "relationship": "L"
    },
    {
     "fsCode": "QF",
     "flightNumber": "3279",
     "relationship": "L"
    }
   ],
   "flightDurations": {
    "scheduledBlockMinutes": 457,
    "blockMinutes": 452,
    "scheduledAirMinutes": 420,
    "airMinutes": 421,
    "scheduledTaxiOutMinutes": 22,
    "taxiOutMinutes": 19,
    "scheduledTaxiInMinutes": 15,
    "taxiInMinutes": 12
   },
   "airportResources": {
    "departureTerminal": "M",
    "departureGate": "16",
    "arrivalTerminal": "A",
    "arrivalGate": "A13",
    "baggage": "A16"
   },
   "flightEquipment": {
    "scheduledEquipmentIataCode": "763",
    "actualEquipmentIataCode": "763",
    "tailNumber": "N342AN"
   }
  }
 ]
}
