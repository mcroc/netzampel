//npm install azure-storage

var http = require('http');
var azure = require('azure-storage');
var rpio = require('rpio');
var queueService = azure.createQueueService("DefaultEndpointsProtocol=https;AccountName=netzampel;AccountKey=xxx;EndpointSuffix=core.windows.net");

function readQueue(arg) {
  //console.log("start");  
  queueService.getMessages('netzampel', function(error, serverMessages) {
    if (!error) {
      // Process the message in less than 30 seconds, the message
      // text is available in serverMessages[0].messageText
      
      if(serverMessages[0] !== undefined && serverMessages[0].messageText !== undefined)
      {
        //console.log(serverMessages[0]);
        serverMessages.forEach(serverMessage => {
          var message = Buffer.from(serverMessage.messageText, 'base64');
          //console.log("Id: " + serverMessage.messageId + ", Message: " + message);  
          
          if(message == "new state: red" || message == "new state: rot") {
            //GPIO 2 (RED)
            setGpio(2, false);
            setGpio(22, true);
            setGpio(23, true);
          } else if(message == "new state: yellow" || message == "new state: gelb") {
            //GPIO 23 (YELLOW)
            setGpio(2, true);
            setGpio(22, true);
            setGpio(23, false);
          } else {
            //GPIO 22 (GREEN)
            setGpio(2, true);
            setGpio(22, false);
            setGpio(23, true);
          }

          queueService.deleteMessage('netzampel', serverMessage.messageId, serverMessage.popReceipt, function(error) {
          if (!error) {
              // Message deleted
            }
          });
        });
      }
    }
  });
}

function setGpio(pin, value) {
  var data = {};
  data.action = "write";
  data.gpio = pin;
  data.status = value;
  //console.log(data);
  rpio.init({mapping: 'gpio'});
  rpio.open(pin, rpio.OUTPUT, + value);
  rpio.write(pin, + value);
}

setInterval(readQueue, 5000);