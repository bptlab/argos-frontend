/*
This is the config for displaying the attributes. It must have the same EntityTypes like the static data in the
backend. Then, according to the requirements, the attributes, that should be displayed on the GridView are named and
assigned the value 1 (integer).
 */
const attributeConfig = {
	"TransportationMode": {
		"isFarePaying": 1
	},
	"Line": {
		"serviceTypes": 1
	},
	"StopPoint": {
		"lat": 1,
		"lon": 1
	}
};

export default attributeConfig;