var rpio = require('rpio');
var value = false;
function setValue(value, pin) {
  console.log(value);
  if(value) {
    value = false;
    rpio.open(pin, rpio.OUTPUT, rpio.LOW);
    /*rpio.open(3, rpio.OUTPUT, rpio.LOW); //GPIO2
    rpio.open(15, rpio.OUTPUT, rpio.LOW); //GPIO22
    rpio.open(16, rpio.OUTPUT, rpio.LOW); //GPIO23*/
  } else {
    value = true;
    rpio.open(pin, rpio.OUTPUT, rpio.HIGH);
    /*rpio.open(3, rpio.OUTPUT, rpio.HIGH); //GPIO2
    rpio.open(15, rpio.OUTPUT, rpio.HIGH); //GPIO22
    rpio.open(16, rpio.OUTPUT, rpio.HIGH); //GPIO23*/
  }
  rpio.close(pin, rpio.PIN_PRESERVE);
  /*rpio.close(3, rpio.PIN_PRESERVE);
  rpio.close(15, rpio.PIN_PRESERVE);
  rpio.close(16, rpio.PIN_PRESERVE);*/
  return value;
}

function myTimer() {
  setValue(value, 3) ;
  value = !value;
  setTimeout(myTimer(),5000, 'funky'); 
}

function intervalFunc() {
  console.log('Cant stop me now!');
  setValue(value, 3);
  console.log('Pin 3 is currently set ' + (rpio.read(3) ? 'high' : 'low'));
  setValue(value, 15);
  console.log('Pin 15 is currently set ' + (rpio.read(3) ? 'high' : 'low'));
  setValue(value, 16);
  console.log('Pin 16 is currently set ' + (rpio.read(3) ? 'high' : 'low'));
  value = !value;
}

setInterval(intervalFunc, 5000);

