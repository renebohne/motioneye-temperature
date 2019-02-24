const http = require('http');
const sensor = require('ds18b20-raspi');
var mqtt = require('mqtt')

const USE_MQTT = 1;//set to 0 if you don't want to send temperature data to tingg.io
const thing_id = "<YOUR-THINGG.IO-THING_ID>";
const username = "thing";//needs to be "thing"
const thing_key = "<YOUR-THINGG.IO-THING_KEY>";

var temperature = "0";

// async version
sensor.readSimpleC(2, (err, temp) => {
    if (err) {
        console.log(err);
    } else {
    console.log(`${temp} degC`);

    temperature = temp.toString();

    let url = "http://localhost:7999/1/config/set?text_left=" + temperature;
    console.log(url);

    http.get(url, (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        //console.log(data);
        sendMQTT();
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });

    }
});

function sendMQTT(){
  if(USE_MQTT==1)
  {
    var client  = mqtt.connect('mqtt://mqtt.tingg.io', {clientId: thing_id, username: username, password:thing_key});

    client.on('connect', function () {
            client.publish('temperature', temperature);
            client.end();
    });
  }
}
